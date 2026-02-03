import type { Meta, StoryObj } from "@storybook/react-vite";
import ContentBox from "../components/ContentBox";

const meta: Meta<typeof ContentBox> = {
  title: "Primitives/ContentBox",
  component: ContentBox,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => (
  <ContentBox {...args}>
    <p>Box with content</p>
  </ContentBox>
);

export const DefaultWithoutTitle: Story = {
  args: {
    variant: "secondary",
  },
  render,
};

export const Default: Story = {
  args: {
    variant: "secondary",
    title: "Box title",
  },
  render,
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Box title",
  },
  render,
};

export const ErrorBox: Story = {
  args: {
    variant: "error",
    title: "Box title",
  },
  render,
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Box title",
  },
  render,
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Box title",
  },
  render,
};
