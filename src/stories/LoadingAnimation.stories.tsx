// stories/LoadingAnimation.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";

import LoadingAnimation from "../components/LoadingAnimation";

const meta: Meta<typeof LoadingAnimation> = {
  title: "Primitives/LoadingAnimation",
  component: LoadingAnimation,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
