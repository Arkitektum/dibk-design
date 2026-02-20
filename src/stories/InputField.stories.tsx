import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import InputField from "../components/InputField";

const meta: Meta<typeof InputField> = {
  title: "Primitives/InputField",
  component: InputField,
  argTypes: {
    "aria-autocomplete": {
      control: "select",
      options: ["none", "inline", "list", "both"],
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

// Helper: uncontrolled render (initial defaultValue, user can edit locally)
const Uncontrolled = (): Story["render"] => (args) => <InputField {...args} />;

/* ------------------ Stories ------------------ */

export const Default: Story = {
  args: { id: "inputField1" },
  render: Uncontrolled(),
};

export const WithLabelAndValue: Story = {
  args: {
    id: "inputField5",
    value: "Input field value",
    label: "Input field label",
  },
  render: (args) => {
    const [val, setVal] = useState(args.value ?? "");
    return (
      <InputField
        {...args}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    );
  },
};

export const RequirementIndicators: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <InputField
        id="inputField-indicator-required"
        label="Required mode (required=true)"
        required
        requirementIndicatorMode="required"
        placeholder="Placeholder"
      />
      <InputField
        id="inputField-indicator-optional"
        label="Optional mode (required=false)"
        required={false}
        requirementIndicatorMode="optional"
        placeholder="Placeholder"
      />
      <InputField
        id="inputField-indicator-none"
        label="None mode (required=true)"
        required
        requirementIndicatorMode="none"
        placeholder="Placeholder"
      />
    </div>
  ),
};

export const RequiredWithLabelAndValue: Story = {
  args: {
    id: "inputField6",
    value: "Input field value",
    label: "Input field label",
    required: true,
  },
  render: (args) => {
    const [val, setVal] = useState(args.value ?? "");
    return (
      <InputField
        {...args}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    );
  },
};

export const WithErrors: Story = {
  args: {
    id: "inputField8",
    value: "Input field value",
    label: "Input with label, value, errors and error message",
    hasErrors: true,
    errorMessage: "Feil input",
  },
  render: (args) => {
    const [val, setVal] = useState(args.value ?? "");
    return (
      <InputField
        {...args}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    );
  },
};

export const Readonly: Story = {
  args: {
    id: "inputField9",
    value: "Input field value",
    label: "Readonly input",
    readOnly: true,
  },
  render: (args) => {
    const [val, setVal] = useState(args.value ?? "");
    return (
      <InputField
        {...args}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    );
  },
};

export const InputWithActionButton: Story = {
  args: {
    id: "inputField14",
    label: "Input with action button",
    placeholder: "Placeholder text",
    actionButtonContent: "Action button",
    actionButtonOnClick: () => console.log("Action button clicked"),
  },
  render: Uncontrolled(),
};

export const FileInput: Story = {
  args: {
    id: "inputField14",
    label: "File input",
    type: "file",
  },
  render: Uncontrolled(),
};

export const FileInputWithButtonContentAndSelectedFile: Story = {
  args: {
    id: "inputField15",
    label: "File input",
    type: "file",
    actionButtonContent: "Legg til fil",
    selectedFileName: "file.txt",
    actionButtonColor: "secondary",
  },
  render: Uncontrolled(),
};

export const DateInput: Story = {
  args: {
    id: "inputField16",
    label: "Date input without value",
    type: "date",
  },
  render: Uncontrolled(),
};

export const DateInputWithValue: Story = {
  args: {
    id: "inputField17",
    label: "Date input with value",
    value: "2020-05-10",
    type: "date",
  },
  render: (args) => {
    const [val, setVal] = useState(args.value ?? "");
    return (
      <InputField
        {...args}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    );
  },
};

export const InputWithCustomWidth: Story = {
  args: {
    id: "inputField19",
    label: "Input with custom width",
    width: "400px",
  },
  render: Uncontrolled(),
};
