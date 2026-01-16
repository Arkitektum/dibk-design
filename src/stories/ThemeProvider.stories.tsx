import type { Meta, StoryObj } from "@storybook/react-vite";

import ThemeProvider, {
  type ThemeProviderProps,
} from "../components/ThemeProvider";

const meta: Meta<typeof ThemeProvider> = {
  title: "Primitives/ThemeProvider",
  component: ThemeProvider,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <>ThemeProvider content here</>,
  },
  render: (args: ThemeProviderProps) => <ThemeProvider {...args} />,
};
