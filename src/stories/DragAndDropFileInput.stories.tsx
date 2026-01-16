import type { Meta, StoryObj } from "@storybook/react-vite";

import DragAndDropFileInput from "../components/DragAndDropFileInput";

const meta: Meta<typeof DragAndDropFileInput> = {
  title: "Primitives/DragAndDropFileInput",
  component: DragAndDropFileInput,
  tags: ["autodocs"],
  render: (args) => <DragAndDropFileInput {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithoutSelectedFile: Story = {
  args: {
    id: "dragAndDropInput-1",
    label: "Input uten valgt fil",
    buttonContent: "Velg fil",
    onSelectChange: () => console.log("Select change"),
    onDragAndDropChange: () => console.log("Drag and drop change"),
  },
};

export const WithSelectedFile: Story = {
  args: {
    ...WithoutSelectedFile.args,
    selectedFileName: "important-file.xml",
  },
};

export const Required: Story = {
  args: {
    ...WithoutSelectedFile.args,
    required: true,
  },
};

export const WithCustomButtonContentWhenSelectedFile: Story = {
  args: {
    ...WithSelectedFile.args,
    buttonContentWhenSelectedFile: "Velg annen fil",
  },
};

export const WithError: Story = {
  args: {
    ...WithCustomButtonContentWhenSelectedFile.args,
    selectedFileName: "wrong-file.xml",
    hasErrors: true,
    errorMessage: "Filen må være midre enn 15MB",
  },
};

export const WithSubLabel: Story = {
  args: {
    ...WithoutSelectedFile.args,
    subLabel: "Støtter PDF, PNG og JPG. Maks 15MB.",
  },
};

export const WithLabelOnly: Story = {
  args: {
    ...WithoutSelectedFile.args,
    subLabel: "",
  },
};
