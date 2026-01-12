import type { Meta, StoryObj } from '@storybook/react-vite';

import CheckBoxListItem from '../components/CheckBoxListItem';

const meta: Meta<typeof CheckBoxListItem> = {
  title: 'Example/CheckBoxListItem',
  component: CheckBoxListItem,
  argTypes: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Reusable render function
const render: Story['render'] = (args) => <CheckBoxListItem {...args} />;

export const Unchecked: Story = {
  args: {
    id: 'checkBoxListItem-1',
    name: 'checkboxListItem',
    children: 'Label for unchecked checkbox',
  },
  render,
};

export const Checked: Story = {
  args: {
    id: 'checkBoxListItem-2',
    name: 'checkboxListItem',
    checked: true,
    children: 'Label for checked checkbox',
  },
  render,
};

export const CheckedDisabled: Story = {
  args: {
    id: 'checkBoxListItem-3',
    checked: true,
    disabled: true,
    children: 'Label for checked disabled checkbox',
  },
  render,
};

export const CheckedCustomCheckmark: Story = {
  args: {
    id: 'checkBoxListItem-6',
    checked: true,
    disabled: true,
    checkmarkCharacter: '✕',
    children: 'Label for checked checkbox with custom checkmark',
  },
  render,
};

export const HasErrors: Story = {
  args: {
    id: 'checkBoxListItem-7',
    hasErrors: true,
    children: 'Label for checkbox with errors',
  },
  render,
};

export const HasErrorsDisabled: Story = {
  args: {
    id: 'checkBoxListItem-8',
    hasErrors: true,
    disabled: true,
    children: 'Label for disabled checkbox with errors',
  },
  render,
};

export const HasErrorsChecked: Story = {
  args: {
    id: 'checkBoxListItem-9',
    hasErrors: true,
    checked: true,
    children: 'Label for checked checkbox with errors',
  },
  render,
};

export const HasErrorsCheckedDisabled: Story = {
  args: {
    id: 'checkBoxListItem-10',
    hasErrors: true,
    checked: true,
    disabled: true,
    children: 'Label for checked disabled checkbox with errors',
  },
  render,
};

export const Required: Story = {
  args: {
    id: 'checkBoxListItem-12',
    required: true,
    children: 'Label for required checkbox',
  },
  render,
};

export const Compact: Story = {
  args: {
    id: 'checkBoxListItem-13',
    compact: true,
    children: 'Label for compact checkbox',
  },
  render,
};
