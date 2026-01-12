// stories/RadioButtonInput.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import RadioButtonInput from '../components/RadioButtonInput';

const meta: Meta<typeof RadioButtonInput> = {
  title: 'Example/RadioButtonInput',
  component: RadioButtonInput,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: {
    id: 'radioButtonInput-1',
    children: 'Label for unchecked radio button',
    inputValue: 'value',
  },
};

export const Checked: Story = {
  args: {
    id: 'radioButtonInput-2',
    children: 'Label for radio button',
    checked: true,
    inputValue: 'value',
  },
};

export const CheckedDisabled: Story = {
  args: {
    id: 'radioButtonInput-3',
    children: 'Label for checked disabled radio button',
    checked: true,
    disabled: true,
    inputValue: 'value',
  },
};

export const HasErrors: Story = {
  args: {
    id: 'radioButtonInput-6',
    children: 'Label for radio button with errors',
    hasErrors: true,
    inputValue: 'value',
  },
};

export const HasErrorsDisabled: Story = {
  args: {
    id: 'radioButtonInput-7',
    children: 'Label for disabled radio button with errors',
    hasErrors: true,
    disabled: true,
    inputValue: 'value',
  },
};

export const HasErrorsChecked: Story = {
  args: {
    id: 'radioButtonInput-8',
    children: 'Label for checked radio button with errors',
    hasErrors: true,
    checked: true,
    inputValue: 'value',
  },
};

export const HasErrorsCheckedDisabled: Story = {
  args: {
    id: 'radioButtonInput-9',
    children: 'Label for checked disabled radio button with errors',
    hasErrors: true,
    checked: true,
    disabled: true,
    inputValue: 'value',
  },
};

export const Required: Story = {
  args: {
    id: 'radioButtonInput-10',
    required: true,
    children: 'Label for required radio button',
    inputValue: 'value',
  },
};
