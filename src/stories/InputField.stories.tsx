import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import InputField from "../components/InputField";

const meta: Meta<typeof InputField> = {
  title: "Example/InputField",
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

export const Required: Story = {
  args: { id: "inputField2", required: true },
  render: Uncontrolled(),
};

export const WithValue: Story = {
  args: { id: "inputField3", value: "Input field value" },
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

export const WithDefaultValue: Story = {
  args: {
    id: "inputField4",
    defaultValue: "Input field default value", // <-- fixed
  },
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

export const WithLinkInLabel: Story = {
  args: {
    id: "inputField7",
    value: "Input field value",
    label: [
      "Input with ",
      <a key="labelLink" href="#label-link">
        link
      </a>,
      " in label",
    ],
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
    errorMessage: "Wrong value",
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

export const Disabled: Story = {
  args: {
    id: "inputField10",
    value: "Input field value",
    label: "Disabled input",
    disabled: true,
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

export const NumberInput: Story = {
  args: {
    id: "inputField11",
    value: 3,
    label: "Input with number values",
    type: "number",
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

export const ContentOnly: Story = {
  args: {
    id: "inputField12",
    value: "Input field value",
    label: "Input with contentOnly set to true",
    contentOnly: true,
  },
  render: Uncontrolled(),
};

export const ContentOnlyWithDefaultContent: Story = {
  args: {
    id: "inputField13",
    label: "Input with contentOnly set to true and default content",
    contentOnly: true,
    defaultContent: "Default content",
  },
  render: Uncontrolled(),
};

export const InputWithActionButton: Story = {
  args: {
    id: "inputField14",
    label: "Input with action button",
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
    buttonContent: "Legg til fil",
    selectedFileName: "file.txt",
    buttonColor: "secondary",
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

export const DateInputWithValueAndError: Story = {
  args: {
    id: "inputField18",
    label: "Date input with error",
    value: "2020-05-10",
    type: "date",
    hasErrors: true,
    errorMessage: "Wrong date value",
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

export const InputWithCustomElementKey: Story = {
  args: {
    id: "inputField20",
    label: "Input with custom element key",
    elementKey: "inputKeyHere",
  },
  render: Uncontrolled(),
};
