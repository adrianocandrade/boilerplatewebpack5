(()=>{"use strict";const e=document.querySelector('.theme-switch input[type="checkbox"]'),t=localStorage.getItem("theme");var a=document.body;function c(t){return t?(document.documentElement.setAttribute("data-theme","dark"),a.classList.add("dark"),localStorage.setItem("theme","dark"),e.checked=!0,!0):(document.documentElement.setAttribute("data-theme","light"),c=document.getElementById("body"),d=new RegExp("(\\s|^)"+"dark"+"(\\s|$)"),c.className=c.className.replace(d," "),localStorage.setItem("theme","light"),e.checked=!1,!1);var c,d}window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches&&c(!0),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(e=>{c(!0)})),t&&(document.documentElement.setAttribute("data-theme",t),"dark"===t&&c(!0)),e.addEventListener("change",(function(e){e.target.checked?c(!0):c(!1)}),!1)})();