(window.webpackJsonp=window.webpackJsonp||[]).push([[7,6],{683:function(t,e,n){"use strict";n.r(e);var r=n(30),o=Object(r.b)({props:{href:{type:String,required:!0},icon:{type:String,required:!0},name:{type:String,required:!0},color:{type:String,default:void 0}}}),c=n(25),l=n(33),f=n.n(l),h=n(333),m=n(224),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-btn",{staticClass:"ma-0",attrs:{rel:"noopener",icon:"",large:"",height:"48",width:"48",target:"_blank","aria-label":t.name,color:t.color,href:t.href}},[n("v-icon",{class:{"text--primary":!t.color},attrs:{large:""},domProps:{textContent:t._s(t.icon)}})],1)}),[],!1,null,null,null);e.default=component.exports;f()(component,{VBtn:h.a,VIcon:m.a})},700:function(t,e,n){"use strict";n.r(e);var r=n(57),o=n(30),c=Object(o.b)({data:function(){return{accounts:[{name:"GitHub",href:"https://github.com/DerYeger",icon:r.k},{name:"NPM",href:"https://www.npmjs.com/~yeger",icon:r.p,color:"#CB0000"},{name:"XING",href:"https://www.xing.com/profile/Jan_Mueller1092/cv",icon:r.u,color:"#006566"},{name:"ArtStation",href:"https://www.artstation.com/deryeger",icon:r.b,color:"#00AFEB"}]}}}),l=n(25),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"responsive-list"},t._l(t.accounts,(function(t,e){return n("account-link",{key:e,attrs:{name:t.name,icon:t.icon,href:t.href,color:t.color}})})),1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{AccountLink:n(683).default})}}]);