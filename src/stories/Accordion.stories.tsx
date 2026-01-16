import type { Meta, StoryObj } from "@storybook/react-vite";

import Accordion from "../components/Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Primitives/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "default",
    title: "Accordion title",
    noMargin: false,
    children: <>Accordion with default color</>,
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    title: "Accordion title",
    noMargin: false,
    children: <>Accordion with secondary color</>,
  },
};
export const Info: Story = {
  args: {
    color: "info",
    title: "Accordion title",
    noMargin: false,
    children: <>Accordion with info color</>,
  },
};
export const Contrast: Story = {
  args: {
    color: "contrast",
    title: "Accordion title",
    noMargin: false,
    children: <>Accordion with contrast color</>,
  },
};
