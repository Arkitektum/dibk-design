import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId } from "react";
import CheckBoxList from "../components/CheckBoxList";
import CheckBoxListItem from "../components/CheckBoxListItem";

const meta: Meta<typeof CheckBoxList> = {
  title: "Primitives/CheckBoxList",
  component: CheckBoxList,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

/** Shared children for all stories */
const Checkboxes = () => {
  const checkboxListId = useId();
  return (
    <>
      <CheckBoxListItem
        onChange={() => console.log("onchange")}
        checked
        name="checkboxlist"
        id={checkboxListId}
      >
        Label for checked checkbox
      </CheckBoxListItem>
      <CheckBoxListItem
        onChange={() => console.log("onchange")}
        name="checkboxlist"
        id={checkboxListId}
      >
        Label for unchecked checkbox
      </CheckBoxListItem>
    </>
  );
};

export const Default: Story = {
  args: {
    legend: "Default checkbox list",
  },
  render: (args) => <CheckBoxList {...args}>{<Checkboxes />}</CheckBoxList>,
};

export const Required: Story = {
  args: {
    legend: "Required checkbox list",
    required: true,
  },
  render: (args) => <CheckBoxList {...args}>{<Checkboxes />}</CheckBoxList>,
};

export const Compact: Story = {
  args: {
    legend: "Compact checkbox list",
    compact: true,
  },
  render: (args) => <CheckBoxList {...args}>{<Checkboxes />}</CheckBoxList>,
};
