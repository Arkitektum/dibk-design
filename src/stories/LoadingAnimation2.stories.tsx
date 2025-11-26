// stories/LoadingAnimation2.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";

import LoadingAnimation2 from "../components/LoadingAnimation2";

const meta: Meta<typeof LoadingAnimation2> = {
  title: "Example/LoadingAnimation2",
  component: LoadingAnimation2,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
