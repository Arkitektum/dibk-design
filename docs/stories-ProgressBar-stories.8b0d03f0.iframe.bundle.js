/*! For license information please see stories-ProgressBar-stories.8b0d03f0.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkdibk_design=self.webpackChunkdibk_design||[]).push([[480],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{Z:function(){return _defineProperty}})},"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _objectSpread2}});var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}},"./src/stories/ProgressBar.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},WithError:function(){return WithError},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return ProgressBar_stories}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),defineProperty=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js")),ProgressBar_module_progressBar="ProgressBar_progressBar__Wepso",ProgressBar_module_hasErrors="ProgressBar_hasErrors__ruqZX",jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),ProgressBar=function ProgressBar(props){return(0,jsx_runtime.jsx)("div",{className:"".concat(ProgressBar_module_progressBar," ").concat(props.hasErrors?ProgressBar_module_hasErrors:""),role:"progressbar","aria-valuenow":props.progress||0,"aria-valuemin":"0","aria-valuemax":"100",style:(0,defineProperty.Z)({},"--value",props.progress||0)})};ProgressBar.defaultProps={progress:0,hasErrors:!1},ProgressBar.__docgenInfo={description:"",methods:[],displayName:"ProgressBar",props:{progress:{defaultValue:{value:"0",computed:!1},description:"",type:{name:"number"},required:!1},hasErrors:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1}}};var _Default$parameters,_Default$parameters2,_Default$parameters2$,_WithError$parameters,_WithError$parameters2,_WithError$parameters3,stories_ProgressBar=ProgressBar,ProgressBar_stories={title:"Example/ProgressBar",component:stories_ProgressBar,argTypes:{}},Template=function Template(args){return(0,jsx_runtime.jsx)(stories_ProgressBar,(0,objectSpread2.Z)({},args))},Default=Template.bind({});Default.args={progress:25};var WithError=Template.bind({});WithError.args={progress:60,hasErrors:!0},Default.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},Default.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:(0,objectSpread2.Z)({originalSource:"args => <ProgressBar {...args} />"},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2$=_Default$parameters2.docs)||void 0===_Default$parameters2$?void 0:_Default$parameters2$.source)})}),WithError.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},WithError.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_WithError$parameters=WithError.parameters)||void 0===_WithError$parameters?void 0:_WithError$parameters.docs),{},{source:(0,objectSpread2.Z)({originalSource:"args => <ProgressBar {...args} />"},null===(_WithError$parameters2=WithError.parameters)||void 0===_WithError$parameters2||null===(_WithError$parameters3=_WithError$parameters2.docs)||void 0===_WithError$parameters3?void 0:_WithError$parameters3.source)})});var __namedExportsOrder=["Default","WithError"]},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);