/*! For license information please see stories-Select-stories.800f3a42.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkdibk_design=self.webpackChunkdibk_design||[]).push([[128],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{Z:function(){return _defineProperty}})},"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _objectSpread2}});var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}},"./src/stories/Select.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},Disabled:function(){return Disabled},Required:function(){return Required},WithContentOnly:function(){return WithContentOnly},WithContentOnlyAndDefaultContent:function(){return WithContentOnlyAndDefaultContent},WithContentOnlyAndKeyAsContent:function(){return WithContentOnlyAndKeyAsContent},WithCustomTheme:function(){return WithCustomTheme},WithCustomWidth:function(){return WithCustomWidth},WithDefaultValue:function(){return WithDefaultValue},WithError:function(){return WithError},WithLabel:function(){return WithLabel},WithLinkInLabel:function(){return WithLinkInLabel},WithPlaceholder:function(){return WithPlaceholder},WithSelectedValue:function(){return WithSelectedValue},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return Select_stories}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),defineProperty=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js")),Label=__webpack_require__("./src/stories/Label.jsx"),ErrorMessage=__webpack_require__("./src/stories/ErrorMessage.jsx"),functions_theme=__webpack_require__("./src/functions/theme.js"),generators=__webpack_require__("./src/functions/generators.js"),Select_module_select="Select_select__V3621",Select_module_requiredSymbol="Select_requiredSymbol__pwaBj",Select_module_selectContainer="Select_selectContainer__1ZX1M",Select_module_selectListArrow="Select_selectListArrow__ucLzQ",Select_module_hasErrors="Select_hasErrors__hglv3",jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Select=function Select(props){var getErrorElementId=function getErrorElementId(){return"".concat(props.id,"-errorMessage")};if(props.contentOnly){var value=props.defaultValue?props.defaultValue:props.value||null;return(0,jsx_runtime.jsxs)("div",{className:Select_module_select,children:[(0,jsx_runtime.jsx)(Label.Z,{htmlFor:props.id,children:props.label}),(0,jsx_runtime.jsx)("span",{children:value?props.keyAsContent?function getKeyByValue(value,options){var selectedOption=options&&options.length?options.find((function(option){return"object"==typeof option?option.value===value:option===value})):null;return selectedOption&&selectedOption.key?selectedOption.key:selectedOption&&selectedOption.value?selectedOption.value:selectedOption}(value,props.options):value:props.defaultContent})]})}var _props$width,_props$errorMessage,_props$ariaDescribed,_selectElementProps,_props$width2,defaultValue=!(props.value||!props.defaultValue)&&props.defaultValue,styleRules=(0,objectSpread2.Z)((0,objectSpread2.Z)({},props.hasErrors?function getThemeErrorInputStyle(theme){return{boxShadow:"0 0 3px ".concat((0,functions_theme.hN)(theme,"warning")),borderColor:(0,functions_theme.hN)(theme,"warning")}}(props.theme):null),(null===(_props$width=props.width)||void 0===_props$width?void 0:_props$width.length)&&{maxWidth:props.width}),selectElementProps=(_selectElementProps={name:props.name,multiple:props.multiple,required:props.required,disabled:props.disabled},(0,defineProperty.Z)(_selectElementProps,defaultValue?"defaultValue":"value",defaultValue||props.value),(0,defineProperty.Z)(_selectElementProps,"onChange",props.onChange),(0,defineProperty.Z)(_selectElementProps,"id",props.id),(0,defineProperty.Z)(_selectElementProps,"role",props.role),(0,defineProperty.Z)(_selectElementProps,"key","".concat(props.id,"-").concat((0,generators.z)(6))),(0,defineProperty.Z)(_selectElementProps,"className",props.hasErrors?Select_module_hasErrors:""),(0,defineProperty.Z)(_selectElementProps,"aria-describedby",props.hasErrors&&null!==(_props$errorMessage=props.errorMessage)&&void 0!==_props$errorMessage&&_props$errorMessage.length?getErrorElementId():null!==(_props$ariaDescribed=props["aria-describedby"])&&void 0!==_props$ariaDescribed&&_props$ariaDescribed.length?props["aria-describedby"]:null),(0,defineProperty.Z)(_selectElementProps,"aria-invalid",props.hasErrors?"true":null),(0,defineProperty.Z)(_selectElementProps,"style",styleRules),_selectElementProps);return(0,jsx_runtime.jsxs)("div",{className:Select_module_select,children:[(0,jsx_runtime.jsxs)(Label.Z,{htmlFor:props.id,children:[props.label,props.required&&(0,jsx_runtime.jsx)("span",{className:Select_module_requiredSymbol,children:"*"})]}),(0,jsx_runtime.jsxs)("div",{className:Select_module_selectContainer,style:(0,objectSpread2.Z)({},(null===(_props$width2=props.width)||void 0===_props$width2?void 0:_props$width2.length)&&{maxWidth:props.width}),children:[(0,jsx_runtime.jsx)("span",{className:Select_module_selectListArrow,style:function getThemeArrowStyle(theme){return{borderTopColor:(0,functions_theme.hN)(theme,"primary")}}(props.theme)}),(0,jsx_runtime.jsxs)("select",(0,objectSpread2.Z)((0,objectSpread2.Z)({},selectElementProps),{},{children:[function renderPlaceholderOption(placeholder,placeholderValue){return placeholder?(0,jsx_runtime.jsx)("option",{value:placeholderValue,disabled:!0,children:placeholder}):""}(props.placeholder,props.placeholderValue),function renderOptionElements(options){return options.map((function(option,key){var optionObject=null;return optionObject="object"==typeof option?{key:option.key?option.key:"",value:option.value?option.value:""}:{key:option,value:option},(0,jsx_runtime.jsx)("option",{value:optionObject.value,children:optionObject.key},key)}))}(props.options)]}))]}),(0,jsx_runtime.jsx)(ErrorMessage.Z,{id:getErrorElementId(),content:props.errorMessage,theme:props.theme})]})};Select.defaultProps={onChange:function onChange(){return!1},name:"",required:!1,disabled:!1,options:[],label:"",contentOnly:!1,keyAsContent:!1,placeholder:null,placeholderValue:"",defaultContent:null,hasErrors:!1,errorMessage:""},Select.__docgenInfo={description:"",methods:[],displayName:"Select",props:{onChange:{defaultValue:{value:"() => {\n    return false;\n}",computed:!1},description:"",type:{name:"func"},required:!1},name:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},required:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},disabled:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},options:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"union",value:[{name:"union",value:[{name:"string"},{name:"number"}]},{name:"shape",value:{key:{name:"string",required:!1},value:{name:"string",required:!1}}}]}},required:!1},label:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"union",value:[{name:"string"},{name:"arrayOf",value:{name:"union",value:[{name:"string"},{name:"object"}]}}]},required:!1},contentOnly:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},keyAsContent:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},placeholder:{defaultValue:{value:"null",computed:!1},description:"",type:{name:"string"},required:!1},placeholderValue:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},defaultContent:{defaultValue:{value:"null",computed:!1},description:"",type:{name:"string"},required:!1},hasErrors:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},errorMessage:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"union",value:[{name:"string"},{name:"arrayOf",value:{name:"union",value:[{name:"string"},{name:"object"}]}}]},required:!1},id:{description:"",type:{name:"string"},required:!0},multiple:{description:"",type:{name:"bool"},required:!1},width:{description:"",type:{name:"string"},required:!1},value:{description:"",type:{name:"any"},required:!1},defaultValue:{description:"",type:{name:"any"},required:!1},"aria-describedby":{description:"",type:{name:"string"},required:!1},theme:{description:"",type:{name:"object"},required:!1}}};var stories_Select=Select,customTheme=__webpack_require__("./src/data/customTheme.js"),Select_stories={title:"Example/Select",component:stories_Select,argTypes:{}},Template=function Template(args){return(0,jsx_runtime.jsx)(stories_Select,(0,objectSpread2.Z)({},args))},options=["option 1","option 2",{key:"option 3",value:"value 3"}],Default=Template.bind({});Default.args={id:"select1",options:options};var WithLabel=Template.bind({});WithLabel.args={id:"select2",label:"Select with label",options:options};var WithSelectedValue=Template.bind({});WithSelectedValue.args={id:"select3",label:"Select with label and selected value",value:"value 3",options:options};var WithDefaultValue=Template.bind({});WithDefaultValue.args={id:"select4",label:"Select with label and default value",defaultValue:"value 3",options:options};var WithError=Template.bind({});WithError.args={id:"select5",label:"Select with label, selected value, errors and error message",value:"value 3",hasErrors:!0,errorMessage:"Wrong value selected",options:options};var WithLinkInLabel=Template.bind({});WithLinkInLabel.args={id:"select6",label:["Select with ",(0,jsx_runtime.jsx)("a",{href:"#select6",children:"link"},"labelLink")," in label"],value:"value 3",options:options};var Disabled=Template.bind({});Disabled.args={id:"select7",disabled:!0,label:"Disabled select with label and selected value",value:"value 3",options:options};var Required=Template.bind({});Required.args={id:"select8",required:!0,label:"Required select with label",options:options};var WithPlaceholder=Template.bind({});WithPlaceholder.args={id:"select9",label:"Select with label, placeholder and placeholderValue",placeholder:"Select from list",placeholderValue:"notSelected",value:"notSelected",options:options};var WithContentOnly=Template.bind({});WithContentOnly.args={id:"select10",label:"Select with label, selected value and contentOnly set to true",value:"value 3",contentOnly:!0,options:options};var WithContentOnlyAndKeyAsContent=Template.bind({});WithContentOnlyAndKeyAsContent.args={id:"select11",label:"Select with label, selected value, contentOnly set to true and keyAsContent set to true",value:"value 3",contentOnly:!0,keyAsContent:!0,options:options};var WithContentOnlyAndDefaultContent=Template.bind({});WithContentOnlyAndDefaultContent.args={id:"select12",label:"Select with label, contentOnly set to true, no value and defaultContent",contentOnly:!0,defaultContent:"No value selected",options:options};var WithCustomWidth=Template.bind({});WithCustomWidth.args={id:"select13",label:"Select with custom width",width:"250px",options:options};var WithCustomTheme=Template.bind({});WithCustomTheme.args={id:"select14",label:"Select with custom theme",theme:customTheme.Z,options:options},Default.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},Default.parameters),WithLabel.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},WithLabel.parameters),WithSelectedValue.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},WithSelectedValue.parameters),WithDefaultValue.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},WithDefaultValue.parameters),WithError.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},WithError.parameters),WithLinkInLabel.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},WithLinkInLabel.parameters),Disabled.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},Disabled.parameters),Required.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},Required.parameters),WithPlaceholder.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},WithPlaceholder.parameters),WithContentOnly.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},WithContentOnly.parameters),WithContentOnlyAndKeyAsContent.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},WithContentOnlyAndKeyAsContent.parameters),WithContentOnlyAndDefaultContent.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},WithContentOnlyAndDefaultContent.parameters),WithCustomWidth.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},WithCustomWidth.parameters),WithCustomTheme.parameters=(0,objectSpread2.Z)({storySource:{source:"(args) => <Select {...args} />"}},WithCustomTheme.parameters);var __namedExportsOrder=["Default","WithLabel","WithSelectedValue","WithDefaultValue","WithError","WithLinkInLabel","Disabled","Required","WithPlaceholder","WithContentOnly","WithContentOnlyAndKeyAsContent","WithContentOnlyAndDefaultContent","WithCustomWidth","WithCustomTheme"]},"./src/functions/generators.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{z:function(){return generateRandomString}});var generateRandomString=function generateRandomString(length){for(var result="",characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",charactersLength=characters.length,i=0;i<length;i++)result+=characters.charAt(Math.floor(Math.random()*charactersLength));return result}},"./src/functions/theme.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{QV:function(){return getThemeLogo},e3:function(){return getThemeNavigationBarTextColor},fQ:function(){return getThemeLogoPadding},hN:function(){return getThemePaletteBackgroundColor},jw:function(){return getThemePaletteBorderColor},k0:function(){return getThemeAppName},kl:function(){return getThemeNavigationBarBackgroundColor},nX:function(){return getThemeLinkColor},nk:function(){return getThemePaletteTextColor},o3:function(){return getThemeTextColor}});var getThemePaletteBackgroundColor=function getThemePaletteBackgroundColor(theme,color){var _theme$colors,_theme$colors$palette,_theme$colors$palette2;return(null==theme||null===(_theme$colors=theme.colors)||void 0===_theme$colors||null===(_theme$colors$palette=_theme$colors.palette)||void 0===_theme$colors$palette||null===(_theme$colors$palette2=_theme$colors$palette[color])||void 0===_theme$colors$palette2?void 0:_theme$colors$palette2.background)||null},getThemePaletteTextColor=function getThemePaletteTextColor(theme,color){var _theme$colors2,_theme$colors2$palett,_theme$colors2$palett2;return(null==theme||null===(_theme$colors2=theme.colors)||void 0===_theme$colors2||null===(_theme$colors2$palett=_theme$colors2.palette)||void 0===_theme$colors2$palett||null===(_theme$colors2$palett2=_theme$colors2$palett[color])||void 0===_theme$colors2$palett2?void 0:_theme$colors2$palett2.text)||null},getThemePaletteBorderColor=function getThemePaletteBorderColor(theme,color){var _theme$colors3,_theme$colors3$palett,_theme$colors3$palett2;return(null==theme||null===(_theme$colors3=theme.colors)||void 0===_theme$colors3||null===(_theme$colors3$palett=_theme$colors3.palette)||void 0===_theme$colors3$palett||null===(_theme$colors3$palett2=_theme$colors3$palett[color])||void 0===_theme$colors3$palett2?void 0:_theme$colors3$palett2.border)||null},getThemeNavigationBarBackgroundColor=function getThemeNavigationBarBackgroundColor(theme){var _theme$colors4,_theme$colors4$naviga;return(null==theme||null===(_theme$colors4=theme.colors)||void 0===_theme$colors4||null===(_theme$colors4$naviga=_theme$colors4.navigationBar)||void 0===_theme$colors4$naviga?void 0:_theme$colors4$naviga.background)||null},getThemeNavigationBarTextColor=function getThemeNavigationBarTextColor(theme){var _theme$colors5,_theme$colors5$naviga;return(null==theme||null===(_theme$colors5=theme.colors)||void 0===_theme$colors5||null===(_theme$colors5$naviga=_theme$colors5.navigationBar)||void 0===_theme$colors5$naviga?void 0:_theme$colors5$naviga.text)||null},getThemeLogo=function getThemeLogo(theme){return(null==theme?void 0:theme.logo)||null},getThemeLogoPadding=function getThemeLogoPadding(theme){return(null==theme?void 0:theme.logoPadding)||null},getThemeAppName=function getThemeAppName(theme){return(null==theme?void 0:theme.appName)||null},getThemeTextColor=function getThemeTextColor(theme){var _theme$colors6;return(null==theme||null===(_theme$colors6=theme.colors)||void 0===_theme$colors6?void 0:_theme$colors6.text)||null},getThemeLinkColor=function getThemeLinkColor(theme){var _theme$colors7;return(null==theme||null===(_theme$colors7=theme.colors)||void 0===_theme$colors7?void 0:_theme$colors7.link)||null}},"./src/stories/ErrorMessage.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return stories_ErrorMessage}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),functions_theme=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/functions/theme.js")),ErrorMessage_module_errorMessage="ErrorMessage_errorMessage__Xc7GT",jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),ErrorMessage=function ErrorMessage(props){var getThemeErrorMessageStyle=function getThemeErrorMessageStyle(theme){return{color:(0,functions_theme.hN)(theme,"warning")}};return(0,jsx_runtime.jsx)("span",(0,objectSpread2.Z)((0,objectSpread2.Z)({},function getErrorElementProps(){var _props$id;return{id:null!==(_props$id=props.id)&&void 0!==_props$id&&_props$id.length?props.id:null,className:ErrorMessage_module_errorMessage,style:getThemeErrorMessageStyle(props.theme)}}()),{},{children:props.content?props.content:""}))};ErrorMessage.defaultProps={content:""},ErrorMessage.__docgenInfo={description:"",methods:[],displayName:"ErrorMessage",props:{content:{defaultValue:{value:'""',computed:!1},description:"Text content inside error message",type:{name:"union",value:[{name:"string"},{name:"arrayOf",value:{name:"union",value:[{name:"string"},{name:"object"}]}}]},required:!1},id:{description:"",type:{name:"string"},required:!1},theme:{description:"",type:{name:"object"},required:!1}}};var stories_ErrorMessage=ErrorMessage},"./src/stories/Label.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return stories_Label}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),Label_module_label=(__webpack_require__("./node_modules/react/index.js"),"Label_label__-hK3X"),Label_module_inline="Label_inline__ptpwp",Label_module_normalCursor="Label_normalCursor__XJx16",jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Label=function Label(props){var labelProps=(0,objectSpread2.Z)({},props);delete labelProps.inline,delete labelProps.normalCursor;var className="".concat(Label_module_label," ").concat(props.inline?Label_module_inline:""," ").concat(props.normalCursor?Label_module_normalCursor:"");return(0,jsx_runtime.jsx)("label",(0,objectSpread2.Z)((0,objectSpread2.Z)({},labelProps),{},{className:className,children:props.children}))};Label.defaultProps={inline:!1,normalCursor:!1},Label.__docgenInfo={description:"",methods:[],displayName:"Label",props:{inline:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},normalCursor:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1}}};var stories_Label=Label},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);