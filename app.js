(() => {
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const scrollToY=(n)=>window.scrollTo({top:n,behavior:reduced?'instant':'smooth'});
const intro=$('#intro');
let introDismissed=false;
function closeIntro(){if(introDismissed)return;introDismissed=true;intro?.classList.add('done');setTimeout(()=>intro?.remove(),750)}
if(reduced)closeIntro();else setTimeout(closeIntro,1650);
$('.skip-intro')?.addEventListener('click',closeIntro);
// Keep direct-link navigation functional even during splash.
window.addEventListener('hashchange',closeIntro);
const menu=$('#menu-toggle'),nav=$('#main-nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.classList.toggle('open',open)});
$$('#main-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
// Scroll reveal, active navigation, stable surface-based work.
const viewObserver='IntersectionObserver' in window ? new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');viewObserver.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.06}):null;
$$('.reveal').forEach(e=>viewObserver?viewObserver.observe(e):e.classList.add('in-view'));
const anchors=$$('#main-nav a');
let scrollNow=0,viewH=innerHeight,viewW=innerWidth,workMax=0,workShift=0,workRatio=0,processIndex=0,lastScroll=0;
const work=$('#work'),track=$('#work-track'),progress=$('.work-progress-fill'),fraction=$('#work-fraction');
const process=$('#process'),stages=$$('.step-card'),stageCounter=$('#process-num'),ticks=$$('.process-ticks i');
function measure(){viewW=innerWidth;viewH=innerHeight;const gutter=parseFloat(getComputedStyle($('.work-sticky')).paddingLeft)||48;workMax=Math.max(0,(track?.scrollWidth||0)-(viewW-gutter*2));}
function stage(index){index=clamp(index,0,stages.length-1);processIndex=index;stageCounter.textContent=String(index+1).padStart(2,'0');stages.forEach((s,i)=>{s.classList.toggle('active',i===index);s.classList.toggle('past',i<index);s.classList.toggle('behind',i>index);s.setAttribute('aria-hidden',String(i!==index));});ticks.forEach((x,i)=>x.classList.toggle('active',i<=index));}
function updateScroll(){scrollNow=window.scrollY||0;lastScroll=scrollNow;const max=document.documentElement.scrollHeight-viewH;$('.site-progress span').style.width=`${max?scrollNow/max*100:0}%`;
 const hasPinned=innerWidth>800; if(work&&track){if(hasPinned){const start=work.offsetTop;const end=start+work.offsetHeight-viewH;workRatio=clamp((scrollNow-start)/Math.max(1,end-start),0,1);workShift=-(workRatio*workMax);track.style.setProperty('--work-x',`${workShift.toFixed(2)}px`);progress.style.width=`${(workRatio*100).toFixed(2)}%`;const frame=Math.min(4,Math.floor(workRatio*5)+1);fraction.textContent=`${String(frame).padStart(2,'0')} — 04`;const heading=$('.work-heading-wrap h2');if(heading){heading.style.setProperty('--heading-opacity',String(clamp(1-workRatio*12,.0,1)));heading.style.setProperty('--heading-y',`${(-workRatio*80).toFixed(2)}px`);}}else{track.style.removeProperty('--work-x');progress.style.width='100%';}}
 if(process){if(hasPinned){const start=process.offsetTop;const end=start+process.offsetHeight-viewH;const t=clamp((scrollNow-start)/Math.max(1,end-start),0,.9999);stage(Math.floor(t*4));}else if(stages.length&&!stages[processIndex].classList.contains('active'))stage(processIndex);}
 let active=null;for(const a of anchors){const section=$(a.getAttribute('href'));if(section&&section.getBoundingClientRect().top<viewH*.37)active=a;}anchors.forEach(a=>a.classList.toggle('active',a===active));}
window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(()=>{scrollPending=false;updateScroll()})}},{passive:true});let scrollPending=false;window.addEventListener('resize',()=>{measure();updateScroll()},{passive:true});document.fonts?.ready.then(()=>{measure();updateScroll()});window.addEventListener('load',()=>{measure();updateScroll()});measure();updateScroll();
// Cursor: independent spring-smoothed layers, no CSS transition delays between pointer events.
let targetX=viewW/2,targetY=viewH/2,smoothX=targetX,smoothY=targetY,ringX=targetX,ringY=targetY,ptrSeen=false;
let gazeDirection=''; const gazeLayers=$('.eye-overlay');let gazeNext=0;function applyGaze(dir){if(dir===gazeDirection)return;if(dir&&performance.now()<gazeNext)return;gazeDirection=dir;gazeNext=performance.now()+95;gazeLayers.forEach(e=>e.classList.toggle('visible',e.dataset.gaze===dir))}

const ring=$('#cursor-ring'),dot=$('#cursor-dot'),hero=$('.hero'),big=$('#hero-big'),portrait=$('#hero-portrait-wrap'),faceDepth=$('#hero-portrait-depth'),foot=$('#footer-giant');
function pointer(e){targetX=e.clientX;targetY=e.clientY;ptrSeen=true;if(fine){ring.style.opacity='1';dot.style.opacity='1';}}
window.addEventListener('pointermove',pointer,{passive:true});window.addEventListener('pointerleave',()=>{ptrSeen=false;ring.style.opacity=0;dot.style.opacity=0});
let faceAimX=0,faceAimY=0,colorAim=0;
if(fine&&!reduced){function render(){smoothX=lerp(smoothX,targetX,.11);smoothY=lerp(smoothY,targetY,.11);ringX=lerp(ringX,targetX,.19);ringY=lerp(ringY,targetY,.19);ring.style.transform=`translate3d(${ringX}px,${ringY}px,0)`;dot.style.transform=`translate3d(${targetX}px,${targetY}px,0)`;
 if(hero){const rect=hero.getBoundingClientRect();const relX=(smoothX-rect.left)/Math.max(1,rect.width),relY=(smoothY-rect.top)/Math.max(1,rect.height);const inside=relX>=0&&relX<=1&&relY>=0&&relY<=1;const px=clamp(relX,0,1),py=clamp(relY,0,1);hero.style.setProperty('--hx',`${(px*100).toFixed(2)}%`);hero.style.setProperty('--hy',`${(py*100).toFixed(2)}%`);if(big){const r=big.getBoundingClientRect();const x=(smoothX-r.left)/Math.max(1,r.width);const y=(smoothY-r.top)/Math.max(1,r.height);big.style.setProperty('--mx',`${(clamp(x,0,1)*100).toFixed(1)}%`);big.style.setProperty('--my',`${(clamp(y,0,1)*100).toFixed(1)}%`)}const pr=portrait.getBoundingClientRect();
 const cx=pr.left+pr.width*.52, cy=pr.top+pr.height*.315;
 const nx=clamp((targetX-cx)/Math.max(1,pr.width*.52),-1,1);
 const ny=clamp((targetY-cy)/Math.max(1,pr.height*.53),-1,1);
 const active=ptrSeen&&inside;
 const aimX=active?nx:0,aimY=active?ny:0;
 faceAimX=lerp(faceAimX,aimX,.105);faceAimY=lerp(faceAimY,aimY,.105);
 // Aim at the face center rather than the center of the full hero section.
 const gdir=!active?'':Math.abs(faceAimX)>Math.abs(faceAimY)*1.1?(faceAimX<-.23?'left':faceAimX>.23?'right':''):(faceAimY<-.24?'up':faceAimY>.24?'down':'');
 applyGaze(gdir);
 portrait.style.setProperty('--portrait-x',`${(faceAimX*12).toFixed(2)}px`);
 portrait.style.setProperty('--portrait-y',`${(faceAimY*8).toFixed(2)}px`);
 faceDepth.style.setProperty('--face-rx',`${(faceAimX*8).toFixed(2)}deg`);
 faceDepth.style.setProperty('--face-ry',`${(-faceAimY*5).toFixed(2)}deg`);
 const localX=clamp((targetX-pr.left)/Math.max(1,pr.width),0,1);
 const localY=clamp((targetY-pr.top)/Math.max(1,pr.height),0,1);
 // The visual portrait is narrower than its container; do not illuminate empty hero space.
 const overFigure=active&&localX>.18&&localX<.83&&localY>.06&&localY<.94;
 colorAim=lerp(colorAim,overFigure?1:0,overFigure?.19:.12);
 faceDepth.style.setProperty('--color-intensity',colorAim.toFixed(3));
 faceDepth.style.setProperty('--color-x',`${(localX*100).toFixed(2)}%`);
 faceDepth.style.setProperty('--color-y',`${(localY*100).toFixed(2)}%`);
 portrait.style.setProperty('--fx',`${(localX*100).toFixed(2)}%`);
 portrait.style.setProperty('--fy',`${(localY*100).toFixed(2)}%`);
 const dx=active?(px-.5):0,dy=active?(py-.48):0;
 $$('.hero-float-card').forEach(c=>{const depth=parseFloat(c.dataset.depth)||0;c.style.translate=`${(dx*depth*70).toFixed(2)}px ${(dy*depth*65).toFixed(2)}px`;});}
 if(foot){const r=foot.getBoundingClientRect();foot.style.setProperty('--foot-x',`${clamp((smoothX-r.left)/r.width*100,0,100)}%`);foot.style.setProperty('--foot-y',`${clamp((smoothY-r.top)/r.height*100,0,100)}%`)}
 requestAnimationFrame(render)}requestAnimationFrame(render)}
if(fine)$$('a,button,.project-card,.service-card,.tool-tile').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('hovering'));el.addEventListener('mouseleave',()=>ring.classList.remove('hovering'))});
$$('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{if(!fine||reduced)return;const r=el.getBoundingClientRect();const dx=(e.clientX-r.left-r.width/2),dy=e.clientY-r.top-r.height/2;el.style.transform=`translate3d(${dx*.18}px,${dy*.3}px,0)`});el.addEventListener('pointerleave',()=>{el.style.transform=''})});
// Services: one active panel at a time, broad active width + local spot light.
const services=$$('.service-card');services.forEach(s=>{s.style.setProperty('--accent',s.dataset.accent);const activate=()=>services.forEach(c=>c.classList.toggle('is-active',c===s));s.addEventListener('pointerenter',activate);s.addEventListener('focusin',activate);s.addEventListener('pointermove',e=>{if(!fine)return;const r=s.getBoundingClientRect();s.style.setProperty('--local-x',`${((e.clientX-r.left)/r.width*100).toFixed(1)}%`);s.style.setProperty('--local-y',`${((e.clientY-r.top)/r.height*100).toFixed(1)}%`)});s.addEventListener('click',()=>{$('#contact')?.scrollIntoView({behavior:reduced?'instant':'smooth'})});s.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();s.click()}})});
// Scroll-synced gallery and direct wheel/touch/arrow navigation.
let desktopWork=()=>innerWidth>800;
function gotoProject(i){const rect=work.getBoundingClientRect();const start=scrollNow+rect.top;const end=start+work.offsetHeight-viewH;scrollToY(start+clamp(i/4,0,1)*(end-start));}
$('#work-next')?.addEventListener('click',()=>desktopWork()?gotoProject(clamp(Math.floor(workRatio*4)+1,0,4)):$('#work-track').scrollBy({left:380,behavior:'smooth'}));
$('#work-prev')?.addEventListener('click',()=>desktopWork()?gotoProject(clamp(Math.ceil(workRatio*4)-1,0,4)):$('#work-track').scrollBy({left:-380,behavior:'smooth'}));
$$('.project-card').forEach(c=>{c.addEventListener('pointermove',e=>{if(!fine||reduced)return;const r=c.getBoundingClientRect();let x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(1050px) rotateY(${(x*5).toFixed(2)}deg) rotateX(${(-y*4).toFixed(2)}deg)`;const art=$('.project-art',c),im=$('img',c);art.style.setProperty('--spot-x',`${(x+.5)*100}%`);art.style.setProperty('--spot-y',`${(y+.5)*100}%`);im.style.setProperty('--card-x',`${(-x*22).toFixed(2)}px`);im.style.setProperty('--card-y',`${(-y*16).toFixed(2)}px`);});c.addEventListener('pointerleave',()=>{c.style.transform='';const im=$('img',c);im.style.setProperty('--card-x','0px');im.style.setProperty('--card-y','0px')});});
const projects=[['SpendWise AI','A vivid digital product experience that makes complex financial decisions feel natural and human.','assets/spendwise.svg'],['Fluxio Studio','A kinetic identity system mixing bold color, expressive motion and confident typography.','assets/fluxio.svg'],['Inkwell Maze','An experimental visual world of liquid color, texture, movement and curious digital storytelling.','assets/inkwell.svg'],['Orbit Labs','An immersive interactive platform blending precision, playful 3D and futuristic expression.','assets/orbit.svg']];
const dlg=$('#project-dialog');function openProject(i){const p=projects[i];if(!p)return;$('#dialog-title').textContent=p[0];$('#dialog-copy').textContent=p[1];$('#dialog-image').src=p[2];if(typeof dlg.showModal==='function')dlg.showModal();else dlg.setAttribute('open','')}
$$('.project-card').forEach(c=>{c.addEventListener('click',()=>openProject(+c.dataset.project));c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProject(+c.dataset.project)}})});$('#dialog-close')?.addEventListener('click',()=>dlg.close());dlg?.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});$('#dialog-contact')?.addEventListener('click',()=>dlg.close());
// About live media controls with actual pause/play.
const video=$('#about-video video'),videoToggle=$('#video-toggle');videoToggle?.addEventListener('click',()=>{if(video.paused){video.play().then(()=>{videoToggle.textContent='Ⅱ';videoToggle.setAttribute('aria-label','Pause portrait video')}).catch(()=>{});}else{video.pause();videoToggle.textContent='▶';videoToggle.setAttribute('aria-label','Play portrait video')}});
function updateTime(){try{const t=new Date;$('#local-clock').textContent=t.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Kolkata'});}catch{}}updateTime();setInterval(updateTime,20000);
// Process scrub by section scroll position; independent buttons for non-scroll input.
function gotoStage(i){i=clamp(i,0,3);stage(i);if(innerWidth>800){const start=process.offsetTop;const end=start+process.offsetHeight-viewH;scrollToY(start+((i+.12)/4)*(end-start));}}
$('#process-next')?.addEventListener('click',()=>gotoStage(processIndex+1));$('#process-prev')?.addEventListener('click',()=>gotoStage(processIndex-1));stage(0);
const scene=$('#process-scene');scene?.addEventListener('pointermove',e=>{if(!fine||reduced)return;const r=scene.getBoundingClientRect(),dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;scene.style.setProperty('--step-tilt',`${(dx*2.7).toFixed(2)}deg`);scene.style.setProperty('--step-x',`${(dx*19).toFixed(2)}px`);scene.style.setProperty('--step-y',`${(dy*15).toFixed(2)}px`)});scene?.addEventListener('pointerleave',()=>{scene.style.setProperty('--step-tilt','0deg');scene.style.setProperty('--step-x','0px');scene.style.setProperty('--step-y','0px')});
// Proximity grid emits the nearest 8 tile lights without any per-tile animations.
const tools=$$('.tool-tile'),toolGrid=$('#tools-grid');if(fine&&!reduced){toolGrid?.addEventListener('pointermove',e=>{tools.forEach(t=>{const r=t.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,d=Math.hypot(cx-e.clientX,cy-e.clientY);t.classList.toggle('nearby',d<170);t.style.setProperty('--tx',`${(e.clientX-r.left)/r.width*100}%`);t.style.setProperty('--ty',`${(e.clientY-r.top)/r.height*100}%`);if(d<140){t.style.setProperty('--rx',`${((e.clientY-cy)/r.height*5).toFixed(1)}deg`);t.style.setProperty('--ry',`${(-(e.clientX-cx)/r.width*5).toFixed(1)}deg`)}})});toolGrid?.addEventListener('pointerleave',()=>tools.forEach(t=>t.classList.remove('nearby')))}
// Native accessible drag + button reviews. Prevent card text selection while dragging.
const review=$('#review-viewport');let dragging=false,startX=0,startScroll=0,dragMoved=false;
review?.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;dragging=true;dragMoved=false;startX=e.clientX;startScroll=review.scrollLeft;review.setPointerCapture(e.pointerId)});
review?.addEventListener('pointermove',e=>{if(!dragging)return;const move=e.clientX-startX;if(Math.abs(move)>5)dragMoved=true;review.scrollLeft=startScroll-move;});
for(const event of ['pointerup','pointercancel','lostpointercapture'])review?.addEventListener(event,()=>{dragging=false});review?.addEventListener('click',e=>{if(dragMoved){e.preventDefault();dragMoved=false}},true);
$('#review-next')?.addEventListener('click',()=>review.scrollBy({left:Math.min(510,innerWidth*.77),behavior:'smooth'}));$('#review-prev')?.addEventListener('click',()=>review.scrollBy({left:-Math.min(510,innerWidth*.77),behavior:'smooth'}));
$$('.review-card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--rc-x',`${(e.clientX-r.left)/r.width*100}%`);card.style.setProperty('--rc-y',`${(e.clientY-r.top)/r.height*100}%`)}));
// Contact is an explicit mailto, not a fictitious backend.
$('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const n=$('#name').value.trim(),em=$('#email').value.trim(),msg=$('#message').value.trim(),out=$('#form-response');if(n.length<2){out.textContent='Please enter your name (at least 2 characters).';$('#name').focus();return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){out.textContent='Please enter a valid email address.';$('#email').focus();return}if(msg.length<10){out.textContent='Please add at least 10 characters about your project.';$('#message').focus();return}out.textContent='Opening your email app with a draft. Nothing has been sent yet.';const subject=encodeURIComponent('Project enquiry from '+n);const body=encodeURIComponent(`Name: ${n}\nReply to: ${em}\n\n${msg}`);window.location.href=`mailto:hello@ayramalik.studio?subject=${subject}&body=${body}`;});
})();
