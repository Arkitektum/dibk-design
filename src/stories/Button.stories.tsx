import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link as RouterLink } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons";
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

export const IconLeft: Story = {
  args: {
    color: "primary",
    content: "Icon left",
    iconLeft: <ArrowLeftIcon />,
  },
};

export const IconRight: Story = {
  args: {
    color: "secondary",
    content: "Icon right",
    iconRight: <ArrowRightIcon />,
  },
};
