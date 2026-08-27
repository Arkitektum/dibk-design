import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import Textarea from "../components/Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Primitives/Textarea",
  component: Textarea,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onChange: () => {}, id: "textarea1" },
};
export const WithValue: Story = {
  args: {
    onChange: () => {},
    id: "textarea2",
    value: "Textarea with value",
  },
};
export const WithDefaultValue: Story = {
  args: {
    onChange: () => {},
    id: "textarea3",
    defaultValue: "Textarea with default value",
  },
};
export const WithLabel: Story = {
  args: {
    onChange: () => {},
    id: "textarea4",
    value: "Textarea with label and value",
    label: "Textarea with label and value",
  },
};
export const Required: Story = {
  args: {
    onChange: () => {},
    id: "textarea5",
    required: true,
    label: "Required textarea",
    value: "Textarea with required value",
  },
};
export const WithLinkInLabel: Story = {
  args: {
    onChange: () => {},
    id: "textarea6",
    value: "Textarea with link in label",
    label: [
      "Textarea with ",
      <a key="link" href="#textarea6">
        link
      </a>,
      " in label",
    ],
  },
};
export const WithError: Story = {
  args: {
    onChange: () => {},
    id: "textarea7",
    value: "Textarea with label, value, errors and error message",
    label: "Textarea with label, value, errors and error message",
    hasErrors: true,
    errorMessage: "Wrong value",
  },
};
export const ReadOnly: Story = {
  args: {
    onChange: () => {},
    id: "textarea8",
    readOnly: true,
    value: "Read only",
    label: "Read only",
  },
};
export const Disabled: Story = {
  args: {
    onChange: () => {},
    id: "textarea9",
    disabled: true,
    value: "Disabled",
    label: "Disabled",
  },
};
export const WithCustomWidth: Story = {
  args: {
    onChange: () => {},
    id: "textarea12",
    value: "Textarea with custom width",
    width: "320px",
  },
};
export const WithCustomWidthAndVerticalResizing: Story = {
  args: {
    onChange: () => {},
    id: "textarea13",
    value: "Textarea with resizing",
    width: "450px",
    resize: "vertical",
  },
};
export const WithCustomElementKey: Story = {
  args: {
    onChange: () => {},
    id: "textarea14",
    value: "Textarea with key",
    elementKey: "textareaKeyHere",
  },
};

// Interaction test: the textarea's React key used to be randomised on every
// render, remounting the element. In controlled mode the parent re-renders on
// each keystroke, so focus and caret were lost after the first character.
export const KeepsFocusWhileTyping: Story = {
  render: function Render() {
    const [value, setValue] = useState("");

    return <Textarea id="textarea-focus" label="Notes" value={value} onChange={(event) => setValue(event.target.value)} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByLabelText("Notes");

    await userEvent.type(textarea, "hello");

    expect((textarea as HTMLTextAreaElement).value).toBe("hello");
    expect(document.activeElement).toBe(textarea);
  },
};

export const ContentOnly: Story = {
  args: {
    id: "textarea-content-only",
    label: "Content only",
    contentOnly: true,
    value: "First line\nSecond line",
  },
};

export const ContentOnlyWithDefaultContent: Story = {
  args: {
    id: "textarea-content-only-empty",
    label: "Content only (no value)",
    contentOnly: true,
    defaultContent: "Ikke angitt",
  },
};

// The same element must still be in the DOM after typing — a remount would
// replace it, which is what silently broke focus.
export const KeepsTheSameElementWhileTyping: Story = {
  render: function Render() {
    const [value, setValue] = useState("");

    return <Textarea id="textarea-identity" label="Identity" value={value} onChange={(event) => setValue(event.target.value)} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const before = canvas.getByLabelText("Identity");

    await userEvent.type(before, "abc");

    expect(canvas.getByLabelText("Identity")).toBe(before);
  },
};
