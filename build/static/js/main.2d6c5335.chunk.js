(this["webpackJsonptechnoatom-d-tsyrkov"]=this["webpackJsonptechnoatom-d-tsyrkov"]||[]).push([[0],{2:function(e,a,t){e.exports={dialog_header:"dialog-form_dialog_header__3VDhw",header_text:"dialog-form_header_text__1YTWw",chat_list:"dialog-form_chat_list__23Okk",add_button:"dialog-form_add_button__1ROua",avatar_img:"dialog-form_avatar_img__2bhY2",add_input:"dialog-form_add_input__1A4xZ",dialog_container:"dialog-form_dialog_container__39IIc",dialog_avatar:"dialog-form_dialog_avatar__1gkpO",dialog_name:"dialog-form_dialog_name__2iec2",dialog_message:"dialog-form_dialog_message__2oML4",dialog_date:"dialog-form_dialog_date__Nn60S",dialog_check:"dialog-form_dialog_check__1ubGd"}},22:function(e,a,t){var n=t(41).default;e.exports=n()},29:function(e,a,t){e.exports=t(40)},39:function(e,a,t){},40:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(13),o=t(27),i=t(22),l=t.n(i),s=t(8),m=t(24),u=t(43),d=t(6),_=t(28),g=t(15),f=t(2),v=t.n(f);function E(e){return r.a.createElement("div",{className:v.a.dialog_container,onClick:function(){return e.redirect(e.name)}},r.a.createElement("div",{className:v.a.dialog_avatar},r.a.createElement("img",{src:"https://icon-library.net//images/free-profile-icon/free-profile-icon-4.jpg",className:v.a.avatar_img})),r.a.createElement("div",null,r.a.createElement("div",{className:v.a.dialog_name},e.name),r.a.createElement("div",{className:v.a.dialog_message},e.message)),r.a.createElement("div",null,r.a.createElement("div",{className:v.a.dialog_date},e.date),e.check?r.a.createElement("div",{className:v.a.dialog_check},"\u2714"):null))}var h=function(e){var a=Object(n.useState)([]),t=Object(s.a)(a,2),c=t[0],o=t[1],i=Object(n.useState)(!1),l=Object(s.a)(i,2),m=l[0],u=l[1];return Object(n.useEffect)((function(){var a=localStorage.getItem("users");if(null===a)localStorage.setItem("users",JSON.stringify([]));else{var t=[];JSON.parse(a).map((function(a){var n=JSON.parse(localStorage.getItem(a)).pop(),c="",o="",i=!1;void 0!==n&&(c=n[0],o=n[1],i=!0),t.push(r.a.createElement(E,{name:a,date:o,message:c,check:i,key:t.length,redirect:function(a){return e.redirect(a)}}))})),o(t)}}),[]),r.a.createElement("div",{className:v.a.dialog_form},r.a.createElement("div",{className:v.a.dialog_header},r.a.createElement("div",null,"\u2630"),r.a.createElement("div",{className:v.a.header_text},"Messenger"),r.a.createElement("div",null,"\ud83d\udd0e")),r.a.createElement("div",{className:v.a.chat_list},c),r.a.createElement("button",{className:v.a.add_button,onClick:function(){u(!m)}},"\u270e"),m?r.a.createElement((function(e){var a=Object(n.useState)(""),t=Object(s.a)(a,2),i=t[0],l=t[1];return r.a.createElement("form",{onSubmit:function(a){return function(a,t){if(a.preventDefault(),""!==t){var n=JSON.parse(localStorage.getItem("users"));o([].concat(Object(g.a)(c),[r.a.createElement(E,{name:t,key:n.length,redirect:function(a){return e.redirect(a)}})])),n.push(t),localStorage.setItem("users",JSON.stringify(n)),localStorage.setItem(t,JSON.stringify([]))}}(a,i.trim())}},r.a.createElement("input",{className:v.a.add_input,type:"text",onChange:function(e){return function(e){l(e.target.value)}(e)}}))}),{redirect:function(a){return e.redirect(a)}}):null)},N=t(9),p=t.n(N);var O=function(e){var a=Object(n.useState)([]),t=Object(s.a)(a,2),c=t[0],o=t[1],i=Object(n.useRef)(null);return Object(n.useEffect)((function(){i.current.scrollIntoView({block:"end"})}),[c]),Object(n.useEffect)((function(){var a=[];JSON.parse(localStorage.getItem(e.name)).map((function(e){a.push(r.a.createElement("div",{key:a.length,className:p.a.message_container},r.a.createElement("div",null,e[0]),r.a.createElement("div",null,e[1])))})),o(a)}),[]),r.a.createElement("div",{className:p.a.wrapper},r.a.createElement("div",{className:p.a.chat_header},r.a.createElement("div",{className:p.a.chat_exit_button,onClick:function(){return e.redirect()}},"\u21e6"),r.a.createElement("div",{className:p.a.chat_name},e.name)),r.a.createElement("div",{className:p.a.messages_list,ref:i},c),r.a.createElement((function(e){var a=Object(n.useState)(""),t=Object(s.a)(a,2),i=t[0],l=t[1],m=Object(n.useRef)(null);return Object(n.useEffect)((function(){m.current.focus()}),[m]),r.a.createElement("form",{onSubmit:function(a){return function(a,t){if(a.preventDefault(),""!==t){var n=new Date,i=JSON.parse(localStorage.getItem(e.name)),l=n.getMinutes().toString();1===l.length&&(l="0"+l);var s=n.getHours();1===s.length&&(s="0"+s),o([].concat(Object(g.a)(c),[r.a.createElement("div",{className:p.a.message_container,key:i.length},r.a.createElement("div",null,t),r.a.createElement("div",null,s+":"+l))])),i.push([t,s+":"+l]),localStorage.setItem(e.name,JSON.stringify(i))}}(a,i.trim())}},r.a.createElement("input",{type:"text",onChange:function(e){return function(e){l(e.target.value)}(e)},className:p.a.message_input,ref:m}))}),{name:e.name}))};function b(){var e=Object(m.a)(["\n\tbackground-color: rgb(20, 20, 20);\n\theight: 100vh;\n\toverflow: auto;\n"]);return b=function(){return e},e}var S=_.a.div(b()),j=Object(d.a)();var k=function(e){var a=Object(n.useState)(r.a.createElement(h,{redirect:function(e){return i(e)}})),t=Object(s.a)(a,2),c=t[0],o=t[1],i=function(e){o(r.a.createElement(O,{redirect:function(){return l()},name:e}))},l=function(){o(r.a.createElement(h,{redirect:function(e){return i(e)}}))};return r.a.createElement(u.a,{history:j},r.a.createElement(S,null,r.a.createElement(u.b,null,c)))};t(39),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));Object(c.render)(r.a.createElement(o.a,{store:l.a},r.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},41:function(e,a,t){"use strict";t.r(a);var n=t(10),r=t(23),c={INCREMENT_COUNTER:"INCREMENT_COUNTER",DECREMENT_COUNTER:"DECREMENT_COUNTER"},o=0;var i=Object(n.c)({counter:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o;switch((arguments.length>1?arguments[1]:void 0).type){case c.INCREMENT_COUNTER:return e+1;case c.DECREMENT_COUNTER:return e-1;default:return e}}});t.d(a,"default",(function(){return m}));var l=[r.a],s=[n.a.apply(void 0,l)];function m(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return n.d.apply(void 0,[i,e].concat(s))}},9:function(e,a,t){e.exports={messages_list:"message-form_messages_list__OOCNx",chat_header:"message-form_chat_header__3a1yp",chat_name:"message-form_chat_name__2ryTi",chat_exit_button:"message-form_chat_exit_button__3OyEC",message_container:"message-form_message_container__1mEIN",message_input:"message-form_message_input__14lGL"}}},[[29,1,2]]]);
//# sourceMappingURL=main.2d6c5335.chunk.js.map