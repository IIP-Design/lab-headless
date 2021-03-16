!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=63)}({14:function(e,t){e.exports=window.wp.components},15:function(e,t){e.exports=window.wp.data},16:function(e,t){e.exports=window.wp.i18n},19:function(e,t){e.exports=window.wp.compose},2:function(e,t){e.exports=window.wp.element},23:function(e,t,n){"use strict";var r=n(24);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,a,c){if(c!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return n.PropTypes=n,n}},24:function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},26:function(e,t){e.exports=window.wp.plugins},27:function(e,t){e.exports=window.wp.editPost},28:function(e,t,n){"use strict";var r=n(8),o=n.n(r),a=n(2),c=n(19),i=n(14),u=n(15),l=Object(c.compose)(Object(u.withDispatch)((function(e,t){var n=t.metaValue;return{setTextValue:function(t){e("core/editor").editPost({meta:o()({},n,t)})}}})),Object(u.withSelect)((function(e,t){var n=t.metaValue;return{text:e("core/editor").getEditedPostAttribute("meta")[n]}})))((function(e){var t=e.label,n=e.placeholder,r=e.text,o=e.setTextValue;return Object(a.createElement)(i.TextControl,{label:t,placeholder:n,value:r,onChange:o})}));t.a=l},4:function(e,t,n){e.exports=n(23)()},5:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(16),o=function(e){return"string"!=typeof e?e:Object(r.__)(e,"gpalab-guillotine")}},63:function(e,t,n){"use strict";n.r(t);var r=n(26),o=n(2),a=n(27),c=n(8),i=n.n(c),u=n(19),l=n(14),p=n(15),s=Object(u.compose)(Object(p.withDispatch)((function(e,t){var n=t.metaValue;return{setVal:function(t){e("core/editor").editPost({meta:i()({},n,!t)})}}})),Object(p.withSelect)((function(e,t){var n=t.metaValue;return{checked:e("core/editor").getEditedPostAttribute("meta")[n]}})))((function(e){var t=e.checked,n=e.heading,r=e.help,a=e.label,c=e.setVal;return Object(o.createElement)(l.CheckboxControl,{checked:t,heading:n||"",help:r||"",label:a||"",onChange:function(){return c(t)}})})),f=Object(u.compose)(Object(p.withDispatch)((function(e,t){var n=t.metaValue;return{setDate:function(t){e("core/editor").editPost({meta:i()({},n,t)})}}})),Object(p.withSelect)((function(e,t){var n=t.metaValue;return{date:e("core/editor").getEditedPostAttribute("meta")[n]}})))((function(e){var t=e.date,n=e.setDate;return Object(o.createElement)(l.DateTimePicker,{currentDate:t,is12Hour:!0,onChange:function(e){return n(e)}})})),d=n(28),b=n(4),m=function(e){var t=e.padding,n=void 0===t?"0.5rem":t;return Object(o.createElement)("div",{style:{padding:n}})};m.propTypes={padding:n.n(b).a.string};var O=m,h=n(5);Object(r.registerPlugin)("gpalab-guillotine-event-panel",{icon:null,render:function(){return Object(o.createElement)(a.PluginDocumentSettingPanel,{title:Object(h.a)("Select a event date")},Object(o.createElement)(f,{metaValue:"_gpalab_event_date"}),Object(o.createElement)(O,null),Object(o.createElement)(d.a,{label:Object(h.a)("Set the length of the event (in minutes)"),metaValue:"_gpalab_event_duration",placeholder:"60"}),Object(o.createElement)(O,null),Object(o.createElement)(s,{label:Object(h.a)("Show add to calendar button"),metaValue:"_gpalab_event_show_atc"}))}})},8:function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},e.exports.default=e.exports,e.exports.__esModule=!0}});