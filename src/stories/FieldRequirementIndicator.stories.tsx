import type { Meta, StoryObj } from "@storybook/react-vite";

import FieldRequirementIndicator, {
  FieldRequirementProvider,
} from "../components/FieldRequirementIndicator";

const meta: Meta<typeof FieldRequirementIndicator> = {
  title: "Primitives/FieldRequirementIndicator",
  component: FieldRequirementIndicator,
  argTypes: {
    required: { control: "boolean" },
    mode: { control: "radio", options: ["required", "optional", "none"] },
    optionalLabel: { control: "text" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

// The indicator is rendered inline after the label text it belongs to.
const render: Story["render"] = (args) => (
  <span>
    Kontaktperson
    <FieldRequirementIndicator {...args} />
  </span>
);

export const RequiredMode: Story = {
  args: {
    required: true,
    mode: "required",
  },
  render,
};

// In `required` mode an optional field gets no indicator at all.
export const RequiredModeOptionalField: Story = {
  args: {
    required: false,
    mode: "required",
  },
  render,
};

export const OptionalMode: Story = {
  args: {
    required: false,
    mode: "optional",
  },
  render,
};

export const OptionalModeCustomLabel: Story = {
  args: {
    required: false,
    mode: "optional",
    optionalLabel: "kan stå tomt",
  },
  render,
};

export const NoneMode: Story = {
  args: {
    required: true,
    mode: "none",
  },
  render,
};

// Without a `mode` prop the indicator follows the surrounding
// FieldRequirementProvider, so a whole form can switch convention at once.
export const FromProvider: Story = {
  args: {
    required: false,
  },
  render: (args) => (
    <FieldRequirementProvider mode="optional" optionalLabel="valgfritt felt">
      <span>
        Kontaktperson
        <FieldRequirementIndicator required={args.required} />
      </span>
    </FieldRequirementProvider>
  ),
};
