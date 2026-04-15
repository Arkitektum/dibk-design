import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from "../components/Badge";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "warning", "error", "secondary", "neutral"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Normal drift",
    variant: "neutral",
  },
};

export const Success: Story = {
  args: { children: "Normal drift", variant: "success" },
};

export const Warning: Story = {
  args: { children: "Ute av drift", variant: "warning" },
};

export const Error: Story = {
  args: { children: "Stengt", variant: "error" },
};

export const Secondary: Story = {
  args: { children: "Revet", variant: "secondary" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge variant="success">Normal drift</Badge>
      <Badge variant="warning">Ute av drift</Badge>
      <Badge variant="error">Stengt</Badge>
      <Badge variant="secondary">Revet</Badge>
      <Badge variant="neutral">Ukjent</Badge>
    </div>
  ),
};
