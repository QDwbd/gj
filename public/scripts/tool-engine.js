const root = document.querySelector('.workbench');
if (root) {
  const op = root.dataset.operation;
  const input = document.querySelector('#tool-input');
  const output = document.querySelector('#tool-output');
  const status = document.querySelector('#tool-status');
  const controls = document.querySelector('#tool-controls');
  const meta = document.querySelector('#output-meta');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const addInput = (id, label, value='', type='text') => {
    const wrap = document.createElement('label'); wrap.textContent = label;
    const el = document.createElement('input'); el.id=id; el.type=type; el.value=value; wrap.appendChild(el); controls.appendChild(wrap); return el;
  };
  const addTextArea = (id, label, value='') => { const wrap=document.createElement('label'); wrap.textContent=label; const el=document.createElement('textarea'); el.id=id; el.value=value; el.rows=4; wrap.appendChild(el); controls.appendChild(wrap); return el; };
  if (op === 'json-pick-fields') addInput('json-fields','要提取的字段（逗号分隔）','id,name');
  if (op === 'json-merge') addTextArea('json-second','第二份 JSON（合并到第一份）','{}');
  if (op === 'text-diff') addTextArea('diff-second','对比文本（第二份）','');
  if (op === 'text-filter') { addInput('filter-pattern','正则表达式','error|warn'); addInput('filter-flags','正则标志','i'); }
  if (op === 'text-prefix') addInput('line-prefix','添加的前缀','');
  if (op === 'text-suffix') addInput('line-suffix','添加的后缀','');
  if (op === 'text-wrap-quotes') addInput('line-quote','每行使用的引号','"');
  if (op === 'substring-extract') { addInput('substring-start','开始标记','<title>'); addInput('substring-end','结束标记','</title>'); }
  if (['text-replace'].includes(op)) { addInput('find-text','查找内容'); addInput('replace-text','替换为'); }
  if (['regex-test'].includes(op)) { addInput('regex-pattern','正则表达式','\\w+'); addInput('regex-flags','标志','gi'); }
  if (['caesar'].includes(op)) addInput('shift','偏移量','3','number');
  if (op === 'json-to-xml') addInput('xml-root-name','XML 根节点名称','root');
  if (op === 'json-to-typescript') addInput('ts-interface-name','根接口名称','Root');
  if (op === 'uuid-bulk') addInput('uuid-count','生成数量','10','number');
  if (['random-number'].includes(op)) { addInput('min-number','最小值','1','number'); addInput('max-number','最大值','100','number'); }
  if (['round-number'].includes(op)) addInput('decimal-places','小数位数','2','number');
  if (['unit-convert'].includes(op)) addInput('unit-value','数值','1','number');
  if (['temperature'].includes(op)) addInput('temp-value','温度','0','number');
  if (['percentage'].includes(op)) { addInput('part-value','部分数值','25','number'); addInput('whole-value','总数值','100','number'); }
  if (['percent-change'].includes(op)) { addInput('old-value','原数值','100','number'); addInput('new-value','新数值','120','number'); }
  if (['random-number'].includes(op)) {}
  if (['date-diff'].includes(op)) { addInput('date-start','开始日期','2026-01-01','date'); addInput('date-end','结束日期','2026-12-31','date'); }
  if (['days-in-month'].includes(op)) { addInput('year-value','年份','2026','number'); addInput('month-value','月份','10','number'); }
  if (['roman-numeral'].includes(op)) addInput('roman-mode','模式（to-roman / to-number）','to-roman');
  if (['gcd-lcm'].includes(op)) { addInput('gcd-a','整数 A','24','number'); addInput('gcd-b','整数 B','36','number'); }
  if (['factorial','prime-check','leap-year','weekday','date-timestamp','date-iso','date-utc','timestamp-date','number-format','byte-convert','bmi','calorie-estimate','tip-calculator','loan-payment','discount','split-bill','aspect-ratio','css-shadow','css-border-radius','css-grid','design-token','placeholder-svg','html-meta','sitemap-url','robots-txt','my-ip','email-validate','mime-type','http-status','password-strength','lorem','reading-time','name-initials','unix-permissions','cron-explain','json-stringify','json-unstringify','querystring-build','querystring-parse','json-key-sort','list-to-json','json-to-list','csv-to-json','json-to-csv','table-to-markdown','data-uri','svg-to-data-uri','url-parse','querystring-parse','hmac-sha256'].includes(op)) {
    // Tool-specific controls are optional; the text field is used where possible.
  }
  if (op === 'list-chunk') addInput('chunk-size','每组数量','5','number');
  if (['json-to-go','json-to-kotlin','json-to-rust','json-to-cpp'].includes(op)) addInput('model-name','类型名称','Root');
  if (op === 'list-random-pick') addInput('pick-count','抽取数量','1','number');
  if (op === 'list-group-random') addInput('group-count','分组数量','3','number');
  if (op === 'json-to-sql-table') addInput('sql-table-name','表名','items');
  const words = s => s.trim() ? s.trim().split(/\s+/) : [];
  const finite = (value, label='数值') => { const x=Number(value); if(!Number.isFinite(x)) throw Error(`${label}必须是有效数字`); return x; };
  const nums = s => s.split(/[\s,;]+/).filter(Boolean).map(Number);
  const b64encode = s => btoa(unescape(encodeURIComponent(s)));
  const b64decode = s => decodeURIComponent(escape(atob(s.trim())));
  const toHex = s => [...new TextEncoder().encode(s)].map(b=>b.toString(16).padStart(2,'0')).join(' ');
  const fromHex = s => new TextDecoder().decode(new Uint8Array(s.trim().split(/[\s,:-]+/).filter(Boolean).map(x=>parseInt(x,16))));
  const sha = async (s, alg) => [...new Uint8Array(await crypto.subtle.digest(alg,new TextEncoder().encode(s)))].map(b=>b.toString(16).padStart(2,'0')).join('');
  const htmlEscape = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const parseCsv = text => {
    const rows=[];let row=[],cell='',quoted=false;
    for(let i=0;i<text.length;i++){
      const c=text[i];
      if(quoted){if(c==='"'&&text[i+1]==='"'){cell+='"';i++;}else if(c==='"')quoted=false;else cell+=c;}
      else if(c==='"'&&cell==='')quoted=true;
      else if(c===','){row.push(cell);cell='';}
      else if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);rows.push(row);row=[];cell='';}
      else cell+=c;
    }
    if(quoted) throw Error('CSV 中存在未闭合的双引号');
    if(cell!==''||row.length||text.endsWith(',')) {row.push(cell);rows.push(row);}
    return rows.filter(r=>!(r.length===1&&r[0]===''));
  };
  const csvCell = value => {const text=value==null?'':typeof value==='object'?JSON.stringify(value):String(value);return /[\",\r\n]/.test(text)?'"'+text.replace(/"/g,'""')+'"':text;};
  const htmlUnescape = s => { const d=document.createElement('textarea'); d.innerHTML=s; return d.value; };
  const slug = s => s.normalize('NFKC').toLowerCase().trim().replace(/[^\p{L}\p{N}\s-]/gu,'').replace(/[\s_-]+/g,'-').replace(/^-+|-+$/g,'');
  const gcd = (a,b) => b ? gcd(b,a%b) : Math.abs(a);
  const evaluateArithmetic = source => {
    const tokens = source.match(/\d+(?:\.\d+)?|[()+\-*/%]/g) || [];
    if(tokens.join('')!==source.replace(/\s+/g,'')) throw Error('表达式包含不支持的字符');
    let i=0;
    const primary=()=>{const t=tokens[i++];if(t==='('){const v=expr();if(tokens[i++]!==')')throw Error('括号不匹配');return v;}if(t==='+'||t==='-'){const v=primary();return t==='-'?-v:v;}if(t===undefined||!/^\d/.test(t))throw Error('表达式格式错误');return Number(t);};
    const term=()=>{let v=primary();while(['*','/','%'].includes(tokens[i])){const op=tokens[i++],r=primary();if((op==='/'||op==='%')&&r===0)throw Error('不能除以 0');v=op==='*'?v*r:op==='/'?v/r:v%r;}return v;};
    const expr=()=>{let v=term();while(tokens[i]==='+'||tokens[i]==='-'){const op=tokens[i++],r=term();v=op==='+'?v+r:v-r;}return v;};
    if(!tokens.length)throw Error('请输入算术表达式');const result=expr();if(i!==tokens.length)throw Error('表达式格式错误');if(!Number.isFinite(result))throw Error('表达式结果不是有效数字');return result;
  };
  const romanTo = n => { if(!Number.isInteger(n)||n<1||n>3999) throw Error('请输入 1 到 3999 的整数'); let out=''; for(const [v,s] of [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]) while(n>=v){out+=s;n-=v;} return out; };
  const romanFrom = s => {const raw=s.trim().toUpperCase();if(!raw)throw Error('请输入罗马数字');const map={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};let total=0,prev=0;for(const c of raw.split('').reverse()){if(!map[c])throw Error('无效罗马数字');const v=map[c];total+=v<prev?-v:v;prev=Math.max(prev,v)}if(total<1||total>3999||romanTo(total)!==raw)throw Error('罗马数字格式不规范，请使用标准格式（例如 XIV）');return total};
  async function run(s) {
    const v = id => document.querySelector('#'+id)?.value ?? '';
    const n = id => Number(v(id));
    switch(op) {
      case 'csv-clean': return s.replace(/\r\n?/g,'\n').split('\n').map(line=>line.trim()).join('\n');
      case 'text-count': return `字符数（含空格）：${[...s].length}\n字符数（不含空白）：${[...s.replace(/\s/g,'')].length}\n单词数：${words(s).length}\n行数：${s ? s.split(/\r?\n/).length : 0}\n段落数：${s.trim() ? s.trim().split(/\n\s*\n/).length : 0}`;
      case 'line-sort': return s.split(/\r?\n/).sort((a,b)=>a.localeCompare(b)).join('\n');
      case 'line-dedupe': return [...new Set(s.split(/\r?\n/))].join('\n');
      case 'line-reverse': return s.split(/\r?\n/).reverse().join('\n');
      case 'trim-lines': return s.split(/\r?\n/).map(x=>x.trim()).join('\n');
      case 'blank-lines': return s.split(/\r?\n/).filter(x=>x.trim()).join('\n');
      case 'case-upper': return s.toUpperCase();
      case 'case-lower': return s.toLowerCase();
      case 'case-title': return s.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());
      case 'case-sentence': return s.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g,c=>c.toUpperCase());
      case 'text-reverse': return [...s].reverse().join('');
      case 'text-replace': { const f=v('find-text'); if(!f) throw Error('请填写查找内容'); return s.split(f).join(v('replace-text')); }
      case 'text-to-slug': return slug(s);
      case 'comma-to-lines': return s.split(',').map(x=>x.trim()).join('\n');
      case 'lines-to-comma': return s.split(/\r?\n/).map(x=>x.trim()).filter(Boolean).join(', ');
      case 'text-clean': return s.replace(/\r\n?/g,'\n').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'');
      case 'html-escape': return htmlEscape(s);
      case 'xml-escape': return htmlEscape(s);
      case 'html-encode': return htmlEscape(s);
      case 'html-unescape': return htmlUnescape(s);
      case 'html-decode': return htmlUnescape(s);
      case 'regex-escape': return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      case 'text-escape-regex': return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      case 'unique-words': return [...new Set(s.match(/[\p{L}\p{N}_]+/gu)||[])].join('\n');
      case 'text-unique-words': return [...new Set(s.match(/[\p{L}\p{N}_]+/gu)||[])].join('\n');
      case 'json-format': return JSON.stringify(JSON.parse(s),null,2);
      case 'json-minify': return JSON.stringify(JSON.parse(s));
      case 'json-validate': JSON.parse(s); return 'JSON 有效 ✓';
      case 'json-to-yaml': {
        const value=JSON.parse(s);
        const scalar=x=>x===null?'null':typeof x==='string'?(x===''||/^(true|false|null|[-+]?[0-9]+(?:\.[0-9]+)?|[\s:#{}\[\],&*!|>'"%@`])/.test(x)||/[\n\r]/.test(x)?JSON.stringify(x):x):String(x);
        const emit=(x,indent=0)=>{
          const pad=' '.repeat(indent);
          if(Array.isArray(x)) return x.length?x.map(v=>v&&typeof v==='object'?`${pad}-\n${emit(v,indent+2)}`:`${pad}- ${scalar(v)}`).join('\n'):`${pad}[]`;
          if(x&&typeof x==='object') { const entries=Object.entries(x); return entries.length?entries.map(([k,v])=>v&&typeof v==='object'?`${pad}${JSON.stringify(k)}:\n${emit(v,indent+2)}`:`${pad}${JSON.stringify(k)}: ${scalar(v)}`).join('\n'):`${pad}{}`; }
          return `${pad}${scalar(x)}`;
        };
        return emit(value);
      }
      case 'yaml-to-json': {
        // Practical subset: nested mappings, scalar lists, quoted values and inline JSON arrays/objects.
        // Advanced YAML features (anchors, tags, block scalars, merge keys) are explicitly rejected.
        const lines=s.replace(/\r/g,'').split('\n').filter(line=>line.trim()&&!line.trim().startsWith('#')).map(line=>({indent:line.match(/^ */)[0].length,body:line.trim()}));
        if(!lines.length) return '{}';
        if(lines.some(line=>/\s[&*!]|<<:|[|>]\s*$/.test(line.body))) throw Error('当前轻量解析器不支持 YAML 锚点、标签或块字符串；请使用完整 YAML 解析器');
        const parseScalar=raw=>{const x=raw.trim();if(!x)return null;if(x==='null'||x==='~')return null;if(x==='true')return true;if(x==='false')return false;if(/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(x))return Number(x);if((x.startsWith('"')&&x.endsWith('"'))||(x.startsWith("'")&&x.endsWith("'"))){if(x[0]==='"'){try{return JSON.parse(x)}catch{throw Error('YAML 双引号字符串格式错误')}}return x.slice(1,-1).replace(/''/g,"'");}if(/^[\[{]/.test(x)){try{return JSON.parse(x)}catch{throw Error('内联数组/对象请使用 JSON 格式')}}return x;};
        let cursor=0;
        const parseBlock=indent=>{
          const array=lines[cursor]?.body.startsWith('- ');
          const result=array?[]:{};
          while(cursor<lines.length&&lines[cursor].indent===indent){
            const body=lines[cursor].body;
            if(array){
              if(!body.startsWith('- '))throw Error('同一层级不能混用 YAML 列表和映射');
              const raw=body.slice(2).trim();cursor++;
              if(!raw){result.push(cursor<lines.length&&lines[cursor].indent>indent?parseBlock(lines[cursor].indent):null);continue;}
              const pair=raw.match(/^([^:]+):(?:\s*(.*))?$/);
              if(pair){const obj={},key=pair[1].trim().replace(/^['"]|['"]$/g,'');const value=(pair[2]||'').trim();obj[key]=value?parseScalar(value):(cursor<lines.length&&lines[cursor].indent>indent?parseBlock(lines[cursor].indent):null);if(cursor<lines.length&&lines[cursor].indent>indent){const extra=parseBlock(lines[cursor].indent);if(!extra||Array.isArray(extra)||typeof extra!=='object')throw Error('列表对象格式错误');Object.assign(obj,extra);}result.push(obj);}
              else result.push(parseScalar(raw));
            } else {
              if(body.startsWith('- '))throw Error('同一层级不能混用 YAML 列表和映射');
              const idx=body.indexOf(':');if(idx<=0)throw Error(`无法解析 YAML 行：${body}`);
              const key=body.slice(0,idx).trim().replace(/^['"]|['"]$/g,'');const raw=body.slice(idx+1).trim();if(!key)throw Error('YAML 键不能为空');if(Object.prototype.hasOwnProperty.call(result,key))throw Error(`YAML 存在重复键：${key}`);cursor++;
              result[key]=raw?parseScalar(raw):(cursor<lines.length&&lines[cursor].indent>indent?parseBlock(lines[cursor].indent):null);
            }
          }
          if(cursor<lines.length&&lines[cursor].indent<indent)return result;
          if(cursor<lines.length&&lines[cursor].indent>indent)throw Error(`YAML 缩进不正确：${lines[cursor].body}`);
          return result;
        };
        const parsed=parseBlock(lines[0].indent);
        if(cursor<lines.length)throw Error(`无法解析 YAML 行：${lines[cursor].body}`);
        return JSON.stringify(parsed,null,2);
      }
      case 'url-encode': return encodeURIComponent(s);
      case 'url-decode': return decodeURIComponent(s.trim());
      case 'base64-encode': return b64encode(s);
      case 'base64-decode': return b64decode(s);
      case 'regex-test': {const re=new RegExp(v('regex-pattern'),v('regex-flags'));const m=[...s.matchAll(new RegExp(re.source,re.flags.includes('g')?re.flags:re.flags+'g'))];return `匹配数量：${m.length}\n\n`+m.map((x,i)=>`${i+1}. ${x[0]}（位置 ${x.index}）`).join('\n');}
      case 'uuid-gen': return Array.from({length:5},()=>crypto.randomUUID()).join('\n');
      case 'password-gen': return Array.from({length:5},()=>{const chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%*-_';const a=new Uint32Array(20);crypto.getRandomValues(a);return [...a].map(x=>chars[x%chars.length]).join('')}).join('\n');
      case 'hash-sha256': return await sha(s,'SHA-256');
      case 'hash-sha1': return await sha(s,'SHA-1');
      case 'hash-sha512': return await sha(s,'SHA-512');
      case 'hmac-sha256': {if(!v('secret-key'))throw Error('请填写 HMAC 密钥');const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(v('secret-key')),{name:'HMAC',hash:'SHA-256'},false,['sign']);const sig=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(s));return [...new Uint8Array(sig)].map(b=>b.toString(16).padStart(2,'0')).join('');}
      case 'jwt-decode': {const p=s.trim().split('.');if(p.length<2)throw Error('JWT 应包含至少两段');return JSON.stringify({header:JSON.parse(b64decode(p[0].replace(/-/g,'+').replace(/_/g,'/'))),payload:JSON.parse(b64decode(p[1].replace(/-/g,'+').replace(/_/g,'/'))),warning:'仅解码，不验证签名'},null,2);}
      case 'url-parse': {const u=new URL(s.trim());return JSON.stringify({href:u.href,protocol:u.protocol,host:u.host,hostname:u.hostname,port:u.port,pathname:u.pathname,search:u.search,hash:u.hash},null,2);}
      case 'querystring-parse': {let q=s.trim();if(/^https?:\/\//i.test(q)){q=new URL(q).search;}else{q=q.includes('?')?q.slice(q.indexOf('?')+1):q.replace(/^\?/,'');}return JSON.stringify(Object.fromEntries(new URLSearchParams(q)),null,2);}
      case 'querystring-build': {const o=JSON.parse(s);return new URLSearchParams(o).toString();}
      case 'unix-permissions': {const num=parseInt(s.trim(),8);if(Number.isNaN(num))throw Error('请输入八进制权限，例如 755');return `${s.trim()} → `+[4,2,1].map((_,i)=>'').join('')+((num>>6&4)?'r':'-')+((num>>6&2)?'w':'-')+((num>>6&1)?'x':'-')+((num>>3&4)?'r':'-')+((num>>3&2)?'w':'-')+((num>>3&1)?'x':'-')+((num&4)?'r':'-')+((num&2)?'w':'-')+((num&1)?'x':'-');}
      case 'cron-explain': {const p=s.trim().split(/\s+/);if(p.length!==5)throw Error('请输入常见的五段 Cron 表达式');return `分钟：${p[0]}\n小时：${p[1]}\n日期：${p[2]}\n月份：${p[3]}\n星期：${p[4]}\n注意：此为字段拆解，不会解析所有 Cron 扩展语法。`;}
      case 'binary-encode': return [...new TextEncoder().encode(s)].map(b=>b.toString(2).padStart(8,'0')).join(' ');
      case 'binary-decode': return new TextDecoder().decode(new Uint8Array(s.trim().split(/\s+/).map(x=>parseInt(x,2))));
      case 'hex-encode': return toHex(s);
      case 'hex-decode': return fromHex(s);

      case 'unicode-inspect': return [...s].map(c=>`${c}  U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')}  UTF-16: ${Array.from({length:c.length},(_,i)=>c.charCodeAt(i).toString(16).padStart(4,'0')).join(' ')}`).join('\n');
      case 'morse-encode': {const map={a:'.-',b:'-...',c:'-.-.',d:'-..',e:'.',f:'..-.',g:'--.',h:'....',i:'..',j:'.---',k:'-.-',l:'.-..',m:'--',n:'-.',o:'---',p:'.--.',q:'--.-',r:'.-.',s:'...',t:'-',u:'..-',v:'...-',w:'.--',x:'-..-',y:'-.--',z:'--..','0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.'};return s.toLowerCase().split('').map(c=>c===' '?' / ':(map[c]||'?')).join(' ');}
      case 'morse-decode': {const map={'.-':'A','-...':'B','-.-.':'C','-..':'D','.':'E','..-.':'F','--.':'G','....':'H','..':'I','.---':'J','-.-':'K','.-..':'L','--':'M','-.':'N','---':'O','.--.':'P','--.-':'Q','.-.':'R','...':'S','-':'T','..-':'U','...-':'V','.--':'W','-..-':'X','-.--':'Y','--..':'Z','-----':'0','.----':'1','..---':'2','...--':'3','....-':'4','.....':'5','-....':'6','--...':'7','---..':'8','----.':'9'};return s.split(' / ').map(part=>part.split(/\s+/).map(x=>map[x]||'?').join('')).join(' ');}
      case 'rot13': return s.replace(/[a-z]/gi,c=>String.fromCharCode((c<='Z'?90:122)>=(c.charCodeAt(0)+13)?c.charCodeAt(0)+13:c.charCodeAt(0)-13));
      case 'caesar': {const shift=((n('shift')%26)+26)%26;return s.replace(/[a-z]/gi,c=>String.fromCharCode((c===c.toUpperCase()?65:97)+(c.charCodeAt(0)-(c===c.toUpperCase()?65:97)+shift)%26));}
      case 'csv-to-json': {const rows=parseCsv(s);if(rows.length<1)throw Error('请输入包含表头的 CSV 数据');const head=rows.shift().map(x=>x.trim());if(head.some(x=>!x))throw Error('CSV 表头不能为空');return JSON.stringify(rows.map(row=>Object.fromEntries(head.map((h,i)=>[h,row[i]??'']))),null,2);}
      case 'json-to-csv': {const rows=JSON.parse(s);if(!Array.isArray(rows)||!rows.length||rows.some(o=>!o||typeof o!=='object'||Array.isArray(o)))throw Error('请输入非空 JSON 对象数组');const keys=[...new Set(rows.flatMap(o=>Object.keys(o)))];return [keys.map(csvCell).join(','),...rows.map(o=>keys.map(k=>csvCell(o[k])).join(','))].join('\n');}
      case 'markdown-preview-text': return s.replace(/!\[([^\]]*)\]\([^)]+\)/g,'$1').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/^#{1,6}\s+/gm,'').replace(/[*_~`>]/g,'').trim();
      case 'html-to-text': {const d=new DOMParser().parseFromString(s,'text/html');return d.body.textContent||'';}

      case 'timestamp-date': {const x=Number(s.trim());const d=new Date(Math.abs(x)<1e12?x*1000:x);if(isNaN(d))throw Error('时间戳无效');return `本地时间：${d.toString()}\nISO：${d.toISOString()}\nUTC：${d.toUTCString()}`;}
      case 'date-timestamp': {const d=new Date(s.trim());if(isNaN(d))throw Error('日期格式无效');return `Unix 秒：${Math.floor(d.getTime()/1000)}\nUnix 毫秒：${d.getTime()}`;}

      case 'date-diff': {const a=new Date(v('date-start')),b=new Date(v('date-end'));if(Number.isNaN(a.getTime())||Number.isNaN(b.getTime()))throw Error('请选择有效的开始和结束日期');return `相差天数：${Math.round((b-a)/86400000)}\n绝对天数：${Math.abs(Math.round((b-a)/86400000))}`;}

      case 'weekday': {const d=new Date(s.trim());if(isNaN(d))throw Error('请输入有效日期');return ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][d.getDay()];}

      case 'calculator': return String(evaluateArithmetic(s));
      case 'percentage': {const part=finite(v('part-value'),'部分数值'),whole=finite(v('whole-value'),'总数值');if(whole===0)throw Error('总数不能为 0');return `${(part/whole*100).toFixed(4)}%`;}
      case 'percent-change': {const oldValue=finite(v('old-value'),'原数值'),newValue=finite(v('new-value'),'新数值');if(oldValue===0)throw Error('原数值不能为 0');return `${((newValue-oldValue)/oldValue*100).toFixed(4)}%`;}
      case 'average': {const a=nums(s);if(!a.length)throw Error('请输入数字');return String(a.reduce((x,y)=>x+y,0)/a.length);}
      case 'median': {const a=nums(s).sort((x,y)=>x-y);if(!a.length)throw Error('请输入数字');return String(a.length%2?a[(a.length-1)/2]:(a[a.length/2-1]+a[a.length/2])/2);}
      case 'sum': {const a=nums(s);return String(a.reduce((x,y)=>x+y,0));}
      case 'random-number': {const a=finite(v('min-number'),'最小值'),b=finite(v('max-number'),'最大值');if(!Number.isInteger(a)||!Number.isInteger(b))throw Error('最小值和最大值必须是整数');if(a>b)throw Error('最小值不能大于最大值');return String(Math.floor(Math.random()*(b-a+1))+a);}
      case 'number-base': {const x=Number(s.trim());if(!Number.isInteger(x))throw Error('请输入整数');return `二进制：${x.toString(2)}\n八进制：${x.toString(8)}\n十进制：${x}\n十六进制：${x.toString(16).toUpperCase()}`;}
      case 'roman-numeral': return v('roman-mode').trim()==='to-number'?String(romanFrom(s.trim())):romanTo(Number(s.trim()));
      case 'factorial': {const x=Number(s.trim());if(!Number.isInteger(x)||x<0||x>170)throw Error('请输入 0 到 170 的整数');let r=1;for(let i=2;i<=x;i++)r*=i;return String(r);}
      case 'prime-check': {const x=Number(s.trim());if(!Number.isInteger(x))throw Error('请输入整数');let p=x>=2;for(let i=2;i<=Math.sqrt(x)&&p;i++)if(x%i===0)p=false;return `${x} ${p?'是':'不是'}质数`;}
      case 'gcd-lcm': {const a=n('gcd-a'),b=n('gcd-b'),g=gcd(a,b);return `最大公约数：${g}\n最小公倍数：${g?Math.abs(a*b)/g:0}`;}
      case 'round-number': {const value=finite(s.trim()),places=finite(v('decimal-places'),'小数位数');if(!Number.isInteger(places)||places<0||places>100)throw Error('小数位数必须是 0 到 100 的整数');return value.toFixed(places);}
      case 'unit-convert': {const x=finite(v('unit-value'),'长度');return `${x} 米 = ${x/1000} 千米 = ${x*100} 厘米 = ${x*3.28084} 英尺 = ${x*39.3701} 英寸`;}
      case 'temperature': {const x=finite(v('temp-value'),'温度');if(x < -273.15)throw Error('摄氏温度不能低于绝对零度 -273.15°C');return `摄氏度：${x}\n华氏度：${x*9/5+32}\n开尔文：${x+273.15}`;}

      case 'color-hex-rgb': {const h=s.trim().replace('#','');if(!/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(h))throw Error('请输入 #RGB 或 #RRGGBB');const full=h.length===3?[...h].map(c=>c+c).join(''):h;return `RGB(${parseInt(full.slice(0,2),16)}, ${parseInt(full.slice(2,4),16)}, ${parseInt(full.slice(4,6),16)})`;}
      case 'color-rgb-hex': {const m=s.match(/\d+/g)?.map(Number);if(!m||m.length<3||m.slice(0,3).some(x=>x<0||x>255))throw Error('输入 0 到 255 范围内的 RGB 值，例如 rgb(66, 99, 235)');return '#'+m.slice(0,3).map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase();}
      case 'color-rgb-hsl': {const values=s.match(/\d+/g)?.slice(0,3).map(Number);if(!values||values.length<3||values.some(x=>x<0||x>255))throw Error('输入 0 到 255 范围内的 RGB 值，例如 255, 0, 0');const [r,g,b]=values.map(x=>x/255);const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;let h=0,l=(max+min)/2,ss=0;if(d){ss=d/(1-Math.abs(2*l-1));switch(max){case r:h=((g-b)/d)%6;break;case g:h=(b-r)/d+2;break;default:h=(r-g)/d+4;}h*=60;if(h<0)h+=360;}return `hsl(${Math.round(h)}, ${Math.round(ss*100)}%, ${Math.round(l*100)}%)`;}
      case 'color-hsl-rgb': {const m=s.match(/[\d.]+/g)?.map(Number);if(!m||m.length<3||m[0]<0||m[0]>360||m[1]<0||m[1]>100||m[2]<0||m[2]>100)throw Error('请输入有效 HSL 值：色相 0–360，饱和度和亮度 0–100，例如 120, 100, 50');let [h,ss,l]=m;ss/=100;l/=100;const c=(1-Math.abs(2*l-1))*ss,x=c*(1-Math.abs((h/60)%2-1)),z=l-c/2;let rgb=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return 'rgb('+rgb.map(v=>Math.round((v+z)*255)).join(', ')+')';}
      case 'color-contrast': {const cs=s.match(/#?[0-9a-fA-F]{6}\b/g);if(!cs||cs.length<2)throw Error('输入两种 HEX 颜色，例如 #000000 #ffffff');const lum=h=>{const c=h.replace('#','').match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};const a=lum(cs[0]),b=lum(cs[1]);return `对比度：${((Math.max(a,b)+.05)/(Math.min(a,b)+.05)).toFixed(2)}:1`;}
      case 'color-random': return '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0').toUpperCase();
      case 'color-palette': {let h=s.trim().replace('#','');if(!/^[0-9a-f]{6}$/i.test(h))throw Error('输入 6 位 HEX 色值');const n=parseInt(h,16);return [-40,-20,0,20,40].map(d=>{let r=Math.max(0,Math.min(255,((n>>16)&255)+d)),g=Math.max(0,Math.min(255,((n>>8)&255)+d)),b=Math.max(0,Math.min(255,(n&255)+d));return '#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase()}).join('\n');}
      case 'color-invert': {const h=s.trim().replace('#','');if(!/^[0-9a-f]{6}$/i.test(h))throw Error('请输入 6 位 HEX 色值');return '#'+(0xffffff-parseInt(h,16)).toString(16).padStart(6,'0').toUpperCase();}
      case 'color-luminance': {const h=s.trim().replace('#','');if(!/^[0-9a-f]{6}$/i.test(h))throw Error('请输入 6 位 HEX 色值');const c=h.match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return String(.2126*c[0]+.7152*c[1]+.0722*c[2]);}
      case 'password-strength': {let score=0;if(s.length>=12)score++;if(s.length>=16)score++;if(/[a-z]/.test(s)&&/[A-Z]/.test(s))score++;if(/\d/.test(s))score++;if(/[^A-Za-z0-9]/.test(s))score++;return `长度：${s.length}\n强度估算：${['很弱','较弱','一般','较强','强','很强'][score]}\n提示：这是本地启发式估算，不代表密码绝对安全。`;}
      case 'base64-url-encode': return b64encode(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
      case 'url-safe-base64': return b64encode(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');

      case 'aspect-ratio': {const m=s.match(/\d+(?:\.\d+)?/g)?.map(Number);if(!m||m.length<2)throw Error('请输入宽和高，例如 1920 1080');const g=gcd(Math.round(m[0]),Math.round(m[1]));return `宽高比：${m[0]/g}:${m[1]/g}\n小数比例：${(m[0]/m[1]).toFixed(4)}`;}
      case 'http-status': {const map={'200':'OK - 请求成功','201':'Created - 已创建','301':'Moved Permanently - 永久重定向','302':'Found - 临时重定向','400':'Bad Request - 请求错误','401':'Unauthorized - 未授权','403':'Forbidden - 禁止访问','404':'Not Found - 未找到','429':'Too Many Requests - 请求过多','500':'Internal Server Error - 服务器错误','502':'Bad Gateway - 网关错误','503':'Service Unavailable - 服务不可用'};return map[s.trim()]||'未内置此状态码，请查阅 HTTP 状态码文档。';}
      case 'mime-type': {const ext=s.trim().split('.').pop().toLowerCase();return ({json:'application/json',html:'text/html',css:'text/css',js:'text/javascript',ts:'text/typescript',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',svg:'image/svg+xml',pdf:'application/pdf',txt:'text/plain',csv:'text/csv',xml:'application/xml',webp:'image/webp',mp3:'audio/mpeg',mp4:'video/mp4',zip:'application/zip'})[ext]||'未内置该扩展名的 MIME 类型';}
      case 'my-ip': {const response=await fetch('https://api64.ipify.org?format=json',{cache:'no-store'});if(!response.ok)throw Error('IP 查询服务暂时不可用，请稍后重试');const data=await response.json();if(!data.ip)throw Error('未能获取公网 IP 地址');return '当前公网 IP：'+data.ip+'\n\n说明：这是互联网服务看到的公网出口 IP，不是设备在 Wi-Fi/局域网中的内网 IP。';}
      case 'email-validate': return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())?'邮箱格式看起来有效（未验证是否真实可收信）':'邮箱格式无效';
      case 'svg-minify': return s.replace(/>\s+</g,'><').replace(/\s{2,}/g,' ').trim();
      case 'svg-to-data-uri': return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s.trim());
      case 'list-to-json': return JSON.stringify(s.split(/\r?\n/).filter(x=>x.length),null,2);
      case 'json-to-list': {const a=JSON.parse(s);if(!Array.isArray(a))throw Error('输入必须是 JSON 数组');return a.join('\n');}
      case 'number-format': return finite(s.trim()).toLocaleString('en-US');
      case 'byte-convert': {const x=finite(s.trim(),'字节数');if(x<0)throw Error('字节数不能为负数');return `${x} B\n${(x/1024).toFixed(3)} KiB\n${(x/1024**2).toFixed(3)} MiB\n${(x/1024**3).toFixed(3)} GiB`;}
      case 'table-to-markdown': {const rows=parseCsv(s).map(row=>row.map(c=>c.trim()));if(!rows.length)return '';const width=Math.max(...rows.map(r=>r.length));const normalize=r=>Array.from({length:width},(_,i)=>(r[i]??'').replace(/\|/g,'\\|'));return [normalize(rows[0]),Array.from({length:width},()=> '---'),...rows.slice(1).map(normalize)].map(r=>'| '+r.join(' | ')+' |').join('\n');}
      case 'json-key-sort': {const sort=o=>Array.isArray(o)?o.map(sort):o&&typeof o==='object'?Object.fromEntries(Object.keys(o).sort().map(k=>[k,sort(o[k])])):o;return JSON.stringify(sort(JSON.parse(s)),null,2);}
      case 'json-stringify': return JSON.stringify(s);
      case 'json-unstringify': {const x=JSON.parse(s);return typeof x==='string'?x:JSON.stringify(x,null,2);}
      case 'bmi': {const a=nums(s);if(a.length<2||!a.every(Number.isFinite)||a[0]<=0||a[1]<=0)throw Error('输入有效的体重 kg 和身高 cm，例如 70 175');const bmi=a[0]/((a[1]/100)**2);return `BMI：${bmi.toFixed(1)}\n仅供一般健康信息参考，不用于诊断。`;}
      case 'calorie-estimate': {const a=nums(s);if(a.length<3)throw Error('输入体重 kg、身高 cm、年龄，例如 70 175 30');return `基础代谢估算（公式因性别等因素不同，此处仅做粗略示例）：${(10*a[0]+6.25*a[1]-5*a[2]-161).toFixed(0)} kcal/天`;}
      case 'tip-calculator': {const a=nums(s);if(a.length<3||!a.every(Number.isFinite)||a[0]<0||a[1]<0||a[2]<=0)throw Error('输入有效的账单金额、小费百分比、人数，例如 100 15 2');return `小费：${(a[0]*a[1]/100).toFixed(2)}\n总额：${(a[0]*(1+a[1]/100)).toFixed(2)}\n人均：${(a[0]*(1+a[1]/100)/a[2]).toFixed(2)}`;}
      case 'loan-payment': {const a=nums(s);if(a.length<3||!a.every(Number.isFinite)||a[0]<=0||a[1]<0||a[2]<=0)throw Error('输入有效的贷款本金、非负年利率、年限，例如 200000 4.5 30');const [p,rate,years]=a,r=rate/1200,m=years*12;return `月供估算：${(r===0?p/m:p*r/(1-Math.pow(1+r,-m))).toFixed(2)}\n未包含税费、保险及其他费用。`;}
      case 'discount': {const a=nums(s);if(a.length<2)throw Error('输入原价和折扣百分比，例如 80 25');return `折后价：${(a[0]*(1-a[1]/100)).toFixed(2)}\n节省：${(a[0]*a[1]/100).toFixed(2)}`;}
      case 'split-bill': {const a=nums(s);if(a.length<2||!a.every(Number.isFinite)||a[1]<=0)throw Error('输入有效的总金额和正数人数，例如 120 4');return `每人支付：${(a[0]/a[1]).toFixed(2)}`;}
      case 'word-frequency': {const a=(s.toLowerCase().match(/[a-z0-9']+/g)||[]),m={};a.forEach(w=>m[w]=(m[w]||0)+1);return Object.entries(m).sort((a,b)=>b[1]-a[1]).map(([w,c])=>`${w}: ${c}`).join('\n');}
      case 'reading-time': {const cjk=(s.match(/[\u3400-\u9fff\uf900-\ufaff]/g)||[]).length;const english=words(s.replace(/[\u3400-\u9fff\uf900-\ufaff]/g,' ')).length;const minutes=cjk/300+english/200;if(!s.trim())throw Error('请输入需要估算的文章内容');return `约 ${Math.max(0.1,minutes).toFixed(1)} 分钟（中文按每分钟 300 字、其他文本按每分钟 200 词粗略估算）。`;}


      case 'json-to-js-object': { const x=JSON.parse(s); const emit=v=>Array.isArray(v)?'['+v.map(emit).join(', ')+']':v&&typeof v==='object'?'{ '+Object.entries(v).map(([k,z])=>((/^[A-Za-z_$][\w$]*$/.test(k)&&k!=='__proto__')?k:JSON.stringify(k))+': '+emit(z)).join(', ')+' }':JSON.stringify(v); return 'const data = '+emit(x)+';'; }
      case 'json-to-csharp': { const x=JSON.parse(s),o=Array.isArray(x)?x[0]:x;if(!o||typeof o!=='object'||Array.isArray(o))throw Error('请输入 JSON 对象或对象数组');const nm=k=>{let n=k.replace(/[^\p{L}\p{N}_]+/gu,' ').trim().split(/\s+/).map(t=>t[0]?.toUpperCase()+t.slice(1)).join('');return /^[\p{L}_]/u.test(n)?n:'Field'+n};const ty=v=>v===null?'object?':typeof v==='string'?'string':typeof v==='boolean'?'bool':typeof v==='number'?(Number.isInteger(v)?'long':'double'):Array.isArray(v)?'List<object>':'Dictionary<string, object>';return 'using System;\nusing System.Collections.Generic;\n\npublic class Root\n{\n'+Object.entries(o).map(([k,v])=>'    public '+ty(v)+' '+nm(k)+' { get; set; }'+(typeof v==='string'?' = "";':'')).join('\n')+'\n}';}
      case 'json-to-java': { const x=JSON.parse(s),o=Array.isArray(x)?x[0]:x;if(!o||typeof o!=='object'||Array.isArray(o))throw Error('请输入 JSON 对象或对象数组');const nm=k=>k.replace(/[^\p{L}\p{N}_$]+/gu,' ').trim().split(/\s+/).map((t,i)=>i?t[0].toUpperCase()+t.slice(1):t).join('');const ty=v=>v===null?'Object':typeof v==='string'?'String':typeof v==='boolean'?'Boolean':typeof v==='number'?(Number.isInteger(v)?'Long':'Double'):Array.isArray(v)?'List<Object>':'Map<String, Object>';return 'import java.util.*;\n\npublic class Root {\n'+Object.entries(o).map(([k,v])=>'    private '+ty(v)+' '+nm(k)+';').join('\n')+'\n}';}
      case 'json-to-php': { const x=JSON.parse(s),q=v=>"'"+String(v).replace(/\\/g,'\\\\').replace(/'/g,"\\'")+"'",emit=v=>Array.isArray(v)?'['+v.map(emit).join(', ')+']':v&&typeof v==='object'?'['+Object.entries(v).map(([k,z])=>q(k)+' => '+emit(z)).join(', ')+']':typeof v==='string'?q(v):v===null?'null':String(v);return '<?php\n$data = '+emit(x)+';\n';}
      case 'json-pick-fields': {const x=JSON.parse(s),keys=v('json-fields').split(',').map(k=>k.trim()).filter(Boolean);if(!keys.length)throw Error('请输入要提取的字段');const pick=o=>o&&typeof o==='object'&&!Array.isArray(o)?Object.fromEntries(keys.filter(k=>Object.prototype.hasOwnProperty.call(o,k)).map(k=>[k,o[k]])):o;return JSON.stringify(Array.isArray(x)?x.map(pick):pick(x),null,2);}
      case 'json-merge': {const a=JSON.parse(s),b=JSON.parse(v('json-second'));if(!a||Array.isArray(a)||typeof a!=='object'||!b||Array.isArray(b)||typeof b!=='object')throw Error('两份输入都必须是 JSON 对象');const merge=(x,y)=>{const o={...x};for(const [k,z] of Object.entries(y))o[k]=z&&typeof z==='object'&&!Array.isArray(z)&&x[k]&&typeof x[k]==='object'&&!Array.isArray(x[k])?merge(x[k],z):z;return o;};return JSON.stringify(merge(a,b),null,2);}
      case 'json-lines-merge': {const lines=s.split(/\r?\n/).filter(x=>x.trim()),out=[];for(let i=0;i<lines.length;i++){try{out.push(JSON.parse(lines[i]));}catch{throw Error('第 '+(i+1)+' 行不是有效 JSON');}}return JSON.stringify(out,null,2);}
      case 'json-to-array': {const x=JSON.parse(s);if(Array.isArray(x))return JSON.stringify(x,null,2);if(!x||typeof x!=='object')throw Error('请输入 JSON 对象或数组');return JSON.stringify(Object.values(x),null,2);}
      case 'text-filter': {const p=v('filter-pattern');if(!p)throw Error('请输入筛选正则表达式');let re;try{re=new RegExp(p,v('filter-flags').replace(/[^dgimsuvy]/g,''));}catch(e){throw Error('正则表达式无效：'+e.message);}return s.split(/\r?\n/).filter(line=>{re.lastIndex=0;return re.test(line);}).join('\n');}
      case 'text-prefix': return s.split(/\r?\n/).map(line=>v('line-prefix')+line).join('\n');
      case 'text-suffix': return s.split(/\r?\n/).map(line=>line+v('line-suffix')).join('\n');
      case 'text-wrap-quotes': {const q=v('line-quote');if(!q)throw Error('请输入要使用的引号');return s.split(/\r?\n/).map(line=>q+line.replace(/\\/g,'\\\\').split(q).join('\\'+q)+q).join('\n');}
      case 'substring-extract': {const a=v('substring-start'),b=v('substring-end');if(!a||!b)throw Error('请填写开始和结束标记');const i=s.indexOf(a);if(i<0)throw Error('未找到开始标记：'+a);const j=s.indexOf(b,i+a.length);if(j<0)throw Error('未找到结束标记：'+b);return s.slice(i+a.length,j);}
      case 'text-diff': {const a=s.split(/\r?\n/),b=v('diff-second').split(/\r?\n/);if(a.length*b.length>1000000)throw Error('文本过大，请将每份文本控制在约 1000 行以内');const dp=Array.from({length:a.length+1},()=>new Uint32Array(b.length+1));for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)dp[i][j]=a[i]===b[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);const out=[];let i=0,j=0;while(i<a.length&&j<b.length){if(a[i]===b[j]){out.push('  '+a[i]);i++;j++;}else if(dp[i+1][j]>=dp[i][j+1])out.push('- '+a[i++]);else out.push('+ '+b[j++]);}while(i<a.length)out.push('- '+a[i++]);while(j<b.length)out.push('+ '+b[j++]);return out.join('\n');}

      case 'base64url-encode': {
        const bytes = new TextEncoder().encode(s);
        let binary = '';
        for (const byte of bytes) binary += String.fromCharCode(byte);
        return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
      }
      case 'base64url-decode': {
        const raw = s.trim();
        if (!/^[A-Za-z0-9_-]*$/.test(raw) || raw.length % 4 === 1) throw Error('Base64URL 格式无效');
        const normalized = raw.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - raw.length % 4) % 4);
        let binary;
        try { binary = atob(normalized); } catch { throw Error('Base64URL 格式无效'); }
        try { return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(binary, c => c.charCodeAt(0))); }
        catch { throw Error('解码结果不是有效的 UTF-8 文本'); }
      }
      case 'json-flatten': {
        const value = JSON.parse(s), out = {};
        const walk = (node, path) => {
          if (node !== null && typeof node === 'object') {
            const entries = Array.isArray(node) ? node.map((v, i) => [String(i), v]) : Object.entries(node);
            if (!entries.length) out[path || '/'] = node;
            else for (const [key, child] of entries) walk(child, path + '/' + String(key).replace(/~/g, '~0').replace(/\//g, '~1'));
          } else out[path || '/'] = node;
        };
        walk(value, '');
        return JSON.stringify(out, null, 2);
      }
      case 'json-unflatten': {
        const flat = JSON.parse(s);
        if (!flat || typeof flat !== 'object' || Array.isArray(flat)) throw Error('请输入 JSON Pointer 路径到值的对象');
        const rootNode = {};
        const decodeKey = key => key.replace(/~1/g, '/').replace(/~0/g, '~');
        for (const [pointer, value] of Object.entries(flat)) {
          const parts = pointer === '/' || pointer === '' ? [] : pointer.replace(/^\//, '').split('/').map(decodeKey);
          if (!parts.length) { rootNode.value = value; rootNode.hasRoot = true; continue; }
          let node = rootNode;
          for (let i = 0; i < parts.length; i++) {
            const key = parts[i], last = i === parts.length - 1;
            if (last) {
              if (Object.prototype.hasOwnProperty.call(node, key)) throw Error('路径冲突：' + pointer);
              node[key] = value;
            } else {
              if (node[key] == null) node[key] = /^\d+$/.test(parts[i + 1]) ? [] : {};
              if (typeof node[key] !== 'object') throw Error('路径冲突：' + pointer);
              node = node[key];
            }
          }
        }
        const convert = node => {
          if (!node || typeof node !== 'object') return node;
          for (const key of Object.keys(node)) node[key] = convert(node[key]);
          if (Array.isArray(node)) return node;
          const keys = Object.keys(node);
          if (keys.length && keys.every((key, i) => key === String(i))) return keys.map(key => node[key]);
          return node;
        };
        return JSON.stringify(rootNode.hasRoot ? rootNode.value : convert(rootNode), null, 2);
      }
      case 'xml-unescape': {
        const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'" };
        return s.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (match, entity) => {
          if (entity[0] === '#') {
            const hex = entity[1]?.toLowerCase() === 'x';
            const point = parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
            if (!Number.isFinite(point) || point < 0 || point > 0x10ffff || (point >= 0xd800 && point <= 0xdfff)) return match;
            return String.fromCodePoint(point);
          }
          return entities[entity.toLowerCase()] ?? match;
        });
      }
      case 'list-duplicates': {
        const counts = new Map();
        for (const line of s.split(/\r?\n/)) {
          const item = line.trim();
          if (item) counts.set(item, (counts.get(item) || 0) + 1);
        }
        const duplicates = [...counts].filter(([, count]) => count > 1).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
        return duplicates.length ? '重复项目（项目\t出现次数）\n' + duplicates.map(([item, count]) => item + '\t' + count).join('\n') : '未发现重复项目';
      }
      case 'json-to-xml': {
        const value = JSON.parse(s);
        const rootName = (v('xml-root-name') || 'root').trim();
        if (!/^[A-Za-z_][\w.:-]*$/.test(rootName)) throw Error('根节点名称无效');
        const escXml = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
        const tag = key => /^[A-Za-z_][\w.:-]*$/.test(key) ? key : 'item';
        const emit = (node, name) => {
          if (Array.isArray(node)) return node.map(item => emit(item, name === rootName ? 'item' : name)).join('');
          if (node !== null && typeof node === 'object') return '<' + name + '>' + Object.entries(node).map(([key, val]) => emit(val, tag(key))).join('') + '</' + name + '>';
          return '<' + name + '>' + (node === null ? '' : escXml(node)) + '</' + name + '>';
        };
        return '<?xml version="1.0" encoding="UTF-8"?>\n' + emit(value, rootName);
      }
      case 'xml-to-json': {
        const xml = s.trim();
        if (!xml || !/^<\?xml[\s\S]*?\?>\s*<|^<[\w:.-]+(?:\s|>|\/)/i.test(xml)) throw Error('请输入有效的 XML 文档');
        if (/<!(?:DOCTYPE|ENTITY)\b/i.test(xml)) throw Error('为避免外部实体风险，不支持 DOCTYPE/ENTITY 声明');
        const tokens = xml.match(/<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<!\[CDATA\[[\s\S]*?\]\]>|<\/?[^>]+>|[^<]+/g) || [];
        const stack = [];
        let root = null;
        const decode = text => text.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (m, e) => {
          if (e[0] === '#') { const hex = e[1]?.toLowerCase() === 'x'; const n = parseInt(e.slice(hex ? 2 : 1), hex ? 16 : 10); return Number.isFinite(n) && n >= 0 && n <= 0x10ffff && !(n >= 0xd800 && n <= 0xdfff) ? String.fromCodePoint(n) : m; }
          return ({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"})[e.toLowerCase()] ?? m;
        });
        const attach = (parent, name, value) => {
          if (Object.prototype.hasOwnProperty.call(parent, name)) parent[name] = Array.isArray(parent[name]) ? [...parent[name], value] : [parent[name], value];
          else parent[name] = value;
        };
        for (const token of tokens) {
          if (/^<!--|^<\?/.test(token)) continue;
          if (/^<!\[CDATA\[/.test(token)) { if (!stack.length) throw Error('XML 文本节点位置无效'); stack[stack.length - 1].text += token.slice(9, -3); continue; }
          if (/^<!/.test(token)) throw Error('不支持的 XML 声明');
          if (/^<\//.test(token)) {
            const name = token.slice(2, -1).trim();
            const node = stack.pop();
            if (!node || node.name !== name) throw Error('XML 标签不匹配：' + name);
            let value = node.value;
            if (Object.keys(value).length === 0) value = decode(node.text.trim());
            else {
              if (node.text.trim()) value['#text'] = decode(node.text.trim());
              if (Object.keys(node.attrs).length) value['@attributes'] = node.attrs;
            }
            if (stack.length) attach(stack[stack.length - 1].value, node.name, value);
            else { if (root !== null) throw Error('XML 只能有一个根节点'); root = { [node.name]: value }; }
            continue;
          }
          if (/^</.test(token)) {
            const selfClosing = /\/>$/.test(token);
            const match = token.match(/^<([^\s/>]+)([\s\S]*?)\/?>$/);
            if (!match) throw Error('XML 标签格式无效');
            const name = match[1], attrText = match[2];
            const attrs = {};
            const attrRe = /([^\s=]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
            let attr;
            while ((attr = attrRe.exec(attrText))) attrs[attr[1]] = decode(attr[3] ?? attr[4] ?? '');
            const node = { name, attrs, text: '', value: {} };
            if (selfClosing) {
              let value = Object.keys(attrs).length ? {'@attributes': attrs} : '';
              if (stack.length) attach(stack[stack.length - 1].value, name, value);
              else { if (root !== null) throw Error('XML 只能有一个根节点'); root = { [name]: value }; }
            } else stack.push(node);
          } else if (stack.length) stack[stack.length - 1].text += token;
          else if (token.trim()) throw Error('根节点外存在文本');
        }
        if (stack.length || root === null) throw Error('XML 标签未闭合或缺少根节点');
        return JSON.stringify(root, null, 2);
      }
      case 'xml-format': {
        const xml = s.trim();
        if (!xml) throw Error('请输入 XML');
        const tokens = xml.match(/<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<!\[CDATA\[[\s\S]*?\]\]>|<\/?[^>]+>|[^<]+/g) || [];
        let depth = 0, out = '';
        for (const token of tokens) {
          if (!token.trim() && !/^<!\[CDATA\[/.test(token)) continue;
          if (/^<\//.test(token)) depth = Math.max(0, depth - 1);
          const line = '  '.repeat(depth) + token.trim();
          out += (out ? '\n' : '') + line;
          if (/^<[^!?/][^>]*[^/]?>$/.test(token.trim()) && !/^<!/.test(token)) depth++;
        }
        if (!out || (out.match(/</g) || []).length !== (out.match(/>/g) || []).length) throw Error('XML 标签格式可能无效');
        return out;
      }
      case 'xml-minify': {
        const xml = s.trim();
        if (!xml) throw Error('请输入 XML');
        const min = xml.replace(/>\s+</g, '><').replace(/\s+/g, ' ').replace(/\s+(?=\/?>)/g, '');
        if ((min.match(/</g) || []).length !== (min.match(/>/g) || []).length) throw Error('XML 标签格式可能无效');
        return min;
      }
      case 'rot47': return [...s].map(ch => { const n = ch.charCodeAt(0); return n >= 33 && n <= 126 ? String.fromCharCode(33 + ((n - 33 + 47) % 94)) : ch; }).join('');
      case 'url-params-to-json': {
        let url;
        try { url = new URL(s.trim(), 'https://example.invalid'); } catch { throw Error('URL 格式无效'); }
        const out = {};
        for (const [key, value] of url.searchParams) {
          if (Object.prototype.hasOwnProperty.call(out, key)) out[key] = Array.isArray(out[key]) ? [...out[key], value] : [out[key], value];
          else out[key] = value;
        }
        return JSON.stringify(out, null, 2);
      }
      case 'json-to-typescript': {
        const data = JSON.parse(s);
        const rootName = (v('ts-interface-name') || 'Root').trim();
        if (!/^[A-Za-z_$][\w$]*$/.test(rootName)) throw Error('接口名称无效');
        const interfaces = [];
        const nameFor = key => { const n = key.replace(/[^A-Za-z0-9_$]+/g, ' ').trim().split(/\s+/).map((p, i) => i ? p[0].toUpperCase() + p.slice(1) : p).join(''); return /^[A-Za-z_$]/.test(n) ? n : 'Field' + n; };
        const typeOf = (value, name) => {
          if (value === null) return 'null';
          if (Array.isArray(value)) { if (!value.length) return 'unknown[]'; const types = [...new Set(value.map(item => typeOf(item, name + 'Item')))]; return '(' + types.join(' | ') + ')[]'; }
          if (typeof value === 'object') {
            const typeName = nameFor(name);
            const fields = Object.entries(value).map(([key, val]) => '  ' + (/^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key)) + (val === null ? '?' : '') + ': ' + typeOf(val, key) + ';');
            interfaces.push('export interface ' + typeName + ' {\n' + fields.join('\n') + '\n}');
            return typeName;
          }
          return typeof value;
        };
        typeOf(data, rootName);
        return interfaces.reverse().join('\n\n');
      }
      case 'uuid-bulk': {
        const count = Number(v('uuid-count') || 10);
        if (!Number.isInteger(count) || count < 1 || count > 1000) throw Error('数量必须为 1 到 1000 之间的整数');
        const makeUuid = () => crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });
        return Array.from({length: count}, makeUuid).join('\n');
      }
      case 'css-format': {
        const css = s.trim();
        if (!css) throw Error('请输入 CSS');
        let out = '', depth = 0, token = '', quote = '', comment = false;
        const flush = () => { const value = token.trim(); if (value) { out += '  '.repeat(depth) + value.replace(/\s*:\s*/g, ': '); token = ''; } };
        for (let i = 0; i < css.length; i++) {
          const ch = css[i], next = css[i + 1];
          if (comment) { token += ch; if (ch === '*' && next === '/') { token += '/'; i++; comment = false; } continue; }
          if (quote) { token += ch; if (ch === '\\' && next) { token += next; i++; } else if (ch === quote) quote = ''; continue; }
          if (ch === '/' && next === '*') { token += '/*'; i++; comment = true; continue; }
          if (ch === '"' || ch === "'") { quote = ch; token += ch; continue; }
          if (ch === '{') { flush(); out += ' {\n'; depth++; }
          else if (ch === ';') { token = token.trimEnd() + ';'; flush(); out += '\n'; }
          else if (ch === '}') { flush(); depth = Math.max(0, depth - 1); if (out && !out.endsWith('\n')) out += '\n'; out += '  '.repeat(depth) + '}\n'; }
          else token += ch;
        }
        flush();
        return out.trim();
      }
      case 'sql-format': {
        const sql = s.trim();
        if (!sql) throw Error('请输入 SQL');
        const parts = sql.split(/('(?:''|[^'])*'|"(?:\"\"|[^"])*"|--[^\n]*|\/\*[\s\S]*?\*\/)/g);
        const clauses = /\b(SELECT|FROM|WHERE|GROUP\s+BY|ORDER\s+BY|HAVING|LIMIT|OFFSET|UNION(?:\s+ALL)?|INSERT\s+INTO|VALUES|UPDATE|SET|DELETE\s+FROM|LEFT\s+JOIN|RIGHT\s+JOIN|INNER\s+JOIN|FULL\s+JOIN|JOIN|ON|AND|OR)\b/gi;
        const out = parts.map((part, index) => {
          if (index % 2 === 1) return part;
          return part.replace(/\s+/g, ' ').replace(clauses, match => '\n' + match.toUpperCase()).trim();
        }).join(' ').replace(/\s*,\s*/g, ', ').replace(/^\n+/, '').replace(/\n{2,}/g, '\n');
        return out.split('\n').map(line => line.trim()).join('\n');
      }
      case 'ini-to-json': {
        const out = {}, section = () => {
          const name = currentSection;
          if (name && !Object.prototype.hasOwnProperty.call(out, name)) out[name] = {};
          return name ? out[name] : out;
        };
        let currentSection = '';
        for (const [index, raw] of s.split(/\r?\n/).entries()) {
          const line = raw.trim();
          if (!line || line.startsWith(';') || line.startsWith('#')) continue;
          if (line.startsWith('[') && line.endsWith(']')) {
            currentSection = line.slice(1, -1).trim();
            if (!currentSection) throw Error('第 ' + (index + 1) + ' 行分组名称为空');
            if (Object.prototype.hasOwnProperty.call(out, currentSection) && (typeof out[currentSection] !== 'object' || Array.isArray(out[currentSection]))) throw Error('分组名称与键冲突：' + currentSection);
            if (!out[currentSection]) out[currentSection] = {};
            continue;
          }
          const eq = line.indexOf('=');
          if (eq < 1) throw Error('第 ' + (index + 1) + ' 行缺少 key=value');
          const key = line.slice(0, eq).trim(), value = line.slice(eq + 1).trim();
          if (!key) throw Error('第 ' + (index + 1) + ' 行键名为空');
          const target = section();
          if (Object.prototype.hasOwnProperty.call(target, key)) target[key] = Array.isArray(target[key]) ? [...target[key], value] : [target[key], value];
          else target[key] = value;
        }
        return JSON.stringify(out, null, 2);
      }
      case 'json-to-ini': {
        const value = JSON.parse(s);
        if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('请输入 JSON 对象');
        const scalar = v => v === null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
        const root = [], sections = [];
        for (const [key, val] of Object.entries(value)) {
          if (val && typeof val === 'object' && !Array.isArray(val)) {
            const lines = Object.entries(val).map(([k, v]) => k + '=' + scalar(v));
            sections.push('[' + key + ']' + (lines.length ? '\n' + lines.join('\n') : ''));
          } else root.push(key + '=' + scalar(val));
        }
        return [...(root.length ? [root.join('\n')] : []), ...sections].join('\n\n');
      }

      case 'cookie-to-json': {
        const raw = s.trim().replace(/^Cookie:\s*/i, '');
        if (!raw) throw Error('请输入 Cookie 请求头内容');
        const out = {};
        for (const part of raw.split(';')) {
          const idx = part.indexOf('=');
          if (idx < 1) { if (part.trim()) throw Error('Cookie 项格式无效，应为 name=value'); continue; }
          const key = part.slice(0, idx).trim(), value = part.slice(idx + 1).trim();
          if (!key) throw Error('Cookie 名称不能为空');
          let decoded; try { decoded = decodeURIComponent(value); } catch { decoded = value; }
          if (Object.prototype.hasOwnProperty.call(out, key)) out[key] = Array.isArray(out[key]) ? [...out[key], decoded] : [out[key], decoded];
          else out[key] = decoded;
        }
        return JSON.stringify(out, null, 2);
      }
      case 'json-array-dedupe': {
        const data = JSON.parse(s);
        if (!Array.isArray(data)) throw Error('请输入 JSON 数组');
        const seen = new Set();
        const stable = value => Array.isArray(value) ? '[' + value.map(stable).join(',') + ']' : value && typeof value === 'object' ? '{' + Object.keys(value).sort().map(k => JSON.stringify(k) + ':' + stable(value[k])).join(',') + '}' : JSON.stringify(value);
        return JSON.stringify(data.filter(item => { const key = stable(item); if (seen.has(key)) return false; seen.add(key); return true; }), null, 2);
      }
      case 'list-shuffle': {
        const lines = s.split(/\r?\n/).filter(line => line.length > 0);
        for (let i = lines.length - 1; i > 0; i--) {
          const random = new Uint32Array(1); crypto.getRandomValues(random);
          const j = random[0] % (i + 1); [lines[i], lines[j]] = [lines[j], lines[i]];
        }
        return lines.join('\n');
      }
      case 'list-chunk': {
        const size = Number(v('chunk-size') || 5);
        if (!Number.isInteger(size) || size < 1 || size > 10000) throw Error('每组数量必须是 1 到 10000 的整数');
        const lines = s.split(/\r?\n/).filter(line => line.length > 0);
        const groups = [];
        for (let i = 0; i < lines.length; i += size) groups.push(lines.slice(i, i + size).join('\n'));
        return groups.join('\n\n');
      }
      case 'json-to-go': {
        const data = JSON.parse(s), rootName = (v('model-name') || 'Root').trim();
        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(rootName)) throw Error('类型名称必须以字母或下划线开头');
        const exported = key => key.replace(/[^A-Za-z0-9_]/g, ' ').split(/\s+/).filter(Boolean).map(x => x[0].toUpperCase()+x.slice(1)).join('') || 'Field';
        const infer = value => {
          if (value === null) return 'interface{}';
          if (Array.isArray(value)) return value.length ? '[]' + infer(value[0]) : '[]interface{}';
          if (typeof value === 'object') { const fields = Object.entries(value).map(([k,val]) => '\t'+exported(k)+' '+infer(val)+' \x60json:"'+k+'"\x60'); return 'struct {\n'+fields.join('\n')+'\n}'; }
          if (typeof value === 'string') return 'string';
          if (typeof value === 'boolean') return 'bool';
          if (typeof value === 'number') return Number.isInteger(value) ? 'int64' : 'float64';
          return 'interface{}';
        };
        return 'type '+rootName+' '+infer(data);
      }
      case 'json-to-kotlin': {
        const data = JSON.parse(s), rootName = (v('model-name') || 'Root').trim();
        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(rootName)) throw Error('类型名称必须以字母或下划线开头');
        if (!data || typeof data !== 'object' || Array.isArray(data)) throw Error('根节点必须是 JSON 对象');
        const typeOf = value => value === null ? 'Any?' : Array.isArray(value) ? (value.length ? 'List<'+typeOf(value[0])+'>' : 'List<Any>') : typeof value === 'string' ? 'String' : typeof value === 'boolean' ? 'Boolean' : typeof value === 'number' ? (Number.isInteger(value) ? 'Long' : 'Double') : 'Any';
        const fields = Object.entries(data).map(([key,value]) => {
          const prop = /^[A-Za-z_][A-Za-z0-9_]*$/.test(key) ? key : '\x60'+key.replace(/\x60/g,'')+'\x60';
          return '    val '+prop+': '+typeOf(value);
        });
        return 'data class '+rootName+'(\n'+fields.join(',\n')+'\n)';
      }
      case 'json-to-sql-table': {
        const data = JSON.parse(s), table = (v('sql-table-name') || 'items').trim();
        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(table)) throw Error('表名只能包含字母、数字和下划线，且不能以数字开头');
        const rows = Array.isArray(data) ? data : [data];
        if (!rows.length || !rows[0] || typeof rows[0] !== 'object' || Array.isArray(rows[0])) throw Error('请输入 JSON 对象或对象数组');
        const merged = Object.assign({}, ...rows);
        const sqlType = val => val === null ? 'TEXT' : typeof val === 'boolean' ? 'BOOLEAN' : typeof val === 'number' ? (Number.isInteger(val) ? 'BIGINT' : 'DOUBLE PRECISION') : typeof val === 'object' ? 'JSON' : 'TEXT';
        const cols = Object.entries(merged).map(([key,val]) => {
          if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) throw Error('字段名含有 SQL 标识符不支持的字符：'+key);
          return '  "'+key+'" '+sqlType(val);
        });
        return 'CREATE TABLE "'+table+'" (\n'+cols.join(',\n')+'\n);';
      }
      case 'json-to-html-table': {
        const data = JSON.parse(s);
        if (!Array.isArray(data) || !data.length || data.some(row => !row || typeof row !== 'object' || Array.isArray(row))) throw Error('请输入非空 JSON 对象数组');
        const keys = [...new Set(data.flatMap(row => Object.keys(row)))];
        const cell = value => esc(value === null || value === undefined ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value));
        return '<table>\n  <thead>\n    <tr>'+keys.map(k=>'<th>'+cell(k)+'</th>').join('')+'</tr>\n  </thead>\n  <tbody>\n'+data.map(row=>'    <tr>'+keys.map(k=>'<td>'+cell(row[k])+'</td>').join('')+'</tr>').join('\n')+'\n  </tbody>\n</table>';
      }

      case 'unicode-escape': return [...s].map(ch => [...ch].map(unit => '\\u' + unit.charCodeAt(0).toString(16).padStart(4,'0')).join('')).join('');
      case 'unicode-unescape': return s.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex,16)));
      case 'content-type-lookup': {
        const types = {html:'text/html',htm:'text/html',css:'text/css',js:'text/javascript',json:'application/json',xml:'application/xml',txt:'text/plain',csv:'text/csv',md:'text/markdown',yaml:'application/yaml',yml:'application/yaml',pdf:'application/pdf',zip:'application/zip',svg:'image/svg+xml',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',gif:'image/gif',webp:'image/webp',avif:'image/avif',ico:'image/x-icon',mp3:'audio/mpeg',wav:'audio/wav',ogg:'audio/ogg',mp4:'video/mp4',webm:'video/webm',woff:'font/woff',woff2:'font/woff2',ttf:'font/ttf',otf:'font/otf',doc:'application/msword',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',xls:'application/vnd.ms-excel',xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',ppt:'application/vnd.ms-powerpoint',pptx:'application/vnd.openxmlformats-officedocument.presentationml.presentation',wasm:'application/wasm',bin:'application/octet-stream'};
        const q=s.trim().toLowerCase();
        if(!q) throw Error('请输入文件扩展名或 MIME 类型');
        const ext=q.includes('/')?Object.keys(types).find(k=>types[k]===q):q.split(/[?#]/)[0].split('/').pop().replace(/^[.]/,'');
        if(ext&&types[ext]) return '扩展名：.'+ext+'\\nMIME 类型：'+types[ext];
        const found=Object.entries(types).filter(([,v])=>v.includes(q));
        if(found.length) return found.map(([k,v])=>'.'+k+' — '+v).join('\\n');
        throw Error('未找到该类型；请尝试 json、.png 或 application/json');
      }
      case 'tcp-port-lookup': {
        const rows=[[20,'FTP-DATA','文件传输数据通道'],[21,'FTP','文件传输控制'],[22,'SSH','安全远程登录'],[23,'TELNET','明文远程终端'],[25,'SMTP','邮件传输'],[53,'DNS','域名解析'],[80,'HTTP','网页 HTTP'],[110,'POP3','邮件接收'],[123,'NTP','网络时间同步'],[143,'IMAP','邮件访问'],[161,'SNMP','网络管理'],[389,'LDAP','目录服务'],[443,'HTTPS','加密网页通信'],[445,'SMB','文件共享'],[3306,'MySQL','MySQL 数据库'],[3389,'RDP','远程桌面'],[5432,'PostgreSQL','PostgreSQL 数据库'],[6379,'Redis','Redis 数据库'],[8080,'HTTP-alt','常见 HTTP 替代端口'],[8443,'HTTPS-alt','常见 HTTPS 替代端口'],[27017,'MongoDB','MongoDB 数据库']];
        const q=s.trim().toLowerCase(); if(!q) throw Error('请输入端口号或服务名');
        const found=rows.filter(r=>String(r[0])===q||r[1].toLowerCase().includes(q));
        if(!found.length) throw Error('未找到常见端口；此表不是完整的 IANA 端口注册表');
        return found.map(r=>'端口：'+r[0]+'\\n服务：'+r[1]+'\\n说明：'+r[2]).join('\\n\\n');
      }
      case 'http-method-reference': {
        const methods={GET:'获取资源；通常安全且幂等',HEAD:'与 GET 类似，但只返回响应头',POST:'提交数据或触发资源处理；通常不保证幂等',PUT:'创建或完整替换资源；语义上幂等',PATCH:'对资源执行部分修改',DELETE:'删除资源；语义上幂等',OPTIONS:'查询支持的通信选项，常用于 CORS 预检',TRACE:'诊断请求链路；服务器通常禁用',CONNECT:'建立到目标服务器的隧道，常用于代理'};
        const q=s.trim().toUpperCase(); if(!q) return Object.entries(methods).map(([k,v])=>k+'\\n'+v).join('\\n\\n');
        if(!methods[q]) throw Error('未知 HTTP 方法；可查询 GET、POST、PUT、PATCH、DELETE 等');
        return q+'\\n'+methods[q];
      }

      case 'list-random-pick': {
        const lines=s.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
        if(!lines.length) throw Error('请输入名单，每行一个项目');
        const count=Number(v('pick-count')||1);
        if(!Number.isInteger(count)||count<1||count>lines.length) throw Error('抽取数量必须在 1 到名单行数之间');
        for(let i=lines.length-1;i>0;i--){const r=new Uint32Array(1);crypto.getRandomValues(r);const j=r[0]%(i+1);[lines[i],lines[j]]=[lines[j],lines[i]];}
        return lines.slice(0,count).join('\n');
      }
      case 'list-group-random': {
        const lines=s.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
        if(!lines.length) throw Error('请输入名单，每行一个项目');
        const count=Number(v('group-count')||3);
        if(!Number.isInteger(count)||count<1||count>lines.length) throw Error('分组数量必须在 1 到名单行数之间');
        for(let i=lines.length-1;i>0;i--){const r=new Uint32Array(1);crypto.getRandomValues(r);const j=r[0]%(i+1);[lines[i],lines[j]]=[lines[j],lines[i]];}
        const groups=Array.from({length:count},()=>[]);
        lines.forEach((line,i)=>groups[i%count].push(line));
        return groups.map((g,i)=>'第 '+(i+1)+' 组（'+g.length+' 项）\n'+g.join('\n')).join('\n\n');
      }
      case 'json-to-rust': {
        const data=JSON.parse(s), name=(v('model-name')||'Root').trim();
        if(!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw Error('类型名称必须以字母或下划线开头');
        if(!data||typeof data!=='object'||Array.isArray(data)) throw Error('根节点必须是 JSON 对象');
        const snake=k=>k.replace(/([a-z0-9])([A-Z])/g,'$1_$2').replace(/[^A-Za-z0-9_]+/g,'_').toLowerCase().replace(/^([0-9])/,'_$1');
        const typeOf=x=>x===null?'serde_json::Value':Array.isArray(x)?(x.length?'Vec<'+typeOf(x[0])+'>':'Vec<serde_json::Value>'):typeof x==='string'?'String':typeof x==='boolean'?'bool':typeof x==='number'?(Number.isInteger(x)?'i64':'f64'):'serde_json::Value';
        const fields=Object.entries(data).map(([k,val])=>{const field=snake(k);return (field!==k?'    #[serde(rename = "'+k+'")]\n':'')+'    pub '+field+': '+typeOf(val)+',';});
        return '#[derive(Debug, serde::Serialize, serde::Deserialize)]\npub struct '+name+' {\n'+fields.join('\n')+'\n}';
      }
      case 'json-to-cpp': {
        const data=JSON.parse(s), name=(v('model-name')||'Root').trim();
        if(!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw Error('类型名称必须以字母或下划线开头');
        if(!data||typeof data!=='object'||Array.isArray(data)) throw Error('根节点必须是 JSON 对象');
        const typeOf=x=>x===null?'nlohmann::json':Array.isArray(x)?(x.length?'std::vector<'+typeOf(x[0])+'>' : 'std::vector<nlohmann::json>'):typeof x==='string'?'std::string':typeof x==='boolean'?'bool':typeof x==='number'?(Number.isInteger(x)?'std::int64_t':'double'):'nlohmann::json';
        const fields=Object.entries(data).map(([k,val])=>{if(!/^[A-Za-z_][A-Za-z0-9_]*$/.test(k)) throw Error('字段名不符合 C++ 标识符规范：'+k);return '    '+typeOf(val)+' '+k+'{};';});
        return '#include <cstdint>\n#include <string>\n#include <vector>\n#include <nlohmann/json.hpp>\n\nstruct '+name+' {\n'+fields.join('\n')+'\n};';
      }
      default: throw Error(`此工具尚未实现：${op}。请反馈此页面，避免输出看似成功的错误结果。`);
    }
  }
  const examples = {
    "json-to-js-object":"{\"name\":\"Alice\",\"age\":30}",
    "json-to-csharp":"{\"name\":\"Alice\",\"age\":30}",
    "json-to-java":"{\"name\":\"Alice\",\"age\":30}",
    "json-to-php":"{\"name\":\"Alice\",\"age\":30}",
    "json-pick-fields":"[{\"id\":1,\"name\":\"Alice\",\"secret\":\"x\"}]",
    "json-merge":"{\"a\":1,\"nested\":{\"x\":1}}",
    "json-lines-merge":"{\"id\":1}\n{\"id\":2}",
    "json-to-array":"{\"a\":1,\"b\":2}",
    "text-filter":"INFO startup\nERROR request failed\nWARN slow response",
    "text-prefix":"apple\nbanana",
    "text-suffix":"apple\nbanana",
    "text-wrap-quotes":"apple\nbanana",
    "substring-extract":"<title>Example Page</title>",
    "text-diff":"apple\nbanana\norange",
    'text-count':'粘贴要统计的文本…','csv-clean':'每行 CSV 内容…','slugify':'输入标题，例如 My New Tool','qr-text':'输入准备编码进二维码的文本…','image-dimensions':'粘贴 data:image/... 开头的图片 Data URL','html-color-name':'#4263eb 或 rgb(66, 99, 235)','punycode-info':'example.com 或 https://例子.测试','url-safe-base64':'输入要进行 URL-safe Base64 编码的文本','text-to-binary':'输入文本以查看 UTF-8 字节数、十六进制和二进制','markdown-table':'Name,Age\nAlice,30','markdown-preview-text':'粘贴 Markdown 文本…','text-escape-html':'<p>需要转义的文本</p>','text-unescape-html':'&lt;p&gt;已转义的文本&lt;/p&gt;','text-escape-regex':'a+b?','text-unique-words':'输入要提取唯一单词的文本…','xml-escape':'<root>文本</root>','html-encode':'需要编码的 HTML 文本','html-decode':'&lt;div&gt;文本&lt;/div&gt;','css-gradient':'#4263eb #a5b4fc','json-format':'{\n  \"name\": \"Alice\",\n  \"count\": 3\n}', 'json-minify':'{\"name\":\"Alice\",\"count\":3}',
    'json-validate':'{\"ok\":true}', 'json-to-yaml':'{\"site\":\"demo\",\"enabled\":true}', 'yaml-to-json':'site: demo\nenabled: true',
    'url-parse':'https://example.com/path?a=1#top','querystring-parse':'?q=hello&page=2','querystring-build':'{\"q\":\"hello world\",\"page\":2}',
    'timestamp-date':'1700000000','date-timestamp':'2026-10-29T12:00:00Z','date-iso':'2026-10-29','date-utc':'2026-10-29',
    'weekday':'2026-10-29','date-diff':'日期请在上方选择','days-in-month':'年份和月份请在上方填写','calculator':'(12 + 8) * 3',
    'sum':'12, 8, 3','average':'12, 8, 3','median':'12, 8, 3, 4','prime-check':'97','factorial':'5','number-base':'255',
    'color-hex-rgb':'#4263eb','color-rgb-hex':'rgb(66, 99, 235)','color-rgb-hsl':'255, 0, 0','color-hsl-rgb':'120, 100, 50',
    'color-contrast':'#000000 #ffffff','color-palette':'#4263eb','color-invert':'#4263eb','color-luminance':'#4263eb',
    'bmi':'70 175','calorie-estimate':'70 175 30','tip-calculator':'100 15 2','loan-payment':'200000 4.5 30','discount':'80 25','split-bill':'120 4',
    'csv-to-json':'name,age\nAlice,30\nBob,28','json-to-csv':'[{\"name\":\"Alice\",\"age\":30}]','json-key-sort':'{\"z\":1,\"a\":2}',
    'morse-encode':'SOS 123','morse-decode':'... --- ...','binary-encode':'Hello','binary-decode':'01001000 01101001','hex-encode':'Hello','hex-decode':'48 69',
    'email-validate':'hello@example.com','my-ip':'点击“查询本机 IP”获取公网 IP','mime-type':'document.pdf','http-status':'404','unix-permissions':'755','cron-explain':'0 9 * * 1',
    'html-meta':'Page title\nPage description\nhttps://example.com/page','sitemap-url':'https://example.com/page','robots-txt':'https://example.com/sitemap-index.xml',
    'table-to-markdown':'Name,Age\nAlice,30\nBob,28','list-to-json':'apple\nbanana\norange','json-to-list':'[\"apple\",\"banana\"]',
    'reading-time':'Paste text to estimate reading time','word-frequency':'this is a test this is only a test','name-initials':'Ada Lovelace',
    'round-number':'3.14159','byte-convert':'1024','number-format':'1234567.89','unit-convert':'1','temperature':'0','random-number':'generate',
    'gradient-css':'#4263eb #a5b4fc','svg-to-data-uri':'<svg xmlns=\"http://www.w3.org/2000/svg\"></svg>','placeholder-svg':'generate'
  };
  if (examples[op]) input.placeholder = examples[op];
  if (op === 'my-ip') {
    const inputLabel = document.querySelector('label[for="tool-input"]');
    if (inputLabel) inputLabel.style.display = 'none';
    input.style.display = 'none';
    const runButton = document.querySelector('#run-tool');
    if (runButton) runButton.textContent = '查询本机 IP';
    const privacy = root.querySelector('.privacy-label');
    if (privacy) privacy.textContent = '通过公网 IP 查询服务获取';
    meta.textContent = '查询结果仅显示给你；请求会发送至 IP 查询服务';
  }
  if (['date-diff','days-in-month','percentage','percent-change','random-number','round-number','unit-convert','temperature','gcd-lcm'].includes(op)) {
    const label=input.closest?.('label');
    input.setAttribute?.('aria-label','按上方字段填写参数；本输入框可留空');
  }
  // A few controls used by advanced tools
  if (['hmac-sha256'].includes(op)) addInput('secret-key','HMAC 密钥');
  document.querySelector('#run-tool')?.addEventListener('click', async () => {
    status.textContent='处理中…';
    try { const result=await run(input.value); output.value=String(result); status.textContent='完成'; meta.textContent=`${output.value.length} 个字符`; }
    catch(e) { output.value=''; status.textContent='处理失败'; meta.textContent=e?.message||'请检查输入格式'; }
  });
  document.querySelector('#clear-tool')?.addEventListener('click',()=>{input.value='';output.value='';status.textContent='';meta.textContent='结果仅在本页显示';});
  document.querySelector('#copy-tool')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(output.value);status.textContent='已复制';}catch{output.select();status.textContent='请手动复制';}});
  if (['color-random','uuid-gen','password-gen'].includes(op)) input.value = op==='color-random'?'#4263eb':'generate';
}
