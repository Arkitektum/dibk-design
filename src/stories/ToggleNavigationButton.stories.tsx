// stories/ToggleNavigationButton.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";
import ToggleNavigationButton from "../components/ToggleNavigationButton";

const meta: Meta<typeof ToggleNavigationButton> = {
  title: "Primitives/ToggleNavigationButton",
  component: ToggleNavigationButton,
  argTypes: {
    htmlTag: { control: "select", options: ["button", "a", "div"] },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showText: "Show",
    hideText: "Hide",
    isOpen: false,
    buttonProps: {
      onClick: () => console.log("Button clicked"),
    },
  },
};
