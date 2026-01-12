import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Select, {
  type MultipleSelectProps,
  type SingleSelectProps,
} from "../components/Select";

type SelectArgs = SingleSelectProps | MultipleSelectProps;

const meta: Meta<SelectArgs> = {
  title: "Example/Select",
  component: Select,
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      const isMultiple = Boolean((context.args as SelectArgs).multiple);

      if (isMultiple) {
        const typedArgs = context.args as MultipleSelectProps;
        const [value, setValue] = useState<(string | number)[] | undefined>(
          typedArgs.value ?? typedArgs.defaultValue,
        );
        return (
          <Story
            {...context}
            args={{
              ...typedArgs,
              value,
              onChange: setValue as (value: (string | number)[]) => void,
            }}
          />
        );
      } else {
        const typedArgs = context.args as SingleSelectProps;
        const [value, setValue] = useState<string | number | undefined>(
          typedArgs.value ?? typedArgs.defaultValue,
        );
        return (
          <Story
            {...context}
            args={{
              ...typedArgs,
              value,
              onChange: setValue as (value: string | number) => void,
            }}
          />
        );
      }
    },
  ],
};

export default meta;

type Story = StoryObj<SelectArgs>;

const options = ["Option 1", "Option 2", { key: "Option 3", value: "value 3" }];

export const Default: Story = {
  args: {
    id: "select1",
    options,
  },
};
export const WithLabel: Story = {
  args: {
    id: "select2",
    label: "Select with label",
    options,
  },
};
export const WithSelectedValue: Story = {
  args: {
    id: "select3",
    label: "Select with label and selected value",
    value: "value 3",
    options,
  },
};
export const WithDefaultValue: Story = {
  args: {
    id: "select4",
    label: "Select with label and default value",
    defaultValue: "value 3",
    options,
  },
};
export const WithError: Story = {
  args: {
    id: "select5",
    label: "Select with error",
    value: "value 3",
    hasErrors: true,
    errorMessage: "Wrong value selected",
    options,
  },
};
export const WithLinkInLabel: Story = {
  args: {
    id: "select6",
    label: [
      "Select with ",
      <a key="link" href="#select6">
        link
      </a>,
      " in label",
    ],
    value: "value 3",
    options,
  },
};
export const Disabled: Story = {
  args: {
    id: "select7",
    disabled: true,
    label: "Disabled select",
    value: "value 3",
    options,
  },
};
export const Required: Story = {
  args: {
    id: "select8",
    required: true,
    label: "Required select",
    options,
  },
};
export const WithPlaceholder: Story = {
  args: {
    id: "select9",
    label: "With placeholder",
    placeholder: "Select from list",
    placeholderValue: "notSelected",
    value: "notSelected",
    options,
  },
};
export const WithCustomWidth: Story = {
  args: {
    id: "select13",
    label: "Custom width",
    width: "250px",
    options,
  },
};
export const Multiple: Story = {
  args: {
    id: "select15",
    label: "Multiple select",
    multiple: true,
    options,
  },
};
export const MultipleWithSelectedValue: Story = {
  args: {
    id: "select16",
    label: "Multiple selected",
    multiple: true,
    value: ["option 1", "value 3"],
    options,
  },
};
export const MultipleWithDefaultValue: Story = {
  args: {
    id: "select17",
    label: "Multiple default",
    multiple: true,
    defaultValue: ["option 1", "value 3"],
    options,
  },
};
