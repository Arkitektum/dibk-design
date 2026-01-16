// stories/Footer.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";
import Footer from "../components/Footer";

const meta: Meta<typeof Footer> = {
  title: "Primitives/Footer",
  component: Footer,
  argTypes: {},
  tags: ["autodocs"],
};

const render: Story["render"] = (args) => <Footer {...args} />;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <span>Footer content here</span>,
  },
  render,
};
