(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=13},32:function(e,t,n){e.exports=n(71)},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},43:function(e,t){},45:function(e,t){},46:function(e,t){},47:function(e,t){},48:function(e,t){},70:function(e,t,n){},71:function(e,t,n){"use strict";n.r(t);var a=n(3),o=n.n(a),i=n(28),r=n.n(i),c=(n(37),n(1)),l=n(2),s=n(7),u=n(6),h=n(8),p=(n(38),n(39),"/");"http:"!==window.location.protocol&&(p+="brext/"),n(22).GlobalWorkerOptions.workerSrc=p+"pdf.worker.js";var d=function(e){function t(e){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).call(this,e))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return null!==this.props.canvas?o.a.createElement("div",{style:{position:"absolute",top:"0px",left:"0px",borderColor:"black",borderStyle:"dashed",borderWidth:"2px",backgroundImage:'url("'.concat(this.props.canvas.toDataURL("image/png"),'")'),backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"contain",width:this.props.canvas.width*this.props.scale,height:this.props.canvas.height*this.props.scale},id:"page"+this.props.pageNumber+this.props.scale}):o.a.createElement("div",null,"loading")}}]),t}(a.Component),g=n(0),f=n.n(g),v=n(9),m=n(20),w=n(29),b=n(31),k={redirectUri:window.location.href},y=new m.UserAgentApplication("aa31273b-0fc3-43c3-8abe-08f3234d2e33",void 0,function(e,t,n,a){},k),A={authProvider:new w.MSALAuthenticationProvider(y,["user.read","mail.send","notes.read","Files.ReadWrite.All"])},E=b.a.initWithMiddleware(A);function P(e,t){var n=new Blob([t],{type:"text/plain"}),a=document.createElement("a");a.download="".concat(e,".html"),a.href=(window.webkitURL||window.URL).createObjectURL(n),a.dataset.downloadurl=["text/plain",a.download,a.href].join(":"),a.click()}function j(e){return C.apply(this,arguments)}function C(){return(C=Object(v.a)(f.a.mark(function e(t){var n;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.api("/me/onenote/pages/".concat(t,"/content?includeinkML=true")).get();case 2:n=e.sent,O(t,n);case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}function O(e,t){var n=t.getReader(),a="";n.read().then(function t(o){var i=o.done,r=o.value;if(i)return console.log("Stream complete"),void function(e,t){for(var n=t.split("\n"),a=0,o="",i=n[0].slice(0,-1),r=3;r<n.length;r++)n[r].startsWith(i)?(P(e+"_"+a,o),++r<n.length&&(a+=1,o=""),r++):o+=n[r]+"\n"}(e,a);r.length;var c=r;return a+=new TextDecoder("utf-8").decode(c),n.read().then(t)})}function x(e){return L.apply(this,arguments)}function L(){return(L=Object(v.a)(f.a.mark(function e(t){var n,a,o;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],e.prev=1,e.next=4,E.api("/me/onenote/pages").filter("startswith(title,'artifex') or startswith(title,'Artifex')").get();case 4:for(a=e.sent,console.log(a),o=0;o<a.value.length;o++)j(a.value[o].id),n.push(a.value[o].id);e.next=12;break;case 9:throw e.prev=9,e.t0=e.catch(1),e.t0;case 12:return e.abrupt("return",n);case 13:case"end":return e.stop()}},e,null,[[1,9]])}))).apply(this,arguments)}var S=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h2",null,"Download OneNote pages"),o.a.createElement("br",null),o.a.createElement("ul",{style:{textAlign:"left"}},o.a.createElement("li",null,"Click following button to download all OneNote pages which title starts with [Aa]tifex. "),o.a.createElement("li",null,"Check ",o.a.createElement("a",{href:"https://www.w3.org/TR/InkML/"},"inkML")," for standard "),o.a.createElement("li",null,"Check ",o.a.createElement("a",{href:"https://github.com/microsoft/InkMLjs"},"inkMLjs")," for JavaScript render implementation"),o.a.createElement("li",null," Example",o.a.createElement("ul",null,o.a.createElement("li",null,"Response data from Graph API, ",o.a.createElement("a",{href:"https://zhenqiang.li/brext/onenote-page.txt"},"link")),o.a.createElement("li",null,"Rendered view in OneNote, ",o.a.createElement("a",{href:"https://zhenqiang.li/brext/onenote-page.png"},"link"))))),o.a.createElement("button",{onClick:x},"start"),o.a.createElement("br",null),o.a.createElement("br",null))}}]),t}(a.Component),R=n(22);R.GlobalWorkerOptions.workerSrc=p+"pdf.worker.js";var D=function(){function e(){Object(c.a)(this,e)}return Object(l.a)(e,[{key:"getPdfInfo",value:function(e){}},{key:"getPageAsImg",value:function(){var e=Object(v.a)(f.a.mark(function e(t,n){return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n<=1&&(n=1),console.log("PdfjsWrapper#getPageAsImg async  %o %o",t,n),e.abrupt("return",R.getDocument(t).promise.then(function(e){return console.log("PdfjsWrapper#getPageAsImg async  %o",e),e.getPage(n).then(function(e){var t=e.getViewport(2),n=document.createElement("canvas"),a=n.getContext("2d");n.width=t.width,n.height=t.height,console.log("getPageAsImg#renderPage start done %o %o",t.width,t.height);var o={canvasContext:a,viewport:t};return e.render(o).promise.then(function(){return n},function(e){return console.log(e)})},function(e){return console.log("getPageAsImg#getDocument error %o",e)})}));case 3:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),W=(n(70),function(){function e(t){Object(c.a)(this,e),this.svg=t,this.initPath()}return Object(l.a)(e,[{key:"initPath",value:function(){this.path=document.createElementNS("http://www.w3.org/2000/svg","path"),this.path.setAttribute("stroke","black"),this.path.setAttribute("fill","none"),this.path.setAttribute("stroke-width","2"),this.d=""}},{key:"startAction",value:function(e,t){console.log("Drawable#startAction (%o, %o)",e,t),this.initPath(),this.d="M ".concat(e," ").concat(t),this.svg.append(this.path)}},{key:"updateAction",value:function(e,t){this.d.startsWith("M")&&(this.d="".concat(this.d," L ").concat(e," ").concat(t),this.path.setAttribute("d","".concat(this.d)))}},{key:"endAction",value:function(e,t){this.initPath()}}]),e}()),N=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).writingCanvas=o.a.createRef(),n.currentActioner=null,n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"getTouchType",value:function(e){switch(e){case"direct":return"touch";case"stylus":return"pen";default:return e}}},{key:"initPointerListeners",value:function(e){var t=this;e.addEventListener("touchstart",function(n){console.log("touchstart %o",n);var a=e.getBoundingClientRect(),o=n.touches[0];t.startAction(o.clientX-a.left,o.clientY-a.top,t.getTouchType(o.touchType)),n.preventDefault(),n.stopPropagation()}),e.addEventListener("touchmove",function(n){var a=e.getBoundingClientRect(),o=n.touches[0];t.updateAction(o.clientX-a.left,o.clientY-a.top,t.getTouchType(o.touchType)),n.preventDefault(),n.stopPropagation()}),e.addEventListener("touchend",function(n){e.getBoundingClientRect(),n.touches[0];t.endAction(-1,-1,"unknown"),n.preventDefault(),n.stopPropagation()}),e.addEventListener("mousedown",function(n){var a=e.getBoundingClientRect();t.startAction(n.clientX-a.left,n.clientY-a.top,"mouse"),n.preventDefault(),n.stopPropagation()}),e.addEventListener("mousemove",function(n){var a=e.getBoundingClientRect();t.updateAction(n.clientX-a.left,n.clientY-a.top,"mouse"),n.preventDefault(),n.stopPropagation()}),e.addEventListener("mouseup",function(n){var a=e.getBoundingClientRect();t.endAction(n.clientX-a.left,n.clientY-a.top,"mouse"),n.preventDefault(),n.stopPropagation()}),e.addEventListener("pointerdown",function(n){console.log("WL#pointerDown %o %o",e,n);var a=e.getBoundingClientRect();t.startAction(n.clientX-a.left,n.clientY-a.top,n.pointerType),n.preventDefault(),n.stopPropagation()}),e.addEventListener("pointermove",function(n){var a=e.getBoundingClientRect();t.updateAction(n.clientX-a.left,n.clientY-a.top,n.pointerType),n.preventDefault(),n.stopPropagation()}),e.addEventListener("pointerup",function(n){var a=e.getBoundingClientRect();t.endAction(n.clientX-a.left,n.clientY-a.top,n.pointerType),n.preventDefault(),n.stopPropagation()})}},{key:"startAction",value:function(e,t,n){"touch"!==n&&this.currentActioner&&this.currentActioner.startAction(e,t)}},{key:"updateAction",value:function(e,t,n){this.currentActioner&&this.currentActioner.updateAction(e,t)}},{key:"endAction",value:function(e,t,n){this.currentActioner&&this.currentActioner.endAction(e,t)}},{key:"componentDidMount",value:function(){console.log("WritingLayer#componentDidMount %o",this.writingCanvas.current),this.initPointerListeners(this.writingCanvas.current),this.currentActioner=new W(this.writingCanvas.current)}},{key:"render",value:function(){return o.a.createElement("div",{style:{position:"absolute",width:"100%",height:"100%"}},o.a.createElement("svg",{ref:this.writingCanvas,style:{width:"100%",height:"100%"}}))}}]),t}(a.Component),T=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={current:0,canvas:null,scale:1,pdfjsWrapper:new D},n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"loadPage",value:function(){var e=this;this.state.pdfjsWrapper.getPageAsImg("https://zhenqiang.li/pdf/zaijidulizhangjin.pdf",this.state.current).then(function(t){e.setState({canvas:t})})}},{key:"handlePageChange",value:function(e){var t=this;console.log("App#handlePageChange %o",e.target.value),this.setState({current:Number(e.target.value)}),this.loadPage(this.state.current,function(){return t.loadPage()})}},{key:"handlePagePrev",value:function(e){var t=this;console.log("App#handlePagePrev %o",e),this.setState({current:this.state.current-1},function(){return t.loadPage()})}},{key:"handlePageNext",value:function(e){var t=this;console.log("App#handlePageNext %o",e),this.setState({current:this.state.current+1},function(){return t.loadPage()})}},{key:"handleScaleChange",value:function(e){console.log("App#handleScaleChange %o",e.target.value),this.setState({scale:Number(e.target.value)})}},{key:"handleScaleDown",value:function(){this.setState({scale:this.state.scale-.1})}},{key:"handleScaleUp",value:function(){this.setState({scale:this.state.scale+.1})}},{key:"render",value:function(){return window.location.pathname===p+"msapi"?o.a.createElement("div",{className:"App"},o.a.createElement(S,null)):o.a.createElement("div",{className:"App"},o.a.createElement(d,{canvas:this.state.canvas,scale:this.state.scale}),o.a.createElement(N,null),o.a.createElement("div",{style:{position:"absolute",top:"0px",left:"0px"}},o.a.createElement("input",{type:"text",value:Number(this.state.current),onChange:this.handlePageChange.bind(this),placeholder:"Write a page number..."}),o.a.createElement("button",{onClick:this.handlePagePrev.bind(this)},"prev"),o.a.createElement("button",{onClick:this.handlePageNext.bind(this)},"next"),o.a.createElement("input",{type:"text",value:Number(this.state.scale),onChange:this.handleScaleChange.bind(this),placeholder:"Write a scale number..."}),o.a.createElement("button",{onClick:this.handleScaleDown.bind(this)},"Scale-"),o.a.createElement("button",{onClick:this.handleScaleUp.bind(this)},"Scale+")))}}]),t}(a.Component),U=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function B(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(o.a.createElement(T,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/brext",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/brext","/service-worker.js");U?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):B(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):B(t,e)})}}()}},[[32,1,2]]]);
//# sourceMappingURL=main.af4a239e.chunk.js.map