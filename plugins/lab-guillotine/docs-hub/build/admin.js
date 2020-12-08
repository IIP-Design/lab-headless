!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=13)}([function(e,n){!function(){e.exports=this.wp.element}()},function(e,n){!function(){e.exports=this.regeneratorRuntime}()},function(e,n){function t(e,n,t,r,o,a,u){try{var i=e[a](u),c=i.value}catch(e){return void t(e)}i.done?n(c):Promise.resolve(c).then(r,o)}e.exports=function(e){return function(){var n=this,r=arguments;return new Promise((function(o,a){var u=e.apply(n,r);function i(e){t(u,o,a,i,c,"next",e)}function c(e){t(u,o,a,i,c,"throw",e)}i(void 0)}))}}},function(e,n,t){var r=t(6),o=t(7),a=t(8),u=t(10);e.exports=function(e,n){return r(e)||o(e,n)||a(e,n)||u()}},function(e,n,t){e.exports=t(11)()},function(e,n){!function(){e.exports=this.wp.i18n}()},function(e,n){e.exports=function(e){if(Array.isArray(e))return e}},function(e,n){e.exports=function(e,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var t=[],r=!0,o=!1,a=void 0;try{for(var u,i=e[Symbol.iterator]();!(r=(u=i.next()).done)&&(t.push(u.value),!n||t.length!==n);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==i.return||i.return()}finally{if(o)throw a}}return t}}},function(e,n,t){var r=t(9);e.exports=function(e,n){if(e){if("string"==typeof e)return r(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?r(e,n):void 0}}},function(e,n){e.exports=function(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}},function(e,n){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,n,t){"use strict";var r=t(12);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,n,t,o,a,u){if(u!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function n(){return e}e.isRequired=e;var t={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:a,resetWarningCache:o};return t.PropTypes=t,t}},function(e,n,t){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,n,t){"use strict";t.r(n);var r=t(0),o=t(1),a=t.n(o),u=t(2),i=t.n(u),c=t(3),s=t.n(c),f=t(4),p=t.n(f),l=t(5),y=function(e){return function(e){return e.filter((function(e){return"tree"===e.type?"assets"!==e.name:e}))}(function(e){return e.filter((function(e){return"_"!==e.name.charAt(0)}))}(function(e){return e.filter((function(e){return"Gemfile"!==e.name}))}(e)))},b=function(){var e=i()(a.a.mark((function e(n,t,r){var o,u,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o={"Content-Type":"application/json"},r&&(o.Authorization="Bearer ".concat(r)),e.next=4,fetch("https://api.github.com/graphql",{method:"POST",headers:o,body:JSON.stringify({query:n,variables:t})});case 4:return u=e.sent,e.next=7,u.json();case 7:if(!(i=e.sent).errors){e.next=11;break}throw console.error(i.errors),new Error("Failed to fetch API");case 11:return e.abrupt("return",i.data);case 12:case"end":return e.stop()}}),e)})));return function(n,t,r){return e.apply(this,arguments)}}(),d=function(){var e=i()(a.a.mark((function e(n,t){var r,o,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b("\n  query QueryDirectoryTree(\n    $owner: String!,\n    $repo: String!,\n    $dir: String!\n  ){\n    repository( name: $repo, owner: $owner ) {\n      object( expression: $dir ) {\n        ... on Tree {\n          entries {\n            name\n            path\n            type\n          }\n        }\n      }\n    }\n  }\n",n,t);case 2:return r=e.sent,o=r.repository.object.entries,u=y(o),e.abrupt("return",u);case 6:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),h=function(){var e=i()(a.a.mark((function e(n,t){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b("\n  query QueryDefaultBranch(\n    $owner: String!,\n    $repo: String!\n  ){\n    repository( name: $repo, owner: $owner ) {\n      defaultBranchRef {\n        name\n      }\n    }\n  }\n",n,t);case 2:return r=e.sent,e.abrupt("return",r.repository.defaultBranchRef.name);case 4:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),m=function(e){var n=e.owner,t=e.token,o=Object(r.useState)(""),u=s()(o,2),c=u[0],f=u[1],p=Object(r.useState)(""),y=s()(p,2),b=y[0],m=y[1],v=Object(r.useState)({}),g=s()(v,2),x=(g[0],g[1]),w=function(){var e=i()(a.a.mark((function e(){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h({owner:n,repo:c},t);case 2:r=e.sent,m(r);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(){var e=i()(a.a.mark((function e(){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d({owner:n,repo:c,dir:"".concat(b,":docs/")},t);case 2:r=e.sent,x(r);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.createElement)("div",{style:{display:"flex",flexDirection:"column"}},Object(r.createElement)("label",{htmlFor:"gpalab-docs-repo"},Object(l.__)("Add the repo name","gpalab-guillotine"),Object(r.createElement)("input",{type:"text",value:c,onChange:function(e){var n=e.target.value;f(n)}})),c&&Object(r.createElement)("button",{type:"button",disabled:!!b,onClick:function(){return w()}},Object(l.__)("Get Default Branch","gpalab-guillotine")),b&&Object(r.createElement)("button",{type:"button",onClick:function(){return O()}},"Get Repo"))};m.propTypes={owner:p.a.string,token:p.a.string};var v=m,g=window.gpalabDocsHub,x=g.githubDefaultOrg,w=g.githubToken;Object(r.render)(Object(r.createElement)(v,{owner:x,token:w}),document.getElementById("gpalab-docs-hub"))}]);