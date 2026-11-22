/* TOEIC Prep — service worker : enregistre toute l’application (pages, questions, voix) pour un usage hors connexion */
const VERSION='44c4d29b11';
const CACHE='toeic-prep-'+VERSION;
const CORE=["index.html","manifest.webmanifest","bank.json","audio.json"];      // petits fichiers, téléchargés à chaque nouvelle version
const ASSETS=["fonts/jost-latin-400-normal.woff2?v=f94cffda16","fonts/jost-latin-500-normal.woff2?v=98dce4f076","fonts/jost-latin-600-normal.woff2?v=d0487d6845","fonts/jost-latin-700-normal.woff2?v=81da4d7112","fonts/jost-latin-800-normal.woff2?v=37856c7d54","fonts/jost-latin-500-italic.woff2?v=5fb920767c","fonts/jost-latin-600-italic.woff2?v=ad4337db37","fonts/jost-latin-700-italic.woff2?v=148710d218","fonts/jost-latin-800-italic.woff2?v=f5565ea0a6","sky.jpg?v=76c9da225e","sky-m.jpg?v=0bdff6586f","icons/icon-192.png?v=18735d1be6","icons/icon-512.png?v=8c8a60f951","icons/icon-maskable-512.png?v=aa35f66768","icons/favicon-32.png?v=d297625cf4","icons/apple-touch-icon-ac3af2354c.png"];  // fichiers dont le nom contient une empreinte : réutilisés d’une version à l’autre
const AUDIO=["audio/voix-p1.mp3?v=633135dbb4","audio/voix-p2.mp3?v=cb513edea8","audio/voix-p3.mp3?v=672483a6bf","audio/voix-p4.mp3?v=9360186ae7","audio/voix-dictees.mp3?v=3c4684b92c","audio/voix-narrateur.mp3?v=6d6f91d64b"];    // voix (empreinte dans le nom)

async function tell(msg){const cl=await self.clients.matchAll({includeUncontrolled:true,type:'window'});cl.forEach(c=>c.postMessage(msg));}
const withQ=(u,q)=>q?u+(u.includes('?')?'&':'?')+q:u;
async function getFile(cache,url,reuse,bust){
  if(await cache.match(url))return true;
  if(reuse){const old=await caches.match(url);if(old){await cache.put(url,old.clone());return true;}}
  let status='réseau';
  for(const q of [bust?'sw='+VERSION:'','r='+Date.now()]){
    try{const r=await fetch(new Request(withQ(url,q),{cache:'reload'}));if(r.ok){await cache.put(url,r);return true;}status=r.status;}catch(e){status='réseau';}}
  const err=new Error(url);err.status=status;throw err;}
async function fillAudio(cache,fresh){let done=0;const total=AUDIO.length,bad=[];
  for(const u of AUDIO){try{await getFile(cache,u,true);done++;}catch(e){bad.push({u:u.split('?')[0],s:e.status});}await tell({type:'progress',done,total,fresh});}
  if(bad.length)await tell({type:'error',bad});return!bad.length;}

self.addEventListener('install',e=>{e.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  for(const u of CORE)await getFile(cache,u,false,true);
  const idx=await cache.match('index.html');if(idx)await cache.put('./',idx.clone());
  for(const u of ASSETS)await getFile(cache,u,true);
  const first=!self.registration.active;
  await fillAudio(cache,first);
  if(first)self.skipWaiting();
})());});

self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  for(const k of await caches.keys())if(k.startsWith('toeic-prep-')&&k!==CACHE)await caches.delete(k);
  await self.clients.claim();
})());});

self.addEventListener('message',e=>{const d=e.data||{};
  if(d.type==='skip')self.skipWaiting();
  else if(d.type==='status')e.waitUntil((async()=>{const cache=await caches.open(CACHE);let miss=0;
    for(const u of AUDIO)if(!(await cache.match(u)))miss++;
    if(!miss)await tell({type:'ready'});else await fillAudio(cache,true);})());
});

async function ranged(req,res){const h=req.headers.get('range');if(!h||res.status!==200)return res;
  const m=/bytes=(\d*)-(\d*)/.exec(h);if(!m)return res;const b=await res.blob(),size=b.size;
  let s=m[1]?+m[1]:0,en=m[2]?+m[2]:size-1;if(!m[1]&&m[2]){s=Math.max(0,size-(+m[2]));en=size-1;}en=Math.min(en,size-1);
  if(s>en)return new Response('',{status:416,headers:{'Content-Range':'bytes */'+size}});
  return new Response(b.slice(s,en+1),{status:206,headers:{'Content-Type':res.headers.get('Content-Type')||'audio/mpeg','Content-Range':`bytes ${s}-${en}/${size}`,'Content-Length':String(en-s+1),'Accept-Ranges':'bytes'}});}

self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==location.origin)return;
  if(req.mode==='navigate'){e.respondWith((async()=>{const c=await caches.open(CACHE);return(await c.match('index.html'))||(await c.match('./'))||fetch(req);})().catch(()=>fetch(req)));return;}
  e.respondWith((async()=>{const c=await caches.open(CACHE);
    const hit=(await c.match(req))||(await c.match(req,{ignoreSearch:true}));if(hit)return ranged(req,hit);
    try{const r=await fetch(req);if(r.ok&&r.status===200&&!req.headers.get('range'))c.put(req,r.clone());return r;}
    catch(err){return new Response('Hors connexion',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});}})());
});
