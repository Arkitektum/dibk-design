/*! For license information please see stories-Theme-stories.6f688772.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkdibk_design=self.webpackChunkdibk_design||[]).push([[233],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{Z:function(){return _defineProperty}})},"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _objectSpread2}});var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}},"./src/assets/svg/dibk-logo-mobile.svg?url":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__("./node_modules/react/index.js");__webpack_exports__.Z=__webpack_require__.p+"static/media/dibk-logo-mobile.120629cce1f04efceffd70d792221de7.svg"},"./src/stories/Theme.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Custom:function(){return Custom},Default:function(){return Default},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return Theme_stories}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),react=__webpack_require__("./node_modules/react/index.js"),functions_theme=__webpack_require__("./src/functions/theme.js"),dibk_logo_mobileurl=__webpack_require__("./src/assets/svg/dibk-logo-mobile.svg?url"),Theme_module={flex:"Theme_flex__mYyxR","main-content":"Theme_main-content__4Z27P",colorPalette:"Theme_colorPalette__7lmCA",color:"Theme_color__r4lFt",default:"Theme_default__TiXAX",primary:"Theme_primary__Z0wgP",success:"Theme_success__iFwLz",warning:"Theme_warning__r+d6s",info:"Theme_info__mcva8",lightCyan:"Theme_lightCyan__1rDgD",orange:"Theme_orange__qjbsE",lightOrange:"Theme_lightOrange__ddJsP",lime:"Theme_lime__c8nZp",lightLime:"Theme_lightLime__iifP-"},jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Theme=function Theme(props){var themeTextStyle=props.theme?function getThemeTextStyle(theme){return{color:(0,functions_theme.o3)(theme)}}(props.theme):null,themeLinkStyle=props.theme?function getThemeLinkStyle(theme){return{color:(0,functions_theme.nX)(theme)}}(props.theme):null;return(0,jsx_runtime.jsxs)(react.Fragment,{children:[(0,jsx_runtime.jsx)("div",{className:Theme_module.colorPalette,children:function renderColors(theme){return["default","primary","success","warning","info","lightCyan","orange","lightOrange","lime","lightLime"].map((function(color){var colorClassName=Theme_module[color],colorPaletteStyle=props.theme?function getThemeColorPaletteStyle(theme,color){return{backgroundColor:(0,functions_theme.hN)(theme,color),color:(0,functions_theme.nk)(theme,color)}}(props.theme,color):null;return(0,jsx_runtime.jsx)("div",{className:"".concat(Theme_module.color," ").concat(colorClassName),style:colorPaletteStyle,children:color},color)}))}(props.theme)}),(0,jsx_runtime.jsx)("p",{style:themeTextStyle,children:"The is default text"}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)("a",{style:themeLinkStyle,href:"#theme",children:"This is a hyperlink"})}),function renderLogo(logoLink){var themeLogo=(0,functions_theme.QV)(props.theme),themeAppName=(0,functions_theme.k0)(props.theme),logoElement=themeLogo&&themeAppName?(0,jsx_runtime.jsx)("img",{alt:"".concat(themeAppName," logo"),src:themeLogo}):(0,jsx_runtime.jsx)("img",{alt:"DIBK logo",src:dibk_logo_mobileurl.Z});return logoLink&&logoLink.length?(0,jsx_runtime.jsx)("a",{href:logoLink,children:logoElement}):logoElement}(props.theme)]})};Theme.defaultProps={},Theme.__docgenInfo={description:"",methods:[],displayName:"Theme",props:{theme:{description:"",type:{name:"object"},required:!1}}};var _Default$parameters,_Default$parameters2,_Default$parameters2$,_Custom$parameters,_Custom$parameters2,_Custom$parameters2$d,stories_Theme=Theme,customTheme=__webpack_require__("./src/data/customTheme.js"),Theme_stories={title:"Example/Theme",component:stories_Theme,argTypes:{}},Template=function Template(args){return(0,jsx_runtime.jsx)(stories_Theme,(0,objectSpread2.Z)({},args))},Default=Template.bind({});Default.args={};var Custom=Template.bind({});Custom.args={theme:customTheme.Z},Default.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},Default.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:(0,objectSpread2.Z)({originalSource:"args => <Theme {...args} />"},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2$=_Default$parameters2.docs)||void 0===_Default$parameters2$?void 0:_Default$parameters2$.source)})}),Custom.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},Custom.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_Custom$parameters=Custom.parameters)||void 0===_Custom$parameters?void 0:_Custom$parameters.docs),{},{source:(0,objectSpread2.Z)({originalSource:"args => <Theme {...args} />"},null===(_Custom$parameters2=Custom.parameters)||void 0===_Custom$parameters2||null===(_Custom$parameters2$d=_Custom$parameters2.docs)||void 0===_Custom$parameters2$d?void 0:_Custom$parameters2$d.source)})});var __namedExportsOrder=["Default","Custom"]},"./src/functions/theme.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{QV:function(){return getThemeLogo},e3:function(){return getThemeNavigationBarTextColor},fQ:function(){return getThemeLogoPadding},hN:function(){return getThemePaletteBackgroundColor},jw:function(){return getThemePaletteBorderColor},k0:function(){return getThemeAppName},kl:function(){return getThemeNavigationBarBackgroundColor},nX:function(){return getThemeLinkColor},nk:function(){return getThemePaletteTextColor},o3:function(){return getThemeTextColor}});var getThemePaletteBackgroundColor=function getThemePaletteBackgroundColor(theme,color){var _theme$colors,_theme$colors$palette,_theme$colors$palette2;return(null==theme||null===(_theme$colors=theme.colors)||void 0===_theme$colors||null===(_theme$colors$palette=_theme$colors.palette)||void 0===_theme$colors$palette||null===(_theme$colors$palette2=_theme$colors$palette[color])||void 0===_theme$colors$palette2?void 0:_theme$colors$palette2.background)||null},getThemePaletteTextColor=function getThemePaletteTextColor(theme,color){var _theme$colors2,_theme$colors2$palett,_theme$colors2$palett2;return(null==theme||null===(_theme$colors2=theme.colors)||void 0===_theme$colors2||null===(_theme$colors2$palett=_theme$colors2.palette)||void 0===_theme$colors2$palett||null===(_theme$colors2$palett2=_theme$colors2$palett[color])||void 0===_theme$colors2$palett2?void 0:_theme$colors2$palett2.text)||null},getThemePaletteBorderColor=function getThemePaletteBorderColor(theme,color){var _theme$colors3,_theme$colors3$palett,_theme$colors3$palett2;return(null==theme||null===(_theme$colors3=theme.colors)||void 0===_theme$colors3||null===(_theme$colors3$palett=_theme$colors3.palette)||void 0===_theme$colors3$palett||null===(_theme$colors3$palett2=_theme$colors3$palett[color])||void 0===_theme$colors3$palett2?void 0:_theme$colors3$palett2.border)||null},getThemeNavigationBarBackgroundColor=function getThemeNavigationBarBackgroundColor(theme){var _theme$colors4,_theme$colors4$naviga;return(null==theme||null===(_theme$colors4=theme.colors)||void 0===_theme$colors4||null===(_theme$colors4$naviga=_theme$colors4.navigationBar)||void 0===_theme$colors4$naviga?void 0:_theme$colors4$naviga.background)||null},getThemeNavigationBarTextColor=function getThemeNavigationBarTextColor(theme){var _theme$colors5,_theme$colors5$naviga;return(null==theme||null===(_theme$colors5=theme.colors)||void 0===_theme$colors5||null===(_theme$colors5$naviga=_theme$colors5.navigationBar)||void 0===_theme$colors5$naviga?void 0:_theme$colors5$naviga.text)||null},getThemeLogo=function getThemeLogo(theme){return(null==theme?void 0:theme.logo)||null},getThemeLogoPadding=function getThemeLogoPadding(theme){return(null==theme?void 0:theme.logoPadding)||null},getThemeAppName=function getThemeAppName(theme){return(null==theme?void 0:theme.appName)||null},getThemeTextColor=function getThemeTextColor(theme){var _theme$colors6;return(null==theme||null===(_theme$colors6=theme.colors)||void 0===_theme$colors6?void 0:_theme$colors6.text)||null},getThemeLinkColor=function getThemeLinkColor(theme){var _theme$colors7;return(null==theme||null===(_theme$colors7=theme.colors)||void 0===_theme$colors7?void 0:_theme$colors7.link)||null}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);