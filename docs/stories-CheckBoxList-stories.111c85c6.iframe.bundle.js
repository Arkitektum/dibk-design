"use strict";(self.webpackChunkdibk_design=self.webpackChunkdibk_design||[]).push([[602],{"./src/stories/CheckBoxList.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Compact:function(){return Compact},Default:function(){return Default},Required:function(){return Required},Themed:function(){return Themed},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return CheckBoxList_stories}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),react=__webpack_require__("./node_modules/react/index.js"),helpers=__webpack_require__("./src/functions/helpers.js"),asteriskurl=__webpack_require__("./src/assets/svg/asterisk.svg?url"),CheckBoxList_module_checkBoxList="CheckBoxList_checkBoxList__U47JD",CheckBoxList_module_requiredSymbol="CheckBoxList_requiredSymbol__+jZAJ",jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),CheckBoxList=function CheckBoxList(props){var _props$legend;return(0,jsx_runtime.jsxs)("fieldset",{className:CheckBoxList_module_checkBoxList,children:[null!==(_props$legend=props.legend)&&void 0!==_props$legend&&_props$legend.length?(0,jsx_runtime.jsxs)("legend",{children:[props.legend,props.required&&(0,jsx_runtime.jsx)("img",{src:asteriskurl.Z,alt:"",className:CheckBoxList_module_requiredSymbol})]}):null,function renderChildElements(childElements){return(0,helpers.vf)(childElements).map((function(childElement,index){return react.cloneElement(childElement,{requiredGroup:props.required,compact:props.compact,key:"checkboxListItem-".concat(index)})}))}(react.Children.toArray(props.children))]})};CheckBoxList.__docgenInfo={description:"",methods:[],displayName:"CheckBoxList",props:{legend:{description:"",type:{name:"string"},required:!1},required:{description:"",type:{name:"bool"},required:!1},compact:{description:"",type:{name:"bool"},required:!1}}};var stories_CheckBoxList=CheckBoxList,CheckBoxListItem=__webpack_require__("./src/stories/CheckBoxListItem.jsx"),customTheme=__webpack_require__("./src/data/customTheme.js"),CheckBoxList_stories={title:"Example/CheckBoxList",component:stories_CheckBoxList,argTypes:{}},Template=function Template(args){var checkBoxListArgs=(0,objectSpread2.Z)({},args);delete checkBoxListArgs.theme;var checkBoxListItemArgs={theme:args.theme};return(0,jsx_runtime.jsxs)(stories_CheckBoxList,(0,objectSpread2.Z)((0,objectSpread2.Z)({},checkBoxListArgs),{},{children:[(0,jsx_runtime.jsx)(CheckBoxListItem.Z,{onChange:function onChange(){console.log("onchange")},checked:!0,name:"checkboxlist",theme:checkBoxListItemArgs.theme,id:"checkboxList-listItem-1",children:"Label for checked checkbox"}),(0,jsx_runtime.jsx)(CheckBoxListItem.Z,{onChange:function onChange(){console.log("onchange")},name:"checkboxlist",theme:checkBoxListItemArgs.theme,id:"checkboxList-listItem-2",children:"Label for unchecked checkbox"})]}))},Default=Template.bind({});Default.args={legend:"Default checkbox list"};var Required=Template.bind({});Required.args={legend:"Required checkbox list",required:!0};var Compact=Template.bind({});Compact.args={legend:"Compact checkbox list",compact:!0};var Themed=Template.bind({});Themed.args={legend:"Themed checkbox list",theme:customTheme.Z};var __namedExportsOrder=["Default","Required","Compact","Themed"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'function Template(args) {\n  var checkBoxListArgs = _objectSpread({}, args);\n  delete checkBoxListArgs.theme;\n  var checkBoxListItemArgs = {\n    theme: args.theme\n  };\n  return /*#__PURE__*/_jsxs(CheckBoxList, _objectSpread(_objectSpread({}, checkBoxListArgs), {}, {\n    children: [/*#__PURE__*/_jsx(CheckBoxListItem, {\n      onChange: function onChange() {\n        console.log("onchange");\n      },\n      checked: true,\n      name: "checkboxlist",\n      theme: checkBoxListItemArgs.theme,\n      id: "checkboxList-listItem-1",\n      children: "Label for checked checkbox"\n    }), /*#__PURE__*/_jsx(CheckBoxListItem, {\n      onChange: function onChange() {\n        console.log("onchange");\n      },\n      name: "checkboxlist",\n      theme: checkBoxListItemArgs.theme,\n      id: "checkboxList-listItem-2",\n      children: "Label for unchecked checkbox"\n    })]\n  }));\n}',...Default.parameters?.docs?.source}}},Required.parameters={...Required.parameters,docs:{...Required.parameters?.docs,source:{originalSource:'function Template(args) {\n  var checkBoxListArgs = _objectSpread({}, args);\n  delete checkBoxListArgs.theme;\n  var checkBoxListItemArgs = {\n    theme: args.theme\n  };\n  return /*#__PURE__*/_jsxs(CheckBoxList, _objectSpread(_objectSpread({}, checkBoxListArgs), {}, {\n    children: [/*#__PURE__*/_jsx(CheckBoxListItem, {\n      onChange: function onChange() {\n        console.log("onchange");\n      },\n      checked: true,\n      name: "checkboxlist",\n      theme: checkBoxListItemArgs.theme,\n      id: "checkboxList-listItem-1",\n      children: "Label for checked checkbox"\n    }), /*#__PURE__*/_jsx(CheckBoxListItem, {\n      onChange: function onChange() {\n        console.log("onchange");\n      },\n      name: "checkboxlist",\n      theme: checkBoxListItemArgs.theme,\n      id: "checkboxList-listItem-2",\n      children: "Label for unchecked checkbox"\n    })]\n  }));\n}',...Required.parameters?.docs?.source}}},Compact.parameters={...Compact.parameters,docs:{...Compact.parameters?.docs,source:{originalSource:'function Template(args) {\n  var checkBoxListArgs = _objectSpread({}, args);\n  delete checkBoxListArgs.theme;\n  var checkBoxListItemArgs = {\n    theme: args.theme\n  };\n  return /*#__PURE__*/_jsxs(CheckBoxList, _objectSpread(_objectSpread({}, checkBoxListArgs), {}, {\n    children: [/*#__PURE__*/_jsx(CheckBoxListItem, {\n      onChange: function onChange() {\n        console.log("onchange");\n      },\n      checked: true,\n      name: "checkboxlist",\n      theme: checkBoxListItemArgs.theme,\n      id: "checkboxList-listItem-1",\n      children: "Label for checked checkbox"\n    }), /*#__PURE__*/_jsx(CheckBoxListItem, {\n      onChange: function onChange() {\n        console.log("onchange");\n      },\n      name: "checkboxlist",\n      theme: checkBoxListItemArgs.theme,\n      id: "checkboxList-listItem-2",\n      children: "Label for unchecked checkbox"\n    })]\n  }));\n}',...Compact.parameters?.docs?.source}}},Themed.parameters={...Themed.parameters,docs:{...Themed.parameters?.docs,source:{originalSource:'function Template(args) {\n  var checkBoxListArgs = _objectSpread({}, args);\n  delete checkBoxListArgs.theme;\n  var checkBoxListItemArgs = {\n    theme: args.theme\n  };\n  return /*#__PURE__*/_jsxs(CheckBoxList, _objectSpread(_objectSpread({}, checkBoxListArgs), {}, {\n    children: [/*#__PURE__*/_jsx(CheckBoxListItem, {\n      onChange: function onChange() {\n        console.log("onchange");\n      },\n      checked: true,\n      name: "checkboxlist",\n      theme: checkBoxListItemArgs.theme,\n      id: "checkboxList-listItem-1",\n      children: "Label for checked checkbox"\n    }), /*#__PURE__*/_jsx(CheckBoxListItem, {\n      onChange: function onChange() {\n        console.log("onchange");\n      },\n      name: "checkboxlist",\n      theme: checkBoxListItemArgs.theme,\n      id: "checkboxList-listItem-2",\n      children: "Label for unchecked checkbox"\n    })]\n  }));\n}',...Themed.parameters?.docs?.source}}}}}]);