import type { Meta, StoryObj } from "@storybook/react-vite";

import Accordion from "../components/Accordion";
import Paragraph from "../components/Paragraph";

const meta: Meta<typeof Accordion> = {
  title: "Primitives/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;
const render: Story["render"] = (args) => (
  <Accordion {...args}>
    <Paragraph>Accordion content</Paragraph>
  </Accordion>
);
export const Default: Story = {
  args: {
    color: "default",
    title: "Accordion title",
    noMargin: false,
  },
  render,
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    title: "Accordion title",
    noMargin: false,
  },
  render,
};
export const Info: Story = {
  args: {
    color: "info",
    title: "Accordion title",
    noMargin: false,
  },
  render,
};
export const Contrast: Story = {
  args: {
    color: "contrast",
    title: "Accordion title",
    noMargin: false,
  },
  render,
};
