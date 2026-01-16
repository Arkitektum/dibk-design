// stories/ProgressBar.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";

import ProgressBar from "../components/ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Primitives/ProgressBar",
  component: ProgressBar,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { progress: 25 },
};

export const WithError: Story = {
  args: { progress: 60, hasErrors: true },
};
