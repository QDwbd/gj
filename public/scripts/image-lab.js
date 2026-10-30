const root = document.querySelector('#image-lab-workbench');
if (root) {
  const slug = root.dataset.imageSlug;
  const filesInput = root.querySelector('#lab-files');
  const canvas = root.querySelector('#lab-canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const status = root.querySelector('#lab-status');
  const preview = root.querySelector('#lab-preview');
  const download = root.querySelector('#lab-download');
  let outputs = [];
  let source = null;
  const val = id => root.querySelector('#' + id).value;
  const num = id => Math.max(0, Number(val(id)) || 0);
  const say = s => status.textContent = s;
  const load = file => new Promise((resolve,reject) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('无法读取图片：' + file.name)); };
    img.src = url;
  });
  const blobOf = (c, type='image/png', quality=.92) => new Promise(resolve => c.toBlob(resolve,type,quality));
  const mime = () => val('lab-format');
  const ext = t => ({'image/jpeg':'jpg','image/webp':'webp','image/png':'png'}[t] || 'png');
  const downloadBlob = (blob,name) => { const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1500); };
  const drawRounded = (c, radius) => {
    const x=c.getContext('2d'), w=c.width,h=c.height,r=Math.min(radius,w/2,h/2);
    const tmp=document.createElement('canvas');tmp.width=w;tmp.height=h;tmp.getContext('2d').drawImage(c,0,0);
    x.clearRect(0,0,w,h);x.save();x.beginPath();x.moveTo(r,0);x.arcTo(w,0,w,r,r);x.arcTo(w,h,w-r,h,r);x.arcTo(0,h,0,h-r,r);x.arcTo(0,0,r,0,r);x.closePath();x.clip();x.drawImage(tmp,0,0);x.restore();
  };
  async function process(file) {
    const img=await load(file), max=16000000;
    let w=img.naturalWidth,h=img.naturalHeight;
    if(w*h>max){const k=Math.sqrt(max/(w*h));w=Math.floor(w*k);h=Math.floor(h*k);}
    const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{willReadFrequently:true});
    x.drawImage(img,0,0,w,h);
    let image=x.getImageData(0,0,w,h), d=image.data;
    const color=val('lab-color'), threshold=num('lab-threshold'), amount=num('lab-amount');
    const rgb=hex=>[parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)];
    if(slug.includes('grayscale')||slug.includes('black-white')) {
      const mode=val('lab-mode'), weights=mode==='601'?[.299,.587,.114]:mode==='average'?[1/3,1/3,1/3]:[.2126,.7152,.0722];
      for(let i=0;i<d.length;i+=4){const g=d[i]*weights[0]+d[i+1]*weights[1]+d[i+2]*weights[2];const v=amount>0?Math.round(g/(256/Math.max(2,amount))* (256/Math.max(2,amount))):g;d[i]=d[i+1]=d[i+2]=v;}
    } else if(slug.includes('invert')||slug.includes('negative')) {
      for(let i=0;i<d.length;i+=4){d[i]=255-d[i];d[i+1]=255-d[i+1];d[i+2]=255-d[i+2];}
    } else if(slug.includes('remove-background')||slug.includes('cutout')) {
      const target=rgb(color);for(let i=0;i<d.length;i+=4){const dist=Math.hypot(d[i]-target[0],d[i+1]-target[1],d[i+2]-target[2]);if(dist<=threshold*1.75)d[i+3]=0;}
    } else if(slug.includes('replace-color')) {
      const target=rgb(val('lab-color')), replacement=rgb(val('lab-color2'));for(let i=0;i<d.length;i+=4){if(Math.hypot(d[i]-target[0],d[i+1]-target[1],d[i+2]-target[2])<=threshold*1.75){d[i]=replacement[0];d[i+1]=replacement[1];d[i+2]=replacement[2];}}
    } else if(slug.includes('sharpen')||slug.includes('emboss')||slug.includes('engrave')) {
      const src=new Uint8ClampedArray(d), kernel=slug.includes('sharpen')?[0,-1,0,-1,5,-1,0,-1,0]:[-2,-1,0,-1,1,1,0,1,2];
      for(let y=1;y<h-1;y++)for(let xx=1;xx<w-1;xx++)for(let ch=0;ch<3;ch++){let sum=0,k=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)sum+=src[((y+dy)*w+xx+dx)*4+ch]*kernel[k++];const i=(y*w+xx)*4+ch;d[i]=Math.max(0,Math.min(255,128+(sum-128)*Math.max(.1,amount/100))); }
    } else if(slug.includes('blur')) {
      const small=document.createElement('canvas');small.width=Math.max(1,Math.round(w/Math.max(2,amount/5)));small.height=Math.max(1,Math.round(h/Math.max(2,amount/5)));small.getContext('2d').drawImage(c,0,0,small.width,small.height);x.clearRect(0,0,w,h);x.imageSmoothingEnabled=true;x.drawImage(small,0,0,w,h);image=x.getImageData(0,0,w,h);d=image.data;
    } else if(slug.includes('pixel')) {
      const small=document.createElement('canvas');small.width=Math.max(1,Math.round(w/Math.max(2,amount/2)));small.height=Math.max(1,Math.round(h/Math.max(2,amount/2)));small.getContext('2d').drawImage(c,0,0,small.width,small.height);x.clearRect(0,0,w,h);x.imageSmoothingEnabled=false;x.drawImage(small,0,0,w,h);image=x.getImageData(0,0,w,h);d=image.data;
    } else if(slug.includes('brightness')) {
      const factor=amount/100;for(let i=0;i<d.length;i+=4){d[i]*=factor;d[i+1]*=factor;d[i+2]*=factor;}
    } else if(slug.includes('round')) {
      x.putImageData(image,0,0);drawRounded(c,num('lab-radius'));
    } else if(slug.includes('watermark')) {
      x.putImageData(image,0,0);const text=val('lab-text')||'©';x.save();x.globalAlpha=.22;x.fillStyle=val('lab-color');x.font='bold '+Math.max(12,amount)+'px sans-serif';x.rotate(-Math.PI/6);for(let yy=-h;yy<h*2;yy+=Math.max(80,amount*4))for(let xx=-w;xx<w*2;xx+=Math.max(140,amount*8))x.fillText(text,xx,yy);x.restore();
    } else if(slug.includes('tile')||slug.includes('duplicate')||slug.includes('copy')) {
      const count=Math.max(1,Math.min(10,Math.floor(num('lab-count')||2))), vertical=val('lab-mode')==='vertical';const out=document.createElement('canvas');out.width=vertical?w:Math.round(w*count);out.height=vertical?Math.round(h*count):h;const ox=out.getContext('2d');for(let i=0;i<count;i++)ox.drawImage(c,vertical?0:i*w,vertical?i*h:0);return {canvas:out,name:file.name};
    } else if(slug.includes('resize')||slug.includes('icon')) {
      const nw=Math.max(1,Math.min(8192,Math.floor(num('lab-width')||w))),nh=Math.max(1,Math.min(8192,Math.floor(num('lab-height')||h)));
      const out=document.createElement('canvas');out.width=nw;out.height=nh;out.getContext('2d').drawImage(c,0,0,nw,nh);return {canvas:out,name:file.name};
    } else if(slug.includes('color')||slug.includes('tint')) {
      const target=rgb(color);for(let i=0;i<d.length;i+=4){d[i]=Math.round(d[i]*target[0]/255);d[i+1]=Math.round(d[i+1]*target[1]/255);d[i+2]=Math.round(d[i+2]*target[2]/255);}
    } else if(slug.includes('alpha')||slug.includes('transparent')) {
      for(let i=0;i<d.length;i+=4){if(d[i+3]<128)d[i+3]=255;else d[i+3]=0;}
    } else if(slug.includes('mirror')) {
      const out=document.createElement('canvas');out.width=w*2;out.height=h;const ox=out.getContext('2d');ox.drawImage(c,0,0);ox.save();ox.translate(w*2,0);ox.scale(-1,1);ox.drawImage(c,0,0);ox.restore();return {canvas:out,name:file.name};
    }
    x.putImageData(image,0,0);
    return {canvas:c,name:file.name};
  }
  root.querySelector('#lab-process').addEventListener('click',async()=>{
    const files=[...(filesInput.files||[])];if(!files.length){say('请先选择图片文件');return;}
    if(files.length>100){say('一次最多处理 100 张图片');return;}
    outputs=[];preview.innerHTML='';download.disabled=true;say('正在处理 '+files.length+' 张图片…');
    for(const file of files){try{const result=await process(file);outputs.push({canvas:result.canvas,name:result.name});const img=document.createElement('img');img.src=result.canvas.toDataURL('image/png');img.alt=file.name;img.style.cssText='max-width:180px;max-height:160px;object-fit:contain;border:1px solid #ddd;border-radius:8px;margin:6px';preview.appendChild(img);}catch(e){say(String(e.message||e));}}
    if(outputs.length){canvas.width=outputs[0].canvas.width;canvas.height=outputs[0].canvas.height;ctx.drawImage(outputs[0].canvas,0,0);canvas.hidden=false;download.disabled=false;say('完成：成功处理 '+outputs.length+' 张图片。可逐张下载或下载全部。');}
  });
  root.querySelector('#lab-download').addEventListener('click',async()=>{
    if(!outputs.length)return;const type=mime();
    for(let i=0;i<outputs.length;i++){const blob=await blobOf(outputs[i].canvas,type,.92);if(blob)downloadBlob(blob,outputs[i].name.replace(/\.[^.]+$/,'')+'.'+ext(type));}
    say('已开始下载 '+outputs.length+' 个处理结果。');
  });
  root.querySelector('#lab-reset').addEventListener('click',()=>{filesInput.value='';preview.innerHTML='';canvas.hidden=true;outputs=[];download.disabled=true;say('已重置。请选择图片开始。');});
  filesInput.addEventListener('change',()=>say('已选择 '+filesInput.files.length+' 张图片。支持批量处理。'));
}
