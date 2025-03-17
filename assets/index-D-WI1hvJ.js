import{r as l,a as O,R as V}from"./vendor-nf7bT_Uh.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();var T={exports:{}},j={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var W=l,H=Symbol.for("react.element"),D=Symbol.for("react.fragment"),q=Object.prototype.hasOwnProperty,X=W.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,U={key:!0,ref:!0,__self:!0,__source:!0};function E(s,o,t){var a,r={},n=null,i=null;t!==void 0&&(n=""+t),o.key!==void 0&&(n=""+o.key),o.ref!==void 0&&(i=o.ref);for(a in o)q.call(o,a)&&!U.hasOwnProperty(a)&&(r[a]=o[a]);if(s&&s.defaultProps)for(a in o=s.defaultProps,o)r[a]===void 0&&(r[a]=o[a]);return{$$typeof:H,type:s,key:n,ref:i,props:r,_owner:X.current}}j.Fragment=D;j.jsx=E;j.jsxs=E;T.exports=j;var e=T.exports,N={},A=O;N.createRoot=A.createRoot,N.hydrateRoot=A.hydrateRoot;/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),I=(...s)=>s.filter((o,t,a)=>!!o&&o.trim()!==""&&a.indexOf(o)===t).join(" ").trim();/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var J={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=l.forwardRef(({color:s="currentColor",size:o=24,strokeWidth:t=2,absoluteStrokeWidth:a,className:r="",children:n,iconNode:i,...c},h)=>l.createElement("svg",{ref:h,...J,width:o,height:o,stroke:s,strokeWidth:a?Number(t)*24/Number(o):t,className:I("lucide",r),...c},[...i.map(([x,m])=>l.createElement(x,m)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=(s,o)=>{const t=l.forwardRef(({className:a,...r},n)=>l.createElement(K,{ref:n,iconNode:o,className:I(`lucide-${G(s)}`,a),...r}));return t.displayName=`${s}`,t};/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],Q=w("ChevronLeft",Z);/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],te=w("ChevronRight",ee);/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]],ae=w("Heart",re);/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],ne=w("Volume2",se);/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],k=w("X",oe),ie=({isOpen:s,onClose:o,settings:t,onSettingsChange:a})=>{const[r,n]=l.useState([]);return l.useEffect(()=>{if("speechSynthesis"in window){const i=()=>{const c=window.speechSynthesis.getVoices();c.length>0&&n(c)};return i(),window.speechSynthesis.onvoiceschanged=i,()=>{window.speechSynthesis.onvoiceschanged=null}}},[]),s?e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-80 z-40 flex items-center justify-center p-4",children:e.jsxs("div",{className:"bg-gray-800 rounded-lg w-full max-w-4xl p-6 relative border border-purple-500",children:[e.jsx("button",{onClick:o,className:"absolute top-4 right-4 bg-red-600 hover:bg-red-500 text-white p-2 rounded-full","aria-label":"Close settings",children:e.jsx(k,{size:24})}),e.jsx("h2",{className:"text-3xl font-bold text-center mb-6 text-purple-300",style:{textShadow:"0 0 8px #a855f7, 0 0 15px #a855f7"},children:"Library Settings"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[e.jsxs("div",{className:"bg-gray-700 p-5 rounded-lg",children:[e.jsx("h3",{className:"text-xl font-bold mb-4 text-amber-300",children:"Narration Settings"}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Narrator Voice"}),e.jsxs("select",{value:t.voice,onChange:i=>a({...t,voice:i.target.value}),className:"w-full px-3 py-2 bg-gray-800 text-white rounded-lg",children:[r.map(i=>e.jsx("option",{value:i.name,children:i.name},i.name)),r.length===0&&e.jsx("option",{value:"default",children:"Default Voice"})]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"block text-gray-300 mb-2",children:["Reading Speed: ",t.voiceSpeed.toFixed(1),"x"]}),e.jsx("input",{type:"range",min:"0.5",max:"2",step:"0.1",value:t.voiceSpeed,onChange:i=>a({...t,voiceSpeed:parseFloat(i.target.value)}),className:"w-full"})]}),e.jsx("div",{children:e.jsx("button",{onClick:()=>{if("speechSynthesis"in window){const i="Hello! This is how I will sound when reading books to you.",c=new SpeechSynthesisUtterance(i);if(t.voice!=="default"){const h=r.find(x=>x.name===t.voice);h&&(c.voice=h)}c.rate=t.voiceSpeed,window.speechSynthesis.speak(c)}},className:"w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg",children:"Test Voice"})})]}),e.jsxs("div",{className:"bg-gray-700 p-5 rounded-lg",children:[e.jsx("h3",{className:"text-xl font-bold mb-4 text-amber-300",children:"Visual Settings"}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Background Particles"}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2",children:[e.jsx("button",{onClick:()=>a({...t,particles:"none"}),className:`py-2 rounded ${t.particles==="none"?"bg-blue-600 text-white":"bg-gray-800 text-gray-300"}`,children:"None"}),e.jsx("button",{onClick:()=>a({...t,particles:"few"}),className:`py-2 rounded ${t.particles==="few"?"bg-blue-600 text-white":"bg-gray-800 text-gray-300"}`,children:"Few"}),e.jsx("button",{onClick:()=>a({...t,particles:"normal"}),className:`py-2 rounded ${t.particles==="normal"?"bg-blue-600 text-white":"bg-gray-800 text-gray-300"}`,children:"Normal"}),e.jsx("button",{onClick:()=>a({...t,particles:"many"}),className:`py-2 rounded ${t.particles==="many"?"bg-blue-600 text-white":"bg-gray-800 text-gray-300"}`,children:"Many"})]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Text Size"}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2",children:[e.jsx("button",{onClick:()=>a({...t,textSize:"small"}),className:`py-2 rounded ${t.textSize==="small"?"bg-blue-600 text-white":"bg-gray-800 text-gray-300"}`,children:"Small"}),e.jsx("button",{onClick:()=>a({...t,textSize:"medium"}),className:`py-2 rounded ${t.textSize==="medium"?"bg-blue-600 text-white":"bg-gray-800 text-gray-300"}`,children:"Medium"}),e.jsx("button",{onClick:()=>a({...t,textSize:"large"}),className:`py-2 rounded ${t.textSize==="large"?"bg-blue-600 text-white":"bg-gray-800 text-gray-300"}`,children:"Large"}),e.jsx("button",{onClick:()=>a({...t,textSize:"xlarge"}),className:`py-2 rounded ${t.textSize==="xlarge"?"bg-blue-600 text-white":"bg-gray-800 text-gray-300"}`,children:"X-Large"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Animation Speed"}),e.jsxs("div",{className:"grid grid-cols-3 gap-2",children:[e.jsx("button",{onClick:()=>a({...t,animationSpeed:"slow"}),className:`py-2 rounded ${t.animationSpeed==="slow"?"bg-blue-600 text-white":"bg-gray-800 text-gray-300"}`,children:"Slow"}),e.jsx("button",{onClick:()=>a({...t,animationSpeed:"normal"}),className:`py-2 rounded ${t.animationSpeed==="normal"?"bg-blue-600 text-white":"bg-gray-800 text-gray-300"}`,children:"Normal"}),e.jsx("button",{onClick:()=>a({...t,animationSpeed:"fast"}),className:`py-2 rounded ${t.animationSpeed==="fast"?"bg-blue-600 text-white":"bg-gray-800 text-gray-300"}`,children:"Fast"})]})]})]})]}),e.jsx("div",{className:"mt-6 flex justify-center",children:e.jsx("button",{onClick:o,className:"px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xl",children:"Save Settings"})})]})}):null},le=({density:s="normal",speed:o="normal"})=>{const t=l.useRef(null),a=l.useRef(0);return l.useEffect(()=>{const r=t.current;if(!r)return;const n=r.getContext("2d");if(!n)return;const i=()=>{r.width=window.innerWidth,r.height=window.innerHeight};i(),window.addEventListener("resize",i);let c;switch(s){case"none":c=0;break;case"few":c=8;break;case"normal":c=15;break;case"many":c=25;break;default:c=15}let h;switch(o){case"slow":h=.5;break;case"normal":h=1;break;case"fast":h=1.5;break;default:h=1}const x=["🧶","🪡","🧵","✂️"],m=[];for(let d=0;d<c;d++)m.push({x:Math.random()*r.width,y:Math.random()*r.height,size:25+Math.random()*35,speedX:(Math.random()-.5)*1.2*h,speedY:(Math.random()-.5)*1.2*h,type:x[Math.floor(Math.random()*x.length)],rotation:Math.random()*360,rotationSpeed:(Math.random()-.5)*2*h,opacity:.4+Math.random()*.5});const b=()=>{n.clearRect(0,0,r.width,r.height),m.forEach(d=>{d.x+=d.speedX,d.y+=d.speedY,d.rotation+=d.rotationSpeed,(d.x<0||d.x>r.width)&&(d.speedX*=-1),(d.y<0||d.y>r.height)&&(d.speedY*=-1),n.save(),n.translate(d.x,d.y),n.rotate(d.rotation*Math.PI/180),n.globalAlpha=d.opacity,n.font=`${d.size}px Arial`,n.textAlign="center",n.textBaseline="middle",n.fillText(d.type,0,0),n.restore()}),a.current=requestAnimationFrame(b)};return b(),()=>{window.removeEventListener("resize",i),cancelAnimationFrame(a.current)}},[s,o]),e.jsx("canvas",{ref:t,className:"fixed inset-0 pointer-events-none",style:{zIndex:0}})},ce=()=>{const[s,o]=l.useState(110),[t,a]=l.useState(0),r=["Find joy in each stitch as your hands create what your heart imagines","Your passion for color and texture transforms simple yarn into magic","In each hook and loop, you weave stories that connect generations","Believe in the power of your creativity to bring warmth into the world","Time spent creating with your hands is never wasted, but treasured","Let your spirit flow through each thread, creating patterns of love"];return l.useEffect(()=>{const n=setInterval(()=>{o(i=>i<-120?(a(c=>(c+1)%r.length),110):i-.6)},30);return()=>clearInterval(n)},[r.length]),e.jsx("div",{className:"relative w-full h-16 overflow-hidden flex items-center",children:e.jsx("div",{className:"absolute whitespace-nowrap font-serif text-3xl",style:{transform:`translateX(${s}%)`,background:"linear-gradient(90deg, #7e22ce, #fbbf24, #7e22ce)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundSize:"200% 100%",animation:"gradientShift 4s linear infinite"},children:r[t]})})},de=({book:s,onOpenBook:o})=>{const[t,a]=l.useState(!1),[r,n]=l.useState(!1),i=c=>{if(c.stopPropagation(),t){window.speechSynthesis.cancel(),a(!1);return}if("speechSynthesis"in window){const h=`${s.title} by ${s.author}. ${s.description}`,x=new SpeechSynthesisUtterance(h);x.rate=.9,x.onend=()=>a(!1),window.speechSynthesis.speak(x),a(!0)}};return e.jsxs("div",{className:"relative rounded-lg overflow-hidden bg-gray-900 bg-opacity-60 backdrop-blur-sm border border-gray-700 transition-all duration-500 h-full flex flex-col",style:{transform:r?"translateY(-10px) scale(1.02)":"translateY(0) scale(1)",boxShadow:r?`0 0 40px ${s.bubbleColor}80, 0 0 20px ${s.bubbleColor}40`:"0 0 15px rgba(0,0,0,0.3)"},onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),children:[e.jsxs("div",{className:"p-4 pb-2",children:[e.jsx("h3",{className:"text-4xl font-bold",style:{color:s.bubbleColor},children:s.title}),e.jsxs("p",{className:"text-xl flex items-center",children:["by ",e.jsx("span",{className:"author-name ml-2 mr-2",style:{color:"#a855f7",textShadow:"0 0 8px #a855f7, 0 0 15px #a855f7, 0 0 25px #a855f7",animation:"pulse-purple 2s infinite"},children:s.author}),e.jsx("button",{onClick:i,className:`ml-3 p-3 rounded-full transition-colors ${t?"bg-red-600 text-white":"bg-blue-700 text-white hover:bg-blue-600"}`,"aria-label":t?"Stop narration":"Narrate description",children:e.jsx(ne,{size:20})})]})]}),e.jsxs("div",{className:"w-full aspect-[3/4] overflow-hidden flex items-center justify-center transition-all duration-300 relative",style:{background:s.gradient,filter:r?"brightness(1.1)":"brightness(1)"},children:[e.jsx("img",{src:s.coverImage,alt:`${s.title} cover`,className:"w-full h-full object-cover transition-transform duration-500",style:{transform:r?"scale(1.05)":"scale(1)"}}),e.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:e.jsx("button",{onClick:c=>{c.stopPropagation(),o(s)},className:`px-8 py-4 text-white rounded-lg transform transition text-xl font-bold ${r?"scale-110":""}`,style:{backgroundColor:s.bubbleColor,boxShadow:"0 0 25px rgba(0,0,0,0.5)"},children:"Read Now"})})]}),e.jsxs("div",{className:"p-4 pt-3 flex-grow",children:[e.jsx("p",{className:"text-gray-200 text-xl mb-3 leading-relaxed",children:s.description}),e.jsx("div",{className:"flex flex-wrap gap-2 mt-3",children:s.genres.map((c,h)=>{const x=["#FF6B6B","#48BEFF","#9775FA","#4CAF50"],m=x[h%x.length];return e.jsx("span",{className:"inline-block rounded-full px-4 py-2 text-base font-medium transition-all duration-300",style:{backgroundColor:r?`${m}40`:`${m}20`,color:m,border:`1px solid ${m}40`},children:c},h)})})]}),e.jsx("div",{className:"p-4 pt-0 flex justify-center",children:e.jsxs("button",{onClick:()=>o(s),className:"w-full py-4 text-white rounded-lg font-bold text-xl shadow-lg hover:shadow-xl transition-all",style:{backgroundColor:s.bubbleColor},children:['Open "',s.title,'"']})})]})},he=({book:s,onClose:o,settings:t})=>{const[a,r]=l.useState(0),[n,i]=l.useState(!1),[c,h]=l.useState((t==null?void 0:t.voice)||"default"),[x,m]=l.useState([]),[b,d]=l.useState((t==null?void 0:t.voiceSpeed)||1),[S,Y]=l.useState(!1),[f,v]=l.useState((t==null?void 0:t.textSize)||"large"),$=l.useRef(null),y=s.content.length;l.useEffect(()=>{if("speechSynthesis"in window){const u=()=>{var p;const g=window.speechSynthesis.getVoices();g.length>0&&(m(g),h(((p=g[0])==null?void 0:p.name)||"default"))};return u(),window.speechSynthesis.onvoiceschanged=u,()=>{window.speechSynthesis.onvoiceschanged=null}}},[]),l.useEffect(()=>(n&&C(()=>{if(a<y-1){const u=setTimeout(()=>{r(g=>g+1)},1e3);return()=>clearTimeout(u)}else i(!1)}),()=>{"speechSynthesis"in window&&window.speechSynthesis.cancel()}),[n,a,y]);const L=()=>{a<y-1&&(n&&window.speechSynthesis.cancel(),r(u=>u+1))},P=()=>{a>0&&(n&&window.speechSynthesis.cancel(),r(u=>u-1))},C=u=>{if("speechSynthesis"in window){window.speechSynthesis.cancel();const g=s.content[a],p=new SpeechSynthesisUtterance(g);if(c!=="default"){const R=x.find(B=>B.name===c);R&&(p.voice=R)}p.rate=b,u&&(p.onend=u),window.speechSynthesis.speak(p)}},M=()=>{n?(window.speechSynthesis.cancel(),i(!1)):i(!0)},z=()=>{C()},F=()=>{"speechSynthesis"in window&&(window.speechSynthesis.cancel(),i(!1))},_=()=>{switch(f){case"small":return"text-xl";case"medium":return"text-2xl";case"large":return"text-3xl";case"xlarge":return"text-4xl";default:return"text-3xl"}};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center",children:e.jsxs("div",{className:"bg-gray-900 w-full h-full max-h-screen flex flex-col relative overflow-hidden",style:{background:"linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"},children:[e.jsxs("div",{className:"flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("button",{onClick:o,className:"bg-red-600 hover:bg-red-500 text-white p-3 rounded-lg flex items-center gap-2","aria-label":"Close book",children:[e.jsx(k,{size:20}),"Close"]}),e.jsx("h2",{className:"text-2xl md:text-3xl font-bold text-amber-300 hidden md:block",children:s.title})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("button",{onClick:()=>Y(!S),className:"bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded-lg",children:"Narration Settings"}),e.jsx("button",{onClick:M,className:`px-4 py-3 rounded-lg text-white font-bold ${n?"bg-red-600 hover:bg-red-500":"bg-green-600 hover:bg-green-500"}`,children:n?"Stop Auto-Reading":"Start Auto-Reading"})]})]}),e.jsx("div",{className:"md:hidden text-center py-2 bg-gray-800 border-b border-gray-700",children:e.jsx("h2",{className:"text-xl font-bold text-amber-300",children:s.title})}),S&&e.jsxs("div",{className:"bg-gray-800 p-4 border-b border-gray-700",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-300 mb-2 text-lg",children:"Narrator Voice"}),e.jsxs("select",{value:c,onChange:u=>h(u.target.value),className:"w-full px-3 py-2 bg-gray-700 text-white rounded-lg text-lg",children:[x.map(u=>e.jsx("option",{value:u.name,children:u.name},u.name)),x.length===0&&e.jsx("option",{value:"default",children:"Default Voice"})]})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"block text-gray-300 mb-2 text-lg",children:["Reading Speed: ",b.toFixed(1),"x"]}),e.jsx("input",{type:"range",min:"0.5",max:"2",step:"0.1",value:b,onChange:u=>d(parseFloat(u.target.value)),className:"w-full"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-300 mb-2 text-lg",children:"Text Size"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>v("small"),className:`px-3 py-2 rounded-lg ${f==="small"?"bg-blue-600 text-white":"bg-gray-700 text-gray-300"}`,children:"Small"}),e.jsx("button",{onClick:()=>v("medium"),className:`px-3 py-2 rounded-lg ${f==="medium"?"bg-blue-600 text-white":"bg-gray-700 text-gray-300"}`,children:"Medium"}),e.jsx("button",{onClick:()=>v("large"),className:`px-3 py-2 rounded-lg ${f==="large"?"bg-blue-600 text-white":"bg-gray-700 text-gray-300"}`,children:"Large"}),e.jsx("button",{onClick:()=>v("xlarge"),className:`px-3 py-2 rounded-lg ${f==="xlarge"?"bg-blue-600 text-white":"bg-gray-700 text-gray-300"}`,children:"X-Large"})]})]})]}),e.jsxs("div",{className:"flex justify-center mt-4",children:[e.jsx("button",{onClick:z,className:"px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg mx-2",children:"Read This Page"}),e.jsx("button",{onClick:F,className:"px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg mx-2",children:"Stop Reading"})]})]}),e.jsxs("div",{className:"flex flex-grow overflow-hidden",children:[e.jsx("div",{className:"flex items-center",children:e.jsx("button",{onClick:P,disabled:a===0,className:"h-full px-2 md:px-6 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed",children:e.jsx(Q,{size:36})})}),e.jsx("div",{className:"flex-grow overflow-auto p-4 md:p-8 lg:p-12",children:e.jsx("div",{ref:$,className:`${_()} text-gray-100 leading-relaxed max-w-5xl mx-auto`,style:{textShadow:"0 2px 4px rgba(0,0,0,0.3)"},children:s.content[a].split(`
`).map((u,g)=>u.trim()?e.jsx("p",{className:"mb-8",children:u},g):e.jsx("br",{},g))})}),e.jsx("div",{className:"flex items-center",children:e.jsx("button",{onClick:L,disabled:a>=y-1,className:"h-full px-2 md:px-6 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed",children:e.jsx(te,{size:36})})})]}),e.jsx("div",{className:"flex justify-center items-center p-4 bg-gray-800 border-t border-gray-700 text-xl",children:e.jsxs("div",{className:"text-amber-200",children:["Page ",a+1," of ",y]})})]})})},ue=({isOpen:s,onClose:o})=>{const[t,a]=l.useState(""),r=["Thank you for supporting independent storytelling! Every stitch of my words is woven with love and care.","Your support fuels creativity! Every contribution helps bring more inspiring stories to life.","Writers and creators thrive because of readers like you. Your kindness is truly appreciated!","A simple act of support can turn a dream into reality. Thank you for believing in the magic of words.","Your generosity keeps the art of storytelling alive. Your support means the world!","Every contribution, no matter the size, helps create something meaningful. Thank you for being part of the journey!"];return l.useEffect(()=>{if(s){const n=Math.floor(Math.random()*r.length);a(r[n])}},[s,r]),s?e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4",children:e.jsxs("div",{className:"relative bg-gradient-to-b from-amber-800 to-amber-600 rounded-2xl p-10 max-w-lg w-full shadow-2xl",style:{transform:"perspective(1000px) rotateX(5deg)",boxShadow:"0 20px 60px -10px rgba(255, 193, 7, 0.3), 0 0 30px rgba(255, 193, 7, 0.2)"},children:[e.jsx("button",{onClick:o,className:"absolute top-4 right-4 text-amber-200 hover:text-white transition-colors","aria-label":"Close",children:e.jsx(k,{size:24})}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"flex justify-center mb-6",children:e.jsx(ae,{className:"text-red-400 w-10 h-10"})}),e.jsx("h2",{className:"text-3xl font-bold text-amber-100 mb-6",children:"Support the Writer"}),e.jsx("div",{className:"bg-amber-900/30 p-6 rounded-xl border border-amber-500/20 mb-8",children:e.jsx("p",{className:"text-xl text-amber-100 leading-relaxed italic",children:t})}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsx("button",{className:"bg-amber-700 hover:bg-amber-600 text-white py-3 px-6 rounded-lg transition-colors shadow-lg",children:"Buy Me Needle and Yarn"}),e.jsx("button",{className:"bg-red-700 hover:bg-red-600 text-white py-3 px-6 rounded-lg transition-colors shadow-lg",children:"Donate via Patreon"})]})]})]})}):null},xe=()=>{const[s,o]=l.useState(null),[t,a]=l.useState(!1),[r,n]=l.useState(!1),[i,c]=l.useState({voice:"default",voiceSpeed:1,particles:"normal",textSize:"large",animationSpeed:"normal"}),h=[{id:"needle-and-yarn",title:"The Love Story of a Needle and a Yarn",author:"Leola Sister Lee",description:"A heartwarming tale of love between crafting tools. Follow Needle and Yarn as they navigate challenges, form deep bonds, and create beautiful projects together.",coverImage:"/api/placeholder/400/500",content:[`CHAPTER 1

Needle woke up feeling restless. The sunlight streamed in through the window of the sewing basket, and Yarn was coiled beside her, snug and warm.

For as long as Needle could remember, they had been together in this basket. Silver and smooth, Needle prided herself on precision and sharpness. Meanwhile, Yarn was soft and colorful, always ready with a kind word or gentle suggestion.

"Good morning," Yarn said, uncoiling slightly. "You look like you've been thinking again."`,`Needle sighed. "I've been wondering if we'll ever get to create something truly beautiful. It's been weeks since we were last used."

Yarn moved closer, its fibers brushing against Needle's metal surface. "We will. The right project will come along—we just need to be patient."

Needle wasn't convinced. Patience had never been her strong suit.`,`CHAPTER 2

That afternoon, the basket was lifted, and light flooded in as the lid opened. Human hands reached inside, selecting both Needle and Yarn.

"Finally!" Needle whispered excitedly.

"I told you," Yarn replied, its red fibers seeming to glow in the afternoon light.`,`Together, they were guided through fabric, forming loops and stitches. At first, Needle was focused only on her task—piercing the fabric with precision, pulling Yarn through.

But as the hours passed, something changed. Each time Yarn followed her through the fabric, Needle felt a strange warmth. They were creating something together, something neither could make alone.`,`CHAPTER 3

As days turned into weeks, their project grew. It was a beautiful sweater, with intricate patterns that showcased both Needle's precision and Yarn's warmth and color.

"We make a good team," Needle admitted one evening as they rested.

"We always have," Yarn replied softly. "You guide, and I follow, but together we create something greater than either of us alone."`,`Needle considered this. It was true—without Yarn, she was just a piece of metal. And without her, Yarn would remain just a tangled possibility.

"I think," said Needle slowly, "that this is what humans call love. When two different beings come together and create something beautiful."`,`Yarn twined a little closer. "I think you're right. And I think I've loved you for a very long time, my sharp friend."

As the sweater neared completion, they realized that every loop and stitch held a piece of their hearts. And so they journeyed on, weaving a story of love and perseverance for all to see.

THE END`],genres:["Fantasy","Love Story","Adventure","DIY"],gradient:"linear-gradient(135deg, #4361EE 0%, #7209B7 100%)",bubbleColor:"#7B61FF"},{id:"crochet-mastery",title:"Crochet Mastery: A Complete Guide",author:"Leola Sister Lee",description:"A comprehensive guide to mastering the art of crochet. From basic stitches to complex techniques, this guide has everything you need to become a crochet master.",coverImage:"/api/placeholder/400/500",content:[`INTRODUCTION

Crochet is an age-old craft that has allowed countless generations to create beautiful pieces from simple yarn. In this guide, we will go from the basics to advanced techniques.

All you need to start is a hook and some yarn—but what you can create is limited only by your imagination.`,`CHAPTER 1: Basic Stitches

Every crochet journey begins with the humble chain stitch. To create a chain stitch:

1. Make a slip knot on your hook
2. Yarn over (wrap the yarn around your hook)
3. Pull the yarn through the loop on your hook

Congratulations! You've made your first chain stitch. Repeat to create a foundation chain of the desired length.`,`The single crochet (SC) is your next building block:

1. Insert your hook into the second chain from the hook
2. Yarn over and pull through the chain (two loops on hook)
3. Yarn over again and pull through both loops

Practice this stitch until it becomes second nature. The tension should be firm but not tight.`,`The double crochet (DC) creates height in your work:

1. Yarn over
2. Insert your hook into the third chain from the hook
3. Yarn over and pull through the chain (three loops on hook)
4. Yarn over and pull through two loops (two loops remain)
5. Yarn over again and pull through the remaining two loops`,`CHAPTER 2: Shaping and Texture

Now that you've mastered the basic stitches, let's explore how to shape your work and add texture.

To increase: Work two stitches into the same space
To decrease: Work two stitches together as one

Texture can be created by varying your stitch patterns. Try alternating rows of single and double crochet, or experiment with front and back post stitches for a ribbed effect.`,`CHAPTER 3: Advanced Techniques

Ready to take your crochet to the next level? Let's explore some advanced techniques.

Colorwork can be achieved through methods like tapestry crochet or color changes at the end of rows.

Lace patterns use chains and spaces to create delicate, airy designs perfect for shawls and decorative items.`,`Cables might look intimidating, but they simply involve working stitches out of order. Front post stitches are worked around posts of stitches a few rows below, creating the twisted, raised effect.

Amigurumi—the Japanese art of crocheting small stuffed toys—uses tight single crochet worked in spirals or rounds to create three-dimensional forms.`,`CONCLUSION

Crochet is more than just a craft—it's a journey of creativity, patience, and self-expression. Each stitch you make adds to your experience and skill.

Remember that even master crocheters were once beginners. Practice regularly, be patient with yourself, and don't be afraid to try new techniques.

With the foundations in this guide and your own creative spirit, you'll be creating beautiful, meaningful pieces that bring joy to yourself and others.

Happy crocheting!`],genres:["DIY","Instruction","Crafts","Reference"],gradient:"linear-gradient(135deg, #F72585 0%, #B5179E 100%)",bubbleColor:"#F5515F"}];return e.jsxs("div",{className:"h-screen bg-black text-white flex flex-col overflow-hidden",children:[e.jsx(le,{density:i.particles,speed:i.animationSpeed}),e.jsxs("div",{className:"relative z-10 p-6 pb-0",children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("h1",{className:"text-6xl font-bold text-yellow-500",style:{animation:"pulse 3s infinite"},children:"Leola's Digital Library"}),e.jsxs("p",{className:"text-gray-300 mt-4 text-2xl",children:["A collection of heartwarming stories and guides by",e.jsx("span",{className:"author-name ml-2",style:{color:"#a855f7",textShadow:"0 0 8px #a855f7, 0 0 15px #a855f7, 0 0 25px #a855f7",animation:"pulse-purple 2s infinite"},children:'Leola "Sister" Lee'})]})]}),e.jsxs("div",{className:"absolute top-8 left-8 flex flex-row gap-4",children:[e.jsxs("button",{className:"flex flex-col items-center justify-center hover:scale-110 transition-transform cursor-pointer bg-amber-900/30 p-4 rounded-xl border border-amber-500/30",onClick:()=>a(!0),"aria-label":"Support the Writer",style:{width:"120px",height:"120px"},children:[e.jsx("span",{className:"text-5xl",style:{animation:"bounce 2s infinite"},children:"🎁"}),e.jsx("span",{className:"text-sm text-amber-300 mt-2 font-bold",children:"Support Leola"})]}),e.jsxs("button",{className:"flex flex-col items-center justify-center hover:scale-110 transition-transform cursor-pointer bg-blue-800 p-4 rounded-xl border border-blue-400 shadow-lg",onClick:()=>n(!0),"aria-label":"Library Settings",style:{boxShadow:"0 0 15px rgba(37, 99, 235, 0.5)",width:"120px",height:"120px"},children:[e.jsx("span",{className:"text-5xl",children:"⚙️"}),e.jsx("span",{className:"text-sm text-blue-200 mt-2 font-bold",children:"Settings"})]})]}),e.jsx("div",{className:"mb-6",children:e.jsx(ce,{})})]}),e.jsx("div",{className:"flex-grow relative z-10 px-6 overflow-hidden",children:e.jsx("div",{className:"h-full overflow-y-auto",style:{scrollbarWidth:"thin",scrollbarColor:"#4B5563 #1F2937"},children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8 py-4 px-12 md:px-24",children:h.map(x=>e.jsx("div",{className:"h-full max-w-lg mx-auto",children:e.jsx(de,{book:x,onOpenBook:m=>o(m)})},x.id))})})}),s&&e.jsx(he,{book:s,onClose:()=>o(null),settings:i}),e.jsx(ue,{isOpen:t,onClose:()=>a(!1)}),e.jsx(ie,{isOpen:r,onClose:()=>n(!1),settings:i,onSettingsChange:c}),e.jsx("style",{jsx:!0,children:`
        @keyframes pulse {
          0%, 100% {
            text-shadow: 0 0 15px rgba(234, 179, 8, 0.5);
          }
          50% {
            text-shadow: 0 0 30px rgba(234, 179, 8, 0.8);
          }
        }
        
        @keyframes pulse-purple {
          0%, 100% {
            text-shadow: 0 0 8px #a855f7, 0 0 15px #a855f7;
          }
          50% {
            text-shadow: 0 0 15px #a855f7, 0 0 30px #a855f7, 0 0 45px #a855f7;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        /* Custom scrollbar styles for Webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1F2937;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `})]})};N.createRoot(document.getElementById("root")).render(e.jsx(V.StrictMode,{children:e.jsx(xe,{})}));
//# sourceMappingURL=index-D-WI1hvJ.js.map
