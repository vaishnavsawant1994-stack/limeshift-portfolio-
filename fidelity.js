/* Reference fidelity improvements are additive: site remains functional with JS disabled. */
(()=>{'use strict';
 const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const hero=$('.hero'),portrait=$('#hero-portrait-wrap');
 if(hero){const pulse=document.createElement('div');pulse.className='hero-pulse';hero.insertBefore(pulse,portrait||hero.lastChild)}
 const isPointer=()=>fine&&!reduce;
 // One frame per pointer burst. Local glow uses coordinates in each card's own box.
 const surfaces=$$('.hero-float-card,.about-grid>div,.review-card,.contact-form,.step-card');
 surfaces.forEach(el=>{
   el.classList.add('spot-surface');
   if(!fine)return;
   el.addEventListener('pointermove',e=>{
     const b=el.getBoundingClientRect(),x=(e.clientX-b.left)/Math.max(1,b.width)*100,y=(e.clientY-b.top)/Math.max(1,b.height)*100;
     el.style.setProperty('--spot-x',x.toFixed(2)+'%');el.style.setProperty('--spot-y',y.toFixed(2)+'%');
     el.style.setProperty('--cx',x.toFixed(2)+'%');el.style.setProperty('--cy',y.toFixed(2)+'%');
   },{passive:true})
 });
 // Keep the active service shutter in view; temporarily keep it active after keyboard activation.
 const services=$$('.service-card');
 const serviceGrid=$('#services-grid');
 let serviceFocus=1;
 function activateService(i){serviceFocus=i;services.forEach((n,j)=>n.classList.toggle('is-active',j===i))}
 services.forEach((el,i)=>{
   el.addEventListener('keydown',e=>{
     if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();activateService((i+1)%services.length);services[(i+1)%services.length].focus()}
     if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();activateService((i+services.length-1)%services.length);services[(i+services.length-1)%services.length].focus()}
   });
 });
 // Momentum drag for the testimonial rail. Respect direct buttons and native touch scrolling.
 const rail=$('#review-viewport');let velocity=0,previousX=0,previousT=0,dragging=false,anim=0;
 if(rail&&!reduce){
   rail.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;cancelAnimationFrame(anim);velocity=0;previousX=e.clientX;previousT=performance.now();dragging=true},{passive:true});
   rail.addEventListener('pointermove',e=>{if(!dragging)return;const now=performance.now(),dt=Math.max(8,now-previousT);velocity=(e.clientX-previousX)/dt;previousX=e.clientX;previousT=now},{passive:true});
   const settle=()=>{if(!dragging)return;dragging=false;let v=velocity*16;const glide=()=>{v*=.90;if(Math.abs(v)<.5)return;rail.scrollLeft-=v;anim=requestAnimationFrame(glide)};anim=requestAnimationFrame(glide)};
   rail.addEventListener('pointerup',settle,{passive:true});rail.addEventListener('pointercancel',()=>{dragging=false;cancelAnimationFrame(anim)},{passive:true});
 }
 // Correct scroll-based horizontal gallery measurements after every raster/font load.
 let raf=0;
 const updateGallery=()=>{
   if(!$('#work')||innerWidth<=800)return;
   const w=$('#work'),track=$('#work-track'),sticky=$('#work-sticky');
   const b=w.getBoundingClientRect(),range=Math.max(1,w.offsetHeight-innerHeight),ratio=Math.min(1,Math.max(0,-b.top/range));
   const introWidth=0;
   const view=sticky.getBoundingClientRect().width;
   const max=Math.max(0,track.scrollWidth-(view-(parseFloat(getComputedStyle(sticky).paddingLeft)||0)*2));
   track.style.setProperty('--work-x',(-ratio*max).toFixed(2)+'px');
   const bar=$('.work-progress-fill');if(bar)bar.style.width=(ratio*100).toFixed(1)+'%';
 };
 addEventListener('resize',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(updateGallery)},{passive:true});
 addEventListener('scroll',()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;updateGallery()})},{passive:true});
 addEventListener('load',updateGallery,{once:true});
 // In the original clip, the spotlight follows the actual pointer over the footer,
 // whereas the idle state remains mostly dark. This also enables keyboard focus.
 const foot=$('#footer-giant');if(foot){foot.addEventListener('pointerleave',()=>{if(!fine)return;foot.style.setProperty('--foot-x','50%');foot.style.setProperty('--foot-y','50%')},{passive:true})}
 // Extra native touch-device navigation: do not hide controls behind hover-only gestures.
 if(!fine){const first=services[0];if(first&&serviceGrid)serviceGrid.setAttribute('aria-label','Four interactive services. Tap a card to view contact options.')}
})();
