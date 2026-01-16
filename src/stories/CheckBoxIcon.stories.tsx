import type { Meta, StoryObj } from "@storybook/react-vite";
import CheckBoxIcon from "../components/CheckBoxIcon";

const meta: Meta<typeof CheckBoxIcon> = {
  title: "Primitives/CheckBoxIcon",
  component: CheckBoxIcon,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const CheckedCustomCheckmark: Story = {
  args: {
    checked: true,
    checkmarkCharacter: "✕",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const CheckedDisabledCustomCheckmark: Story = {
  args: {
    checked: true,
    disabled: true,
    checkmarkCharacter: "✕",
  },
};

export const HasErrors: Story = {
  args: {
    hasErrors: true,
  },
};

export const HasErrorsDisabled: Story = {
  args: {
    hasErrors: true,
    disabled: true,
  },
};

export const HasErrorsChecked: Story = {
  args: {
    hasErrors: true,
    checked: true,
  },
};

export const HasErrorsCheckedDisabled: Story = {
  args: {
    hasErrors: true,
    checked: true,
    disabled: true,
  },
};
