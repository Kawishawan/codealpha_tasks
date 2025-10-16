/* Image Gallery - script.js */
const gallery = document.getElementById('gallery');
const figures = Array.from(gallery.querySelectorAll('figure'));
const filters = document.querySelectorAll('.controls button');
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
let currentIndex = 0;

filters.forEach(btn=>{
  btn.addEventListener('click', ()=> {
    filters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    figures.forEach((f,i)=>{
      if(cat==='all' || f.dataset.category===cat) f.style.display='';
      else f.style.display='none';
    });
  });
});

figures.forEach((fig, i)=>{
  fig.addEventListener('click', ()=> openLightbox(i));
});

function openLightbox(index){
  currentIndex = index;
  updateLightbox();
  lb.setAttribute('aria-hidden','false');
}

function closeLightbox(){ lb.setAttribute('aria-hidden','true'); }

function updateLightbox(){
  const visibleFigures = figures.filter(f=>f.style.display!=='none');
  if(visibleFigures.length===0) return;
  const fig = visibleFigures[currentIndex] || visibleFigures[0];
  lbImg.src = fig.querySelector('img').src;
  lbCaption.textContent = fig.querySelector('figcaption').textContent;
  // normalize currentIndex to be index within visibleFigures
  currentIndex = visibleFigures.indexOf(fig);
}

document.querySelector('.lightbox .close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox .prev').addEventListener('click', ()=>{
  const visible = figures.filter(f=>f.style.display!=='none');
  currentIndex = (currentIndex - 1 + visible.length) % visible.length;
  updateLightbox();
});
document.querySelector('.lightbox .next').addEventListener('click', ()=>{
  const visible = figures.filter(f=>f.style.display!=='none');
  currentIndex = (currentIndex + 1) % visible.length;
  updateLightbox();
});
lb.addEventListener('click', (e)=> { if(e.target===lb) closeLightbox(); });
document.addEventListener('keydown', (e)=>{
  if(lb.getAttribute('aria-hidden')==='false'){
    if(e.key==='Escape') closeLightbox();
    if(e.key==='ArrowLeft') document.querySelector('.lightbox .prev').click();
    if(e.key==='ArrowRight') document.querySelector('.lightbox .next').click();
  }
});
