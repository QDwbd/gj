import ExcelJS from 'exceljs';

const root=document.querySelector('#excel-workbench');
if(root){
  const op=root.dataset.excelOperation;
  const status=document.querySelector('#excel-status');
  const setStatus=message=>{status.textContent=message;};
  const fileInput=document.querySelector('#excel-file');
  const sheetSelect=document.querySelector('#excel-sheet');
  const result=document.querySelector('#excel-result');
  let workbook=null;
  const cellValue=cell=>{
    const value=cell.value;
    if(value===null||value===undefined)return null;
    if(value instanceof Date)return value.toISOString();
    if(typeof value==='object'){
      if('result' in value)return value.result??null;
      if(Array.isArray(value.richText))return value.richText.map(x=>x.text||'').join('');
      if('text' in value)return value.text;
      if('hyperlink' in value&&'text' in value)return value.text;
      return JSON.stringify(value);
    }
    return value;
  };
  const getRows=ws=>{
    const maxCol=ws.columnCount;
    if(!ws.rowCount||!maxCol)return {headers:[],rows:[]};
    const headerRow=ws.getRow(1);
    const used=new Map();
    const headers=[];
    for(let col=1;col<=maxCol;col++){
      const raw=cellValue(headerRow.getCell(col));
      let name=String(raw??'').trim()||'column_'+col;
      const base=name;let suffix=2;
      while(used.has(name))name=base+'_'+suffix++;
      used.set(name,true);headers.push(name);
    }
    const rows=[];
    for(let r=2;r<=ws.rowCount;r++){
      const row=ws.getRow(r),item={};let nonempty=false;
      headers.forEach((key,i)=>{const val=cellValue(row.getCell(i+1));item[key]=val;if(val!==null&&val!=='')nonempty=true;});
      if(nonempty)rows.push(item);
    }
    return {headers,rows};
  };
  const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  if(op==='excel-to-json'||op==='excel-to-html'){
    fileInput.addEventListener('change',async()=>{
      workbook=null;sheetSelect.replaceChildren();result.value='';
      const file=fileInput.files&&fileInput.files[0];if(!file)return;
      if(!/\.xlsx$/i.test(file.name)){setStatus('目前只支持 .xlsx 格式（不支持旧版 .xls）');return;}
      if(file.size>50*1024*1024){setStatus('文件不能超过 50 MB');return;}
      try{
        workbook=new ExcelJS.Workbook();
        await workbook.xlsx.load(await file.arrayBuffer());
        workbook.worksheets.forEach((ws,i)=>{const option=document.createElement('option');option.value=ws.name;option.textContent=ws.name||('Sheet '+(i+1));sheetSelect.appendChild(option);});
        setStatus('已读取 '+workbook.worksheets.length+' 个工作表；请选择工作表后转换。');
      }catch(e){workbook=null;setStatus('读取失败：文件可能损坏、受密码保护或不是有效的 XLSX 工作簿。');}
    });
    document.querySelector('#excel-convert').addEventListener('click',()=>{
      if(!workbook){setStatus('请先选择 XLSX 文件');return;}
      const ws=workbook.getWorksheet(sheetSelect.value);
      if(!ws){setStatus('请先选择工作表');return;}
      try{
        const {headers,rows}=getRows(ws);
        if(op==='excel-to-json')result.value=JSON.stringify(rows,null,2);
        else result.value='<table>\n<thead><tr>'+headers.map(h=>'<th>'+escapeHtml(h)+'</th>').join('')+'</tr></thead>\n<tbody>\n'+rows.map(row=>'<tr>'+headers.map(h=>'<td>'+escapeHtml(row[h] instanceof Object?JSON.stringify(row[h]):row[h])+'</td>').join('')+'</tr>').join('\n')+'\n</tbody>\n</table>';
        setStatus('转换完成：'+rows.length+' 行、'+headers.length+' 列。');
      }catch(e){result.value='';setStatus('转换失败：'+(e?.message||String(e)));}
    });
    document.querySelector('#excel-copy').addEventListener('click',async()=>{
      try{await navigator.clipboard.writeText(result.value);setStatus('已复制结果');}
      catch{result.select();setStatus('请手动复制结果');}
    });
  }
  if(op==='json-to-excel'){
    document.querySelector('#excel-export').addEventListener('click',async()=>{
      try{
        const data=JSON.parse(document.querySelector('#excel-json').value);
        if(!Array.isArray(data)||!data.length||data.some(row=>!row||typeof row!=='object'||Array.isArray(row)))throw Error('请输入非空 JSON 对象数组');
        const keys=[...new Set(data.flatMap(row=>Object.keys(row)))];
        if(!keys.length)throw Error('对象数组中没有可导出的字段');
        if(data.length>100000)throw Error('最多导出 100000 行');
        const name=(document.querySelector('#excel-sheet-name').value||'Sheet1').trim().slice(0,31)||'Sheet1';
        const book=new ExcelJS.Workbook();
        const ws=book.addWorksheet(name);
        ws.columns=keys.map(key=>({header:key,key,width:Math.min(40,Math.max(12,key.length+2))}));
        ws.addRows(data);
        ws.getRow(1).font={bold:true};
        ws.views=[{state:'frozen',ySplit:1}];
        const bytes=await book.xlsx.writeBuffer();
        const blob=new Blob([bytes],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url=URL.createObjectURL(blob),a=document.createElement('a');
        a.href=url;a.download=(document.querySelector('#excel-filename').value.trim()||'export').replace(/\.xlsx$/i,'')+'.xlsx';a.click();setTimeout(()=>URL.revokeObjectURL(url),1200);
        setStatus('导出成功：'+data.length+' 行、'+keys.length+' 列。');
      }catch(e){setStatus('导出失败：'+(e?.message||String(e)));}
    });
  }
}
