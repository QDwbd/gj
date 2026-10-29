import bwipjs from 'bwip-js';

const root = document.querySelector('#barcode-workbench');
if (root) {
  const op = root.dataset.barcodeOperation;
  const input = document.querySelector('#barcode-text');
  const canvas = document.querySelector('#barcode-canvas');
  const status = document.querySelector('#barcode-status');
  const download = document.querySelector('#barcode-download');
  const setStatus = message => { status.textContent = message; };
  const render = () => {
    const text = input.value;
    if (!text.trim()) { setStatus('请输入要编码的内容'); download.disabled = true; return; }
    if (text.length > 2048) { setStatus('内容过长，请限制在 2048 个字符以内'); download.disabled = true; return; }
    const bcid = op === 'qr-generator' ? 'qrcode' : document.querySelector('#barcode-type').value;
    const scale = Number(document.querySelector('#barcode-scale').value);
    const padding = Number(document.querySelector('#barcode-padding').value);
    const options = {
      bcid,
      text,
      scale,
      padding,
      backgroundcolor: document.querySelector('#barcode-background').value.replace('#',''),
      barcolor: document.querySelector('#barcode-foreground').value.replace('#','')
    };
    if (bcid !== 'qrcode') {
      options.height = Number(document.querySelector('#barcode-height').value);
      options.includetext = document.querySelector('#barcode-human-readable').checked;
      options.textxalign = 'center';
    }
    try {
      bwipjs.toCanvas(canvas, options);
      canvas.hidden = false;
      download.disabled = false;
      setStatus((bcid === 'qrcode' ? '二维码' : '条码') + '生成成功：' + canvas.width + ' × ' + canvas.height + ' px');
    } catch (error) {
      download.disabled = true;
      setStatus('生成失败：' + (error?.message || String(error)) + '。请检查内容是否符合所选编码标准。');
    }
  };
  document.querySelector('#barcode-generate').addEventListener('click', render);
  document.querySelector('#barcode-reset').addEventListener('click', () => {
    input.value = op === 'qr-generator' ? 'https://example.com' : '5901234123457';
    document.querySelector('#barcode-scale').value = '3';
    document.querySelector('#barcode-padding').value = '10';
    document.querySelector('#barcode-height').value = '15';
    document.querySelector('#barcode-human-readable').checked = true;
    document.querySelector('#barcode-background').value = '#ffffff';
    document.querySelector('#barcode-foreground').value = '#000000';
    if (op === 'barcode-generator') document.querySelector('#barcode-type').value = 'code128';
    canvas.hidden = true; download.disabled = true; setStatus('已重置，请点击生成');
  });
  download.addEventListener('click', () => {
    if (canvas.hidden || !canvas.width) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = (op === 'qr-generator' ? 'qrcode' : 'barcode') + '.png';
    a.click();
    setStatus('已导出 ' + a.download);
  });
  if (op === 'qr-generator') input.value = 'https://example.com';
  if (op === 'barcode-generator') input.value = '5901234123457';
}
