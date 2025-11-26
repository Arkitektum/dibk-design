import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link as RouterLink } from "react-router-dom";

import Button from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "primary",
    content: "Button",
    size: "regular",
    arrow: "none",
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    content: "Button",
  },
};

export const Ghost: Story = {
  args: {
    color: "ghost",
    content: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    content: "Button",
  },
};

export const Rounded: Story = {
  args: {
    rounded: true,
    content: "Button",
  },
};

export const ButtonWithHTMLContent: Story = {
  args: {
    children: (
      <span>
        Button with <b>HTML</b> content
      </span>
    ),
  },
};

export const ButtonWithLink: Story = {
  args: {
    content: "Button with link",
    href: "test",
  },
};

export const ButtonWithReactLink: Story = {
  args: {
    children: <RouterLink to="/test">Button with React Link</RouterLink>,
  },
};

export const DisabledButtonWithReactLink: Story = {
  args: {
    disabled: true,
    children: (
      <RouterLink to="/test">Disabled button with React Link</RouterLink>
    ),
  },
};

export const InputButton: Story = {
  args: {
    content: "InputButton",
    inputType: "button",
  },
};

export const RadioButton: Story = {
  args: {
    content: "RadioButton",
    inputType: "radio",
    name: "radio-button",
    defaultChecked: false,
  },
};
