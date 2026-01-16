import type { Meta, StoryObj } from "@storybook/react-vite";

import RadioButtonIcon from "../components/RadioButtonIcon";

const meta: Meta<typeof RadioButtonIcon> = {
  title: "Primitives/RadioButtonIcon",
  component: RadioButtonIcon,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const Checked: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const CheckedDisabled: Story = {
  args: { checked: true, disabled: true },
};
export const HasErrors: Story = { args: { hasErrors: true } };
export const HasErrorsDisabled: Story = {
  args: { hasErrors: true, disabled: true },
};
export const HasErrorsChecked: Story = {
  args: { hasErrors: true, checked: true },
};
export const HasErrorsCheckedDisabled: Story = {
  args: { hasErrors: true, checked: true, disabled: true },
};
