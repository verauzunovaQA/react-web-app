(this["webpackJsonpreact-web-app"]=this["webpackJsonpreact-web-app"]||[]).push([[0],{15:function(t,e,n){},16:function(t,e,n){},17:function(t,e,n){},19:function(t,e,n){"use strict";n.r(e);var i=n(2),c=n.n(i),o=n(7),a=n.n(o),u=(n(15),n(16),n(10)),r=n(1),s=n(6),d=n(21),l=n(8),j=n(9),b=new(function(){function t(){Object(l.a)(this,t)}return Object(j.a)(t,[{key:"add",value:function(t,e){localStorage.setItem(t,JSON.stringify(e))}},{key:"get",value:function(t){return JSON.parse(localStorage.getItem(t))}}]),t}()),f=(n(17),n(0));var O=function(){var t,e=null!==(t=b.get("todos"))&&void 0!==t?t:[],n=Object(i.useRef)(null),c=Object(i.useState)(e),o=Object(s.a)(c,2),a=o[0],l=o[1],j=Object(i.useState)(""),O=Object(s.a)(j,2),v=O[0],p=O[1],g=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=t.sort((function(t,e){return t.isDone&&!e.isDone?1:!t.isDone&&e.isDone?-1:0}));e&&b.add("todos",n),l(n)},m=function(){if(0!==v.trim().length){var t=[].concat(Object(u.a)(a),[{id:Object(d.a)(),value:v,isEditing:!1,isDone:!1}]);g(t),p(""),n.current&&n.current.focus()}},h=function(t){var e=a.map((function(e){return e.id===t?Object(r.a)(Object(r.a)({},e),{},{isEditing:!1}):e}));g(e)},x=function(t){return"Enter"===t};return Object(f.jsxs)("div",{children:[Object(f.jsx)("input",{type:"text",onKeyUp:function(t){x(t.key)&&m()},onChange:function(t){p(t.target.value)},value:v,ref:n,autoFocus:!0}),Object(f.jsx)("input",{type:"submit",disabled:0===v.trim().length,onClick:function(t){m()},value:"submit"}),Object(f.jsx)("ul",{className:"padding-elements",children:a.map((function(t){return Object(f.jsxs)("li",{className:"todo-separate-items",children:[Object(f.jsx)("span",{className:"todo-item-status-icon".concat(t.isDone?" is-done":""),onClick:function(){return function(t){var e=a.map((function(e){return e.id===t?Object(r.a)(Object(r.a)({},e),{},{isDone:!e.isDone}):e}));g(e)}(t.id)}}),t.isEditing?Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("input",{className:"input-field",type:"text",onKeyUp:function(e){return n=e,i=t.id,void(x(n.key)&&h(i));var n,i},value:t.value,onChange:function(e){return function(t,e){if(0!==t.target.value.trim().length){var n=a.map((function(n){return n.id===e?Object(r.a)(Object(r.a)({},n),{},{value:t.target.value}):n}));g(n)}}(e,t.id)},autoFocus:!0}),Object(f.jsx)("button",{className:"todo-button save-button",onClick:function(){return e=t.id,void h(e);var e},children:"save"})]}):Object(f.jsxs)(f.Fragment,{children:[t.value," "," ",Object(f.jsx)("button",{className:"todo-button",onClick:function(){return function(t){var e=a.map((function(e){return e.id===t?Object(r.a)(Object(r.a)({},e),{},{isEditing:!0}):e}));g(e,!1)}(t.id)},children:"edit"})," ",Object(f.jsx)("button",{className:"todo-button",onClick:function(){return function(t){var e=a.filter((function(e){return e.id!==t}));g(e)}(t.id)},children:"remove"})]})]},t.id)}))})]})};var v=function(){return Object(f.jsx)("div",{children:Object(f.jsxs)("header",{className:"App-header",children:[Object(f.jsx)("h1",{children:"ToDoList"}),Object(f.jsx)(O,{})]})})},p=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,22)).then((function(e){var n=e.getCLS,i=e.getFID,c=e.getFCP,o=e.getLCP,a=e.getTTFB;n(t),i(t),c(t),o(t),a(t)}))};a.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(v,{})}),document.getElementById("root")),p()}},[[19,1,2]]]);
//# sourceMappingURL=main.e89e3b5d.chunk.js.map