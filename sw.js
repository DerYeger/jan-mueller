if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let a={};const u=s=>l(s,n),f={module:{uri:n},exports:a,require:u};e[n]=Promise.all(i.map((s=>f[s]||u(s)))).then((s=>(r(...s),a)))}}define(["./workbox-6cd28afd"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"8cccaeb8ceae06926161960224ac2e36"},{url:"about.html",revision:"889cffaca1d96aa18ab94a9987ff1088"},{url:"assets/_...all_.83f4da1f.css",revision:null},{url:"assets/_...all_.8ed3acad.js",revision:null},{url:"assets/_name_.4c4fe1c0.css",revision:null},{url:"assets/_name_.504e1997.js",revision:null},{url:"assets/_name_.c9fcd3fb.js",revision:null},{url:"assets/_name_.d4bafe98.css",revision:null},{url:"assets/404.1c020a8d.js",revision:null},{url:"assets/404.2b7a8886.css",revision:null},{url:"assets/about.50b71006.css",revision:null},{url:"assets/about.6400a718.js",revision:null},{url:"assets/app.6b07f285.js",revision:null},{url:"assets/app.fe60a681.css",revision:null},{url:"assets/documents.23cf6091.js",revision:null},{url:"assets/fullscreen.14589205.js",revision:null},{url:"assets/fullscreen.8fc82dbb.css",revision:null},{url:"assets/index.19f9337c.js",revision:null},{url:"assets/index.39fb7dac.css",revision:null},{url:"assets/index.df5e871a.js",revision:null},{url:"assets/models.4e6cc1b0.js",revision:null},{url:"assets/vendor.4d54a8b1.js",revision:null},{url:"assets/virtual_pwa-register.3deeaaee.js",revision:null},{url:"assets/vue-masonry-wall.6f7fba9f.js",revision:null},{url:"assets/vue-masonry-wall.7c66e0a1.css",revision:null},{url:"blog.html",revision:"c088b645de7527be14ea82027604465e"},{url:"blog/vue-masonry-wall.html",revision:"5319223090e981446ab6597f2e25d92b"},{url:"files.html",revision:"c0e98277ff753c326f899f4b0118a695"},{url:"files/documents/bachelor-thesis.html",revision:"da56ef9b4aa33496f55a1d129b680e3a"},{url:"files/documents/koffee.html",revision:"e83fe5fca8fd16698e5bd94d1fe1468f"},{url:"files/documents/threadsafe-data-structures.html",revision:"5e670d664b11429d8ed252f8620c79d9"},{url:"files/models/an-26.html",revision:"905eb338cb2b239ef65526f122c05ccf"},{url:"index.html",revision:"5106bb3882e5b4f4047d1bfccad621f1"},{url:"favicon.svg",revision:"9e2c532e29c032e303f1988b75f07ef4"},{url:"robots.txt",revision:"5e0bd1c281a62a380d7a948085bfe2d1"},{url:"safari-pinned-tab.svg",revision:"9e2c532e29c032e303f1988b75f07ef4"},{url:"pwa-192x192.png",revision:"c93bea5e8af3aafcdf9f6c91d57b8c72"},{url:"pwa-512x512.png",revision:"9cf5c46aab8b8c44a9ffb2ca99612b98"},{url:"manifest.webmanifest",revision:"9b408f06a5c8fd5b4fa6c3888bae3eae"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));