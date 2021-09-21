Select example:

```js
<Select id="select1" onChange={()=>{console.log('onchange')}} options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} />
<Select id="select2" onChange={()=>{console.log('onchange')}} label="Select with label" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} />
<Select id="select3" onChange={()=>{console.log('onchange')}} label="Select with label and selected value" value="value 3" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} />
<Select id="select4" onChange={()=>{console.log('onchange')}} label="Select with label and defaultValue" defaultValue="value 3" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} />
<Select id="select5" onChange={()=>{console.log('onchange')}} label="Select with label, selected value, errors and error message" value="value 3" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} hasErrors={true} errorMessage="Wrong value selected" />
<Select id="select6" onChange={()=>{console.log('onchange')}} label={['Select with ', <a key="labelLink" href="#">link</a>, ' in label']} value="value 3" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} />
<Select id="select7" onChange={()=>{console.log('onchange')}} label="Select with label and placeholder" placeholder="Select from list" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} />
<Select id="select8" onChange={()=>{console.log('onchange')}} label="Select with label, placeholder and placeholderValue" placeholder="Select from list" placeholderValue="notSelected" value="notSelected" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} />
<Select id="select9" onChange={()=>{console.log('onchange')}} label="Select with label, selected value and contentOnly set to true" value="value 3" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} contentOnly={true} />
<Select id="select10" onChange={()=>{console.log('onchange')}} label="Select with label, selected value, contentOnly set to true and keyAsContent set to true" value="value 3" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} contentOnly={true} keyAsContent={true} />
<Select id="select11" onChange={()=>{console.log('onchange')}} label="Select with label, selected value is string, contentOnly set to true and keyAsContent set to true" value="option 2" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} contentOnly={true} keyAsContent={true} />
<Select id="select12" onChange={()=>{console.log('onchange')}} label="Select with label, contentOnly set to true, no value and defaultContent" contentOnly={true} defaultContent="No value selected" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} />
```

Themed select example:

```js
import customTheme from 'data/customTheme';
<React.Fragment>
    <Select id="themedSelect3" onChange={()=>{console.log('onchange')}} label="Select with label and selected value" value="value 3" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} theme={customTheme} />
    <Select id="themedSelect4" onChange={()=>{console.log('onchange')}} label="Select with label, selected value, errors and error message" value="value 3" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} hasErrors={true} errorMessage="Wrong value selected" theme={customTheme} />
    <Select id="themedSelect5" onChange={()=>{console.log('onchange')}} label={['Select with ', <a key="labelLink" href="#">link</a>, ' in label']} value="value 3" options={['option 1', 'option 2', {key: 'option 3', value: 'value 3'}]} theme={customTheme} />
</React.Fragment>
```
