(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{106:function(t,e,n){"use strict";var r=n(30),o=Object(r.b)({layout:"default",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}}),l=n(25),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[404===t.error.statusCode?n("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):n("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),n("nuxt-link",{attrs:{to:t.localePath("/")}},[t._v(t._s(t.$t("home.title")))])],1)}),[],!1,null,null,null);e.a=component.exports},149:function(t,e,n){"use strict";n.d(e,"c",(function(){return d})),n.d(e,"b",(function(){return h})),n.d(e,"a",(function(){return m}));n(10),n(9),n(13),n(4),n(15),n(12),n(16);var r=n(2),o=(n(54),n(29),n(70),n(72),n(28),n(57));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={home:{title:"home.title",to:"/",icon:o.l},projects:{title:"projects.title",to:"/projects",icon:o.i},blog:{title:"blog.title",to:"/blog",icon:o.q},documents:{title:"documents.title",to:"/documents",icon:o.j},about:{title:"about.title",to:"/about",icon:o.m}};function h(t,e){var n="en"===e?"/":"/".concat(e,"/");return t.map((function(t){return c(c({},t),{},{path:t.path.replace("/en/",n)})}))}function m(t,e){if(null!==t){var n="en"===e?"/":"/".concat(e,"/");return c(c({},t),{},{path:t.path.replace("/en/",n)})}}},235:function(t,e,n){"use strict";e.a=function(t,e){e("host","https://jan-mueller.at")}},236:function(t,e,n){"use strict";var r=n(1),o=n(337);r.default.use(o.a)},237:function(t,e,n){"use strict";var r=n(1),o=n(338);r.default.use(o.a)},303:function(t,e,n){var content=n(431);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("c5d566c8",content,!0,{sourceMap:!1})},304:function(t,e,n){var content=n(459);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("28be2079",content,!0,{sourceMap:!1})},305:function(t,e,n){var content=n(461);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("334e8070",content,!0,{sourceMap:!1})},306:function(t,e,n){var content=n(465);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("ee4f2c18",content,!0,{sourceMap:!1})},307:function(t,e,n){var content=n(482);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("024c3c9a",content,!0,{sourceMap:!1})},326:function(t,e,n){"use strict";n.r(e);n(28);var r=n(30),o=n(113),l=Object(r.b)({data:function(){return{drawerOpen:this.$vuetify.breakpoint.lgAndUp}},head:function(){var path=1===this.$route.path.length?"":this.$route.path;return{htmlAttrs:{lang:this.$i18n.locale},meta:[{hid:"description",name:"description",content:this.$t("meta.description")}],link:[{rel:"canonical",href:"".concat(this.$host).concat(path,"/")}]}},computed:Object(o.b)(["breadcrumbs"])}),c=(n(430),n(25)),d=n(33),h=n.n(d),m=n(596),f=n(597),v=n(601),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-navigation-drawer",{attrs:{fixed:"",app:"","expand-on-hover":t.$vuetify.breakpoint.lgAndUp},model:{value:t.drawerOpen,callback:function(e){t.drawerOpen=e},expression:"drawerOpen"}},[n("app-sidebar")],1),t._v(" "),n("app-header",{model:{value:t.drawerOpen,callback:function(e){t.drawerOpen=e},expression:"drawerOpen"}}),t._v(" "),n("v-main",[t.breadcrumbs.length>0?n("breadcrumbs",{staticClass:"pa-3 mobile-breadcrumbs hidden-lg-and-up",attrs:{small:""}}):t._e(),t._v(" "),t._t("default")],2),t._v(" "),n("app-footer")],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{AppSidebar:n(580).default,AppHeader:n(576).default,Breadcrumbs:n(327).default,AppFooter:n(581).default}),h()(component,{VApp:m.a,VMain:f.a,VNavigationDrawer:v.a})},327:function(t,e,n){"use strict";n.r(e);n(54);var r=n(57),o=n(30),l=Object(o.b)({props:{small:{type:Boolean,default:!1}},data:function(){return{mdiChevronRight:r.g}},computed:{breadcrumbs:function(){var t=this,e=this.$i18n.locale,n=this.$store.state.breadcrumbs;return n.length<2?[]:n.map((function(r,o){return{text:r.text,to:t.localePath(r.to,e),icon:r.icon,disabled:o>=n.length-1}}))}}}),c=(n(460),n(25)),d=n(33),h=n.n(d),m=n(603),f=n(332),v=n(224),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-breadcrumbs",{staticClass:"breadcrumbs",attrs:{items:t.breadcrumbs,nuxt:"",large:!t.small},scopedSlots:t._u([{key:"divider",fn:function(){return[n("v-icon",[t._v(t._s(t.mdiChevronRight))])]},proxy:!0},{key:"item",fn:function(e){var r=e.item;return[n("v-breadcrumbs-item",{staticClass:"unselectable breadcrumb-item",attrs:{to:r.to,disabled:r.disabled,exact:!0,"aria-label":t.$t(r.text)}},[r.icon?n("v-icon",{staticClass:"text--primary",attrs:{"aria-label":t.$t(r.text)},domProps:{textContent:t._s(r.icon)}}):[t._v("\n        "+t._s(t.$t(r.text))+"\n      ")]],2)]}}])})}),[],!1,null,null,null);e.default=component.exports;h()(component,{VBreadcrumbs:m.a,VBreadcrumbsItem:f.a,VIcon:v.a})},341:function(t,e,n){"use strict";n(28);var r=n(30),o=Object(r.b)({head:function(){var path=1===this.$route.path.length?"":this.$route.path;return{htmlAttrs:{lang:this.$i18n.locale},meta:[{hid:"description",name:"description",content:this.$t("meta.description")}],link:[{rel:"canonical",href:"".concat(this.host).concat(path,"/")}]}}}),l=n(25),component=Object(l.a)(o,(function(){var t=this.$createElement;return(this._self._c||t)("nuxt")}),[],!1,null,null,null);e.a=component.exports},342:function(t,e,n){"use strict";var r=n(25),component=Object(r.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("app-frame",[e("container",[e("nuxt")],1)],1)}),[],!1,null,null,null);e.a=component.exports;installComponents(component,{Container:n(348).default,AppFrame:n(326).default})},343:function(t,e,n){"use strict";var r=n(25),component=Object(r.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("app-frame",[e("nuxt")],1)}),[],!1,null,null,null);e.a=component.exports;installComponents(component,{AppFrame:n(326).default})},347:function(t,e,n){t.exports=n.p+"img/logo.7275089.svg"},348:function(t,e,n){"use strict";n.r(e);var r=n(30),o=Object(r.b)({props:{boundWidth:{type:Boolean,default:!1}}}),l=n(25),c=n(33),d=n.n(c),h=n(602),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("v-container",{class:{"bound-width":t.boundWidth},staticStyle:{display:"flex","justify-content":"center","margin-left":"auto","margin-right":"auto",padding:"12px"}},[t._t("default")],2)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VContainer:h.a})},349:function(t,e,n){"use strict";n.r(e);var r=n(30),o=Object(r.b)({data:function(){return{logo:n(347)}}}),l=(n(481),n(25)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"logo-container"},[n("nuxt-link",{staticClass:"icon-link",attrs:{to:t.localePath("/")}},[n("img",{attrs:{src:t.logo,alt:"logo"}})])],1)}),[],!1,null,"54d7916a",null);e.default=component.exports},357:function(t,e,n){n(358),n(359),t.exports=n(363)},418:function(t,e,n){var content=n(419);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("0616bcdd",content,!0,{sourceMap:!1})},419:function(t,e,n){var r=n(20)(!1);r.push([t.i,'h1,h2,h3,h4,h5,h6{font-family:"Cabin",sans-serif!important;font-weight:700;line-height:1.2}h1{font-size:4rem;margin-bottom:1rem}h2{font-size:2.5rem;margin-bottom:.5rem}h3{font-size:1.5rem;margin-bottom:.25rem}p{line-height:1.6}@media only screen and (max-width:960px){h1{font-size:3rem}h2{font-size:2.25rem}h3{font-size:1.375rem}}@media only screen and (max-width:600px){h1{font-size:2.5rem}h2{font-size:2rem}h3{font-size:1.25rem}}html{overflow-y:auto!important;overflow-x:hidden!important}a.focus-visible,a:focus-visible,a:hover{color:var(--v-secondary-base)}.unselectable,.v-btn,article .nuxt-content-highlight .filename{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.bound-width,article{max-width:960px!important}article{margin:auto}article .marmoset-viewer-host,article .nuxt-content-highlight,article ul,article video{margin-bottom:1rem}article .nuxt-content-highlight{position:relative;border-radius:4px;box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}article .nuxt-content-highlight+p{margin-top:1rem}article .nuxt-content-highlight code{all:unset!important}article .nuxt-content-highlight pre{border-radius:4px}article .nuxt-content-highlight .filename{position:absolute;right:0;top:0;z-index:1;margin-right:.5rem;margin-top:.25rem;font-weight:300;font-size:.875rem;color:#c3cee3}@media(max-width:960px){article .model-viewer,article .nuxt-content-highlight,article .v-image,article iframe{margin-left:-12px;margin-right:-12px;width:calc(100% + 24px);max-width:unset!important}article .nuxt-content-highlight pre{border-radius:0}}.masonry-wall{width:100%}.responsive-list{display:flex;flex-direction:row;flex-wrap:wrap}.responsive-list>:not(:last-child){margin-right:1rem}.svg-icon{font-size:0}.v-footer,.v-toolbar__content{display:flex}.v-footer>div,.v-toolbar__content>div{flex:1}.v-footer div:first-child>*,.v-toolbar__content div:first-child>*{margin-right:auto}.v-footer div:last-child>*,.v-toolbar__content div:last-child>*{margin-left:auto}.page-enter-active,.page-leave-active{transition:opacity .1s}.page-enter,.page-leave-to{opacity:0}',""]),t.exports=r},430:function(t,e,n){"use strict";n(303)},431:function(t,e,n){var r=n(20)(!1);r.push([t.i,".mobile-breadcrumbs{flex-wrap:wrap!important;margin-top:-.5rem}.mobile-breadcrumbs li{margin-top:.5rem}",""]),t.exports=r},458:function(t,e,n){"use strict";n(304)},459:function(t,e,n){var r=n(20)(!1);r.push([t.i,".v-app-bar{transition:background 0s}",""]),t.exports=r},460:function(t,e,n){"use strict";n(305)},461:function(t,e,n){var r=n(20)(!1);r.push([t.i,".breadcrumbs{flex-wrap:nowrap}.breadcrumbs li .v-icon{font-size:1.5rem}.breadcrumbs a{font-weight:700}.breadcrumbs a:not(.v-breadcrumbs__item--disabled){color:unset}.breadcrumbs .breadcrumb-item{white-space:nowrap}",""]),t.exports=r},464:function(t,e,n){"use strict";n(306)},465:function(t,e,n){var r=n(20)(!1);r.push([t.i,".search-input{max-width:16rem}",""]),t.exports=r},481:function(t,e,n){"use strict";n(307)},482:function(t,e,n){var r=n(20)(!1);r.push([t.i,'h1[data-v-54d7916a],h2[data-v-54d7916a],h3[data-v-54d7916a],h4[data-v-54d7916a],h5[data-v-54d7916a],h6[data-v-54d7916a]{font-family:"Cabin",sans-serif!important;font-weight:700;line-height:1.2}h1[data-v-54d7916a]{font-size:4rem;margin-bottom:1rem}h2[data-v-54d7916a]{font-size:2.5rem;margin-bottom:.5rem}h3[data-v-54d7916a]{font-size:1.5rem;margin-bottom:.25rem}p[data-v-54d7916a]{line-height:1.6}@media only screen and (max-width:960px){h1[data-v-54d7916a]{font-size:3rem}h2[data-v-54d7916a]{font-size:2.25rem}h3[data-v-54d7916a]{font-size:1.375rem}}@media only screen and (max-width:600px){h1[data-v-54d7916a]{font-size:2.5rem}h2[data-v-54d7916a]{font-size:2rem}h3[data-v-54d7916a]{font-size:1.25rem}}html[data-v-54d7916a]{overflow-y:auto!important;overflow-x:hidden!important}a.focus-visible[data-v-54d7916a],a[data-v-54d7916a]:focus-visible,a[data-v-54d7916a]:hover{color:var(--v-secondary-base)}.unselectable[data-v-54d7916a],.v-btn[data-v-54d7916a],article .nuxt-content-highlight .filename[data-v-54d7916a],img[data-v-54d7916a]{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.bound-width[data-v-54d7916a],article[data-v-54d7916a]{max-width:960px!important}article[data-v-54d7916a]{margin:auto}article .marmoset-viewer-host[data-v-54d7916a],article .nuxt-content-highlight[data-v-54d7916a],article ul[data-v-54d7916a],article video[data-v-54d7916a]{margin-bottom:1rem}article .nuxt-content-highlight[data-v-54d7916a]{position:relative;border-radius:4px;box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}article .nuxt-content-highlight+p[data-v-54d7916a]{margin-top:1rem}article .nuxt-content-highlight code[data-v-54d7916a]{all:unset!important}article .nuxt-content-highlight pre[data-v-54d7916a]{border-radius:4px}article .nuxt-content-highlight .filename[data-v-54d7916a]{position:absolute;right:0;top:0;z-index:1;margin-right:.5rem;margin-top:.25rem;font-weight:300;font-size:.875rem;color:#c3cee3}@media(max-width:960px){article .model-viewer[data-v-54d7916a],article .nuxt-content-highlight[data-v-54d7916a],article .v-image[data-v-54d7916a],article iframe[data-v-54d7916a]{margin-left:-12px;margin-right:-12px;width:calc(100% + 24px);max-width:unset!important}article .nuxt-content-highlight pre[data-v-54d7916a]{border-radius:0}}.masonry-wall[data-v-54d7916a]{width:100%}.responsive-list[data-v-54d7916a]{display:flex;flex-direction:row;flex-wrap:wrap}.responsive-list[data-v-54d7916a]>:not(:last-child){margin-right:1rem}.svg-icon[data-v-54d7916a]{font-size:0}.v-footer[data-v-54d7916a],.v-toolbar__content[data-v-54d7916a]{display:flex}.v-footer>div[data-v-54d7916a],.v-toolbar__content>div[data-v-54d7916a]{flex:1}.v-footer div:first-child>*[data-v-54d7916a],.v-toolbar__content div:first-child>*[data-v-54d7916a]{margin-right:auto}.v-footer div:last-child>*[data-v-54d7916a],.v-toolbar__content div:last-child>*[data-v-54d7916a]{margin-left:auto}.page-enter-active[data-v-54d7916a],.page-leave-active[data-v-54d7916a]{transition:opacity .1s}.page-enter[data-v-54d7916a],.page-leave-to[data-v-54d7916a]{opacity:0}.logo-container[data-v-54d7916a]{width:48px;height:48px}img[data-v-54d7916a]{width:36px;height:36px;margin:6px}',""]),t.exports=r},505:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return r})),n.d(e,"mutations",(function(){return o}));var r=function(){return{breadcrumbs:[]}},o={setBreadcrumbs:function(t,e){t.breadcrumbs=e}}},573:function(t,e,n){"use strict";n.r(e);n(174);var r=n(30),o=n(149),l=Object(r.b)({setup:function(){return{routes:Object.values(o.c)}}}),c=n(25),d=n(33),h=n.n(d),m=n(229),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-list-item-group",{attrs:{"aria-label":t.$t("misc.navigation"),role:"navigation"}},[t._l(t.routes,(function(t,e){return n("app-navigation-entry",{key:e,attrs:{route:t}})})),t._v(" "),n("source-repository-link")],2)}),[],!1,null,null,null);e.default=component.exports;h()(component,{AppNavigationEntry:n(574).default,SourceRepositoryLink:n(575).default}),h()(component,{VListItemGroup:m.a})},574:function(t,e,n){"use strict";n.r(e);var r=n(30),o=Object(r.b)({props:{route:{type:Object,required:!0}}}),l=n(25),c=n(33),d=n.n(c),h=n(224),m=n(143),f=n(56),v=n(124),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-list-item",{attrs:{to:t.localePath(t.route.to),exact:"",role:"link","aria-label":t.$t(t.route.title)}},[n("v-list-item-icon",[n("v-icon",{domProps:{textContent:t._s(t.route.icon)}})],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(t.$t(t.route.title))}})],1)],1)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VIcon:h.a,VListItem:m.a,VListItemContent:f.a,VListItemIcon:v.a,VListItemTitle:f.b})},575:function(t,e,n){"use strict";n.r(e);var r=n(57),o=n(30),l=Object(o.b)({data:function(){return{mdiGithub:r.k}}}),c=n(25),d=n(33),h=n.n(d),m=n(224),f=n(143),v=n(56),x=n(124),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-list-item",{staticClass:"unselectable source-link-container",attrs:{rel:"noopener",href:"https://github.com/DerYeger/jan-mueller",target:"_blank",role:"link"}},[n("v-list-item-icon",[n("v-icon",[t._v(t._s(t.mdiGithub))])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v("Website Source Code")])],1)],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{VIcon:m.a,VListItem:f.a,VListItemContent:v.a,VListItemIcon:x.a,VListItemTitle:v.b})},576:function(t,e,n){"use strict";n.r(e);var r=n(57),o=n(30),l=Object(o.b)({props:{value:{type:Boolean,required:!0}},data:function(){return{mdiMenu:r.o}}}),c=(n(458),n(25)),d=n(33),h=n.n(d),m=n(600),f=n(594),v=n(224),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app-bar",{attrs:{fixed:"",app:"","elevate-on-scroll":"",dense:"",color:t.$vuetify.theme.dark?"#121212":"white"}},[n("div",{staticClass:"ml-n4 ml-lg-0"},[n("v-app-bar-nav-icon",{staticClass:"hidden-lg-and-up",attrs:{"aria-label":t.$t(t.value?"actions.close-menu":"actions.open-menu")},on:{click:function(e){return t.$emit("input",!t.value)}}},[n("v-icon",[t._v(t._s(t.mdiMenu))])],1),t._v(" "),n("breadcrumbs",{staticClass:"pa-0 hidden-md-and-down"})],1),t._v(" "),n("div",{staticClass:"d-flex justify-center ml-lg-n14 flex-fill"},[n("content-search")],1),t._v(" "),n("div",{staticStyle:{"margin-right":"-16px"}},[n("logo")],1)])}),[],!1,null,null,null);e.default=component.exports;h()(component,{Breadcrumbs:n(327).default,ContentSearch:n(577).default,Logo:n(349).default}),h()(component,{VAppBar:m.a,VAppBarNavIcon:f.a,VIcon:v.a})},577:function(t,e,n){"use strict";n.r(e);var r=n(43),o=n(19),l=(n(28),n(29),n(171),n(71),n(57)),c=n(30),d=n(149),h=Object(c.b)({data:function(){return{mdiMagnify:l.n,results:[],query:"",showResults:!1}},computed:{currentLocale:function(){return this.$i18n.locale}},watch:{currentLocale:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.updateSearchResults(e.query,t);case 2:case"end":return n.stop()}}),n)})))()},query:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.updateSearchResults(t,e.currentLocale);case 2:case"end":return n.stop()}}),n)})))()}},methods:{updateSearchResults:function(t,e){var n=this;return Object(o.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(t){o.next=3;break}return n.results=[],o.abrupt("return");case 3:return o.t0=d.b,o.t1=[],o.t2=r.a,o.next=8,n.$content("en/blog",{deep:!0}).only(["title","path"]).search("title",t).sortBy("title","asc").limit(4).fetch();case 8:return o.t3=o.sent,o.t4=(0,o.t2)(o.t3),o.t5=r.a,o.next=13,n.$content("en/projects",{deep:!0}).only(["title","path"]).search("title",t).sortBy("title","asc").limit(4).fetch();case 13:o.t6=o.sent,o.t7=(0,o.t5)(o.t6),o.t8=o.t1.concat.call(o.t1,o.t4,o.t7),o.t9=e,n.results=(0,o.t0)(o.t8,o.t9);case 18:case"end":return o.stop()}}),o)})))()},reset:function(){this.query="",this.showResults=!1}}}),m=(n(464),n(25)),f=n(33),v=n.n(f),x=n(225),_=n(143),w=n(56),y=n(599),O=n(598),component=Object(m.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-menu",{attrs:{value:t.showResults,"offset-y":"",bottom:"",rounded:"xl","open-on-click":""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,o=e.attrs;return[n("v-text-field",t._g(t._b({staticClass:"search-input unselectable",attrs:{dense:"",rounded:"",filled:"","hide-details":"auto","prepend-inner-icon":t.mdiMagnify,placeholder:t.$t("actions.search")},model:{value:t.query,callback:function(e){t.query=e},expression:"query"}},"v-text-field",o,!1),r))]}}])},[t._v(" "),t.results.length>0?n("v-list",t._l(t.results,(function(e){return n("v-list-item",{key:e.path,attrs:{to:e.path,width:"100%"},on:{click:function(e){return t.reset()}}},[n("v-list-item-title",[t._v(t._s(e.title))])],1)})),1):n("v-list",[n("v-list-item",[t._v(t._s(t.$t("misc.no-results")))])],1)],1)}),[],!1,null,null,null);e.default=component.exports;v()(component,{VList:x.a,VListItem:_.a,VListItemTitle:w.b,VMenu:y.a,VTextField:O.a})},578:function(t,e,n){"use strict";n.r(e);var r=n(57),o=n(30),l=Object(o.b)({data:function(){return{mdiBrightness2:r.d,mdiBrightness5:r.e}},computed:{useDarkTheme:function(){return"dark"===this.$colorMode.value||this.$colorMode.unknown}},watch:{useDarkTheme:{handler:function(t){this.$vuetify.theme.dark=t},immediate:!0}},methods:{toggleTheme:function(){this.$colorMode.preference=this.useDarkTheme?"light":"dark"}}}),c=n(25),d=n(33),h=n.n(d),m=n(333),f=n(224),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-btn",{attrs:{icon:"","x-small":"","aria-label":t.$t(t.useDarkTheme?"actions.use-light-theme":"actions.use-dark-theme")},on:{click:function(e){return t.toggleTheme()}}},[n("v-icon",[t._v(t._s(t.useDarkTheme?t.mdiBrightness5:t.mdiBrightness2))])],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{VBtn:m.a,VIcon:f.a})},579:function(t,e,n){"use strict";n.r(e);var r=n(30),o=Object(r.b)({data:function(){return{locales:[{code:"de",name:"DE"},{code:"en",name:"EN"}]}}}),l=n(25),c=n(33),d=n.n(c),h=n(333),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{width:"max-content"}},t._l(t.locales,(function(e){return n("v-btn",{key:e.code,attrs:{plain:"","x-small":"",to:t.switchLocalePath(e.code)}},[t._v("\n    "+t._s(e.name)+"\n  ")])})),1)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VBtn:h.a})},580:function(t,e,n){"use strict";n.r(e);var r=n(25),o=n(33),l=n.n(o),c=n(225),component=Object(r.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("v-list",{attrs:{dense:"",nav:""}},[e("app-navigation")],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{AppNavigation:n(573).default}),l()(component,{VList:c.a})},581:function(t,e,n){"use strict";n.r(e);var r=n(25),o=n(33),l=n.n(o),c=n(595),component=Object(r.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-footer",{attrs:{app:"",dark:""}},[n("div",{staticStyle:{flex:"2"}},[n("span",{staticClass:"unselectable",staticStyle:{"font-size":"0.75rem"}},[t._v("\n      © "+t._s((new Date).getFullYear())+", Jan Müller\n    ")])]),t._v(" "),n("div",[n("theme-toggle")],1),t._v(" "),n("div",[n("language-toggle")],1)])}),[],!1,null,null,null);e.default=component.exports;l()(component,{ThemeToggle:n(578).default,LanguageToggle:n(579).default}),l()(component,{VFooter:c.a})}},[[357,39,4,40]]]);