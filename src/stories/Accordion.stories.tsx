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
    title: "Accordion title",
    noMargin: false,
    color: "primary",
  },
  render,
};

export const Primary: Story = {
  args: {
    color: "primary",
    title: "Accordion title",
    noMargin: false,
  },
  render,
};

export const Neutral: Story = {
  args: {
    color: "neutral",
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
