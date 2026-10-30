const root = document.querySelector('#image-workbench');
if (root) {
  const fileInput = document.querySelector('#image-file');
  const canvas = document.querySelector('#image-canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const status = document.querySelector('#image-status');
  const download = document.querySelector('#image-download');
  const format = document.querySelector('#image-format');
  const original = new Image();
  let sourceUrl = '';
  const settings = () => ({
    brightness: Number(document.querySelector('#image-brightness').value),
    contrast: Number(document.querySelector('#image-contrast').value),
    rotation: Number(document.querySelector('#image-rotation').value),
    flipX: document.querySelector('#image-flip-x').checked,
    flipY: document.querySelector('#image-flip-y').checked,
    grayscale: document.querySelector('#image-grayscale').checked,
    sepia: document.querySelector('#image-sepia').checked,
    pixelate: Number(document.querySelector('#image-pixelate').value),
    cropWidth: Number(document.querySelector('#image-crop-width').value),
    cropHeight: Number(document.querySelector('#image-crop-height').value),
    watermark: document.querySelector('#image-watermark').value.trim()
  });
  const setStatus = message => { status.textContent = message; };
  function render() {
    if (!original.naturalWidth) return;
    const s = settings();
    const cw = Math.max(1, Math.round(original.naturalWidth * Math.min(100, Math.max(10, s.cropWidth)) / 100));
    const ch = Math.max(1, Math.round(original.naturalHeight * Math.min(100, Math.max(10, s.cropHeight)) / 100));
    const sx = Math.floor((original.naturalWidth - cw) / 2);
    const sy = Math.floor((original.naturalHeight - ch) / 2);
    const angle = ((s.rotation % 360) + 360) % 360;
    const swap = angle === 90 || angle === 270;
    canvas.width = swap ? ch : cw;
    canvas.height = swap ? cw : ch;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.scale(s.flipX ? -1 : 1, s.flipY ? -1 : 1);
    ctx.filter = 'brightness(' + s.brightness + '%) contrast(' + s.contrast + '%)' + (s.grayscale ? ' grayscale(1)' : '') + (s.sepia ? ' sepia(1)' : '');
    ctx.drawImage(original, sx, sy, cw, ch, -cw / 2, -ch / 2, cw, ch);
    ctx.restore();
    ctx.filter = 'none';
    if (s.pixelate > 1) {
      const tiny = document.createElement('canvas');
      tiny.width = Math.max(1, Math.round(canvas.width / s.pixelate));
      tiny.height = Math.max(1, Math.round(canvas.height / s.pixelate));
      const tinyCtx = tiny.getContext('2d');
      tinyCtx.drawImage(canvas, 0, 0, tiny.width, tiny.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tiny, 0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
    }
    if (s.watermark) {
      const size = Math.max(14, Math.round(canvas.width / 32));
      ctx.font = '600 ' + size + 'px sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.lineWidth = Math.max(2, size / 8);
      ctx.strokeStyle = 'rgba(0,0,0,.55)';
      ctx.fillStyle = 'rgba(255,255,255,.9)';
      ctx.strokeText(s.watermark, canvas.width - size, canvas.height - size);
      ctx.fillText(s.watermark, canvas.width - size, canvas.height - size);
    }
    canvas.hidden = false;
    download.disabled = false;
    setStatus('预览已更新：' + canvas.width + ' × ' + canvas.height + ' px');
  }
  fileInput.addEventListener('change', () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setStatus('文件格式错误：请选择图片文件'); fileInput.value = ''; return; }
    if (file.size > 25 * 1024 * 1024) { setStatus('图片超过 25 MB，请选择较小的文件'); fileInput.value = ''; return; }
    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    sourceUrl = URL.createObjectURL(file);
    original.onload = () => {
      if (original.naturalWidth > 12000 || original.naturalHeight > 12000 || original.naturalWidth * original.naturalHeight > 50000000) {
        setStatus('图片尺寸过大（限制为单边 12000 px 且不超过 5000 万像素）');
        original.src = '';
        return;
      }
      render();
    };
    original.onerror = () => setStatus('无法读取图片，请尝试 PNG、JPEG 或 WebP 文件');
    original.src = sourceUrl;
    setStatus('正在读取图片…');
  });
  const rangePairs = [
    ['image-brightness','image-brightness-number','image-brightness-value','%'],
    ['image-contrast','image-contrast-number','image-contrast-value','%'],
    ['image-pixelate','image-pixelate-number','image-pixelate-value',''],
    ['image-crop-width','image-crop-width-number','image-crop-width-value','%'],
    ['image-crop-height','image-crop-height-number','image-crop-height-value','%']
  ];
  const syncRangePair = (rangeId,numberId,outputId,suffix) => {
    const range=root.querySelector('#'+rangeId),number=root.querySelector('#'+numberId),output=root.querySelector('#'+outputId);
    const sync=()=>{number.value=range.value;output.textContent=range.value+suffix;};
    range.addEventListener('input',()=>{sync();render();});
    number.addEventListener('input',()=>{if(number.value!==''){range.value=String(Math.min(Number(range.max),Math.max(Number(range.min),Number(number.value))));output.textContent=range.value+suffix;render();}});
    number.addEventListener('change',()=>{range.value=String(Math.min(Number(range.max),Math.max(Number(range.min),Number(number.value)||0)));sync();render();});
    sync();
  };
  rangePairs.forEach(pair=>syncRangePair(...pair));
  root.querySelectorAll('input[type=checkbox], input[type=text]').forEach(el => {
    el.addEventListener('input', render);
    el.addEventListener('change', render);
  });
  document.querySelector('#image-reset').addEventListener('click', () => {
    document.querySelector('#image-brightness').value = '100';
    document.querySelector('#image-brightness-number').value = '100';
    document.querySelector('#image-contrast').value = '100';
    document.querySelector('#image-contrast-number').value = '100';
    document.querySelector('#image-rotation').value = '0';
    document.querySelector('#image-flip-x').checked = false;
    document.querySelector('#image-flip-y').checked = false;
    document.querySelector('#image-grayscale').checked = false;
    document.querySelector('#image-sepia').checked = false;
    document.querySelector('#image-pixelate').value = '1';
    document.querySelector('#image-pixelate-number').value = '1';
    document.querySelector('#image-crop-width').value = '100';
    document.querySelector('#image-crop-width-number').value = '100';
    document.querySelector('#image-crop-height').value = '100';
    document.querySelector('#image-crop-height-number').value = '100';
    document.querySelector('#image-watermark').value = '';
    render();
  });
  download.addEventListener('click', () => {
    if (!original.naturalWidth) return;
    const mime = format.value;
    canvas.toBlob(blob => {
      if (!blob) { setStatus('导出失败：浏览器无法生成所选格式'); return; }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'edited-image.' + (mime === 'image/jpeg' ? 'jpg' : mime === 'image/webp' ? 'webp' : 'png');
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus('已导出 ' + a.download + '（' + Math.round(blob.size / 1024) + ' KB）');
    }, mime, 0.92);
  });
}
