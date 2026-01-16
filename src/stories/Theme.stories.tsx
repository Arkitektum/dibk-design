import type { Meta, StoryObj } from "@storybook/react-vite";
import Theme from "../components/Theme";
import customThemes from "../data/customTheme";

const meta: Meta<typeof Theme> = {
  title: "Primitives/Theme",
  component: Theme,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...customThemes.dibk,
  },
};
