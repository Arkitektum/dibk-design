"use strict";(self.webpackChunkdibk_design=self.webpackChunkdibk_design||[]).push([[472],{"./src/stories/InputField.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ContentOnly:()=>ContentOnly,ContentOnlyWithDefaultContent:()=>ContentOnlyWithDefaultContent,DateInput:()=>DateInput,DateInputWithMinAndMaxDate:()=>DateInputWithMinAndMaxDate,DateInputWithValue:()=>DateInputWithValue,DateInputWithValueAndError:()=>DateInputWithValueAndError,Default:()=>Default,Disabled:()=>Disabled,FileInput:()=>FileInput,FileInputWithButtonContentAndSelectedFile:()=>FileInputWithButtonContentAndSelectedFile,InputWithCustomElementKey:()=>InputWithCustomElementKey,InputWithCustomTheme:()=>InputWithCustomTheme,InputWithCustomWidth:()=>InputWithCustomWidth,Number:()=>InputField_stories_Number,Readonly:()=>Readonly,Required:()=>Required,RequiredWithLabelAndValue:()=>RequiredWithLabelAndValue,WithDefaultValue:()=>WithDefaultValue,WithErrors:()=>WithErrors,WithLabelAndValue:()=>WithLabelAndValue,WithLinkInLabel:()=>WithLinkInLabel,WithValue:()=>WithValue,__namedExportsOrder:()=>__namedExportsOrder,default:()=>InputField_stories});__webpack_require__("./node_modules/react/index.js");var Button=__webpack_require__("./src/stories/Button.jsx"),Label=__webpack_require__("./src/stories/Label.jsx"),ErrorMessage=__webpack_require__("./src/stories/ErrorMessage.jsx"),functions_theme=__webpack_require__("./src/functions/theme.js"),generators=__webpack_require__("./src/functions/generators.js"),asteriskurl=__webpack_require__("./src/assets/svg/asterisk.svg?url");const InputField_module={flex:"InputField_flex__GBxDu","main-content":"InputField_main-content__EB3lR",inputField:"InputField_inputField__2U3zv",requiredSymbol:"InputField_requiredSymbol__ZvvqD",file:"InputField_file__RzXh5",input:"InputField_input__beKMZ",hasErrors:"InputField_hasErrors__yfpEs",fileInputContainer:"InputField_fileInputContainer__7Rg5B"};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const InputField=props=>{var _props$width;const getErrorElementId=()=>"".concat(props.id,"-errorMessage"),defaultValue=props.defaultValue?props.defaultValue:props.value||null,defaultKey=props.elementKey||null,styleRules={...props.hasErrors?(theme=props.theme,{boxShadow:"0 0 3px ".concat((0,functions_theme.hN)(theme,"warning")),borderColor:(0,functions_theme.hN)(theme,"warning")}):null,...(null===(_props$width=props.width)||void 0===_props$width?void 0:_props$width.length)&&{maxWidth:props.width}};var theme,value,defaultContent;return(0,jsx_runtime.jsxs)("div",{className:"".concat(InputField_module.inputField," ").concat(InputField_module[props.type]),children:[(0,jsx_runtime.jsxs)(Label.Z,{htmlFor:props.id,children:[props.label,props.required&&(0,jsx_runtime.jsx)("img",{src:asteriskurl.Z,alt:"",className:InputField_module.requiredSymbol}),"file"===props.type?(0,jsx_runtime.jsxs)("div",{className:InputField_module.fileInputContainer,children:[(0,jsx_runtime.jsx)("span",{className:InputField_module.input,children:props.selectedFileName}),props.buttonContent?(0,jsx_runtime.jsx)(Button.Z,{color:props.buttonColor,onClick:()=>{document.getElementById(props.id).click()},content:props.buttonContent,type:"button",theme:props.theme}):null]}):null]}),props.contentOnly?(0,jsx_runtime.jsx)("span",{children:(value=props.value||props.defaultValue,defaultContent=props.defaultContent,"date"===props.type?value?(inputDate=>{if(!inputDate)return null;const date=new Date(inputDate),year=date.getFullYear(),month=date.getMonth()+1<10?"0".concat(date.getMonth()+1):date.getMonth()+1,day=date.getDate()<10?"0".concat(date.getDate()):date.getDate();return"".concat(day,".").concat(month,".").concat(year)})(value):defaultContent:value||defaultContent)}):(0,jsx_runtime.jsx)("input",{...((defaultValue,defaultKey,styleRules)=>{var _props$errorMessage,_props$ariaDescribed;return{name:props.name,readOnly:props.readOnly,disabled:props.disabled,required:props.required,type:props.type,role:props.role,id:props.id,key:defaultKey||"".concat(props.id,"-").concat((0,generators.z)(6)),min:props.min||null,max:props.max||null,onChange:props.onChange,onBlur:props.onBlur,[defaultValue?"defaultValue":"value"]:defaultValue||props.value,placeholder:props.placeholder||null,className:props.hasErrors?InputField_module.hasErrors:null,"aria-describedby":props.hasErrors&&null!==(_props$errorMessage=props.errorMessage)&&void 0!==_props$errorMessage&&_props$errorMessage.length?getErrorElementId():null!==(_props$ariaDescribed=props["aria-describedby"])&&void 0!==_props$ariaDescribed&&_props$ariaDescribed.length?props["aria-describedby"]:null,"aria-invalid":props.hasErrors?"true":null,"aria-autocomplete":props["aria-autocomplete"]||null,style:styleRules}})(defaultValue,defaultKey,styleRules)}),(0,jsx_runtime.jsx)(ErrorMessage.Z,{id:getErrorElementId(),content:props.errorMessage,theme:props.theme})]})};InputField.defaultProps={onChange:()=>!1,name:"",type:"text",required:!1,label:"",contentOnly:!1,buttonColor:"default",dateFormat:"d. MMMM, yyyy",placeholder:"",defaultContent:"",hasErrors:!1,errorMessage:""};const stories_InputField=InputField;InputField.__docgenInfo={description:"",methods:[],displayName:"InputField",props:{onChange:{defaultValue:{value:"() => {\n    return false;\n}",computed:!1},description:"",type:{name:"func"},required:!1},name:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},type:{defaultValue:{value:'"text"',computed:!1},description:"",type:{name:"string"},required:!1},required:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},label:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"union",value:[{name:"string"},{name:"arrayOf",value:{name:"union",value:[{name:"string"},{name:"object"}]}}]},required:!1},contentOnly:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},buttonColor:{defaultValue:{value:'"default"',computed:!1},description:"",type:{name:"enum",value:[{value:'"default"',computed:!1},{value:'"primary"',computed:!1}]},required:!1},dateFormat:{defaultValue:{value:'"d. MMMM, yyyy"',computed:!1},description:"",type:{name:"string"},required:!1},placeholder:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},defaultContent:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},hasErrors:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},errorMessage:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"union",value:[{name:"string"},{name:"arrayOf",value:{name:"union",value:[{name:"string"},{name:"object"}]}}]},required:!1},id:{description:"",type:{name:"string"},required:!0},onBlur:{description:"",type:{name:"func"},required:!1},width:{description:"",type:{name:"string"},required:!1},value:{description:"",type:{name:"any"},required:!1},defaultValue:{description:"",type:{name:"any"},required:!1},elementKey:{description:"",type:{name:"string"},required:!1},buttonContent:{description:"",type:{name:"string"},required:!1},selectedFileName:{description:"",type:{name:"string"},required:!1},"aria-describedby":{description:"",type:{name:"string"},required:!1},"aria-autocomplete":{description:"",type:{name:"enum",value:[{value:'"none"',computed:!1},{value:'"inline"',computed:!1},{value:'"list"',computed:!1},{value:'"both"',computed:!1}]},required:!1},theme:{description:"",type:{name:"object"},required:!1}}};var customTheme=__webpack_require__("./src/data/customTheme.js");const InputField_stories={title:"Example/InputField",component:stories_InputField,argTypes:{"aria-autocomplete":{control:"select",options:["none","inline","list","both"]}}},Template=args=>(0,jsx_runtime.jsx)(stories_InputField,{...args}),Default=Template.bind({});Default.args={id:"inputField1"};const Required=Template.bind({});Required.args={id:"inputField2",required:!0};const WithValue=Template.bind({});WithValue.args={id:"inputField3",value:"Input field value"};const WithDefaultValue=Template.bind({});WithDefaultValue.args={id:"inputField4",value:"Input field default value"};const WithLabelAndValue=Template.bind({});WithLabelAndValue.args={id:"inputField5",value:"Input field value",label:"Input field label"};const RequiredWithLabelAndValue=Template.bind({});RequiredWithLabelAndValue.args={id:"inputField6",value:"Input field value",label:"Input field label",required:!0};const WithLinkInLabel=Template.bind({});WithLinkInLabel.args={id:"inputField7",value:"Input field value",label:["Input with ",(0,jsx_runtime.jsx)("a",{href:"#label-link",children:"link"},"labelLink")," in label"]};const WithErrors=Template.bind({});WithErrors.args={id:"inputField8",value:"Input field value",label:"Input with label, value, errors and error message",hasErrors:!0,errorMessage:"Wrong value"};const Readonly=Template.bind({});Readonly.args={id:"inputField9",value:"Input field value",label:"Readonly input",readOnly:!0};const Disabled=Template.bind({});Disabled.args={id:"inputField10",value:"Input field value",label:"Disabled input",disabled:!0};const InputField_stories_Number=Template.bind({});InputField_stories_Number.args={id:"inputField11",value:"3",label:"Input with number values",type:"number"};const ContentOnly=Template.bind({});ContentOnly.args={id:"inputField12",value:"Input field value",label:"Input with contentOnly set to true",contentOnly:!0};const ContentOnlyWithDefaultContent=Template.bind({});ContentOnlyWithDefaultContent.args={id:"inputField13",label:"Input with contentOnly set to true and default content",contentOnly:!0,defaultContent:"Default content"};const FileInput=Template.bind({});FileInput.args={id:"inputField14",label:"File input",type:"file"};const FileInputWithButtonContentAndSelectedFile=Template.bind({});FileInputWithButtonContentAndSelectedFile.args={id:"inputField15",label:"File input",type:"file",buttonContent:"Legg til fil",selectedFileName:"file.txt"};const DateInput=Template.bind({});DateInput.args={id:"inputField16",label:"Date input without value",type:"date"};const DateInputWithValue=Template.bind({});DateInputWithValue.args={id:"inputField17",label:"Date input with value",value:"2020-05-10",type:"date"};const DateInputWithValueAndError=Template.bind({});DateInputWithValueAndError.args={id:"inputField17",label:"Date input with error",value:"2020-05-10",type:"date",hasErrors:!0,errorMessage:"Wrong date value"};const DateInputWithMinAndMaxDate=Template.bind({});DateInputWithMinAndMaxDate.args={id:"inputField18",label:"Date input with min and max date",value:"2020-05-10",type:"date",selectsStart:!0,min:"2020-05-04",max:"2020-05-19"};const InputWithCustomWidth=Template.bind({});InputWithCustomWidth.args={id:"inputField19",label:"Input with custom width",width:"400px"};const InputWithCustomElementKey=Template.bind({});InputWithCustomElementKey.args={id:"inputField20",label:"Input with custom element key",elementKey:"inputKeyHere"};const InputWithCustomTheme=Template.bind({});InputWithCustomTheme.args={id:"inputField21",label:"Input with custom thene",themne:customTheme.Z},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...Default.parameters?.docs?.source}}},Required.parameters={...Required.parameters,docs:{...Required.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...Required.parameters?.docs?.source}}},WithValue.parameters={...WithValue.parameters,docs:{...WithValue.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...WithValue.parameters?.docs?.source}}},WithDefaultValue.parameters={...WithDefaultValue.parameters,docs:{...WithDefaultValue.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...WithDefaultValue.parameters?.docs?.source}}},WithLabelAndValue.parameters={...WithLabelAndValue.parameters,docs:{...WithLabelAndValue.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...WithLabelAndValue.parameters?.docs?.source}}},RequiredWithLabelAndValue.parameters={...RequiredWithLabelAndValue.parameters,docs:{...RequiredWithLabelAndValue.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...RequiredWithLabelAndValue.parameters?.docs?.source}}},WithLinkInLabel.parameters={...WithLinkInLabel.parameters,docs:{...WithLinkInLabel.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...WithLinkInLabel.parameters?.docs?.source}}},WithErrors.parameters={...WithErrors.parameters,docs:{...WithErrors.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...WithErrors.parameters?.docs?.source}}},Readonly.parameters={...Readonly.parameters,docs:{...Readonly.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...Readonly.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...Disabled.parameters?.docs?.source}}},InputField_stories_Number.parameters={...InputField_stories_Number.parameters,docs:{...InputField_stories_Number.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...InputField_stories_Number.parameters?.docs?.source}}},ContentOnly.parameters={...ContentOnly.parameters,docs:{...ContentOnly.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...ContentOnly.parameters?.docs?.source}}},ContentOnlyWithDefaultContent.parameters={...ContentOnlyWithDefaultContent.parameters,docs:{...ContentOnlyWithDefaultContent.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...ContentOnlyWithDefaultContent.parameters?.docs?.source}}},FileInput.parameters={...FileInput.parameters,docs:{...FileInput.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...FileInput.parameters?.docs?.source}}},FileInputWithButtonContentAndSelectedFile.parameters={...FileInputWithButtonContentAndSelectedFile.parameters,docs:{...FileInputWithButtonContentAndSelectedFile.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...FileInputWithButtonContentAndSelectedFile.parameters?.docs?.source}}},DateInput.parameters={...DateInput.parameters,docs:{...DateInput.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...DateInput.parameters?.docs?.source}}},DateInputWithValue.parameters={...DateInputWithValue.parameters,docs:{...DateInputWithValue.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...DateInputWithValue.parameters?.docs?.source}}},DateInputWithValueAndError.parameters={...DateInputWithValueAndError.parameters,docs:{...DateInputWithValueAndError.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...DateInputWithValueAndError.parameters?.docs?.source}}},DateInputWithMinAndMaxDate.parameters={...DateInputWithMinAndMaxDate.parameters,docs:{...DateInputWithMinAndMaxDate.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...DateInputWithMinAndMaxDate.parameters?.docs?.source}}},InputWithCustomWidth.parameters={...InputWithCustomWidth.parameters,docs:{...InputWithCustomWidth.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...InputWithCustomWidth.parameters?.docs?.source}}},InputWithCustomElementKey.parameters={...InputWithCustomElementKey.parameters,docs:{...InputWithCustomElementKey.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...InputWithCustomElementKey.parameters?.docs?.source}}},InputWithCustomTheme.parameters={...InputWithCustomTheme.parameters,docs:{...InputWithCustomTheme.parameters?.docs,source:{originalSource:"args => <InputField {...args} />",...InputWithCustomTheme.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Required","WithValue","WithDefaultValue","WithLabelAndValue","RequiredWithLabelAndValue","WithLinkInLabel","WithErrors","Readonly","Disabled","Number","ContentOnly","ContentOnlyWithDefaultContent","FileInput","FileInputWithButtonContentAndSelectedFile","DateInput","DateInputWithValue","DateInputWithValueAndError","DateInputWithMinAndMaxDate","InputWithCustomWidth","InputWithCustomElementKey","InputWithCustomTheme"]},"./src/assets/svg/asterisk.svg?url":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__.p+"static/media/asterisk.093c0cd749ed483a3e42cf0a776557ef.svg"},"./src/functions/generators.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>generateRandomString});const generateRandomString=length=>{let result="";const characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<length;i++)result+=characters.charAt(Math.floor(62*Math.random()));return result}},"./src/functions/helpers.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{SD:()=>addFocusTrapInsideElement,vf:()=>cloneThroughFragments,w6:()=>classNameArrayToClassNameString});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const classNameArrayToClassNameString=classNameArray=>{var _classNameArray$filte;return(null==classNameArray||null===(_classNameArray$filte=classNameArray.filter((className=>className)))||void 0===_classNameArray$filte?void 0:_classNameArray$filte.join(" "))||""},cloneThroughFragments=children=>react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children,(c=>(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(c)?c.type===react__WEBPACK_IMPORTED_MODULE_0__.Fragment?cloneThroughFragments(c.props.children):(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(c,{...c.props}):c)),addFocusTrapInsideElement=element=>{(element=>{const autoFocusElement=document.createElement("button");element.prepend(autoFocusElement),autoFocusElement.focus(),autoFocusElement.remove()})(element);const focusableElements=(element=>Array.from(element.querySelectorAll('button, [href], input, [tabindex="0"]')).filter((resultElement=>resultElement)))(element),firstFocusableElement=null!=focusableElements&&focusableElements.length?focusableElements[0]:null,lastFocusableElement=(null==focusableElements?void 0:focusableElements.length)>1?focusableElements[focusableElements.length-1]:firstFocusableElement;firstFocusableElement&&(firstFocusableElement.onkeydown=event=>{9===event.keyCode&&event.shiftKey&&lastFocusableElement.focus()}),lastFocusableElement&&(lastFocusableElement.onclick=()=>{firstFocusableElement.focus()},lastFocusableElement.onkeydown=event=>{9!==event.keyCode||event.shiftKey||(event.preventDefault(),firstFocusableElement.focus())})};cloneThroughFragments.__docgenInfo={description:"",methods:[],displayName:"cloneThroughFragments"}},"./src/functions/theme.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{QV:()=>getThemeLogo,e3:()=>getThemeNavigationBarTextColor,fQ:()=>getThemeLogoPadding,hN:()=>getThemePaletteBackgroundColor,jw:()=>getThemePaletteBorderColor,k0:()=>getThemeAppName,kl:()=>getThemeNavigationBarBackgroundColor,nX:()=>getThemeLinkColor,nk:()=>getThemePaletteTextColor,o3:()=>getThemeTextColor});const getThemePaletteBackgroundColor=(theme,color)=>{var _theme$colors,_theme$colors$palette,_theme$colors$palette2;return(null==theme||null===(_theme$colors=theme.colors)||void 0===_theme$colors||null===(_theme$colors$palette=_theme$colors.palette)||void 0===_theme$colors$palette||null===(_theme$colors$palette2=_theme$colors$palette[color])||void 0===_theme$colors$palette2?void 0:_theme$colors$palette2.background)||null},getThemePaletteTextColor=(theme,color)=>{var _theme$colors2,_theme$colors2$palett,_theme$colors2$palett2;return(null==theme||null===(_theme$colors2=theme.colors)||void 0===_theme$colors2||null===(_theme$colors2$palett=_theme$colors2.palette)||void 0===_theme$colors2$palett||null===(_theme$colors2$palett2=_theme$colors2$palett[color])||void 0===_theme$colors2$palett2?void 0:_theme$colors2$palett2.text)||null},getThemePaletteBorderColor=(theme,color)=>{var _theme$colors3,_theme$colors3$palett,_theme$colors3$palett2;return(null==theme||null===(_theme$colors3=theme.colors)||void 0===_theme$colors3||null===(_theme$colors3$palett=_theme$colors3.palette)||void 0===_theme$colors3$palett||null===(_theme$colors3$palett2=_theme$colors3$palett[color])||void 0===_theme$colors3$palett2?void 0:_theme$colors3$palett2.border)||null},getThemeNavigationBarBackgroundColor=theme=>{var _theme$colors4,_theme$colors4$naviga;return(null==theme||null===(_theme$colors4=theme.colors)||void 0===_theme$colors4||null===(_theme$colors4$naviga=_theme$colors4.navigationBar)||void 0===_theme$colors4$naviga?void 0:_theme$colors4$naviga.background)||null},getThemeNavigationBarTextColor=theme=>{var _theme$colors5,_theme$colors5$naviga;return(null==theme||null===(_theme$colors5=theme.colors)||void 0===_theme$colors5||null===(_theme$colors5$naviga=_theme$colors5.navigationBar)||void 0===_theme$colors5$naviga?void 0:_theme$colors5$naviga.text)||null},getThemeLogo=theme=>(null==theme?void 0:theme.logo)||null,getThemeLogoPadding=theme=>(null==theme?void 0:theme.logoPadding)||null,getThemeAppName=theme=>(null==theme?void 0:theme.appName)||null,getThemeTextColor=theme=>{var _theme$colors6;return(null==theme||null===(_theme$colors6=theme.colors)||void 0===_theme$colors6?void 0:_theme$colors6.text)||null},getThemeLinkColor=theme=>{var _theme$colors7;return(null==theme||null===(_theme$colors7=theme.colors)||void 0===_theme$colors7?void 0:_theme$colors7.link)||null}},"./src/stories/Button.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>stories_Button});var react=__webpack_require__("./node_modules/react/index.js"),functions_theme=__webpack_require__("./src/functions/theme.js"),helpers=__webpack_require__("./src/functions/helpers.js");const Button_module={flex:"Button_flex__G9ecJ","main-content":"Button_main-content__DAgbp",button:"Button_button__pvEBV",hasTheme:"Button_hasTheme__4T5g8",regular:"Button_regular__T82fu",small:"Button_small__lBoXK",default:"Button_default__noqlM",noHover:"Button_noHover__NOwLR",primary:"Button_primary__KbKRC",disabled:"Button_disabled__X1VlU",hasErrors:"Button_hasErrors__CjrdX",rounded:"Button_rounded__RfloY",hasArrowLeft:"Button_hasArrowLeft__h40ly",pushprev:"Button_pushprev__pEKbm",hasArrowRight:"Button_hasArrowRight__9Fb8A",pushnext:"Button_pushnext__SdFUh"};var dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{var _props$href,_props$href2,_props$children;let buttonProps={...props,"aria-invalid":props.hasErrors||null,href:!props.disabled&&null!==(_props$href=props.href)&&void 0!==_props$href&&_props$href.length?props.href:null};delete buttonProps.noHover,delete buttonProps.hasErrors,delete buttonProps.rounded,delete buttonProps.inputType,delete buttonProps.color,delete buttonProps.content,delete buttonProps.arrow;const buttonColor="radio"===(null==props?void 0:props.inputType)?props.defaultChecked?"primary":"default":props.color,themeStyle=props.theme?(theme=props.theme,color=buttonColor,{backgroundColor:(0,functions_theme.hN)(theme,color),color:(0,functions_theme.nk)(theme,color),borderColor:(0,functions_theme.jw)(theme,color),borderWidth:(0,functions_theme.jw)(theme,color)?"1px":"0"}):null;var theme,color;const className=(0,helpers.w6)([Button_module.button,Button_module[buttonColor],Button_module[props.size],(arrow=>{switch(arrow){case"left":return Button_module.hasArrowLeft;case"right":return Button_module.hasArrowRight;default:return""}})(props.arrow),props.theme&&Button_module.hasTheme,props.noHover||"radio"===(null==props?void 0:props.inputType)?Button_module.noHover:null,props.rounded&&Button_module.rounded,props.hasErrors&&Button_module.hasErrors,props.disabled&&Button_module.disabled]);return"button"===props.inputType?(0,jsx_runtime.jsx)("input",{...buttonProps,className,style:themeStyle,type:"button",value:props.content}):"radio"===props.inputType?(0,jsx_runtime.jsxs)("label",{className,children:[(0,jsx_runtime.jsx)("input",{...buttonProps,style:themeStyle,type:"radio"}),props.content]}):null!==(_props$href2=props.href)&&void 0!==_props$href2&&_props$href2.length&&!props.disabled?(0,jsx_runtime.jsx)("a",{...buttonProps,className,style:themeStyle,children:props.content||props.children}):(null==props||null===(_props$children=props.children)||void 0===_props$children?void 0:_props$children.type)===dist.rU?(0,jsx_runtime.jsx)(react.Fragment,{children:(childElements=react.Children.toArray(props.children),(0,helpers.vf)(childElements).map(((childElement,index)=>{var _childElement$props,_childElement$props2,_childElement$props3;return!buttonProps.disabled&&null!=childElement&&null!==(_childElement$props=childElement.props)&&void 0!==_childElement$props&&_childElement$props.to?react.cloneElement(childElement,{className,style:themeStyle,key:"button-".concat(index),to:!buttonProps.disabled&&null!=childElement&&null!==(_childElement$props2=childElement.props)&&void 0!==_childElement$props2&&_childElement$props2.to?null==childElement||null===(_childElement$props3=childElement.props)||void 0===_childElement$props3?void 0:_childElement$props3.to:null}):(0,react.createElement)("button",{...buttonProps,key:"button-".concat(index),className,style:themeStyle},props.content||childElement.props.children)})))}):(0,jsx_runtime.jsx)("button",{...buttonProps,className,style:themeStyle,children:props.content||props.children});var childElements};Button.defaultProps={color:"default",size:"regular",disabled:!1,hasErrors:!1,noHover:!1,arrow:"none"};const stories_Button=Button;Button.__docgenInfo={description:"Primary UI component for user interaction",methods:[],displayName:"Button",props:{color:{defaultValue:{value:'"default"',computed:!1},description:"What color to use",type:{name:"enum",value:[{value:'"default"',computed:!1},{value:'"primary"',computed:!1}]},required:!1},size:{defaultValue:{value:'"regular"',computed:!1},description:"How large should the button be?",type:{name:"enum",value:[{value:'"small"',computed:!1},{value:'"regular"',computed:!1}]},required:!1},disabled:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},hasErrors:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},noHover:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},arrow:{defaultValue:{value:'"none"',computed:!1},description:"Which direction should the arrow point",type:{name:"enum",value:[{value:'"none"',computed:!1},{value:'"left"',computed:!1},{value:'"right"',computed:!1}]},required:!1},content:{description:"Text content inside button",type:{name:"string"},required:!1},theme:{description:"",type:{name:"object"},required:!1},inputType:{description:"Button is used as an input",type:{name:"enum",value:[{value:'"button"',computed:!1},{value:'"radio"',computed:!1}]},required:!1},name:{description:"Name if button is used as an radio input",type:{name:"string"},required:!1},defaultChecked:{description:"Checked if button is used as an radio input",type:{name:"bool"},required:!1},required:{description:"",type:{name:"bool"},required:!1},"aria-describedby":{description:"",type:{name:"string"},required:!1},rounded:{description:"",type:{name:"bool"},required:!1},href:{description:"",type:{name:"string"},required:!1},onClick:{description:"Optional click handler",type:{name:"func"},required:!1}}}},"./src/stories/ErrorMessage.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>stories_ErrorMessage});__webpack_require__("./node_modules/react/index.js");var functions_theme=__webpack_require__("./src/functions/theme.js");const ErrorMessage_module_errorMessage="ErrorMessage_errorMessage__Xc7GT";var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ErrorMessage=props=>{return(0,jsx_runtime.jsx)("span",{"aria-live":"polite",id:null!==(_props$id=props.id)&&void 0!==_props$id&&_props$id.length?props.id:null,className:ErrorMessage_module_errorMessage,style:(theme=props.theme,{color:(0,functions_theme.hN)(theme,"warning")}),children:props.content?props.content:""});var _props$id,theme};ErrorMessage.defaultProps={content:""};const stories_ErrorMessage=ErrorMessage;ErrorMessage.__docgenInfo={description:"",methods:[],displayName:"ErrorMessage",props:{content:{defaultValue:{value:'""',computed:!1},description:"Text content inside error message",type:{name:"union",value:[{name:"string"},{name:"arrayOf",value:{name:"union",value:[{name:"string"},{name:"object"}]}}]},required:!1},id:{description:"",type:{name:"string"},required:!1},theme:{description:"",type:{name:"object"},required:!1}}}},"./src/stories/Label.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>stories_Label});var react=__webpack_require__("./node_modules/react/index.js");const Label_module_label="Label_label__-hK3X",Label_module_inline="Label_inline__ptpwp",Label_module_normalCursor="Label_normalCursor__XJx16",Label=props=>{var _props$htmlTag;let labelProps={...props};const htmlTag=null!==(_props$htmlTag=props.htmlTag)&&void 0!==_props$htmlTag&&_props$htmlTag.length?props.htmlTag:"label";delete labelProps.inline,delete labelProps.normalCursor,delete labelProps.htmlTag;const className="".concat(Label_module_label," ").concat(props.inline?Label_module_inline:""," ").concat(props.normalCursor?Label_module_normalCursor:"");return react.createElement(htmlTag,{...labelProps,className,id:props.id||null},props.children)};Label.defaultProps={inline:!1,normalCursor:!1,htmlTag:"label"};const stories_Label=Label;Label.__docgenInfo={description:"",methods:[],displayName:"Label",props:{inline:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},normalCursor:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},htmlTag:{defaultValue:{value:'"label"',computed:!1},description:"",type:{name:"string"},required:!1}}}}}]);