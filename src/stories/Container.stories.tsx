import type { Meta, StoryObj } from "@storybook/react-vite";

import Container from "../components/Container";

const meta: Meta<typeof Container> = {
  title: "Primitives/Container",
  component: Container,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => (
  <Container {...args}>Container with max width</Container>
);

export const Default: Story = {
  args: {},
  render,
};

export const WithMaxWidth: Story = {
  args: {
    maxWidth: "230px",
  },
  render,
};
