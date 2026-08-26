import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
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

// Interaction test: selecting an item unmounts the focused element with the
// menu. Without moving focus back to the trigger it landed on <body>, so
// keyboard users lost their position in the page.
export const ReturnsFocusAfterSelecting: Story = {
  args: {
    content: "Handlinger",
    items: [
      { key: "first", content: "Første", onSelect: () => {} },
      { key: "second", content: "Andre", onSelect: () => {} },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Handlinger/ });

    await userEvent.click(trigger);

    // The menu is portaled to document.body, so it is outside the canvas.
    const menu = await waitFor(() => {
      const found = document.querySelector('[role="menu"]');
      if (!found) throw new Error("menu did not open");
      return found as HTMLElement;
    });

    await userEvent.click(within(menu).getByRole("menuitem", { name: "Andre" }));

    await waitFor(() => {
      expect(document.querySelector('[role="menu"]')).toBeNull();
    });
    expect(document.activeElement).toBe(trigger);
  },
};

// Escape already returned focus; this pins that behaviour alongside selection.
export const ReturnsFocusOnEscape: Story = {
  args: {
    content: "Handlinger",
    items: [{ key: "first", content: "Første", onSelect: () => {} }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Handlinger/ });

    await userEvent.click(trigger);
    await waitFor(() => {
      if (!document.querySelector('[role="menu"]')) throw new Error("menu did not open");
    });

    await userEvent.keyboard("{Escape}");

    expect(document.activeElement).toBe(trigger);
  },
};
