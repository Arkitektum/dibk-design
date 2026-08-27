import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { expect, within } from "storybook/test";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Select from "../components/Select";

// Button, InputField and Select had drifted apart — 55px, 48px and 50px, with Button's neutral
// variant at 49px — so a row of them never lined up. They now derive their height from
// sizes.$control-height. Measured here so the drift cannot come back unnoticed.
const CONTROL_HEIGHT = 54;

const meta: Meta = {
  title: "Primitives/Form control heights",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Every interactive form control at its regular size is ${CONTROL_HEIGHT}px tall, so they align when placed in a row.`,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const options = ["Option 1", "Option 2"];

const row: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "8px",
  flexWrap: "wrap",
};

export const Aligned: Story = {
  render: () => (
    <div style={row}>
      <InputField
        id="control-height-input"
        label="Input field"
        hideLabel
        value="Input field"
        onChange={() => {}}
        noMargin
      />
      <Select
        id="control-height-select"
        label="Select"
        hideLabel
        options={options}
        value="Option 1"
        onChange={() => {}}
      />
      <Button onClick={() => {}} color="primary" noMargin>
        Primary
      </Button>
      <Button onClick={() => {}} color="secondary" noMargin>
        Secondary
      </Button>
      <Button onClick={() => {}} color="neutral" noMargin>
        Neutral
      </Button>
      <Button onClick={() => {}} color="neutral" uniformPadding noMargin>
        Uniform
      </Button>
      <Button onClick={() => {}} color="primary" iconLeft={<span>+</span>} noMargin>
        With icon
      </Button>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // The Select's height lives on react-select's control, not on the labelled input inside it.
    const control = canvasElement.querySelector(".reactSelect__control");
    expect(control).not.toBeNull();

    const measured: [string, number][] = [
      ["input", canvas.getByLabelText("Input field").getBoundingClientRect().height],
      ["select", (control as HTMLElement).getBoundingClientRect().height],
      ...canvas.getAllByRole("button").map((button): [string, number] => [
        button.textContent?.trim() || "button",
        button.getBoundingClientRect().height,
      ]),
    ];

    for (const [name, height] of measured) {
      expect(Math.round(height), `${name} height`).toBe(CONTROL_HEIGHT);
    }
  },
};

// The action button variants sit inside the control's own row, so they are the ones most likely
// to reveal a mismatch.
export const WithActionButtons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <InputField
        id="control-height-input-action"
        label="Input field with action button"
        value="Input field"
        onChange={() => {}}
        actionButtonContent="Apply"
        actionButtonOnClick={() => {}}
      />
      <Select
        id="control-height-select-action"
        label="Select with action button"
        options={options}
        value="Option 1"
        onChange={() => {}}
        actionButtonContent="Apply"
        actionButtonOnClick={() => {}}
      />
      <InputField id="control-height-file" label="File input" type="file" selectedFileName="file.txt" />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const heights = [
      canvas.getByLabelText("Input field with action button").getBoundingClientRect().height,
      (canvasElement.querySelector(".reactSelect__control") as HTMLElement).getBoundingClientRect().height,
      ...canvas.getAllByRole("button").map((button) => button.getBoundingClientRect().height),
    ];

    for (const height of heights) {
      expect(Math.round(height)).toBe(CONTROL_HEIGHT);
    }
  },
};
