import fs from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';

const toolText = fs.readFileSync(new URL('../src/data/tools.ts', import.meta.url), 'utf8');
const operations = [...new Set([...toolText.matchAll(/"operation": "([^"]+)"/g)].map(m => m[1]))];
const source = fs.readFileSync(new URL('../public/scripts/tool-engine.js', import.meta.url), 'utf8');
const samples = {
  'csv-clean':' a \n b ','slugify':'Hello World!','qr-text':'  Hello QR  ','image-dimensions':'data:image/png;base64,aGVsbG8=','html-color-name':'rgb(255, 0, 0)','punycode-info':'example.com','url-safe-base64':'hello','text-to-binary':'Hello','markdown-table':'Name,Age\nAlice,30','markdown-preview-text':'# Title\n**bold**','text-escape-html':'<b>hi</b>','text-unescape-html':'&lt;b&gt;','text-escape-regex':'a+b?','text-unique-words':'one two one','xml-escape':'<x>','html-encode':'<x>','html-decode':'&lt;x&gt;','css-gradient':'#4263eb #a5b4fc','text-count':'A😀B','line-sort':'b\na','line-dedupe':'a\na\nb','line-reverse':'a\nb','trim-lines':' a \n b ','blank-lines':'a\n\n b',
  'case-upper':'hello','case-lower':'HELLO','case-title':'hello world','case-sentence':'hello. world','text-reverse':'hello','text-replace':'foo foo','text-to-slug':'中文工具 测试!','comma-to-lines':'a, b','lines-to-comma':'a\nb','text-clean':'hello',
  'html-escape':'<p>hi</p>','html-unescape':'&lt;b&gt;','regex-escape':'a+b?','unique-words':'one two one','json-format':'{"a":1}','json-minify':'{ "a": 1 }','json-validate':'{"ok":true}',
  'json-to-yaml':'{"site":"demo","enabled":true}','yaml-to-json':'site: demo\nenabled: true\nitems:\n  - alpha\n  - beta\nmeta:\n  count: 2','html-minify':'<p> a </p>','css-minify':'a { color: red; }','js-minify':'const x = 1;','url-encode':'hello world','url-decode':'hello%20world',
  'base64-encode':'hello','base64-decode':'aGVsbG8=','regex-test':'hello 123','uuid-gen':'generate','password-gen':'generate','hash-sha256':'hello','hash-sha1':'hello','hash-sha512':'hello','hmac-sha256':'hello','jwt-decode':'eyJhbGciOiJub25lIn0.eyJzdWIiOiIxIn0.',
  'url-parse':'https://example.com/path?a=1#x','querystring-parse':'?a=1&b=two','querystring-build':'{"a":1,"b":"two"}','unix-permissions':'755','cron-explain':'0 9 * * 1','binary-encode':'hi','binary-decode':'01101000 01101001','hex-encode':'hi','hex-decode':'68 69','ascii-table':'A','unicode-inspect':'中',
  'morse-encode':'SOS 123','morse-decode':'... --- ...','rot13':'hello','caesar':'hello','csv-to-json':'name,notes\nAlice,\"likes apples, pears\"\nBob,\"said \"\"hello\"\"\"','json-to-csv':'[{"name":"Alice","notes":"likes apples, pears"}]','markdown-plain':'# Title\n**bold**','html-to-text':'<p>Hello</p>',
  'timestamp-now':'now','timestamp-date':'1700000000','date-timestamp':'2026-10-29','date-iso':'2026-10-29','date-utc':'2026-10-29','date-diff':'','days-in-month':'','leap-year':'2024','weekday':'2026-10-29','timezone-offset':'now','calculator':'(12 + 8) * 3','percentage':'','percent-change':'','average':'1,2,3','median':'1,2,3','sum':'1,2,3','random-number':'generate','number-base':'255','roman-numeral':'5','factorial':'5','prime-check':'97','gcd-lcm':'','round-number':'3.14159','unit-convert':'','temperature':'',
  'color-hex-rgb':'#ff0000','color-rgb-hex':'255,0,0','color-rgb-hsl':'255,0,0','color-hsl-rgb':'120,100,50','color-contrast':'#000000 #ffffff','color-random':'generate','color-palette':'#4263eb','color-invert':'#4263eb','color-luminance':'#4263eb','gradient-css':'#4263eb #a5b4fc','password-strength':'Abc123!xyz456','lorem':'3','data-uri':'hello','base64-url-encode':'hello','user-agent-info':'','viewport-info':'','aspect-ratio':'1920 1080','html-meta':'Title\nDescription\nhttps://example.com','robots-txt':'https://example.com/sitemap.xml','sitemap-url':'https://example.com','http-status':'404','mime-type':'document.pdf','ip-format':'192.168.1.1','email-validate':'hello@example.com','svg-minify':'<svg> <path /> </svg>','svg-to-data-uri':'<svg></svg>','css-shadow':'','css-border-radius':'','css-flex-center':'','css-grid':'','placeholder-svg':'','design-token':'#4263eb','list-to-json':'a\nb','json-to-list':'["a","b"]','number-format':'12345.6','byte-convert':'1024','table-to-markdown':'Name,Age\nAlice,30','json-key-sort':'{"z":1,"a":2}','json-stringify':'hello','json-unstringify':'"hello"','bmi':'70 175','calorie-estimate':'70 175 30','tip-calculator':'100 15 2','loan-payment':'200000 4.5 30','discount':'80 25','split-bill':'120 4','word-frequency':'this is a test this is only a test','reading-time':'hello world','name-initials':'Ada Lovelace'
};
const controlDefaults = {'find-text':'foo','replace-text':'bar','regex-pattern':'\\w+','regex-flags':'gi','shift':'3','min-number':'1','max-number':'100','decimal-places':'2','unit-value':'1','temp-value':'0','part-value':'25','whole-value':'100','old-value':'100','new-value':'120','date-start':'2026-01-01','date-end':'2026-12-31','year-value':'2026','month-value':'10','roman-mode':'to-roman','gcd-a':'24','gcd-b':'36','secret-key':'test-key'};
function makeElement(id='') { return {id,value:'',textContent:'',placeholder:'',dataset:{},style:{},children:[],listeners:{},hidden:false,appendChild(el){this.children.push(el)},addEventListener(name,fn){this.listeners[name]=fn},setAttribute(){},select(){},closest(){return null},set innerHTML(v){this._html=v;this.value=String(v).replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'")},get innerHTML(){return this._html||''}}; }
const expectedContains = {
  'text-replace':'bar bar', 'text-count':'字符数（含空格）：3', 'text-to-slug':'中文工具-测试', 'reading-time':'约 0.1 分钟', 'calculator':'60', 'base64-encode':'aGVsbG8=',
  'url-encode':'hello%20world', 'querystring-parse':'"a": "1"',
  'morse-decode':'SOS', 'roman-numeral':'V', 'date-diff':'绝对天数：364',
  'json-to-csv':'"likes apples, pears"', 'yaml-to-json':'"items": [\n    "alpha",\n    "beta"\n  ]', 'image-dimensions':'图片宽度：1 px', 'html-color-name':'颜色格式有效', 'punycode-info':'example.com', 'text-to-binary':'UTF-8 字节数：5', 'qr-text':'Hello QR', 'csv-clean':'a\nb'
};
const declaredOps = [...new Set([...toolText.matchAll(/"operation": "([^"]+)"/g)].map(m => m[1]))];
const cases = new Set([...source.matchAll(/case '([^']+)'/g)].map(m => m[1]));
const unmapped = declaredOps.filter(op => !cases.has(op));
let passed=0; const failures=[];
if(unmapped.length) failures.push({op:'catalog coverage',status:'FAIL',detail:`Missing handlers: ${unmapped.join(', ')}`});
for (const op of operations) {
  const elements = new Map();
  for (const id of ['tool-input','tool-output','tool-status','tool-controls','output-meta','run-tool','clear-tool','copy-tool']) elements.set('#'+id,makeElement(id));
  const root=makeElement('root'); root.dataset={operation:op,'toolName':op};
  const controls=elements.get('#tool-controls');
  const document={querySelector(sel){if(sel==='.workbench')return root;if(elements.has(sel))return elements.get(sel);const id=sel.startsWith('#')?sel.slice(1):sel;for(const wrap of controls.children){for(const child of wrap.children||[]){if(child.id===id)return child;}}return null;},createElement(tag){return makeElement(tag)},};
  const ctx={document,console,crypto:webcrypto,TextEncoder,TextDecoder,URL,URLSearchParams,Intl,Date,Math,Number,String,Array,Object,JSON,RegExp,Error,Promise,Uint8Array,Uint32Array,parseInt,parseFloat,isNaN,encodeURIComponent,decodeURIComponent,atob,btoa,escape,unescape,navigator:{userAgent:'test',language:'en',platform:'test'},innerWidth:1280,innerHeight:720,screen:{width:1280,height:720,colorDepth:24},devicePixelRatio:1,DOMParser:class{parseFromString(s){return {body:{textContent:s.replace(/<[^>]*>/g,'')}}}},Image:class{constructor(){this.width=1;this.height=1;this.naturalWidth=1;this.naturalHeight=1;}set src(v){this._src=v;this.onload?.();}get src(){return this._src;}}};
  ctx.globalThis=ctx;
  elements.get('#tool-input').value=samples[op] ?? '1';
  try {
    vm.runInNewContext(source,ctx,{timeout:1000});
    for (const el of controls.children) { const input=el.children[0]; if(input) input.value=controlDefaults[input.id] ?? input.value; }
    await elements.get('#run-tool').listeners.click();
    const status=elements.get('#tool-status').textContent;
    if(status==='完成') { const expected=expectedContains[op]; const actual=elements.get('#tool-output').value; if(expected && !actual.includes(expected)) failures.push({op,status:'WRONG OUTPUT',detail:`expected to include ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`}); else passed++; } else failures.push({op,status,detail:elements.get('#output-meta').textContent});
  } catch(e) { failures.push({op,status:'HARNESS ERROR',detail:String(e)}); }
}
console.log(`Smoke test: ${passed}/${operations.length} operations returned success.`);
if(failures.length) { console.log(JSON.stringify(failures,null,2)); process.exitCode=1; }
