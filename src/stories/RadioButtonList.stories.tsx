// stories/RadioButtonList.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId } from "react";
import RadioButtonList from "../components/RadioButtonList";
import RadioButtonListItem from "../components/RadioButtonListItem";

const meta: Meta<typeof RadioButtonList> = {
  title: "Primitives/RadioButtonList",
  component: RadioButtonList,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const SharedChildren = () => {
  const radioButtonListId = useId();
  return (
    <>
      <RadioButtonListItem
        onChange={() => console.log("onchange")}
        value="value 1"
        name="radio-button-list-list-item"
        id={radioButtonListId}
        checked
      >
        Checked radio button
      </RadioButtonListItem>
      <RadioButtonListItem
        onChange={() => console.log("onchange")}
        value="value 2"
        name="radio-button-list-list-item"
        id={radioButtonListId}
      >
        Unchecked radio button
      </RadioButtonListItem>
    </>
  );
};

export const Default: Story = {
  args: { legend: "Default radio button list" },
  render: (args) => (
    <RadioButtonList {...args}>{<SharedChildren />}</RadioButtonList>
  ),
};

export const Required: Story = {
  args: { legend: "Required radio button list", required: true },
  render: (args) => (
    <RadioButtonList {...args}>{<SharedChildren />}</RadioButtonList>
  ),
};

export const Compact: Story = {
  args: { legend: "Compact radio button list", compact: true },
  render: (args) => (
    <RadioButtonList {...args}>{<SharedChildren />}</RadioButtonList>
  ),
};

// Unlike the checkbox list, no indicator is drawn: a radio group has one answer,
// so a read-only view renders just the selected option.
export const ContentOnly: Story = {
  args: { legend: "Content only radio button list" },
  render: (args) => (
    <RadioButtonList {...args}>
      <RadioButtonListItem
        contentOnly
        checked
        value="a"
        name="contentonly"
        id="rb-co-1"
      >
        Label for the selected option
      </RadioButtonListItem>
    </RadioButtonList>
  ),
};
