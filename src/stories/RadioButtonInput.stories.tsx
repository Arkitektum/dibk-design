// stories/RadioButtonInput.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";
import RadioButtonInput from "../components/RadioButtonInput";

const meta: Meta<typeof RadioButtonInput> = {
    title: "Primitives/RadioButtonInput",
    component: RadioButtonInput,
    argTypes: {
        requirementIndicatorMode: {
            control: "radio",
            options: ["required", "optional", "none"]
        }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
    args: {
        id: "radioButtonInput-1",
        children: "Label for unchecked radio button",
        value: "value"
    }
};

export const Checked: Story = {
    args: {
        id: "radioButtonInput-2",
        children: "Label for radio button",
        checked: true,
        value: "value"
    }
};

export const HiddenLabel: Story = {
    args: {
        id: "radioButtonInput-12",
        children: "Label only available to screen readers",
        hideLabel: true,
        value: "value"
    }
};

export const CheckedDisabled: Story = {
    args: {
        id: "radioButtonInput-3",
        children: "Label for checked disabled radio button",
        checked: true,
        disabled: true,
        value: "value"
    }
};

export const HasErrors: Story = {
    args: {
        id: "radioButtonInput-6",
        children: "Label for radio button with errors",
        hasErrors: true,
        value: "value"
    }
};

export const HasErrorsDisabled: Story = {
    args: {
        id: "radioButtonInput-7",
        children: "Label for disabled radio button with errors",
        hasErrors: true,
        disabled: true,
        value: "value"
    }
};

export const HasErrorsChecked: Story = {
    args: {
        id: "radioButtonInput-8",
        children: "Label for checked radio button with errors",
        hasErrors: true,
        checked: true,
        value: "value"
    }
};

export const HasErrorsCheckedDisabled: Story = {
    args: {
        id: "radioButtonInput-9",
        children: "Label for checked disabled radio button with errors",
        hasErrors: true,
        checked: true,
        disabled: true,
        value: "value"
    }
};

export const Required: Story = {
    args: {
        id: "radioButtonInput-10",
        required: true,
        children: "Label for required radio button",
        value: "value"
    }
};

// In `optional` mode the indicator moves to the fields that may be left alone.
export const OptionalIndicator: Story = {
    args: {
        id: "radioButtonInput-13",
        children: "Label for optional radio button",
        value: "value",
        requirementIndicatorMode: "optional"
    }
};

// Read-only view: just the label, with nothing focusable and no form control in
// the DOM. No dot is drawn — a radio group has one answer, so a read-only view
// renders only the selected option and an indicator beside it would be noise.
export const ContentOnly: Story = {
    args: {
        id: "radioButtonInput-14",
        children: "Label for the selected option",
        value: "value",
        contentOnly: true,
        checked: true
    }
};
