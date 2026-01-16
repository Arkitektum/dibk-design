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

const render: Story["render"] = (args) => <ContentBox {...args} />;

export const DefaultWithoutTitle: Story = {
  args: {
    color: "default",
    children: <>Box with default color</>,
    titleSize: "regular",
  },
  render,
};

export const Default: Story = {
  args: {
    color: "default",
    title: "Box title",
    children: <>Box with default color</>,
  },
  render,
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    title: "Box title",
    children: <>Box with secondary color</>,
  },
  render,
};
