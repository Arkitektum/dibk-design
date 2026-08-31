import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link as RouterLink } from "react-router";
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons";
import Button from "../components/Button";

const meta: Meta<typeof Button> = {
    title: "Primitives/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        color: { control: "radio", options: ["primary", "secondary", "neutral"] },
        size: { control: "radio", options: ["small", "regular"] },
        arrow: { control: "radio", options: ["none", "left", "right"] },
        inputType: { control: "radio", options: ["button", "radio"] }
    }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        color: "primary",
        content: "Button",
        size: "regular",
        arrow: "none"
    }
};

export const Secondary: Story = {
    args: {
        color: "secondary",
        content: "Button"
    }
};

export const Neutral: Story = {
    args: {
        color: "neutral",
        content: "Button"
    }
};

export const Small: Story = {
    args: {
        size: "small",
        content: "Button"
    }
};

export const ButtonWithHTMLContent: Story = {
    args: {
        children: (
            <span>
                Button with <b>HTML</b> content
            </span>
        )
    }
};

export const ButtonWithLink: Story = {
    args: {
        content: "Button with link",
        href: "test"
    }
};

export const ButtonWithReactLink: Story = {
    args: {
        children: <RouterLink to="/test">Button with React Link</RouterLink>
    }
};

export const DisabledButtonWithReactLink: Story = {
    args: {
        disabled: true,
        children: <RouterLink to="/test">Disabled button with React Link</RouterLink>
    }
};

export const InputButton: Story = {
    args: {
        content: "InputButton",
        inputType: "button"
    }
};

export const IconLeft: Story = {
    args: {
        color: "primary",
        content: "Icon left",
        iconLeft: <ArrowLeftIcon />
    }
};

export const IconRight: Story = {
    args: {
        color: "secondary",
        content: "Icon right",
        iconRight: <ArrowRightIcon />
    }
};

// `arrow` draws a chevron from the stylesheet — distinct from `iconLeft` /
// `iconRight`, which take any node.
export const ArrowLeft: Story = {
    args: {
        color: "primary",
        content: "Forrige",
        arrow: "left"
    }
};

export const ArrowRight: Story = {
    args: {
        color: "primary",
        content: "Neste",
        arrow: "right"
    }
};

export const Disabled: Story = {
    args: {
        content: "Disabled button",
        disabled: true
    }
};

export const HasErrors: Story = {
    args: {
        content: "Button with errors",
        hasErrors: true
    }
};

// `uniformPadding` gives equal padding on all four sides, for an icon-only
// button — which then needs an accessible name of its own.
export const IconOnly: Story = {
    args: {
        color: "neutral",
        uniformPadding: true,
        "aria-label": "Neste side",
        children: <ArrowRightIcon aria-hidden="true" />
    }
};

export const NoMargin: Story = {
    args: {
        content: "Button without margin",
        noMargin: true
    }
};

// `inputType="radio"` renders a label-wrapped radio input styled as a button,
// so a group of them reads as one choice.
export const RadioButtons: Story = {
    render: () => (
        <>
            <Button inputType="radio" name="button-story-radio" content="Ja" defaultChecked />
            <Button inputType="radio" name="button-story-radio" content="Nei" />
        </>
    )
};

// Without `type` a rendered <button> submits the form around it.
export const SubmitButton: Story = {
    args: {
        content: "Send inn",
        type: "submit"
    }
};
