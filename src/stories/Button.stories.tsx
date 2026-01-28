import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link as RouterLink } from "react-router-dom";

import Button from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
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

export const Neutral: Story = {
  args: {
    color: "neutral",
    content: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
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

const caretIconLeft = (
  <span
    aria-hidden="true"
    style={{
      display: "inline-block",
      width: 0,
      height: 0,
      borderTop: "6px solid transparent",
      borderBottom: "6px solid transparent",
      borderRight: "8px solid currentColor",
    }}
  />
);

const caretIconRight = (
  <span
    aria-hidden="true"
    style={{
      display: "inline-block",
      width: 0,
      height: 0,
      borderTop: "6px solid transparent",
      borderBottom: "6px solid transparent",
      borderLeft: "8px solid currentColor",
    }}
  />
);

export const IconLeft: Story = {
  args: {
    color: "primary",
    content: "Icon left",
    iconLeft: caretIconLeft,
  },
};

export const IconRight: Story = {
  args: {
    color: "secondary",
    content: "Icon right",
    iconRight: caretIconRight,
  },
};
