!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=26)}([function(e,t){!function(){e.exports=this.wp.element}()},function(e,t,n){e.exports=n(16)()},function(e,t){!function(){e.exports=this.regeneratorRuntime}()},function(e,t){function n(e,t,n,r,a,o,c){try{var i=e[o](c),s=i.value}catch(e){return void n(e)}i.done?t(s):Promise.resolve(s).then(r,a)}e.exports=function(e){return function(){var t=this,r=arguments;return new Promise((function(a,o){var c=e.apply(t,r);function i(e){n(c,a,o,i,s,"next",e)}function s(e){n(c,a,o,i,s,"throw",e)}i(void 0)}))}}},function(e,t,n){var r=n(13),a=n(14),o=n(8),c=n(15);e.exports=function(e,t){return r(e)||a(e,t)||o(e,t)||c()}},function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t,n){var r=n(18),a=n(19),o=n(8),c=n(20);e.exports=function(e){return r(e)||a(e)||o(e)||c()}},function(e,t,n){var r=n(21);e.exports=function(e,t){if(null==e)return{};var n,a,o=r(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}},function(e,t,n){var r=n(9);e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}},function(e,t,n){},function(e,t){function n(){return e.exports=n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},n.apply(this,arguments)}e.exports=n},function(e,t){!function(){e.exports=this.wp.i18n}()},function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},function(e,t){e.exports=function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,t,n){"use strict";var r=n(17);function a(){}function o(){}o.resetWarningCache=a,e.exports=function(){function e(e,t,n,a,o,c){if(c!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:a};return n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){var r=n(9);e.exports=function(e){if(Array.isArray(e))return r(e)}},function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,t){e.exports=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(4),o=n.n(a),c=n(2),i=n.n(c),s=n(3),u=n.n(s),l=n(1),p=n.n(l),b=n(6),f=n.n(b),d=n(5),y=n.n(d),m=n(7),h=n.n(m),v=function(e){return e?function(e){return e.map((function(e){var t=e.object,n=h()(e,["object"]);if("blob"===e.type)return n;var r=t.entries.map((function(e){return e}));return n.contents=r,n}))}(function(e){return e.filter((function(e){return"tree"===e.type?"assets"!==e.name:e}))}(function(e){return e.filter((function(e){return"_"!==e.name.charAt(0)}))}(function(e){return e.filter((function(e){return"Gemfile"!==e.name}))}(e)))):null},g=function(e,t){var n,r=t?"/"===(n=t).slice(-1)?n:"".concat(n,"/"):"";return"".concat(r).concat(e||"")},O=function(e,t,n){var r=g(t,n);return"".concat(e,":").concat(r)},j=function(e,t){return t.filter((function(t){return t.oid!==e.oid}))};function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function E(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){y()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var x=window.gpalabDocsHub,S={active:0,branch:"",branches:null,branchSet:!1,owner:x.githubDefaultOrg,repo:"",selectedFiles:[],ignoredFiles:[],subdirectory:"",subdirSet:!1,token:x.githubToken},P=Object(r.createContext)(),k=function(e,t){var n=t.payload;switch(t.type){case"confirm-branch":return E(E({},e),{},{branchSet:!0});case"confirm-subdir":return E(E({},e),{},{subdirSet:!0});case"increment-active":return E(E({},e),{},{active:e.active+1});case"leaf-add":return E(E({},e),{},{ignoredFiles:j(n,e.ignoredFiles),selectedFiles:[].concat(f()(e.selectedFiles),[n])});case"leaf-remove":return E(E({},e),{},{ignoredFiles:[].concat(f()(e.ignoredFiles),[n]),selectedFiles:j(n,e.selectedFiles)});case"leaves-init":return E(E({},e),{},{selectedFiles:n});case"set-branch":return E(E({},e),{},{branch:n});case"set-branches":return E(E({},e),{},{branches:n});case"set-owner":return E(E({},e),{},{owner:n});case"set-repo":return E(E({},e),{},{repo:n});case"set-subdir":return E(E({},e),{},{subdirectory:n});case"reset":return E(E({},e),S);default:return e}},T=(n(10),function(e){var t=e.active,n=e.subtitle,a=e.title;return Object(r.createElement)("div",{className:t?"gpalab-docs-progress-step active":"gpalab-docs-progress-step"},Object(r.createElement)("span",null,a),Object(r.createElement)("span",null,n))});T.propTypes={active:p.a.bool,subtitle:p.a.string,title:p.a.string};var N=T,C=function(e){var t=e.steps,n=Object(r.useContext)(P).state.active;return Object(r.createElement)("ul",{className:"gpalab-docs-progress-bar",style:{gridTemplateColumns:"repeat(".concat(t.length,", 1fr)")}},t.map((function(e,t){return Object(r.createElement)("li",{key:e.title},Object(r.createElement)(N,{active:n===t,title:e.title,subtitle:e.subtitle}))})))};C.propTypes={steps:p.a.arrayOf(p.a.shape({subtitle:p.a.string,title:p.a.string}))};var F=C,D=n(11),A=n.n(D),_=p.a.shape({name:p.a.string,oid:p.a.string,path:p.a.string,type:p.a.string}),z=(n(22),function(e){var t=e.data,n=e.final,a=h()(e,["data","final"]),c=Object(r.useState)(!0),i=o()(c,2),s=i[0],u=i[1],l=Object(r.useContext)(P).dispatch;return Object(r.createElement)("span",A()({className:"gpalab-docs-leaf"},a),"".concat(n?"└──":"├──"," ").concat(t.name),Object(r.createElement)("input",{checked:s,className:"gpalab-docs-leaf-checkbox",type:"checkbox",onChange:function(){return l({type:s?"leaf-remove":"leaf-add",payload:t}),void u(!s)}}))});z.propTypes={data:_,final:p.a.bool};var R=z,I=(n(23),function(e){var t=e.id,n=e.leaves,a=e.name;return Object(r.createElement)("div",{key:t,className:"gpalab-docs-cluster"},Object(r.createElement)("strong",null,"".concat(a,"/")),Object(r.createElement)("ul",{className:"gpalab-docs-leaves"},n&&n.map((function(e,t){return Object(r.createElement)(R,{key:e.oid,data:e,final:t===n.length-1})}))))});I.propTypes={id:p.a.string,leaves:p.a.arrayOf(_),name:p.a.string};var B=I;n(24);function G(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var $=function(e){var t=e.changelog,n=e.readme,a=e.tree;return Object(r.createElement)("div",{className:"gpalab-docs-file-tree"},t&&Object(r.createElement)(R,{data:t,style:{marginLeft:0}}),n&&Object(r.createElement)(R,{data:n,style:{marginLeft:0}}),a&&Object(r.createElement)("strong",null,"docs/"),a&&a.map((function(e,t){return"blob"===e.type?Object(r.createElement)(R,{key:e.oid,data:e,final:t===a.length-1}):"tree"===e.type?Object(r.createElement)(B,{key:e.oid,id:e.oid,leaves:e.contents,name:e.name}):null})))};$.propTypes={changelog:p.a.shape({oid:p.a.string}),readme:p.a.shape({oid:p.a.string}),tree:p.a.arrayOf(p.a.shape(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?G(Object(n),!0).forEach((function(t){y()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({contents:p.a.arrayOf(_)},_)))};var M=$;function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach((function(t){y()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var H=function(e,t,n){return e?q(q({},e),{},{name:t,path:g("".concat(t,".md"),n)}):null},U=function(e,t){var n,r,a,o;return{changelog:H(null==e||null===(n=e.repository)||void 0===n?void 0:n.changelog,"CHANGELOG",t),readme:H(null==e||null===(r=e.repository)||void 0===r?void 0:r.readme,"README",t),docs:v(null==e||null===(a=e.repository)||void 0===a||null===(o=a.docs)||void 0===o?void 0:o.entries)}},W=function(e){var t=e.changelog,n=e.readme,r=e.docs.map((function(e){return e.contents?e.contents:e}));return[].concat(f()(r.flat()),[t,n])},Q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return"\n  query QueryDirectoryTree(\n    $owner: String!,\n    $repo: String!\n  ){\n    repository( name: $repo, owner: $owner ) {\n      ".concat(t.map((function(e){return"\n        ".concat(e.alias,':object( expression: "').concat(e.path,'" ) {\n          ... on Blob {\n            oid\n          }\n        }\n      ')})),"\n      ").concat(e.map((function(e){return"\n        ".concat(e.alias,':object( expression: "').concat(e.path,'" ) {\n          ... on Tree {\n            entries {\n              name\n              oid\n              path\n              type\n              object {\n                ... on Tree {\n                  entries {\n                    name\n                    oid\n                    path\n                    type\n                  }\n                }\n              }\n            }\n          }\n        }\n    ')})),"\n    }\n  }\n")},J=function(){var e=u()(i.a.mark((function e(t,n,r){var a,o,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={"Content-Type":"application/json"},r&&(a.Authorization="Bearer ".concat(r)),e.next=4,fetch("https://api.github.com/graphql",{method:"POST",headers:a,body:JSON.stringify({query:t,variables:n})});case 4:return o=e.sent,e.next=7,o.json();case 7:if(!(c=e.sent).errors){e.next=11;break}throw console.error(c.errors),new Error("Failed to fetch API");case 11:return e.abrupt("return",c.data);case 12:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),V=function(){var e=u()(i.a.mark((function e(t,n,r,a){var o,c,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=[{alias:"docs",path:O(r,"docs/",a)}],c=[{alias:"changelog",path:O(r,"CHANGELOG.md",a)},{alias:"readme",path:O(r,"README.md",a)}],e.next=4,J(Q(o,c),t,n);case 4:return s=e.sent,e.abrupt("return",U(s,a));case 6:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),Y=function(){var e=u()(i.a.mark((function e(t,n){var r,a,o,c,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J('\n  query QueryDefaultBranch(\n    $owner: String!,\n    $repo: String!\n  ){\n    repository( name: $repo, owner: $owner ) {\n      refs(refPrefix: "refs/heads/", first: 10) {\n        nodes {\n          name\n        }\n      }\n      defaultBranchRef {\n        name\n      }\n    }\n  }\n',t,n);case 2:return s=e.sent,e.abrupt("return",{branches:(i=null==s||null===(r=s.repository)||void 0===r||null===(a=r.refs)||void 0===a?void 0:a.nodes,i?i.map((function(e){return e.name})):[]),defaultBranch:null==s||null===(o=s.repository)||void 0===o||null===(c=o.defaultBranchRef)||void 0===c?void 0:c.name});case 4:case"end":return e.stop()}var i}),e)})));return function(t,n){return e.apply(this,arguments)}}(),K=n(12),X=function(e){return"string"!=typeof e?e:Object(K.__)(e,"gpalab-guillotine")},Z=[{title:X("Step One:"),subtitle:X("Set Repo Owner & Name")},{title:X("Step Two:"),subtitle:X("Select Repo Branch")},{title:X("Step Three:"),subtitle:X("Identify Directory to Search")},{title:X("Step Four:"),subtitle:X("Get File Tree")},{title:X("Step Five:"),subtitle:X("Select Files to Include in Build")}],ee=(n(25),function(){var e=Object(r.useState)(null),t=o()(e,2),n=t[0],a=t[1],c=Object(r.useContext)(P),s=c.dispatch,l=c.state,p=l.branch,b=l.branches,f=l.branchSet,d=l.owner,y=l.repo,m=l.subdirectory,h=l.subdirSet,v=l.token,g=function(e,t){var n=e.target.value;switch(t){case"branch":s({type:"set-branch",payload:n});break;case"owner":s({type:"set-owner",payload:n});break;case"repo":s({type:"set-repo",payload:n});break;case"subdir":s({type:"set-subdir",payload:n})}},O=function(){var e=u()(i.a.mark((function e(){var t,n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y({owner:d,repo:y},v);case 2:t=e.sent,n=t.branches,r=t.defaultBranch,s({type:"set-branches",payload:n}),s({type:"set-branch",payload:r}),s({type:"increment-active"});case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(e){s({type:"confirm-".concat(e)}),s({type:"increment-active"})},w=function(){var e=u()(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V({owner:d,repo:y},v,p,m);case 2:t=e.sent,s({type:"leaves-init",payload:W(t)}),a(t),s({type:"increment-active"});case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.createElement)("div",{className:"gpalab-docs-wizard-container"},Object(r.createElement)(F,{steps:Z}),Object(r.createElement)("div",{className:"gpalab-docs-wizard-contents"},Object(r.createElement)("div",{className:"gpalab-docs-wizard-section"},Object(r.createElement)("label",{className:"gpalab-docs-wizard-label",htmlFor:"gpalab-docs-owner"},"".concat(X("Identify repo owner"),":"),Object(r.createElement)("input",{disabled:!!p,id:"gpalab-docs-owner",type:"text",value:d,onChange:function(e){return g(e,"owner")}}))),Object(r.createElement)("div",{className:"gpalab-docs-wizard-section"},Object(r.createElement)("label",{className:"gpalab-docs-wizard-label",htmlFor:"gpalab-docs-repo"},"".concat(X("Add the repo name"),":"),Object(r.createElement)("input",{disabled:!!p,id:"gpalab-docs-repo",type:"text",value:y,onChange:function(e){return g(e,"repo")}})),y&&Object(r.createElement)("button",{className:"gpalab-docs-wizard-button",type:"button",disabled:!!p,onClick:function(){return O()}},X("Get GitHub Branches"))),b&&Object(r.createElement)("div",{className:"gpalab-docs-wizard-section"},Object(r.createElement)("label",{className:"gpalab-docs-wizard-label",htmlFor:"gpalab-docs-default-branch"},"".concat(X("Choose the branch"),":"),Object(r.createElement)("select",{disabled:!!f,id:"gpalab-docs-default-branch",value:p,onBlur:function(e){return g(e,"branch")},onChange:function(e){return g(e,"branch")}},b.map((function(e){return Object(r.createElement)("option",{key:e,value:e},e)})))),Object(r.createElement)("button",{className:"gpalab-docs-wizard-button",disabled:!!f,type:"button",onClick:function(){return j("branch")}},X("Use This Branch"))),f&&Object(r.createElement)("div",{className:"gpalab-docs-wizard-section"},Object(r.createElement)("label",{className:"gpalab-docs-wizard-label",htmlFor:"gpalab-docs-subdir"},"".concat(X("Search sub-directory"),":"),Object(r.createElement)("input",{disabled:!!h,id:"gpalab-docs-subdir",type:"text",value:m,onChange:function(e){return g(e,"subdir")}})),Object(r.createElement)("button",{className:"gpalab-docs-wizard-button",disabled:!!h,type:"button",onClick:function(){return j("subdir")}},X(m?"Search This Directory":"No, Search Root"))),n&&Object(r.createElement)("div",{className:"gpalab-docs-tree-container"},Object(r.createElement)("strong",null,"".concat(X("Results"),":")),Object(r.createElement)(M,{changelog:n.changelog,readme:n.readme,tree:n.docs})),Object(r.createElement)("div",{className:"gpalab-docs-wizard-controls"},Object(r.createElement)("button",{className:"gpalab-docs-wizard-button",style:{padding:"0.3rem 0"},type:"button",onClick:function(){return s({type:"reset"}),void a(null)}},X("Reset Form")),Object(r.createElement)("button",{className:"gpalab-docs-wizard-button",style:{display:h&&!n?"block":"none",padding:"0.3rem 0"},type:"button",onClick:function(){return w()}},X("Get Repo File Tree")))))}),te=function(){var e=Object(r.useReducer)(k,S),t=o()(e,2),n=t[0],a={dispatch:t[1],state:n};return Object(r.createElement)(P.Provider,{value:a},Object(r.createElement)(ee,null))};Object(r.render)(Object(r.createElement)(te,null),document.getElementById("gpalab-docs-hub"))}]);