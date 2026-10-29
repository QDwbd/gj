import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import JSZip from 'jszip';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
const root = document.querySelector('#pdf-image-workbench');
if (root) {
  const input = document.querySelector('#pdf-image-file');
  const status = document.querySelector('#pdf-image-status');
  const preview = document.querySelector('#pdf-image-preview');
  const download = document.querySelector('#pdf-image-download');
  let pdfDocument = null;
  let zipBlob = null;
  let objectUrls = [];
  const setStatus = message => { status.textContent = message; };
  const clearPreview = () => {
    objectUrls.forEach(url=>URL.revokeObjectURL(url));
    objectUrls=[];
    preview.replaceChildren();
    zipBlob=null;
    download.disabled=true;
  };
  const parsePages = (raw, total) => {
    if (!raw.trim() || raw.trim().toLowerCase()==='all') return Array.from({length:total},(_,i)=>i+1);
    const result=[];
    for (const part of raw.split(',').map(x=>x.trim()).filter(Boolean)) {
      const range=part.match(/^(\d+)\s*-\s*(\d+)$/);
      if(range) {
        const start=Number(range[1]),end=Number(range[2]);
        if(start<1||end<start||end>total) throw Error('页码范围无效：'+part);
        for(let n=start;n<=end;n++) result.push(n);
      } else if(/^\d+$/.test(part)) {
        const n=Number(part);
        if(n<1||n>total) throw Error('页码超出范围：'+part);
        result.push(n);
      } else throw Error('页码格式错误：请使用 1,3-5 这样的格式');
    }
    return [...new Set(result)];
  };
  input.addEventListener('change', async () => {
    clearPreview(); pdfDocument=null;
    const file=input.files&&input.files[0];
    if(!file) return;
    if(file.type!=='application/pdf'&&!file.name.toLowerCase().endsWith('.pdf')) {setStatus('请选择 PDF 文件');return;}
    if(file.size>80*1024*1024) {setStatus('PDF 文件不能超过 80 MB');return;}
    try {
      pdfDocument=await pdfjsLib.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;
      setStatus('已读取 '+pdfDocument.numPages+' 页。可指定页码范围或留空导出全部页面（最多 50 页/次）。');
    } catch(e) {pdfDocument=null;setStatus('读取 PDF 失败：文件可能损坏、受密码保护或格式不受支持。');}
  });
  document.querySelector('#pdf-image-render').addEventListener('click', async () => {
    if(!pdfDocument) {setStatus('请先选择可读取的 PDF 文件');return;}
    clearPreview();
    try {
      const pages=parsePages(document.querySelector('#pdf-image-pages').value,pdfDocument.numPages);
      if(!pages.length) throw Error('请选择至少一页');
      if(pages.length>50) throw Error('单次最多导出 50 页，请分批处理');
      const scale=Number(document.querySelector('#pdf-image-scale').value);
      if(!Number.isFinite(scale)||scale<0.5||scale>3) throw Error('缩放比例必须在 0.5 到 3 之间');
      const background=document.querySelector('#pdf-image-background').value;
      const zip=new JSZip();
      for(let i=0;i<pages.length;i++) {
        const page=await pdfDocument.getPage(pages[i]);
        const viewport=page.getViewport({scale});
        const pixels=Math.ceil(viewport.width)*Math.ceil(viewport.height);
        if(pixels>16000000) throw Error('第 '+pages[i]+' 页渲染像素超过 1600 万，请降低缩放比例');
        const canvas=document.createElement('canvas');
        canvas.width=Math.max(1,Math.ceil(viewport.width));
        canvas.height=Math.max(1,Math.ceil(viewport.height));
        const ctx=canvas.getContext('2d');
        await page.render({canvasContext:ctx,viewport,background}).promise;
        const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('第 '+pages[i]+' 页 PNG 编码失败')),'image/png'));
        const name='page-'+String(pages[i]).padStart(3,'0')+'.png';
        zip.file(name,blob);
        const url=URL.createObjectURL(blob);objectUrls.push(url);
        const card=document.createElement('figure');
        card.style.cssText='display:inline-flex;flex-direction:column;gap:6px;max-width:220px;margin:8px;padding:8px;border:1px solid #ddd;border-radius:8px;vertical-align:top';
        const img=document.createElement('img');img.src=url;img.alt='PDF 第 '+pages[i]+' 页';img.style.cssText='max-width:200px;max-height:260px;object-fit:contain';
        const caption=document.createElement('figcaption');caption.textContent='第 '+pages[i]+' 页 · '+canvas.width+'×'+canvas.height+' px';
        card.append(img,caption);preview.appendChild(card);
        setStatus('正在渲染：'+(i+1)+' / '+pages.length+' 页');
        canvas.width=canvas.height=1;
      }
      zipBlob=await zip.generateAsync({type:'blob',compression:'DEFLATE'});
      download.disabled=false;
      setStatus('完成：'+pages.length+' 张 PNG，已打包为 ZIP（'+Math.round(zipBlob.size/1024)+' KB）。');
    } catch(e) {zipBlob=null;download.disabled=true;setStatus('转换失败：'+(e?.message||String(e)));}
  });
  download.addEventListener('click',()=>{
    if(!zipBlob)return;
    const url=URL.createObjectURL(zipBlob),a=document.createElement('a');
    a.href=url;a.download='pdf-pages.zip';a.click();setTimeout(()=>URL.revokeObjectURL(url),1200);
  });
  document.querySelector('#pdf-image-reset').addEventListener('click',()=>{
    input.value='';pdfDocument=null;document.querySelector('#pdf-image-pages').value='';document.querySelector('#pdf-image-scale').value='1.5';document.querySelector('#pdf-image-background').value='#ffffff';clearPreview();setStatus('已重置');
  });
}
