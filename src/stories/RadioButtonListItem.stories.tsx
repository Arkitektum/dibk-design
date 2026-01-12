import type { Meta, StoryObj } from '@storybook/react-vite';
import RadioButtonListItem from '../components/RadioButtonListItem';

const meta: Meta<typeof RadioButtonListItem> = {
  title: 'Example/RadioButtonListItem',
  component: RadioButtonListItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: {
    id: 'radioButtonListItem-1',
    name: 'radioButtonListItem',
    children: 'Label for unchecked radio button',
    inputValue: 'value',
  },
};

export const Checked: Story = {
  args: {
    id: 'radioButtonListItem-2',
    checked: true,
    name: 'radioButtonListItem',
    children: 'Label for checked radio button',
    inputValue: 'value',
  },
};

export const CheckedDisabled: Story = {
  args: {
    id: 'radioButtonListItem-3',
    checked: true,
    disabled: true,
    name: 'radioButtonListItem',
    children: 'Label for checked disabled radio button',
    inputValue: 'value',
  },
};

export const HasErrors: Story = {
  args: {
    id: 'radioButtonListItem-7',
    hasErrors: true,
    name: 'radioButtonListItem',
    children: 'Label for radio button with errors',
    inputValue: 'value',
  },
};

export const HasErrorsDisabled: Story = {
  args: {
    id: 'radioButtonListItem-8',
    hasErrors: true,
    disabled: true,
    name: 'radioButtonListItem',
    children: 'Label for disabled radio button with errors',
    inputValue: 'value',
  },
};

export const HasErrorsChecked: Story = {
  args: {
    id: 'radioButtonListItem-9',
    hasErrors: true,
    checked: true,
    name: 'radioButtonListItem',
    children: 'Label for checked radio button with errors',
    inputValue: 'value',
  },
};

export const HasErrorsCheckedDisabled: Story = {
  args: {
    id: 'radioButtonListItem-10',
    hasErrors: true,
    checked: true,
    disabled: true,
    name: 'radioButtonListItem',
    children: 'Label for checked disabled radio button with errors',
    inputValue: 'value',
  },
};

export const Required: Story = {
  args: {
    id: 'radioButtonListItem-11',
    required: true,
    name: 'radioButtonListItem',
    children: 'Label for required radio button',
    inputValue: 'value',
  },
};

export const Compact: Story = {
  args: {
    id: 'radioButtonListItem-12',
    compact: true,
    name: 'radioButtonListItem',
    children: 'Label for compact radio button',
    inputValue: 'value',
  },
};
