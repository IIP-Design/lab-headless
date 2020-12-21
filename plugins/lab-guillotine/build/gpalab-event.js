!function(t){var e={};function n(o){if(e[o])return e[o].exports;var a=e[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(o,a,function(e){return t[e]}.bind(null,a));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=43)}({0:function(t,e){!function(){t.exports=this.wp.element}()},1:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var o=n(5),a=function(t){return"string"!=typeof t?t:Object(o.__)(t,"gpalab-guillotine")}},21:function(t,e,n){var o,a;t.exports=(o=n(36),a=n(37),function(t){function e(o){if(n[o])return n[o].exports;var a=n[o]={exports:{},id:o,loaded:!1};return t[o].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),r=o(n(1)),i=o(n(2)),s=new(o(n(7)).default),l=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.state={optionsOpen:t.optionsOpen||!1,isCrappyIE:!1},n.toggleCalendarDropdown=n.toggleCalendarDropdown.bind(n),n.handleDropdownLinkClick=n.handleDropdownLinkClick.bind(n),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),a(e,[{key:"componentWillMount",value:function(){String.prototype.startsWith||(String.prototype.startsWith=function(t,e){return e=e||0,this.indexOf(t,e)===e});var t=!1;"undefined"!=typeof window&&window.navigator.msSaveOrOpenBlob&&window.Blob&&(t=!0),this.setState({isCrappyIE:t})}},{key:"toggleCalendarDropdown",value:function(){var t=!this.state.optionsOpen;t?document.addEventListener("click",this.toggleCalendarDropdown,!1):document.removeEventListener("click",this.toggleCalendarDropdown),this.setState({optionsOpen:t})}},{key:"handleDropdownLinkClick",value:function(t){t.preventDefault();var e=t.currentTarget.getAttribute("href");if(s.isMobile()||!e.startsWith("data")&&!e.startsWith("BEGIN"))window.open(e,"_blank");else{var n="download.ics",o=new Blob([e],{type:"text/calendar;charset=utf-8"});if(this.state.isCrappyIE)window.navigator.msSaveOrOpenBlob(o,n);else{var a=document.createElement("a");a.href=window.URL.createObjectURL(o),a.setAttribute("download",n),document.body.appendChild(a),a.click(),document.body.removeChild(a)}}this.toggleCalendarDropdown()}},{key:"renderDropdown",value:function(){var t=this,e=this.props.listItems.map((function(e){var n=Object.keys(e)[0],o=e[n],a=null;if(t.props.displayItemIcons){var i="outlook"===n||"outlookcom"===n?"windows":n;a=r.default.createElement("i",{className:"fa fa-"+i})}return r.default.createElement("li",{key:s.getRandomKey()},r.default.createElement("a",{className:n+"-link",onClick:t.handleDropdownLinkClick,href:s.buildUrl(t.props.event,n,t.state.isCrappyIE),target:"_blank"},a,o))}));return r.default.createElement("div",{className:this.props.dropdownClass},r.default.createElement("ul",null,e))}},{key:"renderButton",value:function(){var t=this.props.buttonLabel,e=null,n=Object.keys(this.props.buttonTemplate);if("textOnly"!==n[0]){var o=this.props.buttonTemplate[n],a=("react-add-to-calendar__icon--"===this.props.buttonIconClass?""+this.props.buttonIconClass+o:this.props.buttonIconClass)+" "+(this.props.useFontAwesomeIcons?"fa fa-":"")+("caret"===n[0]?this.state.optionsOpen?"caret-up":"caret-down":n[0]);e=r.default.createElement("i",{className:a}),t="right"===o?r.default.createElement("span",null,t+" ",e):r.default.createElement("span",null,e," "+t)}var i=this.state.optionsOpen?this.props.buttonClassClosed+" "+this.props.buttonClassOpen:this.props.buttonClassClosed;return r.default.createElement("div",{className:this.props.buttonWrapperClass},r.default.createElement("a",{className:i,onClick:this.toggleCalendarDropdown},t))}},{key:"render",value:function(){var t=null;this.state.optionsOpen&&(t=this.renderDropdown());var e=null;return this.props.event&&(e=this.renderButton()),r.default.createElement("div",{className:this.props.rootClass},e,t)}}]),e}(r.default.Component);e.default=l,l.displayName="Add To Calendar",l.propTypes={buttonClassClosed:i.default.string,buttonClassOpen:i.default.string,buttonLabel:i.default.string,buttonTemplate:i.default.object,buttonIconClass:i.default.string,useFontAwesomeIcons:i.default.bool,buttonWrapperClass:i.default.string,displayItemIcons:i.default.bool,optionsOpen:i.default.bool,dropdownClass:i.default.string,event:i.default.shape({title:i.default.string,description:i.default.string,location:i.default.string,startTime:i.default.string,endTime:i.default.string}).isRequired,listItems:i.default.arrayOf(i.default.object),rootClass:i.default.string},l.defaultProps={buttonClassClosed:"react-add-to-calendar__button",buttonClassOpen:"react-add-to-calendar__button--light",buttonLabel:"Add to My Calendar",buttonTemplate:{caret:"right"},buttonIconClass:"react-add-to-calendar__icon--",useFontAwesomeIcons:!0,buttonWrapperClass:"react-add-to-calendar__wrapper",displayItemIcons:!0,optionsOpen:!1,dropdownClass:"react-add-to-calendar__dropdown",event:{title:"Sample Event",description:"This is the sample event provided as an example only",location:"Portland, OR",startTime:"2016-09-16T20:15:00-04:00",endTime:"2016-09-16T21:45:00-04:00"},listItems:[{apple:"Apple Calendar"},{google:"Google"},{outlook:"Outlook"},{outlookcom:"Outlook.com"},{yahoo:"Yahoo"}],rootClass:"react-add-to-calendar"}},function(t,e){t.exports=o},function(t,e,n){t.exports=n(3)()},function(t,e,n){"use strict";var o=n(4),a=n(5),r=n(6);t.exports=function(){function t(t,e,n,o,i,s){s!==r&&a(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e};return n.checkPropTypes=o,n.PropTypes=n,n}},function(t,e){"use strict";function n(t){return function(){return t}}var o=function(){};o.thatReturns=n,o.thatReturnsFalse=n(!1),o.thatReturnsTrue=n(!0),o.thatReturnsNull=n(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(t){return t},t.exports=o},function(t,e,n){"use strict";var o=function(t){};t.exports=function(t,e,n,a,r,i,s,l){if(o(e),!t){var c;if(void 0===e)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[n,a,r,i,s,l],d=0;(c=new Error(e.replace(/%s/g,(function(){return u[d++]})))).name="Invariant Violation"}throw c.framesToPop=1,c}}},function(t,e){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),a=function(t){return t&&t.__esModule?t:{default:t}}(n(8)),r=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return o(t,[{key:"getRandomKey",value:function(){var t=Math.floor(999999999999*Math.random()).toString();return(new Date).getTime().toString()+"_"+t}},{key:"formatTime",value:function(t){return a.default.utc(t).format("YYYYMMDDTHHmmssZ").replace("+00:00","Z")}},{key:"calculateDuration",value:function(t,e){var n=a.default.utc(e).format("DD/MM/YYYY HH:mm:ss"),o=a.default.utc(t).format("DD/MM/YYYY HH:mm:ss"),r=(0,a.default)(n,"DD/MM/YYYY HH:mm:ss").diff((0,a.default)(o,"DD/MM/YYYY HH:mm:ss")),i=a.default.duration(r);return Math.floor(i.asHours())+a.default.utc(r).format(":mm")}},{key:"buildUrl",value:function(t,e,n){var o="";switch(e){case"google":o="https://calendar.google.com/calendar/render",o+="?action=TEMPLATE",o+="&dates="+this.formatTime(t.startTime),o+="/"+this.formatTime(t.endTime),o+="&location="+encodeURIComponent(t.location),o+="&text="+encodeURIComponent(t.title),o+="&details="+encodeURIComponent(t.description);break;case"yahoo":var a=this.calculateDuration(t.startTime,t.endTime);o="https://calendar.yahoo.com/?v=60&view=d&type=20",o+="&title="+encodeURIComponent(t.title),o+="&st="+this.formatTime(t.startTime),o+="&dur="+a,o+="&desc="+encodeURIComponent(t.description),o+="&in_loc="+encodeURIComponent(t.location);break;case"outlookcom":o="https://outlook.live.com/owa/?rru=addevent",o+="&startdt="+this.formatTime(t.startTime),o+="&enddt="+this.formatTime(t.endTime),o+="&subject="+encodeURIComponent(t.title),o+="&location="+encodeURIComponent(t.location),o+="&body="+encodeURIComponent(t.description),o+="&allday=false",o+="&uid="+this.getRandomKey(),o+="&path=/calendar/view/Month";break;default:o=["BEGIN:VCALENDAR","VERSION:2.0","BEGIN:VEVENT","URL:"+document.URL,"DTSTART:"+this.formatTime(t.startTime),"DTEND:"+this.formatTime(t.endTime),"SUMMARY:"+t.title,"DESCRIPTION:"+t.description,"LOCATION:"+t.location,"END:VEVENT","END:VCALENDAR"].join("\n"),!n&&this.isMobile()&&(o=encodeURI("data:text/calendar;charset=utf8,"+o))}return o}},{key:"isMobile",value:function(){var t=!1;return function(e){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0)}(window.navigator.userAgent||window.navigator.vendor||window.opera),t}}]),t}();e.default=r},function(t,e){t.exports=a}]))},36:function(t,e){!function(){t.exports=this.React}()},37:function(t,e){!function(){t.exports=this.moment}()},38:function(t,e,n){},39:function(t,e,n){},43:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n(21),r=n.n(a),i=n(1),s=function(t,e){var n,o="00";e.endsWith(".5")?o="30":e.endsWith(".75")&&(o="45");var a=e.split(".")[0];return n=a.startsWith("-")?2===a.length?"".concat(a.slice(0,1),"0").concat(a.slice(1)):a:1===a.length?"+0".concat(a):"+".concat(a),"".concat(t).concat(n,":").concat(o)},l=(n(38),n(39),window.gpalabEventMeta),c=document.getElementById("gpalab-event-add-to-cal");c&&Object(o.render)(Object(o.createElement)(r.a,{buttonTemplate:{"calendar-plus-o":"left"},buttonLabel:Object(i.a)("Add to Calendar"),event:{description:l.description||"",endTime:s(l.endTime,l.tz_offset),startTime:s(l.startTime,l.tz_offset),title:l.title||""},listItems:[{apple:"Apple Calendar"},{google:"Google"},{outlook:"Outlook"}]}),c)},5:function(t,e){!function(){t.exports=this.wp.i18n}()}});