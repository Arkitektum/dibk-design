/*! For license information please see stories-DescriptionList-stories.5fd98379.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkdibk_design=self.webpackChunkdibk_design||[]).push([[99],{"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function toPropertyKey(t){var i=function toPrimitive(t,r){if("object"!=_typeof(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==_typeof(i)?i:i+""}function _defineProperty(e,r,t){return(r=toPropertyKey(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread2(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}__webpack_require__.d(__webpack_exports__,{A:()=>_objectSpread2})},"./src/stories/DescriptionList.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Compact:()=>Compact,CompactWithCustomTitleWidth:()=>CompactWithCustomTitleWidth,Default:()=>Default,WithCustomTitleWidth:()=>WithCustomTitleWidth,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Users_benjamindehli_Repos_dibk_design_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/stories/ThemeProvider.jsx")),_DescriptionList__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/stories/DescriptionList.jsx"),_DescriptionTerm__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/stories/DescriptionTerm.jsx"),_DescriptionDetails__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/stories/DescriptionDetails.jsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Example/DescriptionList",component:_DescriptionList__WEBPACK_IMPORTED_MODULE_2__.A,argTypes:{}},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.A,{theme:args.theme,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_DescriptionList__WEBPACK_IMPORTED_MODULE_2__.A,(0,_Users_benjamindehli_Repos_dibk_design_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.A)((0,_Users_benjamindehli_Repos_dibk_design_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.A)({},args),{},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_DescriptionTerm__WEBPACK_IMPORTED_MODULE_3__.A,{children:"Description term 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_DescriptionDetails__WEBPACK_IMPORTED_MODULE_4__.A,{children:"Description details 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_DescriptionTerm__WEBPACK_IMPORTED_MODULE_3__.A,{children:"Description term 2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_DescriptionDetails__WEBPACK_IMPORTED_MODULE_4__.A,{children:"Description details 2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_DescriptionTerm__WEBPACK_IMPORTED_MODULE_3__.A,{children:"Description term 3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_DescriptionDetails__WEBPACK_IMPORTED_MODULE_4__.A,{children:"Description details 3"})]}))}),Default=Template.bind({});Default.args={};const WithCustomTitleWidth=Template.bind({});WithCustomTitleWidth.args={titleWidth:"160px"};const Compact=Template.bind({});Compact.args={compact:!0};const CompactWithCustomTitleWidth=Template.bind({});CompactWithCustomTitleWidth.args={compact:!0,titleWidth:"160px"};const __namedExportsOrder=["Default","WithCustomTitleWidth","Compact","CompactWithCustomTitleWidth"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <ThemeProvider theme={args.theme}>\n        <DescriptionList {...args}>\n            <DescriptionTerm>Description term 1</DescriptionTerm>\n            <DescriptionDetails>Description details 1</DescriptionDetails>\n            <DescriptionTerm>Description term 2</DescriptionTerm>\n            <DescriptionDetails>Description details 2</DescriptionDetails>\n            <DescriptionTerm>Description term 3</DescriptionTerm>\n            <DescriptionDetails>Description details 3</DescriptionDetails>\n        </DescriptionList>\n    </ThemeProvider>",...Default.parameters?.docs?.source}}},WithCustomTitleWidth.parameters={...WithCustomTitleWidth.parameters,docs:{...WithCustomTitleWidth.parameters?.docs,source:{originalSource:"args => <ThemeProvider theme={args.theme}>\n        <DescriptionList {...args}>\n            <DescriptionTerm>Description term 1</DescriptionTerm>\n            <DescriptionDetails>Description details 1</DescriptionDetails>\n            <DescriptionTerm>Description term 2</DescriptionTerm>\n            <DescriptionDetails>Description details 2</DescriptionDetails>\n            <DescriptionTerm>Description term 3</DescriptionTerm>\n            <DescriptionDetails>Description details 3</DescriptionDetails>\n        </DescriptionList>\n    </ThemeProvider>",...WithCustomTitleWidth.parameters?.docs?.source}}},Compact.parameters={...Compact.parameters,docs:{...Compact.parameters?.docs,source:{originalSource:"args => <ThemeProvider theme={args.theme}>\n        <DescriptionList {...args}>\n            <DescriptionTerm>Description term 1</DescriptionTerm>\n            <DescriptionDetails>Description details 1</DescriptionDetails>\n            <DescriptionTerm>Description term 2</DescriptionTerm>\n            <DescriptionDetails>Description details 2</DescriptionDetails>\n            <DescriptionTerm>Description term 3</DescriptionTerm>\n            <DescriptionDetails>Description details 3</DescriptionDetails>\n        </DescriptionList>\n    </ThemeProvider>",...Compact.parameters?.docs?.source}}},CompactWithCustomTitleWidth.parameters={...CompactWithCustomTitleWidth.parameters,docs:{...CompactWithCustomTitleWidth.parameters?.docs,source:{originalSource:"args => <ThemeProvider theme={args.theme}>\n        <DescriptionList {...args}>\n            <DescriptionTerm>Description term 1</DescriptionTerm>\n            <DescriptionDetails>Description details 1</DescriptionDetails>\n            <DescriptionTerm>Description term 2</DescriptionTerm>\n            <DescriptionDetails>Description details 2</DescriptionDetails>\n            <DescriptionTerm>Description term 3</DescriptionTerm>\n            <DescriptionDetails>Description details 3</DescriptionDetails>\n        </DescriptionList>\n    </ThemeProvider>",...CompactWithCustomTitleWidth.parameters?.docs?.source}}}},"./src/functions/helpers.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{IK:()=>classNameArrayToClassNameString,J0:()=>addFocusTrapInsideElement,N8:()=>stringifyCssColorVariables,X6:()=>addGlobalStylesheet,cb:()=>cloneThroughFragments,wP:()=>getCssVariablesFromTheme});var _Users_benjamindehli_Repos_dibk_design_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const classNameArrayToClassNameString=classNameArray=>{var _classNameArray$filte;return(null==classNameArray||null===(_classNameArray$filte=classNameArray.filter((className=>className)))||void 0===_classNameArray$filte?void 0:_classNameArray$filte.join(" "))||""},camelCaseToKebabCase=string=>string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase(),getCssVariablesFromTheme=theme=>(0,_Users_benjamindehli_Repos_dibk_design_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.A)((0,_Users_benjamindehli_Repos_dibk_design_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.A)({},(theme=>{var _Object$entries;return!(null==theme||!theme.colors)&&!(null===(_Object$entries=Object.entries(null==theme?void 0:theme.colors))||void 0===_Object$entries||!_Object$entries.length)&&Object.entries(null==theme?void 0:theme.colors).reduce(((acc,_ref)=>{let[key,value]=_ref;return null!=key&&key.length&&null!=value&&value.length&&(acc["--color-".concat(camelCaseToKebabCase(key))]=value),acc}),{})})(theme)),(theme=>{var _Object$entries2;return!(null==theme||!theme.sizes)&&!(null===(_Object$entries2=Object.entries(null==theme?void 0:theme.sizes))||void 0===_Object$entries2||!_Object$entries2.length)&&Object.entries(null==theme?void 0:theme.sizes).reduce(((acc,_ref2)=>{let[key,value]=_ref2;return null!=key&&key.length&&null!=value&&value.length&&(acc["--size-".concat(camelCaseToKebabCase(key))]=value),acc}),{})})(theme)),addGlobalStylesheet=(styleElementId,styles)=>{var _document$getElementB;const style=document.createElement("style");style.setAttribute("id",styleElementId),style.textContent=styles,null===(_document$getElementB=document.getElementById(styleElementId))||void 0===_document$getElementB||_document$getElementB.remove(),document.head.appendChild(style)},stringifyCssColorVariables=colorVariables=>Object.keys(colorVariables).reduce(((css,key)=>"".concat(css).concat(key,": ").concat(colorVariables[key],";")),""),cloneThroughFragments=children=>react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children,(c=>(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(c)?c.type===react__WEBPACK_IMPORTED_MODULE_0__.Fragment?cloneThroughFragments(c.props.children):(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(c,(0,_Users_benjamindehli_Repos_dibk_design_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__.A)({},c.props)):c)),addFocusTrapInsideElement=element=>{(element=>{const autoFocusElement=document.createElement("button");element.prepend(autoFocusElement),autoFocusElement.focus(),autoFocusElement.remove()})(element);const focusableElements=(element=>Array.from(element.querySelectorAll('button, [href], input, [tabindex="0"]')).filter((resultElement=>resultElement)))(element),firstFocusableElement=null!=focusableElements&&focusableElements.length?focusableElements[0]:null,lastFocusableElement=(null==focusableElements?void 0:focusableElements.length)>1?focusableElements[focusableElements.length-1]:firstFocusableElement;firstFocusableElement&&(firstFocusableElement.onkeydown=event=>{9===event.keyCode&&event.shiftKey&&lastFocusableElement.focus()}),lastFocusableElement&&(lastFocusableElement.onclick=()=>{firstFocusableElement.focus()},lastFocusableElement.onkeydown=event=>{9!==event.keyCode||event.shiftKey||(event.preventDefault(),firstFocusableElement.focus())})};cloneThroughFragments.__docgenInfo={description:"",methods:[],displayName:"cloneThroughFragments"}},"./src/stories/DescriptionDetails.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>stories_DescriptionDetails});__webpack_require__("./node_modules/react/index.js");var helpers=__webpack_require__("./src/functions/helpers.js");const DescriptionDetails_module_descriptionDetails="DescriptionDetails_descriptionDetails__jAYfx",DescriptionDetails_module_compact="DescriptionDetails_compact__HP4Vo";var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const DescriptionDetails=_ref=>{let{compact,titleWidth,children}=_ref;return(0,jsx_runtime.jsx)("dd",{className:(0,helpers.IK)([DescriptionDetails_module_descriptionDetails,compact&&DescriptionDetails_module_compact]),style:{"--title-width":titleWidth||null},children})};DescriptionDetails.defaultProps={compact:!1};const stories_DescriptionDetails=DescriptionDetails;DescriptionDetails.__docgenInfo={description:"",methods:[],displayName:"DescriptionDetails",props:{compact:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},titleWidth:{description:"",type:{name:"string"},required:!1}}}},"./src/stories/DescriptionList.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>stories_DescriptionList});var react=__webpack_require__("./node_modules/react/index.js");const DescriptionList_module_descriptionList="DescriptionList_descriptionList__h10lW",DescriptionList_module_compact="DescriptionList_compact__wZgOB";var helpers=__webpack_require__("./src/functions/helpers.js");const DescriptionList=_ref=>{let{compact,titleWidth,children}=_ref;return(children=>{var childElements;return react.createElement("dl",{className:(0,helpers.IK)([DescriptionList_module_descriptionList,!!compact&&DescriptionList_module_compact]),style:{"--title-width":titleWidth||null}},(childElements=react.Children.toArray(children),(0,helpers.cb)(childElements).map(((childElement,index)=>react.cloneElement(childElement,{compact,titleWidth,key:"descriptionListItem-".concat(index)})))))})(children)};DescriptionList.defaultProps={compact:!1};const stories_DescriptionList=DescriptionList;DescriptionList.__docgenInfo={description:"",methods:[],displayName:"DescriptionList",props:{compact:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},titleWidth:{description:"",type:{name:"string"},required:!1}}}},"./src/stories/DescriptionTerm.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>stories_DescriptionTerm});__webpack_require__("./node_modules/react/index.js");var helpers=__webpack_require__("./src/functions/helpers.js");const DescriptionTerm_module_descriptionTerm="DescriptionTerm_descriptionTerm__BFX+A",DescriptionTerm_module_compact="DescriptionTerm_compact__Zatqf";var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const DescriptionTerm=_ref=>{let{compact,titleWidth,children}=_ref;return(0,jsx_runtime.jsx)("dt",{className:(0,helpers.IK)([DescriptionTerm_module_descriptionTerm,compact&&DescriptionTerm_module_compact]),style:{"--title-width":titleWidth||null},children})};DescriptionTerm.defaultProps={compact:!1};const stories_DescriptionTerm=DescriptionTerm;DescriptionTerm.__docgenInfo={description:"",methods:[],displayName:"DescriptionTerm",props:{compact:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},titleWidth:{description:"",type:{name:"string"},required:!1}}}},"./src/stories/ThemeProvider.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>stories_ThemeProvider});var prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),helpers=__webpack_require__("./src/functions/helpers.js");const ThemeProvider=_ref=>{let{theme,children}=_ref;const cssVariablesFromTheme=(0,helpers.wP)(theme),cssColorVariablesString=(0,helpers.N8)(cssVariablesFromTheme);return(0,helpers.X6)("theme-provider",":root {".concat(cssColorVariablesString,"} ").concat('*,*::before,*::after{box-sizing:border-box}body{margin:0;font-family:"PP Mori",arial,sans-serif;background-color:var(--color-body-background, #ebf4fa);color:var(--color-default-text, #202020);font-size:16px;line-height:24px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-weight:normal;letter-spacing:.01em}a{color:var(--color-primary, #003045)}')),children};ThemeProvider.propTypes={theme:prop_types_default().object};const stories_ThemeProvider=ThemeProvider},"./node_modules/prop-types/factoryWithThrowingShims.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var ReactPropTypesSecret=__webpack_require__("./node_modules/prop-types/lib/ReactPropTypesSecret.js");function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction,module.exports=function(){function shim(props,propName,componentName,location,propFullName,secret){if(secret!==ReactPropTypesSecret){var err=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw err.name="Invariant Violation",err}}function getShim(){return shim}shim.isRequired=shim;var ReactPropTypes={array:shim,bigint:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return ReactPropTypes.PropTypes=ReactPropTypes,ReactPropTypes}},"./node_modules/prop-types/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/prop-types/factoryWithThrowingShims.js")()},"./node_modules/prop-types/lib/ReactPropTypesSecret.js":module=>{"use strict";module.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);