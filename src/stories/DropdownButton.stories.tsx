import type { Meta, StoryObj } from "@storybook/react-vite";
import DropdownButton from "../components/DropdownButton";

const meta: Meta<typeof DropdownButton> = {
  title: "Primitives/DropdownButton",
  component: DropdownButton,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "neutral"],
    },
    size: {
      control: "select",
      options: ["small", "regular"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownButton>;

export const Default: Story = {
  args: {
    content: "Importer data",
    color: "neutral",
    size: "small",
    items: [
      { key: "eieroppdateringer", content: "Eieroppdateringer", to: "/masseimport-eieroppdateringer" },
      { key: "lofteinnretninger", content: "Løfteinnretninger", to: "/masseimport-lofteinnretninger" },
      { key: "sikkerhetskontroller", content: "Sikkerhetskontroller", to: "/masseimport-sikkerhetskontroller" },
      { key: "statusoppdateringer", content: "Statusoppdateringer", to: "/masseimport-statusoppdatering" },
    ],
  },
};

export const WithActions: Story = {
  args: {
    content: "Handlinger",
    color: "primary",
    size: "regular",
    items: [
      { key: "export", content: "Eksporter", onSelect: () => {} },
      { key: "print", content: "Skriv ut", onSelect: () => {} },
    ],
  },
};

export const Disabled: Story = {
  args: {
    content: "Masseimport",
    color: "neutral",
    disabled: true,
    items: [{ key: "export", content: "Eksporter", onSelect: () => {} }],
  },
};
