import initSqlJs from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

const root = document.querySelector('#sqlite-workbench');
if (root) {
  const fileInput=document.querySelector('#sqlite-file');
  const sqlInput=document.querySelector('#sqlite-query');
  const resultsRoot=document.querySelector('#sqlite-results');
  const status=document.querySelector('#sqlite-status');
  const runButton=document.querySelector('#sqlite-run');
  const exportButton=document.querySelector('#sqlite-export');
  let SQL=null, db=null, filename='database.sqlite';
  const setStatus=message=>{status.textContent=message;};
  const clearResults=()=>resultsRoot.replaceChildren();
  const displayValue=value=>{
    if(value===null||value===undefined)return 'NULL';
    if(value instanceof Uint8Array)return '[BLOB '+value.length+' bytes]';
    if(typeof value==='object')return JSON.stringify(value);
    return String(value);
  };
  const renderResults=sets=>{
    clearResults();
    if(!sets.length){const p=document.createElement('p');p.textContent='SQL 已执行，没有返回结果集（例如 INSERT、UPDATE、CREATE TABLE）。';resultsRoot.appendChild(p);return 0;}
    let total=0;
    for(const set of sets){
      const wrap=document.createElement('div');wrap.style.cssText='overflow:auto;margin:16px 0;border:1px solid #ddd;border-radius:8px;';
      const table=document.createElement('table');table.style.cssText='border-collapse:collapse;width:100%;font-size:14px;';
      const thead=document.createElement('thead'),hr=document.createElement('tr');
      set.columns.forEach(name=>{const th=document.createElement('th');th.textContent=name;th.style.cssText='text-align:left;padding:8px;border-bottom:1px solid #ddd;white-space:nowrap;';hr.appendChild(th);});
      thead.appendChild(hr);table.appendChild(thead);
      const tbody=document.createElement('tbody');
      set.values.slice(0,500).forEach(row=>{const tr=document.createElement('tr');row.forEach(value=>{const td=document.createElement('td');td.textContent=displayValue(value);td.style.cssText='padding:8px;border-bottom:1px solid #eee;max-width:360px;overflow-wrap:anywhere;';tr.appendChild(td);});tbody.appendChild(tr);});
      table.appendChild(tbody);wrap.appendChild(table);resultsRoot.appendChild(wrap);
      const note=document.createElement('p');note.style.cssText='font-size:12px;color:var(--muted,#666);';
      note.textContent='结果集：'+set.values.length+' 行，'+set.columns.length+' 列'+(set.values.length>500?'；页面仅显示前 500 行':'');
      resultsRoot.appendChild(note);total+=set.values.length;
    }
    return total;
  };
  fileInput.addEventListener('change',async()=>{
    const file=fileInput.files&&fileInput.files[0];
    if(db){db.close();db=null;}
    exportButton.disabled=true;runButton.disabled=true;clearResults();
    if(!file)return;
    if(file.size>50*1024*1024){setStatus('数据库文件不能超过 50 MB');fileInput.value='';return;}
    if(!/\.(db|sqlite|sqlite3)$/i.test(file.name)&&file.type!=='application/x-sqlite3'&&file.type!=='application/vnd.sqlite3'){setStatus('请选择 .db、.sqlite 或 .sqlite3 文件');return;}
    try{
      setStatus('正在初始化 SQLite WebAssembly 引擎…');
      if(!SQL)SQL=await initSqlJs({locateFile:()=>wasmUrl});
      db=new SQL.Database(new Uint8Array(await file.arrayBuffer()));
      filename=file.name;
      runButton.disabled=false;exportButton.disabled=false;
      sqlInput.value='SELECT name, type FROM sqlite_master WHERE type IN (\'table\', \'view\') ORDER BY name;';
      const sets=db.exec(sqlInput.value);
      const rows=renderResults(sets);
      setStatus('数据库已打开：'+filename+'。已列出 '+rows+' 条 schema 记录；可执行 SQL 并导出修改后的数据库。');
    }catch(e){if(db){db.close();db=null;}runButton.disabled=true;exportButton.disabled=true;setStatus('打开失败：文件可能不是 SQLite 数据库、已损坏或超过浏览器可用内存。');}
  });
  runButton.addEventListener('click',()=>{
    if(!db){setStatus('请先打开 SQLite 数据库文件');return;}
    const sql=sqlInput.value.trim();
    if(!sql){setStatus('请输入 SQL 语句');return;}
    try{
      const sets=db.exec(sql);
      const rows=renderResults(sets);
      exportButton.disabled=false;
      setStatus('执行成功：'+sets.length+' 个结果集，返回 '+rows+' 行。若执行了写操作，可导出更新后的数据库文件。');
    }catch(e){setStatus('SQL 执行失败：'+(e?.message||String(e)));}
  });
  exportButton.addEventListener('click',()=>{
    if(!db)return;
    try{
      const bytes=db.export(),blob=new Blob([bytes],{type:'application/x-sqlite3'});
      const url=URL.createObjectURL(blob),a=document.createElement('a');
      a.href=url;a.download=filename.replace(/\.(db|sqlite|sqlite3)$/i,'')+'-edited.sqlite';a.click();
      setTimeout(()=>URL.revokeObjectURL(url),1200);
      setStatus('数据库已导出。请下载并自行备份原文件。');
    }catch(e){setStatus('导出失败：'+(e?.message||String(e)));}
  });
  document.querySelector('#sqlite-reset').addEventListener('click',()=>{
    if(db){db.close();db=null;}
    fileInput.value='';sqlInput.value='';clearResults();runButton.disabled=true;exportButton.disabled=true;setStatus('已关闭数据库并清空工作台。');
  });
}
