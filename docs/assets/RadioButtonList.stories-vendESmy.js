import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as R}from"./ThemeProvider-BUCGweqt.js";import{R as f}from"./RadioButtonList-Bw4wy8Qa.js";import{R as a}from"./RadioButtonListItem-Cc9w3tVD.js";import"./iframe-CY8VSDql.js";import"./asterisk-1FdKgIIn.js";import"./Header-BoeWRQn3.js";import"./RadioButtonInput-Bq4wuD9z.js";import"./RadioButtonIcon-BP-isIuO.js";const S={title:"Example/RadioButtonList",component:f,tags:["autodocs"],decorators:[(g,h)=>{const{theme:b,...x}=h.args;return e.jsx(R,{theme:b,children:e.jsx(g,{args:x,children:C})})}]},C=e.jsxs(e.Fragment,{children:[e.jsx(a,{onChange:()=>console.log("onchange"),inputValue:"value 1",name:"radio-button-list-list-item",id:"radioButtonList-listItem-1",checked:!0,children:"Checked radio button"}),e.jsx(a,{onChange:()=>console.log("onchange"),inputValue:"value 2",name:"radio-button-list-list-item",id:"radioButtonList-listItem-2",children:"Unchecked radio button"})]}),t={args:{legend:"Default radio button list"}},r={args:{legend:"Required radio button list",required:!0}},o={args:{legend:"Compact radio button list",compact:!0}};var s,n,i;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    legend: 'Default radio button list'
  }
}`,...(i=(n=t.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var d,c,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    legend: 'Required radio button list',
    required: true
  }
}`,...(u=(c=r.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var m,l,p;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    legend: 'Compact radio button list',
    compact: true
  }
}`,...(p=(l=o.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const T=["Default","Required","Compact"];export{o as Compact,t as Default,r as Required,T as __namedExportsOrder,S as default};
