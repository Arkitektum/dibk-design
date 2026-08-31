import type { Meta, StoryObj } from "@storybook/react-vite";
import CheckBoxIcon from "../components/CheckBoxIcon";
import { checkmarkSymbolIcon } from "../icons";

const meta: Meta<typeof CheckBoxIcon> = {
    title: "Primitives/CheckBoxIcon",
    component: CheckBoxIcon,
    argTypes: {
        size: { control: "text" },
        checked: { control: "boolean" },
        indeterminate: { control: "boolean" },
        disabled: { control: "boolean" },
        showBox: { control: "boolean" },
        hasErrors: { control: "boolean" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
    args: {}
};

export const Checked: Story = {
    args: {
        checked: true
    }
};

export const Indeterminate: Story = {
    args: {
        indeterminate: true
    }
};

export const CheckedCustomCheckmark: Story = {
    args: {
        checked: true,
        checkmarkCharacter: "✕"
    }
};

export const Disabled: Story = {
    args: {
        disabled: true
    }
};

export const CheckedDisabled: Story = {
    args: {
        checked: true,
        disabled: true
    }
};

export const CheckedDisabledCustomCheckmark: Story = {
    args: {
        checked: true,
        disabled: true,
        checkmarkCharacter: "✕"
    }
};

export const HasErrors: Story = {
    args: {
        hasErrors: true
    }
};

export const HasErrorsDisabled: Story = {
    args: {
        hasErrors: true,
        disabled: true
    }
};

export const HasErrorsChecked: Story = {
    args: {
        hasErrors: true,
        checked: true
    }
};

export const HasErrorsCheckedDisabled: Story = {
    args: {
        hasErrors: true,
        checked: true,
        disabled: true
    }
};

// `showBox={false}` drops the box and keeps only the checkmark — how a
// read-only (`contentOnly`) checkbox list marks its ticked options.
export const WithoutBox: Story = {
    args: {
        checked: true,
        showBox: false
    }
};

// `checkmarkIconSrc` replaces the character with an image, and wins over
// `checkmarkCharacter` when both are given.
export const CheckedWithCheckmarkIcon: Story = {
    args: {
        checked: true,
        checkmarkIconSrc: checkmarkSymbolIcon
    }
};

// `size` takes any CSS length and drives width, height and font size together.
export const CustomSize: Story = {
    args: {
        checked: true,
        size: "40px"
    }
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckBoxIcon checked size="16px" />
            <CheckBoxIcon checked size="20px" />
            <CheckBoxIcon checked size="28px" />
            <CheckBoxIcon checked size="40px" />
        </div>
    )
};
