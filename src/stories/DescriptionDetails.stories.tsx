import type { Meta, StoryObj } from "@storybook/react-vite";

import DescriptionDetails from "../components/DescriptionDetails";
import DescriptionList from "../components/DescriptionList";
import DescriptionTerm from "../components/DescriptionTerm";

const meta: Meta<typeof DescriptionDetails> = {
    title: "Primitives/DescriptionDetails",
    component: DescriptionDetails,
    argTypes: {
        compact: { control: "boolean" },
        titleWidth: { control: "text" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

// DescriptionDetails renders a <dd>, so it needs a DescriptionList around it to
// be valid markup.
const render: Story["render"] = (args) => (
    <DescriptionList>
        <DescriptionTerm>Description term 1</DescriptionTerm>
        <DescriptionDetails {...args} />
        <DescriptionTerm>Description term 2</DescriptionTerm>
        <DescriptionDetails>Description details 2</DescriptionDetails>
    </DescriptionList>
);

export const Default: Story = {
    args: {
        children: "Description details 1"
    },
    render
};

export const Compact: Story = {
    args: {
        compact: true,
        children: "Description details 1 (compact)"
    },
    render
};

export const WithTitleWidth: Story = {
    args: {
        compact: true,
        titleWidth: "260px",
        children: "Description details 1 with a fixed title width"
    },
    render
};

// Details inherit `compact` and `titleWidth` from the list around them, and can
// opt out with compact={false}.
export const InheritedFromCompactList: Story = {
    args: {
        children: "Description details 1 (inherits compact from the list)"
    },
    render: (args) => (
        <DescriptionList compact titleWidth="220px">
            <DescriptionTerm>Description term 1</DescriptionTerm>
            <DescriptionDetails {...args} />
            <DescriptionTerm compact={false}>Description term 2</DescriptionTerm>
            <DescriptionDetails compact={false}>Description details 2 (opts out of compact)</DescriptionDetails>
        </DescriptionList>
    )
};
