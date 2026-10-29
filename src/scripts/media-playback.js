const playbackRoot = document.querySelector('#playback-workbench');
if (playbackRoot) {
  const op = playbackRoot.dataset.playbackOperation;
  const fileInput = document.querySelector('#playback-file');
  const player = document.querySelector('#playback-player');
  const speed = document.querySelector('#playback-speed');
  const status = document.querySelector('#playback-status');
  let objectUrl = '';
  const setStatus = message => { status.textContent = message; };
  fileInput.addEventListener('change', () => {
    const file=fileInput.files&&fileInput.files[0];
    if(!file)return;
    const valid=op==='audio-player'?file.type.startsWith('audio/'):file.type.startsWith('video/');
    if(!valid){setStatus(op==='audio-player'?'请选择音频文件':'请选择视频文件');fileInput.value='';return;}
    if(file.size>200*1024*1024){setStatus('文件不能超过 200 MB');fileInput.value='';return;}
    if(objectUrl)URL.revokeObjectURL(objectUrl);
    objectUrl=URL.createObjectURL(file);
    player.src=objectUrl;player.load();
    setStatus('已加载 '+file.name+'（'+Math.round(file.size/1024/1024*10)/10+' MB），文件仅在本地播放。');
  });
  speed.addEventListener('change',()=>{player.playbackRate=Number(speed.value);setStatus('播放速度：'+speed.value+'×');});
  player.addEventListener('error',()=>setStatus('播放失败：浏览器可能不支持该媒体编码格式。'));
  player.addEventListener('loadedmetadata',()=>setStatus('媒体已就绪'+(player.duration? '，时长约 '+Math.round(player.duration)+' 秒':'')+'；播放速度 '+player.playbackRate+'×。'));
  window.addEventListener('beforeunload',()=>{if(objectUrl)URL.revokeObjectURL(objectUrl);});
}

const recorderRoot = document.querySelector('#screen-recorder-workbench');
if (recorderRoot) {
  const start = document.querySelector('#record-start');
  const stop = document.querySelector('#record-stop');
  const status = document.querySelector('#record-status');
  const includeAudio = document.querySelector('#record-audio');
  let stream=null, recorder=null, chunks=[];
  const setStatus = message => { status.textContent=message; };
  const cleanup = () => { if(stream)stream.getTracks().forEach(track=>track.stop());stream=null;recorder=null;start.disabled=false;stop.disabled=true; };
  start.addEventListener('click',async()=>{
    if(!navigator.mediaDevices?.getDisplayMedia||typeof MediaRecorder==='undefined'){setStatus('当前浏览器不支持屏幕录制，请使用支持 getDisplayMedia 与 MediaRecorder 的新版浏览器。');return;}
    try{
      stream=await navigator.mediaDevices.getDisplayMedia({video:true,audio:includeAudio.checked});
      chunks=[];
      const mime=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'].find(type=>MediaRecorder.isTypeSupported(type));
      recorder=new MediaRecorder(stream,mime?{mimeType:mime}:{});
      recorder.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data);};
      recorder.onerror=()=>{setStatus('录制出错，请检查浏览器权限与设备设置。');cleanup();};
      recorder.onstop=()=>{
        if(chunks.length){
          const blob=new Blob(chunks,{type:recorder?.mimeType||'video/webm'});
          const url=URL.createObjectURL(blob),a=document.createElement('a');
          a.href=url;a.download='screen-recording.webm';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);
          setStatus('录制已保存：'+Math.round(blob.size/1024)+' KB（WebM）。');
        } else setStatus('录制结束，没有可保存的数据。');
        cleanup();
      };
      stream.getVideoTracks().forEach(track=>track.addEventListener('ended',()=>{if(recorder&&recorder.state!=='inactive')recorder.stop();}));
      recorder.start(500);start.disabled=true;stop.disabled=false;setStatus('正在录制。停止共享屏幕或点击“停止并下载”结束录制。');
    }catch(e){cleanup();setStatus('无法开始录制：你可能取消了共享授权，或浏览器阻止了屏幕捕获。');}
  });
  stop.addEventListener('click',()=>{if(recorder&&recorder.state!=='inactive'){stop.disabled=true;recorder.stop();}});
}
