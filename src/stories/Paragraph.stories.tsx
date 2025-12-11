import type { Meta, StoryObj } from "@storybook/react-vite";
import Paragraph from "../components/Paragraph";

const meta: Meta<typeof Paragraph> = {
  title: "Example/Paragraph",
  component: Paragraph,
  argTypes: {
    variant: {
      control: "select",
      options: ["lead", "large", "small"],
    },
    htmlTag: {
      control: "select",
      options: ["p", "div", "span", "blockquote"],
    },
  },
  args: {
    htmlTag: "p",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;
const render: Story["render"] = (args) => <Paragraph {...args} />;

export const Lead: Story = {
  args: {
    variant: "lead",
    children: "Lead text",
  },
  render,
};

export const BodyLarge: Story = {
  args: {
    variant: "large",
    children: "Body Large",
  },
  render,
};

export const BodySmall: Story = {
  args: {
    variant: "small",
    children: "Body Small",
  },
  render,
};
