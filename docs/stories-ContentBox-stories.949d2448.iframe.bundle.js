/*! For license information please see stories-ContentBox-stories.949d2448.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkdibk_design=self.webpackChunkdibk_design||[]).push([[19],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{Z:function(){return _defineProperty}})},"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _objectSpread2}});var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./src/stories/ContentBox.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},DefaultWithoutTitle:function(){return DefaultWithoutTitle},Info:function(){return Info},LightCyan:function(){return LightCyan},LightLime:function(){return LightLime},LightOrange:function(){return LightOrange},Lime:function(){return Lime},Orange:function(){return Orange},Primary:function(){return Primary},Success:function(){return Success},Warning:function(){return Warning},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return ContentBox_stories}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),ContentBox_module=(__webpack_require__("./node_modules/react/index.js"),{flex:"ContentBox_flex__+wQME","main-content":"ContentBox_main-content__cPVvc",contentBox:"ContentBox_contentBox__x+3-6",link:"ContentBox_link__23gAd",default:"ContentBox_default__h2ZX2",content:"ContentBox_content__TA2+u",title:"ContentBox_title__02JfU",primary:"ContentBox_primary__aaj0j",success:"ContentBox_success__XRylc",warning:"ContentBox_warning__GbYwz",info:"ContentBox_info__Hm1DW",lightCyan:"ContentBox_lightCyan__AyMvv",orange:"ContentBox_orange__X3bJV",lightOrange:"ContentBox_lightOrange__F2lEp",lime:"ContentBox_lime__YaPNX",lightLime:"ContentBox_lightLime__g8+-6",regular:"ContentBox_regular__6yK0L",large:"ContentBox_large__aMKNl"}),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),ContentBox=function ContentBox(props){var _props$content,renderTitle=function renderTitle(){var className=ContentBox_module.title+" "+ContentBox_module[props.titleSize];return props.title?(0,jsx_runtime.jsx)("h2",{className:className,children:props.title}):void 0},colorClass=" "+ContentBox_module[props.color],linkClass=props.href?" "+ContentBox_module.link:"",className=ContentBox_module.contentBox+colorClass+linkClass,bodyContent=null!==(_props$content=props.content)&&void 0!==_props$content&&_props$content.length?props.content:props.children;return props.href?(0,jsx_runtime.jsxs)("a",{href:props.href,className:className,children:[renderTitle(),(0,jsx_runtime.jsx)("div",{className:ContentBox_module.content,children:bodyContent})]}):(0,jsx_runtime.jsxs)("div",{className:className,children:[renderTitle(),(0,jsx_runtime.jsx)("div",{className:ContentBox_module.content,children:bodyContent})]})};ContentBox.defaultProps={title:null,titleSize:"regular",href:null,content:"",color:"default"},ContentBox.__docgenInfo={description:"",methods:[],displayName:"ContentBox",props:{title:{defaultValue:{value:"null",computed:!1},description:"Content title inside box",type:{name:"string"},required:!1},titleSize:{defaultValue:{value:'"regular"',computed:!1},description:"",type:{name:"enum",value:[{value:'"regular"',computed:!1},{value:'"large"',computed:!1}]},required:!1},href:{defaultValue:{value:"null",computed:!1},required:!1},content:{defaultValue:{value:'""',computed:!1},description:"Text content inside box",type:{name:"string"},required:!1},color:{defaultValue:{value:'"default"',computed:!1},description:"",type:{name:"enum",value:[{value:'"default"',computed:!1},{value:'"primary"',computed:!1},{value:'"success"',computed:!1},{value:'"warning"',computed:!1},{value:'"info"',computed:!1},{value:'"lightCyan"',computed:!1},{value:'"orange"',computed:!1},{value:'"lightOrange"',computed:!1},{value:'"lime"',computed:!1},{value:'"lightLime"',computed:!1}]},required:!1},children:{description:"HTML content inside box if not content is set",type:{name:"any"},required:!1}}};var stories_ContentBox=ContentBox,ContentBox_stories={title:"Example/ContentBox",component:stories_ContentBox,argTypes:{}},Template=function Template(args){return(0,jsx_runtime.jsx)(stories_ContentBox,(0,objectSpread2.Z)({},args))},DefaultWithoutTitle=Template.bind({});DefaultWithoutTitle.args={color:"default",children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"Box with default color"})};var Default=Template.bind({});Default.args={color:"default",title:"Box title",children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"Box with default color"})};var Primary=Template.bind({});Primary.args={color:"primary",title:"Box title",children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"Box with primary color"})};var Success=Template.bind({});Success.args={color:"success",title:"Box title",children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"Box with success color"})};var Warning=Template.bind({});Warning.args={color:"warning",title:"Box title",children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"Box with warning color"})};var Info=Template.bind({});Info.args={color:"info",title:"Box title",children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"Box with info color"})};var LightCyan=Template.bind({});LightCyan.args={color:"lightCyan",title:"Box title",children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"Box with light cyan color"})};var Orange=Template.bind({});Orange.args={color:"orange",title:"Box title",children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"Box with orange color"})};var LightOrange=Template.bind({});LightOrange.args={color:"lightOrange",title:"Box title",children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"Box with light orange color"})};var Lime=Template.bind({});Lime.args={color:"lime",title:"Box title",children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"Box with lime color"})};var LightLime=Template.bind({});LightLime.args={color:"lightLime",title:"Box title",children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"Box with light lime color"})};var __namedExportsOrder=["DefaultWithoutTitle","Default","Primary","Success","Warning","Info","LightCyan","Orange","LightOrange","Lime","LightLime"];DefaultWithoutTitle.parameters={...DefaultWithoutTitle.parameters,docs:{...DefaultWithoutTitle.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(ContentBox, _objectSpread({}, args));\n}",...DefaultWithoutTitle.parameters?.docs?.source}}},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(ContentBox, _objectSpread({}, args));\n}",...Default.parameters?.docs?.source}}},Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(ContentBox, _objectSpread({}, args));\n}",...Primary.parameters?.docs?.source}}},Success.parameters={...Success.parameters,docs:{...Success.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(ContentBox, _objectSpread({}, args));\n}",...Success.parameters?.docs?.source}}},Warning.parameters={...Warning.parameters,docs:{...Warning.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(ContentBox, _objectSpread({}, args));\n}",...Warning.parameters?.docs?.source}}},Info.parameters={...Info.parameters,docs:{...Info.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(ContentBox, _objectSpread({}, args));\n}",...Info.parameters?.docs?.source}}},LightCyan.parameters={...LightCyan.parameters,docs:{...LightCyan.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(ContentBox, _objectSpread({}, args));\n}",...LightCyan.parameters?.docs?.source}}},Orange.parameters={...Orange.parameters,docs:{...Orange.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(ContentBox, _objectSpread({}, args));\n}",...Orange.parameters?.docs?.source}}},LightOrange.parameters={...LightOrange.parameters,docs:{...LightOrange.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(ContentBox, _objectSpread({}, args));\n}",...LightOrange.parameters?.docs?.source}}},Lime.parameters={...Lime.parameters,docs:{...Lime.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(ContentBox, _objectSpread({}, args));\n}",...Lime.parameters?.docs?.source}}},LightLime.parameters={...LightLime.parameters,docs:{...LightLime.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(ContentBox, _objectSpread({}, args));\n}",...LightLime.parameters?.docs?.source}}}}}]);