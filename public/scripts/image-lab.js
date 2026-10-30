const root = document.querySelector('#image-lab-workbench');
if (root) {
  const slug = root.dataset.imageSlug;
  const filesInput = root.querySelector('#lab-files');
  const status = root.querySelector('#lab-status');
  const preview = root.querySelector('#lab-preview');
  const download = root.querySelector('#lab-download');
  let outputs = [];
  const fileList = root.querySelector('#lab-file-list');
  const countLabel = root.querySelector('#lab-preview-count');
  const dropzone = root.querySelector('#lab-dropzone');
  let selectedFiles = [];
  const settings = {
    amount: ['grayscale','sharpen','emboss','engrave','blur','pixelate','brightness','watermark','noise','sepia','contrast','saturation','vignette','scale-up','scale-down','quality'].some(k=>slug.includes(k)),
    threshold: slug.includes('remove-background') || slug.includes('replace-color'),
    feather: slug.includes('remove-background') || slug.includes('cutout'),
    color: ['remove-background','replace-color','tint','watermark','border','background','rectangle-fit'].some(k=>slug.includes(k)),
    color2: slug.includes('replace-color'),
    angle: slug.includes('rotate'),
    radius: slug.includes('round') || slug.includes('border'),
    text: slug.includes('watermark'),
    count: slug.includes('copy') || slug.includes('duplicate'),
    dimensions: ['resize','icon','background','rectangle-fit','crop'].some(k=>slug.includes(k)),
    'crop-region': slug.includes('crop'),
    'ratio-lock': ['resize','icon','crop'].some(k=>slug.includes(k)),
    'fit-mode': ['resize','icon','rectangle-fit','background'].some(k=>slug.includes(k)),
    'source-info': ['resize','icon','crop','rectangle-fit','background'].some(k=>slug.includes(k)),
    mode: slug.includes('grayscale') || slug.includes('copy'),
    format: slug.includes('format') || slug.includes('convert') || slug.includes('quality')
  };
  root.querySelectorAll('[data-setting]').forEach(el => { el.hidden = !settings[el.dataset.setting]; });
  const amountLabel = root.querySelector('#lab-amount-label');
  if (slug.includes('brightness')) amountLabel.textContent='亮度';
  else if (slug.includes('contrast')) amountLabel.textContent='对比度';
  else if (slug.includes('saturation')) amountLabel.textContent='饱和度';
  else if (slug.includes('quality')) amountLabel.textContent='导出质量';
  else if (slug.includes('scale-')) amountLabel.textContent='缩放百分比';
  else if (slug.includes('vignette')) amountLabel.textContent='暗角强度';
  else if (slug.includes('watermark')) amountLabel.textContent='水印字号';
  else if (slug.includes('grayscale')) amountLabel.textContent='灰度级数';
  else amountLabel.textContent='处理强度';
  const amountInput=root.querySelector('#lab-amount'), amountValue=root.querySelector('#lab-amount-value');
  const thresholdInput=root.querySelector('#lab-threshold'), featherInput=root.querySelector('#lab-feather');
  if(thresholdInput)thresholdInput.addEventListener('input',()=>root.querySelector('#lab-threshold-value').textContent=thresholdInput.value);
  if(featherInput)featherInput.addEventListener('input',()=>root.querySelector('#lab-feather-value').textContent=featherInput.value);
  const syncAmount=()=>amountValue.textContent=amountInput.value+(slug.includes('quality')||slug.includes('brightness')||slug.includes('contrast')||slug.includes('saturation')||slug.includes('scale-')||slug.includes('vignette')?'%':'');
  amountInput.min='0';
  if(slug.includes('scale-down')) { amountInput.value='50'; amountInput.min='1'; amountInput.max='100'; }
  else if(slug.includes('scale-up')) { amountInput.value='150'; amountInput.min='100'; amountInput.max='800'; }
  else if(slug.includes('noise')) { amountInput.value='18'; amountInput.max='100'; }
  else if(slug.includes('sepia')) { amountInput.value='100'; amountInput.max='100'; }
  else if(slug.includes('vignette')) { amountInput.value='35'; amountInput.max='100'; }
  else if(slug.includes('blur')) { amountInput.value='8'; amountInput.max='40'; }
  else if(slug.includes('pixel')) { amountInput.value='12'; amountInput.max='80'; }
  else if(slug.includes('sharpen')) { amountInput.value='65'; amountInput.max='200'; }
  else if(slug.includes('brightness')||slug.includes('contrast')||slug.includes('saturation')) { amountInput.value='100'; amountInput.max='200'; }
  else if(slug.includes('quality')) { amountInput.value='82'; amountInput.max='100'; }
  amountInput.addEventListener('input',syncAmount); syncAmount();
  const formatSelect=root.querySelector('#lab-format');
  if(slug.includes('quality')&&formatSelect)formatSelect.value='image/jpeg';
  if(slug.includes('resize')||slug.includes('icon')||slug.includes('background')||slug.includes('rectangle-fit')||slug.includes('crop')) {
    root.querySelector('#lab-width').value=1200; root.querySelector('#lab-height').value=800;
    root.querySelector('#lab-radius-label').textContent='边框 / 圆角宽度';
  }
  if(slug.includes('border')) root.querySelector('#lab-radius-label').textContent='边框宽度';
  if(slug.includes('round')) root.querySelector('#lab-radius-label').textContent='圆角半径';
  const setFiles = files => {
    const incoming=[...files].filter(f=>f.type.startsWith('image/'));
    const oversized=incoming.filter(f=>f.size>25*1024*1024);
    selectedFiles=incoming.filter(f=>f.size<=25*1024*1024).slice(0,100);
    const dt=new DataTransfer(); selectedFiles.forEach(f=>dt.items.add(f)); filesInput.files=dt.files;
    fileList.innerHTML='';
    if(!selectedFiles.length){fileList.innerHTML='<span class="image-empty">尚未添加图片</span>';return;}
    selectedFiles.forEach((f,i)=>{const row=document.createElement('div');row.className='image-file-row';const name=document.createElement('span');name.textContent=f.name;const size=document.createElement('small');size.textContent=(f.size/1024/1024).toFixed(2)+' MB · 读取尺寸…';row.append(name,size);fileList.appendChild(row);load(f).then(img=>{size.textContent=img.naturalWidth+' × '+img.naturalHeight+' px · '+(f.size/1024/1024).toFixed(2)+' MB';}).catch(()=>{size.textContent='无法读取尺寸';});});
    say('已添加 '+selectedFiles.length+' 张图片'+(oversized.length?'；已跳过 '+oversized.length+' 张超过 25 MB 的文件':''));countLabel.textContent=selectedFiles.length+' 张待处理';
    if(sourceInfo)sourceInfo.textContent='已为 '+selectedFiles.length+' 张图片分别检测尺寸与文件大小；处理时按每张原图独立计算。';
  };
  dropzone.addEventListener('dragover',e=>{e.preventDefault();dropzone.classList.add('is-dragging');});
  dropzone.addEventListener('dragleave',()=>dropzone.classList.remove('is-dragging'));
  dropzone.addEventListener('drop',e=>{e.preventDefault();dropzone.classList.remove('is-dragging');setFiles(e.dataTransfer.files);});
  filesInput.addEventListener('change',()=>setFiles(filesInput.files));
  const val = id => root.querySelector('#' + id).value;
  const num = id => Math.max(0, Number(val(id)) || 0);
  const say = s => status.textContent = s;
  const load = file => new Promise((resolve,reject) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('无法读取图片：' + file.name)); };
    img.src = url;
  });
  let syncingDimensions=false;
  const sourceInfo=root.querySelector('#lab-source-info');
  const widthField=root.querySelector('#lab-width'), heightField=root.querySelector('#lab-height');
  const cropX=root.querySelector('#lab-crop-x'), cropY=root.querySelector('#lab-crop-y');
  const cropW=root.querySelector('#lab-crop-width'), cropH=root.querySelector('#lab-crop-height');
  const ratioLocked=()=>root.querySelector('#lab-ratio-lock')?.checked!==false;
  const fitMode=()=>root.querySelector('#lab-fit-mode')?.value||'contain';
  // Width and height are shared target dimensions; every source image keeps its own aspect ratio independently.
    const blobOf = (c, type='image/png', quality=.92) => new Promise(resolve => {
    if(type!=='image/jpeg'){c.toBlob(resolve,type,quality);return;}
    const flat=document.createElement('canvas');flat.width=c.width;flat.height=c.height;
    const fx=flat.getContext('2d');fx.fillStyle='#fff';fx.fillRect(0,0,flat.width,flat.height);fx.drawImage(c,0,0);
    flat.toBlob(resolve,'image/jpeg',quality);
  });
  const mime = () => { if(slug.includes('png-to-jpg')||slug.includes('webp-to-jpg')) return 'image/jpeg'; if(slug.includes('jpg-to-webp')||slug.includes('png-to-webp')) return 'image/webp'; return val('lab-format'); };
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
    if(slug.includes('crop')){
      const targetW=Math.max(1,Math.min(8192,Math.floor(num('lab-width')||w)));
      const targetH=Math.max(1,Math.min(8192,Math.floor(num('lab-height')||h)));
      const px=Math.max(0,Math.min(99,num('lab-crop-x')))/100, py=Math.max(0,Math.min(99,num('lab-crop-y')))/100;
      const pw=Math.max(1,Math.min(100,num('lab-crop-width')||100))/100, ph=Math.max(1,Math.min(100,num('lab-crop-height')||100))/100;
      let sx=Math.min(w-1,Math.floor(w*px)), sy=Math.min(h-1,Math.floor(h*py));
      let sw=Math.max(1,Math.min(w-sx,Math.round(w*pw))), sh=Math.max(1,Math.min(h-sy,Math.round(h*ph)));
      if(ratioLocked()){
        const targetRatio=targetW/targetH, regionRatio=sw/sh;
        if(regionRatio>targetRatio){const nextW=Math.max(1,Math.round(sh*targetRatio));sx+=Math.floor((sw-nextW)/2);sw=nextW;}
        else {const nextH=Math.max(1,Math.round(sw/targetRatio));sy+=Math.floor((sh-nextH)/2);sh=nextH;}
      }
      const out=document.createElement('canvas');out.width=targetW;out.height=targetH;const ox=out.getContext('2d');ox.imageSmoothingEnabled=true;ox.imageSmoothingQuality='high';ox.drawImage(c,sx,sy,sw,sh,0,0,targetW,targetH);return {canvas:out,name:file.name};
    }
    const rgb=hex=>[parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)];
    if(slug.includes('grayscale')||slug.includes('black-white')) {
      const mode=val('lab-mode'), weights=mode==='601'?[.299,.587,.114]:mode==='average'?[1/3,1/3,1/3]:[.2126,.7152,.0722];
      for(let i=0;i<d.length;i+=4){const g=d[i]*weights[0]+d[i+1]*weights[1]+d[i+2]*weights[2];const v=amount>0?Math.round(g/(256/Math.max(2,amount))* (256/Math.max(2,amount))):g;d[i]=d[i+1]=d[i+2]=v;}
    } else if(slug.includes('alpha')||slug.includes('transparent')) {
      for(let i=3;i<d.length;i+=4)d[i]=255-d[i];
    } else if(slug.includes('invert')||slug.includes('negative')) {
      for(let i=0;i<d.length;i+=4){d[i]=255-d[i];d[i+1]=255-d[i+1];d[i+2]=255-d[i+2];}
    } else if(slug.includes('remove-background')||slug.includes('cutout')) {
      // Edge-connected color segmentation: only remove background-colored pixels connected to the image border.
      const target=rgb(color), tolerance=Math.max(0,threshold*1.75), feather=Math.max(0,num('lab-feather')*1.5);
      const total=w*h, visited=new Uint8Array(total), queue=new Uint32Array(total);
      let head=0,tail=0;
      const distanceAt=p=>{const i=p*4;return Math.hypot(d[i]-target[0],d[i+1]-target[1],d[i+2]-target[2]);};
      const enqueue=p=>{if(p<0||p>=total||visited[p])return;visited[p]=1;if(distanceAt(p)<=tolerance+feather)queue[tail++]=p;};
      for(let xx=0;xx<w;xx++){enqueue(xx);if(h>1)enqueue((h-1)*w+xx);}
      for(let yy=1;yy<h-1;yy++){enqueue(yy*w);if(w>1)enqueue(yy*w+w-1);}
      while(head<tail){
        const p=queue[head++], x0=p%w, y0=(p-x0)/w, i=p*4, dist=distanceAt(p);
        if(dist<=tolerance)d[i+3]=0;
        else if(feather>0)d[i+3]=Math.round(d[i+3]*Math.max(0,Math.min(1,(dist-tolerance)/feather)));
        if(x0>0)enqueue(p-1);if(x0<w-1)enqueue(p+1);if(y0>0)enqueue(p-w);if(y0<h-1)enqueue(p+w);
      }
    } else if(slug.includes('replace-color')) {
      const target=rgb(val('lab-color')), replacement=rgb(val('lab-color2'));for(let i=0;i<d.length;i+=4){if(Math.hypot(d[i]-target[0],d[i+1]-target[1],d[i+2]-target[2])<=threshold*1.75){d[i]=replacement[0];d[i+1]=replacement[1];d[i+2]=replacement[2];}}
    } else if(slug.includes('sharpen')||slug.includes('emboss')||slug.includes('engrave')) {
      const src=new Uint8ClampedArray(d), isSharp=slug.includes('sharpen'), kernel=isSharp?[0,-1,0,-1,5,-1,0,-1,0]:[-2,-1,0,-1,1,1,0,1,2], strength=Math.max(0,amount)/100;
      for(let y=1;y<h-1;y++)for(let xx=1;xx<w-1;xx++)for(let ch=0;ch<3;ch++){let sum=0,k=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)sum+=src[((y+dy)*w+xx+dx)*4+ch]*kernel[k++];const i=(y*w+xx)*4+ch,original=src[i],filtered=isSharp?sum:128+sum;d[i]=Math.max(0,Math.min(255,isSharp?original+(filtered-original)*strength:128+(filtered-128)*Math.min(2,strength)));}
    } else if(slug.includes('blur')) {
      const radius=Math.max(.5,Math.min(40,amount)),blurred=document.createElement('canvas');blurred.width=w;blurred.height=h;const bx=blurred.getContext('2d');bx.filter='blur('+radius+'px)';bx.drawImage(c,0,0);x.clearRect(0,0,w,h);x.drawImage(blurred,0,0);image=x.getImageData(0,0,w,h);d=image.data;
    } else if(slug.includes('pixel')) {
      const small=document.createElement('canvas');small.width=Math.max(1,Math.round(w/Math.max(2,amount/2)));small.height=Math.max(1,Math.round(h/Math.max(2,amount/2)));small.getContext('2d').drawImage(c,0,0,small.width,small.height);x.clearRect(0,0,w,h);x.imageSmoothingEnabled=false;x.drawImage(small,0,0,w,h);image=x.getImageData(0,0,w,h);d=image.data;
    } else if(slug.includes('brightness')) {
      const offset=(amount-100)*1.8;for(let i=0;i<d.length;i+=4){for(let ch=0;ch<3;ch++)d[i+ch]=Math.max(0,Math.min(255,d[i+ch]+offset));}
    } else if(slug.includes('round')) {
      x.putImageData(image,0,0);drawRounded(c,num('lab-radius'));
    } else if(slug.includes('watermark')) {
      x.putImageData(image,0,0);const text=val('lab-text')||'©';x.save();x.globalAlpha=.22;x.fillStyle=val('lab-color');x.font='bold '+Math.max(12,amount)+'px sans-serif';x.rotate(-Math.PI/6);for(let yy=-h;yy<h*2;yy+=Math.max(80,amount*4))for(let xx=-w;xx<w*2;xx+=Math.max(140,amount*8))x.fillText(text,xx,yy);x.restore();
    } else if(slug.includes('tile')||slug.includes('duplicate')||slug.includes('copy')) {
      const count=Math.max(1,Math.min(10,Math.floor(num('lab-count')||2))), vertical=val('lab-mode')==='vertical';const out=document.createElement('canvas');out.width=vertical?w:Math.round(w*count);out.height=vertical?Math.round(h*count):h;const ox=out.getContext('2d');for(let i=0;i<count;i++)ox.drawImage(c,vertical?0:i*w,vertical?i*h:0);return {canvas:out,name:file.name};
    } else if(slug.includes('scale-up')||slug.includes('scale-down')) {
      const percent=Math.max(1,Math.min(800,num('lab-amount')||100))/100;
      const requested=slug.includes('scale-down')?Math.min(1,percent):Math.max(1,percent),factor=Math.min(requested,8192/w,8192/h);
      const out=document.createElement('canvas');out.width=Math.max(1,Math.round(w*factor));out.height=Math.max(1,Math.round(h*factor));out.getContext('2d').drawImage(c,0,0,out.width,out.height);return {canvas:out,name:file.name};
    } else if(slug.includes('resize')||slug.includes('icon')) {
      const targetW=Math.max(1,Math.min(8192,Math.floor(num('lab-width')||w))),targetH=Math.max(1,Math.min(8192,Math.floor(num('lab-height')||h)));
      const mode=fitMode(),out=document.createElement('canvas');out.width=targetW;out.height=targetH;const ox=out.getContext('2d');ox.imageSmoothingEnabled=true;ox.imageSmoothingQuality='high';
      if(!ratioLocked()||mode==='stretch')ox.drawImage(c,0,0,targetW,targetH);
      else if(mode==='cover'){const scale=Math.max(targetW/w,targetH/h),sw=targetW/scale,sh=targetH/scale,sx=(w-sw)/2,sy=(h-sh)/2;ox.drawImage(c,sx,sy,sw,sh,0,0,targetW,targetH);}
      else {const scale=Math.min(targetW/w,targetH/h),dw=w*scale,dh=h*scale;ox.drawImage(c,(targetW-dw)/2,(targetH-dh)/2,dw,dh);}
      return {canvas:out,name:file.name};
    } else if(slug.includes('color')||slug.includes('tint')) {
      const target=rgb(color);for(let i=0;i<d.length;i+=4){d[i]=Math.round(d[i]*target[0]/255);d[i+1]=Math.round(d[i+1]*target[1]/255);d[i+2]=Math.round(d[i+2]*target[2]/255);}
    } else if(slug.includes('mirror')) {
      const out=document.createElement('canvas');out.width=w*2;out.height=h;const ox=out.getContext('2d');ox.drawImage(c,0,0);ox.save();ox.translate(w*2,0);ox.scale(-1,1);ox.drawImage(c,0,0);ox.restore();return {canvas:out,name:file.name};
    } else if(slug.includes('noise')) {
      const strength=Math.min(100,amount)/100*72;
      for(let i=0;i<d.length;i+=4){const n=(Math.random()*2-1)*strength;for(let ch=0;ch<3;ch++)d[i+ch]=Math.max(0,Math.min(255,d[i+ch]+n));}
    } else if(slug.includes('sepia')) {
      const strength=Math.min(100,amount)/100;
      for(let i=0;i<d.length;i+=4){const r=d[i],g=d[i+1],b=d[i+2],sr=.393*r+.769*g+.189*b,sg=.349*r+.686*g+.168*b,sb=.272*r+.534*g+.131*b;d[i]=r+(sr-r)*strength;d[i+1]=g+(sg-g)*strength;d[i+2]=b+(sb-b)*strength;}
    } else if(slug.includes('contrast')) {
      const delta=(amount-100)*1.2,factor=(259*(delta+255))/(255*(259-delta));for(let i=0;i<d.length;i+=4)for(let ch=0;ch<3;ch++)d[i+ch]=Math.max(0,Math.min(255,factor*(d[i+ch]-128)+128));
    } else if(slug.includes('saturation')||slug.includes('vibrance')) {
      const filtered=document.createElement('canvas');filtered.width=w;filtered.height=h;const fx=filtered.getContext('2d');fx.filter='saturate('+Math.max(0,amount)/100+')';fx.drawImage(c,0,0);image=fx.getImageData(0,0,w,h);d=image.data;
    } else if(slug.includes('vignette')) {
      x.putImageData(image,0,0);const g=x.createRadialGradient(w/2,h/2,Math.min(w,h)*.15,w/2,h/2,Math.max(w,h)*.72);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+Math.min(.95,amount/100)+')');x.fillStyle=g;x.fillRect(0,0,w,h);image=x.getImageData(0,0,w,h);d=image.data;
    } else if(slug.includes('horizontal-flip')) {
      const out=document.createElement('canvas');out.width=w;out.height=h;const ox=out.getContext('2d');ox.translate(w,0);ox.scale(-1,1);ox.drawImage(c,0,0);return {canvas:out,name:file.name};
    } else if(slug.includes('vertical-flip')) {
      const out=document.createElement('canvas');out.width=w;out.height=h;const ox=out.getContext('2d');ox.translate(0,h);ox.scale(1,-1);ox.drawImage(c,0,0);return {canvas:out,name:file.name};
    } else if(slug.includes('rotate')) {
      const angle=(Number(val('lab-angle'))||0)*Math.PI/180,sw=Math.abs(Math.cos(angle)),sh=Math.abs(Math.sin(angle));const out=document.createElement('canvas');out.width=Math.min(8192,Math.ceil(w*sw+h*sh));out.height=Math.min(8192,Math.ceil(h*sw+w*sh));const ox=out.getContext('2d');ox.translate(out.width/2,out.height/2);ox.rotate(angle);ox.drawImage(c,-w/2,-h/2);return {canvas:out,name:file.name};
    } else if(slug.includes('border')) {
      const size=Math.min(500,num('lab-radius')||20),out=document.createElement('canvas');out.width=w+size*2;out.height=h+size*2;const ox=out.getContext('2d');ox.fillStyle=val('lab-color');ox.fillRect(0,0,out.width,out.height);ox.drawImage(c,size,size);return {canvas:out,name:file.name};
    } else if(slug.includes('background')||slug.includes('rectangle-fit')) {
      const nw=Math.max(1,Math.min(8192,num('lab-width')||w)),nh=Math.max(1,Math.min(8192,num('lab-height')||h)),out=document.createElement('canvas');out.width=nw;out.height=nh;const ox=out.getContext('2d');ox.fillStyle=val('lab-color');ox.fillRect(0,0,nw,nh);const scale=fitMode()==='cover'?Math.max(nw/w,nh/h):Math.min(nw/w,nh/h);ox.drawImage(c,(nw-w*scale)/2,(nh-h*scale)/2,w*scale,h*scale);return {canvas:out,name:file.name};
    } else if(slug.includes('resize')||slug.includes('icon')) {
      const nw=Math.max(1,Math.min(8192,Math.floor(num('lab-width')||w))),nh=Math.max(1,Math.min(8192,Math.floor(num('lab-height')||h)));
      const out=document.createElement('canvas');out.width=nw;out.height=nh;const ox=out.getContext('2d');ox.imageSmoothingEnabled=true;ox.imageSmoothingQuality='high';
      const mode=fitMode();
      if(mode==='stretch')ox.drawImage(c,0,0,nw,nh);
      else {const scale=mode==='cover'?Math.max(nw/w,nh/h):Math.min(nw/w,nh/h),dw=w*scale,dh=h*scale;ox.drawImage(c,(nw-dw)/2,(nh-dh)/2,dw,dh);}
      return {canvas:out,name:file.name};
    } else if(slug.includes('format-')||slug.includes('convert-')) {
      // Canvas export below performs browser-native PNG/JPEG/WebP conversion.
    } else if(slug.includes('quality')) {
      // JPEG/WebP quality is applied during export.
    }
    x.putImageData(image,0,0);
    return {canvas:c,name:file.name};
  }
  root.querySelector('#lab-process').addEventListener('click',async()=>{
    const files=[...(filesInput.files||[])];if(!files.length){say('请先选择图片文件');return;}
    if(files.length>100){say('一次最多处理 100 张图片');return;}
    outputs=[];preview.innerHTML='';download.disabled=true;countLabel.textContent='处理中…';say('正在处理 '+files.length+' 张图片，请稍候…');
    let failed=0;const totalBytes=files.reduce((n,f)=>n+f.size,0);
    for(let i=0;i<files.length;i++){const file=files[i];try{const result=await process(file);outputs.push({canvas:result.canvas,name:result.name});const card=document.createElement('article');card.className='image-result-card';const thumb=document.createElement('canvas');const thumbScale=Math.min(1,120/result.canvas.width,90/result.canvas.height);thumb.width=Math.max(1,Math.round(result.canvas.width*thumbScale));thumb.height=Math.max(1,Math.round(result.canvas.height*thumbScale));const thumbCtx=thumb.getContext('2d');thumbCtx.imageSmoothingEnabled=true;thumbCtx.imageSmoothingQuality='high';thumbCtx.drawImage(result.canvas,0,0,thumb.width,thumb.height);const thumbImage=document.createElement('img');thumbImage.className='image-result-thumb';thumbImage.alt='处理结果缩略图：'+file.name;thumbImage.loading='lazy';thumbImage.src=thumb.toDataURL('image/png');const meta=document.createElement('div');meta.className='image-result-meta';const title=document.createElement('strong');title.textContent=file.name;const dims=document.createElement('small');dims.textContent=result.canvas.width+' × '+result.canvas.height+' px · 原图 '+(file.size/1024/1024).toFixed(2)+' MB';const btn=document.createElement('button');btn.type='button';btn.className='secondary-button';btn.textContent='下载';btn.addEventListener('click',async()=>{const type=mime(),blob=await blobOf(result.canvas,type,Math.min(1,Math.max(.05,num('lab-amount')/100||.92)));if(blob)downloadBlob(blob,result.name.replace(/\.[^.]+$/,'')+'.'+ext(type));});meta.append(title,dims,btn);card.append(thumbImage,meta);preview.appendChild(card);say('处理进度 '+(i+1)+' / '+files.length+' 张');}catch(e){failed++;}}
    if(outputs.length){download.disabled=false;countLabel.textContent=outputs.length+' 张已完成';say('处理完成：成功 '+outputs.length+' 张'+(failed?'，失败 '+failed+' 张':'')+'；输入总计 '+(totalBytes/1024/1024).toFixed(2)+' MB。可逐张下载。');}
    else {countLabel.textContent='没有可预览的结果';say('处理失败，请确认文件格式受浏览器支持。');}
  });
  root.querySelector('#lab-download').addEventListener('click',async()=>{
    if(!outputs.length)return;const type=mime(),item=outputs[0];
    const blob=await blobOf(item.canvas,type,Math.min(1,Math.max(.05,num('lab-amount')/100||.92)));
    if(blob)downloadBlob(blob,item.name.replace(/\.[^.]+$/,'')+'.'+ext(type));
    say('已下载第一张结果。其余图片请点击对应结果记录中的“下载”。');
  });
  root.querySelector('#lab-reset').addEventListener('click',()=>{filesInput.value='';selectedFiles=[];fileList.innerHTML='<span class="image-empty">尚未添加图片</span>';preview.innerHTML='<div class="image-preview-placeholder"><strong>暂无处理结果</strong><small>处理完成后显示文件信息和下载入口，不加载大图预览</small></div>';outputs=[];download.disabled=true;countLabel.textContent='等待导入图片';say('已重置。请选择图片开始。');});
}
