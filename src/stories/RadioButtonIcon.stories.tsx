import type { Meta, StoryObj } from "@storybook/react-vite";

import RadioButtonIcon from "../components/RadioButtonIcon";

const meta: Meta<typeof RadioButtonIcon> = {
    title: "Primitives/RadioButtonIcon",
    component: RadioButtonIcon,
    argTypes: {
        size: { control: "text" },
        checked: { control: "boolean" },
        disabled: { control: "boolean" },
        hasErrors: { control: "boolean" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const Checked: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const CheckedDisabled: Story = {
    args: { checked: true, disabled: true }
};
export const HasErrors: Story = { args: { hasErrors: true } };
export const HasErrorsDisabled: Story = {
    args: { hasErrors: true, disabled: true }
};
export const HasErrorsChecked: Story = {
    args: { hasErrors: true, checked: true }
};
export const HasErrorsCheckedDisabled: Story = {
    args: { hasErrors: true, checked: true, disabled: true }
};

// `size` takes any CSS length and drives width, height and font size together.
export const CustomSize: Story = { args: { checked: true, size: "40px" } };

export const Sizes: Story = {
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <RadioButtonIcon checked size="16px" />
            <RadioButtonIcon checked size="20px" />
            <RadioButtonIcon checked size="28px" />
            <RadioButtonIcon checked size="40px" />
        </div>
    )
};
