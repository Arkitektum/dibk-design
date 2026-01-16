// stories/Paper.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";

import Paper from "../components/Paper";

const meta: Meta<typeof Paper> = {
  title: "Primitives/Paper",
  component: Paper,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithContent: Story = {
  args: {
    children: <>Paper with content</>,
  },
};

export const WithNoPadding: Story = {
  args: {
    children: <>Paper with no padding</>,
    noPadding: true,
  },
};

export const WithNoMargin: Story = {
  args: {
    children: <>Paper with no margin</>,
    noMargin: true,
  },
};

export const WithNoMarginOrPadding: Story = {
  args: {
    children: <>Paper with no margin or padding</>,
    noPadding: true,
    noMargin: true,
  },
};
