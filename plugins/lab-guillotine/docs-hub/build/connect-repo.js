!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=22)}([function(e,t){!function(){e.exports=this.wp.element}()},function(e,t,n){e.exports=n(15)()},function(e,t){!function(){e.exports=this.regeneratorRuntime}()},function(e,t){!function(){e.exports=this.wp.i18n}()},function(e,t,n){var r=n(10),a=n(11),o=n(12),c=n(14);e.exports=function(e,t){return r(e)||a(e,t)||o(e,t)||c()}},function(e,t){function n(e,t,n,r,a,o,c){try{var i=e[o](c),l=i.value}catch(e){return void n(e)}i.done?t(l):Promise.resolve(l).then(r,a)}e.exports=function(e){return function(){var t=this,r=arguments;return new Promise((function(a,o){var c=e.apply(t,r);function i(e){n(c,a,o,i,l,"next",e)}function l(e){n(c,a,o,i,l,"throw",e)}i(void 0)}))}}},function(e,t,n){var r=n(17);e.exports=function(e,t){if(null==e)return{};var n,a,o=r(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}},function(e,t,n){},function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t){function n(){return e.exports=n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},n.apply(this,arguments)}e.exports=n},function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},function(e,t){e.exports=function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}}},function(e,t,n){var r=n(13);e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,t,n){"use strict";var r=n(16);function a(){}function o(){}o.resetWarningCache=a,e.exports=function(){function e(e,t,n,a,o,c){if(c!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:a};return n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t){e.exports=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(2),o=n.n(a),c=n(5),i=n.n(c),l=n(4),u=n.n(l),s=n(1),p=n.n(s),b=n(3),f=n(6),d=n.n(f),m=function(e){return function(e){return e.map((function(e){var t=e.object,n=d()(e,["object"]);if("blob"===e.type)return n;var r=t.entries.map((function(e){return e}));return n.contents=r,n}))}(function(e){return e.filter((function(e){return"tree"===e.type?"assets"!==e.name:e}))}(function(e){return e.filter((function(e){return"_"!==e.name.charAt(0)}))}(function(e){return e.filter((function(e){return"Gemfile"!==e.name}))}(e))))},g=function(e,t,n){var r,a=n?"/"===(r=n).slice(-1)?r:"".concat(r,"/"):"";return"".concat(e,":").concat(a).concat(t)},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return"\n  query QueryDirectoryTree(\n    $owner: String!,\n    $repo: String!\n  ){\n    repository( name: $repo, owner: $owner ) {\n      ".concat(t.map((function(e){return"\n        ".concat(e.alias,':object( expression: "').concat(e.path,'" ) {\n          ... on Blob {\n            oid\n          }\n        }\n      ')})),"\n      ").concat(e.map((function(e){return"\n        ".concat(e.alias,':object( expression: "').concat(e.path,'" ) {\n          ... on Tree {\n            entries {\n              name\n              oid\n              path\n              type\n              object {\n                ... on Tree {\n                  entries {\n                    name\n                    oid\n                    path\n                    type\n                  }\n                }\n              }\n            }\n          }\n        }\n    ')})),"\n    }\n  }\n")},O=function(){var e=i()(o.a.mark((function e(t,n,r){var a,c,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={"Content-Type":"application/json"},r&&(a.Authorization="Bearer ".concat(r)),e.next=4,fetch("https://api.github.com/graphql",{method:"POST",headers:a,body:JSON.stringify({query:t,variables:n})});case 4:return c=e.sent,e.next=7,c.json();case 7:if(!(i=e.sent).errors){e.next=11;break}throw console.error(i.errors),new Error("Failed to fetch API");case 11:return e.abrupt("return",i.data);case 12:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),h=function(){var e=i()(o.a.mark((function e(t,n,r,a){var c,i,l,u,s,p,b,f,d,h;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=[{alias:"docs",path:g(r,"docs/",a)}],p=[{alias:"changelog",path:g(r,"CHANGELOG.md",a)},{alias:"readme",path:g(r,"README.md",a)}],e.next=4,O(y(s,p),t,n);case 4:return b=e.sent,f=null==b||null===(c=b.repository)||void 0===c||null===(i=c.docs)||void 0===i?void 0:i.entries,d=f?m(f):null,h={changelog:null==b||null===(l=b.repository)||void 0===l?void 0:l.changelog,readme:null==b||null===(u=b.repository)||void 0===u?void 0:u.readme,docs:d},e.abrupt("return",h);case 9:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),v=function(){var e=i()(o.a.mark((function e(t,n){var r,a,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O('\n  query QueryDefaultBranch(\n    $owner: String!,\n    $repo: String!\n  ){\n    repository( name: $repo, owner: $owner ) {\n      refs(refPrefix: "refs/heads/", first: 10) {\n        nodes {\n          name\n        }\n      }\n      defaultBranchRef {\n        name\n      }\n    }\n  }\n',t,n);case 2:return c=e.sent,e.abrupt("return",{branches:c.repository.refs.nodes.map((function(e){return e.name})),defaultBranch:null==c||null===(r=c.repository)||void 0===r||null===(a=r.defaultBranchRef)||void 0===a?void 0:a.name});case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),j=[{title:"Step One:",subtitle:"Set Repo Owner & Name"},{title:"Step Two:",subtitle:"Select Repo Branch"},{title:"Step Three:",subtitle:"Identify Directory to Search"},{title:"Step Four:",subtitle:"Get File Tree"},{title:"Step Five:",subtitle:"Select Files to Include in Build"}],w=(n(7),function(e){var t=e.active,n=e.subtitle,a=e.title;return Object(r.createElement)("div",{className:t?"gpalab-docs-progress-step active":"gpalab-docs-progress-step"},Object(r.createElement)("span",null,a),Object(r.createElement)("span",null,n))});w.propTypes={active:p.a.bool,subtitle:p.a.string,title:p.a.string};var E=w,x=function(e){var t=e.active,n=e.steps;return Object(r.createElement)("ul",{className:"gpalab-docs-progress-bar",style:{gridTemplateColumns:"repeat(".concat(n.length,", 1fr)")}},n.map((function(e,n){return Object(r.createElement)("li",{key:e.title},Object(r.createElement)(E,{active:t===n,title:e.title,subtitle:e.subtitle}))})))};x.propTypes={active:p.a.number,steps:p.a.arrayOf(p.a.shape({subtitle:p.a.string,title:p.a.string}))};var S=x,_=n(8),k=n.n(_),T=n(9),N=n.n(T),P=p.a.shape({name:p.a.string,oid:p.a.string,path:p.a.string,type:p.a.string}),C=(n(18),function(e){var t=e.data,n=e.final,a=d()(e,["data","final"]);return Object(r.createElement)("span",N()({className:"gpalab-docs-leaf"},a),"".concat(n?"└──":"├──"," ").concat(t.name),Object(r.createElement)("input",{className:"gpalab-docs-leaf-checkbox",type:"checkbox"}))});C.propTypes={data:P,final:p.a.bool};var z=C,R=(n(19),function(e){var t=e.id,n=e.leaves,a=e.name;return Object(r.createElement)("div",{key:t,className:"gpalab-docs-cluster"},Object(r.createElement)("strong",null,"".concat(a,"/")),Object(r.createElement)("ul",{className:"gpalab-docs-leaves"},n&&n.map((function(e,t){return Object(r.createElement)(z,{key:e.oid,data:e,final:t===n.length-1})}))))});R.propTypes={id:p.a.string,leaves:p.a.arrayOf(P),name:p.a.string};var A=R;n(20);function B(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var D=function(e){var t=e.changelog,n=e.readme,a=e.tree;return Object(r.createElement)("div",{className:"gpalab-docs-file-tree"},t&&Object(r.createElement)(z,{data:{name:"CHANGELOG"},style:{marginLeft:0}}),n&&Object(r.createElement)(z,{data:{name:"README"},style:{marginLeft:0}}),a&&Object(r.createElement)("strong",null,"docs/"),a&&a.map((function(e,t){return"blob"===e.type?Object(r.createElement)(z,{key:e.oid,data:e,final:t===a.length-1}):"tree"===e.type?Object(r.createElement)(A,{key:e.oid,id:e.oid,leaves:e.contents,name:e.name}):null})))};D.propTypes={changelog:p.a.shape({oid:p.a.string}),readme:p.a.shape({oid:p.a.string}),tree:p.a.arrayOf(p.a.shape(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?B(Object(n),!0).forEach((function(t){k()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):B(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({contents:p.a.arrayOf(P)},P)))};var I=D,F=(n(21),function(e){var t=e.owner,n=e.token,a=Object(r.useState)(0),c=u()(a,2),l=c[0],s=c[1],p=Object(r.useState)(""),f=u()(p,2),d=f[0],m=f[1],g=Object(r.useState)(null),y=u()(g,2),O=y[0],w=y[1],E=Object(r.useState)(!1),x=u()(E,2),_=x[0],k=x[1],T=Object(r.useState)(t),N=u()(T,2),P=N[0],C=N[1],z=Object(r.useState)(""),R=u()(z,2),A=R[0],B=R[1],D=Object(r.useState)(""),F=u()(D,2),G=F[0],$=F[1],M=Object(r.useState)(!1),L=u()(M,2),q=L[0],H=L[1],U=Object(r.useState)(null),W=u()(U,2),Q=W[0],J=W[1],V=function(e,t){var n=e.target.value;switch(t){case"branch":m(n);break;case"owner":C(n);break;case"repo":B(n);break;case"subdir":$(n)}},Y=function(){var e=i()(o.a.mark((function e(){var t,r,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v({owner:P,repo:A},n);case 2:t=e.sent,r=t.branches,a=t.defaultBranch,w(r),m(a),s(1);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),K=function(){var e=i()(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h({owner:P,repo:A},n,d,G);case 2:t=e.sent,J(t),s(4);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.createElement)("div",{className:"gpalab-docs-wizard-container"},Object(r.createElement)(S,{active:l,steps:j}),Object(r.createElement)("div",{className:"gpalab-docs-wizard-section"},Object(r.createElement)("label",{className:"gpalab-docs-wizard-label",htmlFor:"gpalab-docs-owner"},"".concat(Object(b.__)("Identify repo owner","gpalab-guillotine"),":"),Object(r.createElement)("input",{disabled:!!d,id:"gpalab-docs-owner",type:"text",value:P,onChange:function(e){return V(e,"owner")}}))),Object(r.createElement)("div",{className:"gpalab-docs-wizard-section"},Object(r.createElement)("label",{className:"gpalab-docs-wizard-label",htmlFor:"gpalab-docs-repo"},"".concat(Object(b.__)("Add the repo name","gpalab-guillotine"),":"),Object(r.createElement)("input",{disabled:!!d,id:"gpalab-docs-repo",type:"text",value:A,onChange:function(e){return V(e,"repo")}})),A&&Object(r.createElement)("button",{className:"gpalab-docs-wizard-button",type:"button",disabled:!!d,onClick:function(){return Y()}},Object(b.__)("Get GitHub Branches","gpalab-guillotine"))),O&&Object(r.createElement)("div",{className:"gpalab-docs-wizard-section"},Object(r.createElement)("label",{className:"gpalab-docs-wizard-label",htmlFor:"gpalab-docs-default-branch"},"".concat(Object(b.__)("Choose the branch","gpalab-guillotine"),":"),Object(r.createElement)("select",{disabled:!!_,id:"gpalab-docs-default-branch",value:d,onBlur:function(e){return V(e,"branch")},onChange:function(e){return V(e,"branch")}},O.map((function(e){return Object(r.createElement)("option",{key:e,value:e},e)})))),Object(r.createElement)("button",{className:"gpalab-docs-wizard-button",disabled:!!_,type:"button",onClick:function(){return k(!0),void s(2)}},Object(b.__)("Use This Branch","gpalab-guillotine"))),_&&Object(r.createElement)("div",{className:"gpalab-docs-wizard-section"},Object(r.createElement)("label",{className:"gpalab-docs-wizard-label",htmlFor:"gpalab-docs-subdir"},"".concat(Object(b.__)("Search sub-directory","gpalab-guillotine"),":"),Object(r.createElement)("input",{disabled:!!q,id:"gpalab-docs-subdir",type:"text",value:G,onChange:function(e){return V(e,"subdir")}})),Object(r.createElement)("button",{className:"gpalab-docs-wizard-button",disabled:!!q,type:"button",onClick:function(){return H(!0),void s(3)}},G?Object(b.__)("Search This Directory","gpalab-guillotine"):Object(b.__)("No, Search Root","gpalab-guillotine"))),Q&&Object(r.createElement)("div",{className:"gpalab-docs-tree-container"},Object(r.createElement)("strong",null,"".concat(Object(b.__)("Results","gpalab-guillotine"),":")),Object(r.createElement)(I,{changelog:Q.changelog,readme:Q.readme,tree:Q.docs})),Object(r.createElement)("div",{className:"gpalab-docs-wizard-controls"},Object(r.createElement)("button",{className:"gpalab-docs-wizard-button",style:{padding:"0.3rem 0"},type:"button",onClick:function(){return s(0),m(""),w(null),k(!1),C(t),B(""),$(""),H(!1),void J(null)}},Object(b.__)("Reset Form","gpalab-guillotine")),Object(r.createElement)("button",{className:"gpalab-docs-wizard-button",style:{display:q&&!Q?"block":"none",padding:"0.3rem 0"},type:"button",onClick:function(){return K()}},Object(b.__)("Get Repo File Tree","gpalab-guillotine"))))});F.propTypes={owner:p.a.string,token:p.a.string};var G=F,$=window.gpalabDocsHub,M=$.githubDefaultOrg,L=$.githubToken;Object(r.render)(Object(r.createElement)(G,{owner:M,token:L}),document.getElementById("gpalab-docs-hub"))}]);