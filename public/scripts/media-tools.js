const root = document.querySelector('#media-workbench');
if (root) {
  const op = root.dataset.mediaOperation;
  const status = document.querySelector('#media-status');
  const setStatus = message => { status.textContent = message; };
  if (op === 'image-to-base64') {
    const file = document.querySelector('#media-image-file');
    const output = document.querySelector('#media-base64-output');
    document.querySelector('#media-convert').addEventListener('click', () => {
      const f = file.files && file.files[0];
      if (!f) { setStatus('请先选择图片'); return; }
      if (!['image/png','image/jpeg','image/webp','image/gif','image/avif'].includes(f.type)) { setStatus('仅支持 PNG、JPEG、WebP、GIF、AVIF 图片'); return; }
      if (f.size > 20 * 1024 * 1024) { setStatus('文件超过 20 MB 限制'); return; }
      const reader = new FileReader();
      reader.onerror = () => setStatus('读取文件失败');
      reader.onload = () => { output.value = String(reader.result); setStatus('转换完成：' + Math.round(f.size / 1024) + ' KB'); };
      reader.readAsDataURL(f);
    });
    document.querySelector('#media-copy').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(output.value); setStatus('已复制 Data URL'); }
      catch { output.select(); setStatus('浏览器不允许自动复制，请手动复制'); }
    });
    document.querySelector('#media-clear').addEventListener('click', () => { file.value = ''; output.value = ''; setStatus('已清空'); });
  }
  if (op === 'base64-to-image') {
    const input = document.querySelector('#media-base64-input');
    const preview = document.querySelector('#media-image-preview');
    const mime = document.querySelector('#media-mime');
    const show = () => {
      const raw = input.value.trim();
      if (!raw) { preview.removeAttribute('src'); setStatus('请输入 Base64 或 Data URL'); return; }
      const url = raw.startsWith('data:image/') ? raw : 'data:' + mime.value + ';base64,' + raw.replace(/\s/g, '');
      preview.onload = () => { setStatus('图片已解码：' + preview.naturalWidth + ' × ' + preview.naturalHeight + ' px'); document.querySelector('#media-download').disabled = false; };
      preview.onerror = () => { setStatus('解码失败：请检查 Base64 内容与图片 MIME 类型'); document.querySelector('#media-download').disabled = true; };
      preview.src = url;
    };
    document.querySelector('#media-convert').addEventListener('click', show);
    document.querySelector('#media-download').addEventListener('click', () => {
      if (!preview.src || !preview.naturalWidth) return;
      const a = document.createElement('a'); a.href = preview.src; a.download = 'decoded-image.' + ({'image/png':'png','image/jpeg':'jpg','image/webp':'webp','image/gif':'gif','image/avif':'avif'}[mime.value] || 'png'); a.click();
    });
    document.querySelector('#media-clear').addEventListener('click', () => { input.value = ''; preview.removeAttribute('src'); document.querySelector('#media-download').disabled = true; setStatus('已清空'); });
  }
  if (op === 'svg-to-png') {
    const input = document.querySelector('#media-svg-input');
    const canvas = document.querySelector('#media-svg-canvas');
    const ctx = canvas.getContext('2d');
    let ready = false;
    document.querySelector('#media-convert').addEventListener('click', () => {
      const svg = input.value.trim();
      if (!svg.startsWith('<svg') && !/^<\?xml[\s\S]*?<svg/.test(svg)) { setStatus('请输入有效的 SVG 标记'); return; }
      if (/<script\b|<foreignObject\b|\son[a-z]+\s*=|(?:href|src)\s*=\s*["']\s*(?:https?:|\/\/)|url\(\s*["']?https?:|<!DOCTYPE|<!ENTITY/i.test(svg)) { setStatus('出于安全考虑，SVG 不可包含脚本、外部资源或事件处理器'); return; }
      const width = Number(document.querySelector('#media-svg-width').value), height = Number(document.querySelector('#media-svg-height').value);
      if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width > 4096 || height > 4096 || width * height > 16000000) { setStatus('宽高必须为 1–4096 px，且总像素不超过 1600 万'); return; }
      const blob = new Blob([svg], {type:'image/svg+xml;charset=utf-8'});
      const url = URL.createObjectURL(blob), img = new Image();
      img.onload = () => {
        canvas.width = width; canvas.height = height;
        ctx.clearRect(0,0,width,height); ctx.drawImage(img,0,0,width,height);
        URL.revokeObjectURL(url); ready = true;
        canvas.hidden = false; document.querySelector('#media-download').disabled = false;
        setStatus('已渲染为 PNG：' + width + ' × ' + height + ' px');
      };
      img.onerror = () => { URL.revokeObjectURL(url); ready = false; setStatus('SVG 无法解析，请检查标签与属性'); };
      img.src = url;
      setStatus('正在渲染 SVG…');
    });
    document.querySelector('#media-download').addEventListener('click', () => {
      if (!ready) return;
      canvas.toBlob(blob => {
        if (!blob) { setStatus('PNG 导出失败'); return; }
        const url = URL.createObjectURL(blob), a = document.createElement('a');
        a.href = url; a.download = 'converted.svg.png'; a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, 'image/png');
    });
    document.querySelector('#media-clear').addEventListener('click', () => { input.value = ''; canvas.hidden = true; ready = false; document.querySelector('#media-download').disabled = true; setStatus('已清空'); });
  }
}
