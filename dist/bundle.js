!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.LiteStatus=t():e.LiteStatus=t()}(this,(function(){return(()=>{"use strict";var e={607:(e,t,r)=>{r.r(t),r.d(t,{WeekGraph:()=>s,getDaysInMonth:()=>a});var n=function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o={externalBorder:!0,internalBorder:!0},s=function(e,t,r){var s=this;void 0===r&&(r=null),this.foundSource=!1,this.currentConfig=r&&null!==r?n(n({},o),r):o;try{var a=document.getElementById(t);this.foundSource=!!a,this.foundSource&&(console.log("source was found"),this.source=a)}catch(e){return console.log("Could not locate source"),null}var i=c({classes:["week-graph",this.currentConfig.externalBorder?"border":""]});e.map((function(e){var t=c({content:e.info,classes:"info"}),r=c({classes:["day",e.online?"online":"offline",s.currentConfig.internalBorder?"border":""]});r.append(t),i.append(r)})),this.source.append(i)};function a(e,t){for(var r=new Date(t,e,1),n=[];r.getMonth()===e;)n.push(new Date(r)),r.setDate(r.getDate()+1);return n}function c(e){var t=document.createElement("div");return e&&e.content&&(t.textContent=e.content),e&&e.classes&&Array.isArray(e.classes)&&t.setAttribute("class",e.classes.join(" ")),e&&e.classes&&"string"==typeof e.classes&&t.setAttribute("class",e.classes),t}}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}return r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(607)})()}));