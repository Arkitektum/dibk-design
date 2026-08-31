import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId } from "react";
import { fn } from "storybook/test";
import CheckBoxList from "../components/CheckBoxList";
import CheckBoxListItem from "../components/CheckBoxListItem";

const meta: Meta<typeof CheckBoxList> = {
    title: "Primitives/CheckBoxList",
    component: CheckBoxList,
    argTypes: {
        legendSize: { control: "select", options: [1, 2, 3, 4, 5] },
        requirementIndicatorMode: {
            control: "radio",
            options: ["required", "optional", "none"]
        }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

/** Shared children for all stories */
const Checkboxes = () => {
    // One id per item: a shared id would point both labels at the first
    // checkbox, so clicking the second label would toggle the wrong one.
    const baseId = useId();
    return (
        <>
            <CheckBoxListItem onChange={fn()} checked name="checkboxlist" id={`${baseId}-checked`}>
                Label for checked checkbox
            </CheckBoxListItem>
            <CheckBoxListItem onChange={fn()} name="checkboxlist" id={`${baseId}-unchecked`}>
                Label for unchecked checkbox
            </CheckBoxListItem>
        </>
    );
};

const render: Story["render"] = (args) => (
    <CheckBoxList {...args}>
        <Checkboxes />
    </CheckBoxList>
);

export const Default: Story = {
    args: {
        legend: "Default checkbox list"
    },
    render
};

export const Required: Story = {
    args: {
        legend: "Required checkbox list",
        required: true
    },
    render
};

export const Compact: Story = {
    args: {
        legend: "Compact checkbox list",
        compact: true
    },
    render
};

// `legendSize` renders the legend through Header, so the group heading can take
// part in the page's heading scale.
export const WithLegendSize: Story = {
    args: {
        legend: "Checkbox list with a sized legend",
        legendSize: 3
    },
    render
};

// In `optional` mode the group is marked when it is *not* required, instead of
// the asterisk on required groups.
export const OptionalIndicator: Story = {
    args: {
        legend: "Optional checkbox list",
        required: false,
        requirementIndicatorMode: "optional"
    },
    render
};

export const OptionalIndicatorCustomLabel: Story = {
    args: {
        legend: "Optional checkbox list",
        required: false,
        requirementIndicatorMode: "optional",
        optionalLabel: "kan stå tomt"
    },
    render
};

// A read-only checkbox list renders every option and marks the ticked ones, so
// the checkmark stays while the box, the card chrome and the hover states go.
export const ContentOnly: Story = {
    args: {
        legend: "Content only checkbox list"
    },
    render: (args) => (
        <CheckBoxList {...args}>
            <CheckBoxListItem contentOnly checked name="contentonly" id="cb-co-1">
                Label for checked checkbox
            </CheckBoxListItem>
            <CheckBoxListItem contentOnly name="contentonly" id="cb-co-2">
                Label for unchecked checkbox
            </CheckBoxListItem>
        </CheckBoxList>
    )
};
