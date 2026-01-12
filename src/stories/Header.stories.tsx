import type { Meta, StoryObj } from "@storybook/react-vite";
import Header from "../components/Header";

const meta: Meta<typeof Header> = {
  title: "Example/Header",
  component: Header,
  argTypes: {
    size: { control: "select", options: [1, 2, 3, 4, 5] },
    htmlTag: { control: "select", options: ["h1", "h2", "h3", "h4", "h5"] },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => <Header {...args} />;

export const Header1: Story = {
  args: {
    children: <>Title with size 1</>,
  },
  render,
};

export const Header2: Story = {
  args: {
    children: <>Title with size 2</>,
    size: 2,
  },
  render,
};

export const Header3: Story = {
  args: {
    children: <>Title with size 3</>,
    size: 3,
  },
  render,
};

export const Header4: Story = {
  args: {
    children: <>Title with size 4</>,
    size: 4,
  },
  render,
};

export const Header5: Story = {
  args: {
    children: <>Title with size 5</>,
    size: 5,
  },
  render,
};

export const Header2WithH1Tag: Story = {
  args: {
    children: <>Title with size 2 and htmlTag h1</>,
    size: 2,
    htmlTag: "h1",
  },
  render,
};
