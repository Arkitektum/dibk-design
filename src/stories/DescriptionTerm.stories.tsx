import type { Meta, StoryObj } from "@storybook/react-vite";

import DescriptionDetails from "../components/DescriptionDetails";
import DescriptionList from "../components/DescriptionList";
import DescriptionTerm from "../components/DescriptionTerm";

const meta: Meta<typeof DescriptionTerm> = {
  title: "Primitives/DescriptionTerm",
  component: DescriptionTerm,
  argTypes: {
    compact: { control: "boolean" },
    titleWidth: { control: "text" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

// DescriptionTerm renders a <dt>, so it needs a DescriptionList around it to be
// valid markup.
const render: Story["render"] = (args) => (
  <DescriptionList>
    <DescriptionTerm {...args} />
    <DescriptionDetails>Description details 1</DescriptionDetails>
    <DescriptionTerm>Description term 2</DescriptionTerm>
    <DescriptionDetails>Description details 2</DescriptionDetails>
  </DescriptionList>
);

export const Default: Story = {
  args: {
    children: "Description term 1",
  },
  render,
};

export const Compact: Story = {
  args: {
    compact: true,
    children: "Description term 1 (compact)",
  },
  render,
};

export const WithTitleWidth: Story = {
  args: {
    compact: true,
    titleWidth: "260px",
    children: "Description term 1 with a fixed title width",
  },
  render,
};

// A term inherits `compact` and `titleWidth` from the list around it, and can
// opt out with compact={false}.
export const InheritedFromCompactList: Story = {
  args: {
    children: "Description term 1 (inherits compact from the list)",
  },
  render: (args) => (
    <DescriptionList compact titleWidth="220px">
      <DescriptionTerm {...args} />
      <DescriptionDetails>Description details 1</DescriptionDetails>
      <DescriptionTerm compact={false}>
        Description term 2 (opts out of compact)
      </DescriptionTerm>
      <DescriptionDetails compact={false}>
        Description details 2
      </DescriptionDetails>
    </DescriptionList>
  ),
};
