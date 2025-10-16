/* Calculator - script.js */
const screen = document.getElementById('screen');
let expr = '';

function render(){
  screen.textContent = expr || '0';
}

// sanitize and compute expression safely
function compute(s){
  // replace × ÷ with * /
  const safe = s.replace(/×/g,'*').replace(/÷/g,'/').replace(/%/g,'/100');
  try{
    // Very small eval usage; production should use a parser.
    const result = Function('"use strict";return (' + safe + ')')();
    return String(result);
  }catch(e){
    return 'Error';
  }
}

document.querySelectorAll('button').forEach(btn=>{
  const val = btn.dataset.value;
  const action = btn.dataset.action;
  btn.addEventListener('click', ()=>{
    if(action==='clear'){ expr=''; render(); return; }
    if(action==='back'){ expr = expr.slice(0,-1); render(); return; }
    if(action==='equals'){ expr = compute(expr); render(); return; }
    // append value
    expr += val;
    render();
  });
});

// keyboard support
document.addEventListener('keydown', (e)=>{
  const key = e.key;
  if(/\d/.test(key)) { expr += key; render(); return; }
  if(key === 'Enter' || key === '='){ expr = compute(expr); render(); return; }
  if(key === 'Backspace'){ expr = expr.slice(0,-1); render(); return; }
  if(key === 'Escape'){ expr = ''; render(); return; }
  if(key === '.') { expr += '.'; render(); return; }
  if(key === '+'||key === '-'||key === '*'||key ==='/'){ expr += key; render(); return; }
});
