/*! For license information please see stories-List-stories.cf675b9d.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkdibk_design=self.webpackChunkdibk_design||[]).push([[521],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{Z:function(){return _defineProperty}})},"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _objectSpread2}});var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./src/stories/List.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Ordered:function(){return Ordered},Unordered:function(){return Unordered},UnorderedListWithSubItems:function(){return UnorderedListWithSubItems},UnorderedSquareStyled:function(){return UnorderedSquareStyled},UnorderedUnstyled:function(){return UnorderedUnstyled},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return List_stories}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),react=__webpack_require__("./node_modules/react/index.js"),defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),List_module_list="List_list__Fed3f",List_module_compact="List_compact__wuwoS",List=function List(props){return function renderList(){var listType=props.ordered?"ol":"ul",defaultListStyle=props.ordered?"decimal":"disc";return react.createElement(listType,{className:"".concat(List_module_list," ").concat(props.compact?List_module_compact:""),style:(0,defineProperty.Z)({},"--listStyle",props.listStyle||defaultListStyle)},props.children)}()};List.defaultProps={ordered:!1,compact:!1},List.__docgenInfo={description:"",methods:[],displayName:"List",props:{ordered:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},compact:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},listStyle:{description:"",type:{name:"string"},required:!1}}};var stories_List=List,jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),ListItem=function ListItem(props){var elementProps={key:props.elementKey||null};return(0,jsx_runtime.jsxs)("li",(0,objectSpread2.Z)((0,objectSpread2.Z)({},elementProps),{},{children:[props.children,props.elementKey]}))};ListItem.__docgenInfo={description:"",methods:[],displayName:"ListItem",props:{elementKey:{description:"",type:{name:"string"},required:!1}}};var stories_ListItem=ListItem,List_stories={title:"Example/List",component:stories_List,argTypes:{}},Template=function Template(args){return(0,jsx_runtime.jsx)(stories_List,(0,objectSpread2.Z)({},args))},listItems=(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(stories_ListItem,{children:"item 1"}),(0,jsx_runtime.jsx)(stories_ListItem,{children:"item 2"}),(0,jsx_runtime.jsx)(stories_ListItem,{children:"item 3"})]}),listItemsWithSubItems=(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(stories_ListItem,{children:"item 1"}),(0,jsx_runtime.jsxs)(stories_ListItem,{children:["item 2",(0,jsx_runtime.jsxs)(stories_List,{children:[(0,jsx_runtime.jsx)(stories_ListItem,{children:"subitem 1"}),(0,jsx_runtime.jsx)(stories_ListItem,{children:"subitem 2"})]})]}),(0,jsx_runtime.jsx)(stories_ListItem,{children:"item 3"})]}),Ordered=Template.bind({});Ordered.args={children:listItems,ordered:!0};var Unordered=Template.bind({});Unordered.args={children:listItems};var UnorderedSquareStyled=Template.bind({});UnorderedSquareStyled.args={children:listItems,listStyle:"square"};var UnorderedUnstyled=Template.bind({});UnorderedUnstyled.args={children:listItems,listStyle:"none"};var UnorderedListWithSubItems=Template.bind({});UnorderedListWithSubItems.args={children:listItemsWithSubItems};var __namedExportsOrder=["Ordered","Unordered","UnorderedSquareStyled","UnorderedUnstyled","UnorderedListWithSubItems"];Ordered.parameters={...Ordered.parameters,docs:{...Ordered.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(List, _objectSpread({}, args));\n}",...Ordered.parameters?.docs?.source}}},Unordered.parameters={...Unordered.parameters,docs:{...Unordered.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(List, _objectSpread({}, args));\n}",...Unordered.parameters?.docs?.source}}},UnorderedSquareStyled.parameters={...UnorderedSquareStyled.parameters,docs:{...UnorderedSquareStyled.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(List, _objectSpread({}, args));\n}",...UnorderedSquareStyled.parameters?.docs?.source}}},UnorderedUnstyled.parameters={...UnorderedUnstyled.parameters,docs:{...UnorderedUnstyled.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(List, _objectSpread({}, args));\n}",...UnorderedUnstyled.parameters?.docs?.source}}},UnorderedListWithSubItems.parameters={...UnorderedListWithSubItems.parameters,docs:{...UnorderedListWithSubItems.parameters?.docs,source:{originalSource:"function Template(args) {\n  return /*#__PURE__*/_jsx(List, _objectSpread({}, args));\n}",...UnorderedListWithSubItems.parameters?.docs?.source}}}}}]);