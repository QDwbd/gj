import { PDFDocument, degrees } from 'pdf-lib';

const root = document.querySelector('#pdf-workbench');
if (root) {
  const op = root.dataset.pdfOperation;
  const status = document.querySelector('#pdf-status');
  const setStatus = message => { status.textContent = message; };
  let sourceFile = null;
  let sourceDocument = null;
  let outputBlob = null;
  const saveBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  };
  const download = document.querySelector('#pdf-download');
  download.disabled = true;
  if (op === 'pdf-page-editor') {
    const fileInput = document.querySelector('#pdf-file');
    fileInput.addEventListener('change', async () => {
      sourceFile = fileInput.files && fileInput.files[0];
      sourceDocument = null; outputBlob = null; download.disabled = true;
      if (!sourceFile) return;
      if (sourceFile.type !== 'application/pdf' && !sourceFile.name.toLowerCase().endsWith('.pdf')) { setStatus('请选择 PDF 文件'); return; }
      if (sourceFile.size > 80 * 1024 * 1024) { setStatus('PDF 文件不能超过 80 MB'); return; }
      try {
        sourceDocument = await PDFDocument.load(await sourceFile.arrayBuffer());
        setStatus('已读取 ' + sourceDocument.getPageCount() + ' 页。页码顺序可留空以保留全部页面。');
      } catch (e) { sourceDocument = null; setStatus('无法读取 PDF：文件可能损坏、受密码保护或格式不受支持。'); }
    });
    document.querySelector('#pdf-process').addEventListener('click', async () => {
      if (!sourceDocument) { setStatus('请先选择可读取的 PDF 文件'); return; }
      try {
        const count = sourceDocument.getPageCount();
        const raw = document.querySelector('#pdf-page-order').value.trim();
        let indices = [];
        if (!raw || raw.toLowerCase() === 'all') indices = Array.from({length:count},(_,i)=>i);
        else {
          for (const part of raw.split(',').map(x=>x.trim()).filter(Boolean)) {
            const range = part.match(/^(\d+)\s*-\s*(\d+)$/);
            if (range) {
              const start=Number(range[1]), end=Number(range[2]);
              if(start<1||end<start||end>count) throw Error('页码范围无效：'+part);
              for(let page=start;page<=end;page++) indices.push(page-1);
            } else if (/^\d+$/.test(part)) {
              const page=Number(part);
              if(page<1||page>count) throw Error('页码超出范围：'+part);
              indices.push(page-1);
            } else throw Error('页码格式错误：请使用 3,1,2-4 这样的格式');
          }
        }
        if(!indices.length) throw Error('处理结果至少需要保留一页');
        if(indices.length>1000) throw Error('单个输出最多 1000 页');
        const out=await PDFDocument.create();
        const pages=await out.copyPages(sourceDocument,indices);
        const rotation=Number(document.querySelector('#pdf-rotation').value);
        pages.forEach(page=>{page.setRotation(degrees(rotation));out.addPage(page);});
        const bytes=await out.save();
        outputBlob=new Blob([bytes],{type:'application/pdf'});
        download.disabled=false;
        setStatus('处理完成：输出 '+pages.length+' 页（'+Math.round(outputBlob.size/1024)+' KB）。');
      } catch(e) { outputBlob=null;download.disabled=true;setStatus('处理失败：'+(e?.message||String(e))); }
    });
    document.querySelector('#pdf-reset').addEventListener('click',()=>{fileInput.value='';sourceFile=null;sourceDocument=null;outputBlob=null;document.querySelector('#pdf-page-order').value='';document.querySelector('#pdf-rotation').value='0';download.disabled=true;setStatus('已重置');});
    download.addEventListener('click',()=>{if(outputBlob)saveBlob(outputBlob,'edited.pdf');});
  }
  if (op === 'pdf-merge') {
    const fileInput = document.querySelector('#pdf-files');
    document.querySelector('#pdf-process').addEventListener('click', async () => {
      const files=Array.from(fileInput.files||[]);
      if(files.length<2) { setStatus('请至少选择 2 个 PDF 文件'); return; }
      if(files.length>20) { setStatus('一次最多合并 20 个 PDF 文件'); return; }
      if(files.some(f=>f.type!=='application/pdf'&&!f.name.toLowerCase().endsWith('.pdf'))) { setStatus('列表中包含非 PDF 文件'); return; }
      const total=files.reduce((sum,f)=>sum+f.size,0);
      if(total>100*1024*1024) { setStatus('所选文件总大小不能超过 100 MB'); return; }
      try {
        const merged=await PDFDocument.create();
        let totalPages=0;
        for(const file of files) {
          const doc=await PDFDocument.load(await file.arrayBuffer());
          const count=doc.getPageCount();
          totalPages+=count;
          if(totalPages>1000) throw Error('合并结果超过 1000 页限制');
          const pages=await merged.copyPages(doc,doc.getPageIndices());
          pages.forEach(page=>merged.addPage(page));
        }
        const bytes=await merged.save();
        outputBlob=new Blob([bytes],{type:'application/pdf'});
        download.disabled=false;
        setStatus('合并完成：'+files.length+' 个文件、'+totalPages+' 页（'+Math.round(outputBlob.size/1024)+' KB）。');
      } catch(e) { outputBlob=null;download.disabled=true;setStatus('合并失败：'+(e?.message||String(e))+'。受密码保护或损坏的文件可能无法处理。'); }
    });
    document.querySelector('#pdf-reset').addEventListener('click',()=>{fileInput.value='';outputBlob=null;download.disabled=true;setStatus('已重置');});
    download.addEventListener('click',()=>{if(outputBlob)saveBlob(outputBlob,'merged.pdf');});
  }
}
