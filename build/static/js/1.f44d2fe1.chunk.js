(this["webpackJsonpmagic-light"]=this["webpackJsonpmagic-light"]||[]).push([[1],{195:function(t,n,e){"use strict";e.r(n),e.d(n,"startFocusVisible",(function(){return i}));var o=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp"],i=function(){var t=[],n=!0,e=document,i=function(n){t.forEach((function(t){return t.classList.remove("ion-focused")})),n.forEach((function(t){return t.classList.add("ion-focused")})),t=n},s=function(){n=!1,i([])};e.addEventListener("keydown",(function(t){(n=o.includes(t.key))||i([])})),e.addEventListener("focusin",(function(t){if(n&&t.composedPath){var e=t.composedPath().filter((function(t){return!!t.classList&&t.classList.contains("ion-focusable")}));i(e)}})),e.addEventListener("focusout",(function(){e.activeElement===e.body&&i([])})),e.addEventListener("touchstart",s),e.addEventListener("mousedown",s)}}}]);
//# sourceMappingURL=1.f44d2fe1.chunk.js.map