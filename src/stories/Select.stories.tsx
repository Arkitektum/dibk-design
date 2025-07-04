import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Select, { type SelectProps } from '../components/Select';
import ThemeProvider from '../components/ThemeProvider';
import type { ThemeProps } from '../components/Theme';

type ExtendedArgs = SelectProps & { theme?: ThemeProps };

const meta: Meta<typeof Select> = {
  title: 'Example/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const { theme, ...rest } = context.args as ExtendedArgs;
      const [value, setValue] = useState(rest.value || rest.defaultValue);
      return (
        <ThemeProvider theme={theme}>
          <Story args={{ ...rest, value, onChange: (val) => setValue(val) }} />
        </ThemeProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const options = ['option 1', 'option 2', { key: 'option 3', value: 'value 3' }];

export const Default: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),
    id: 'select1',
    options,
  },
};
export const WithLabel: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),
    id: 'select2',
    label: 'Select with label',
    options,
  },
};
export const WithSelectedValue: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),

    id: 'select3',
    label: 'Select with label and selected value',
    value: 'value 3',
    options,
  },
};
export const WithDefaultValue: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),

    id: 'select4',
    label: 'Select with label and default value',
    defaultValue: 'value 3',
    options,
  },
};
export const WithError: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),

    id: 'select5',
    label: 'Select with error',
    value: 'value 3',
    hasErrors: true,
    errorMessage: 'Wrong value selected',
    options,
  },
};
export const WithLinkInLabel: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),

    id: 'select6',
    label: [
      'Select with ',
      <a key="link" href="#select6">
        link
      </a>,
      ' in label',
    ],
    value: 'value 3',
    options,
  },
};
export const Disabled: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),

    id: 'select7',
    disabled: true,
    label: 'Disabled select',
    value: 'value 3',
    options,
  },
};
export const Required: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),
    id: 'select8',
    required: true,
    label: 'Required select',
    options,
  },
};
export const WithPlaceholder: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),

    id: 'select9',
    label: 'With placeholder',
    placeholder: 'Select from list',
    placeholderValue: 'notSelected',
    value: 'notSelected',
    options,
  },
};
export const WithContentOnly: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),
    id: 'select10',
    label: 'Content only',
    value: 'value 3',
    contentOnly: true,
    options,
  },
};
export const WithContentOnlyAndKeyAsContent: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),
    id: 'select11',
    label: 'Key as content',
    value: 'value 3',
    contentOnly: true,
    keyAsContent: true,
    options,
  },
};
export const WithContentOnlyAndDefaultContent: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),
    id: 'select12',
    label: 'Default content fallback',
    contentOnly: true,
    defaultContent: 'No value selected',
    options,
  },
};
export const WithCustomWidth: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),
    id: 'select13',
    label: 'Custom width',
    width: '250px',
    options,
  },
};
export const Multiple: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),
    id: 'select15',
    label: 'Multiple select',
    multiple: true,
    options,
  },
};
export const MultipleWithSelectedValue: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),
    id: 'select16',
    label: 'Multiple selected',
    multiple: true,
    value: ['option 1', 'value 3'],
    options,
  },
};
export const MultipleWithDefaultValue: Story = {
  args: {
    onChange: (e) => console.log(e.target.value),
    id: 'select17',
    label: 'Multiple default',
    multiple: true,
    defaultValue: ['option 1', 'value 3'],
    options,
  },
};
