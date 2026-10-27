'use strict';
const canvas = document.getElementById('noise-field');
const ctx = canvas.getContext('2d');
const toggle = document.getElementById('motion-toggle');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = motionPreference.matches, frameId = null, width = 0, height = 0;
let pointer = { x: -1000, y: -1000 };
const points = Array.from({length:34}, () => ({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.00012,vy:(Math.random()-.5)*.00012}));
function resize() { width=window.innerWidth; height=window.innerHeight; const scale=Math.min(window.devicePixelRatio||1,2);canvas.width=width*scale;canvas.height=height*scale;ctx.setTransform(scale,0,0,scale,0,0);draw(false); }
function draw(move) {ctx.clearRect(0,0,width,height);points.forEach(point=>{if(move){point.x=(point.x+point.vx+1)%1;point.y=(point.y+point.vy+1)%1;}const x=point.x*width,y=point.y*height;ctx.fillStyle='#f2443155';ctx.fillRect(x,y,2,2);const distance=Math.hypot(pointer.x-x,pointer.y-y);if(distance<200){ctx.strokeStyle=`rgba(242,68,49,${(1-distance/200)*.25})`;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(pointer.x,pointer.y);ctx.stroke();}});}
function animate(){draw(true);frameId=requestAnimationFrame(animate);}
function syncMotion(){if(frameId!==null)cancelAnimationFrame(frameId);frameId=null;document.body.classList.toggle('paused',paused);toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'播放动态 ▷':'暂停动态 Ⅱ';if(!paused&&!document.hidden)animate();else draw(false);}
toggle.addEventListener('click',()=>{paused=!paused;syncMotion();});window.addEventListener('pointermove',event=>{pointer={x:event.clientX,y:event.clientY};});window.addEventListener('pointerout',event=>{if(!event.relatedTarget)pointer={x:-1000,y:-1000};});window.addEventListener('resize',resize);document.addEventListener('visibilitychange',syncMotion);motionPreference.addEventListener('change',event=>{paused=event.matches;syncMotion();});resize();syncMotion();
