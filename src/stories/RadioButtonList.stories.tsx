// stories/RadioButtonList.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId } from "react";
import { fn } from "storybook/test";
import RadioButtonList from "../components/RadioButtonList";
import RadioButtonListItem from "../components/RadioButtonListItem";

const meta: Meta<typeof RadioButtonList> = {
    title: "Primitives/RadioButtonList",
    component: RadioButtonList,
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

const SharedChildren = () => {
    // One id per item: a shared id would point both labels at the first radio
    // button, so clicking the second label would select the wrong option.
    const baseId = useId();
    return (
        <>
            <RadioButtonListItem onChange={fn()} value="value 1" name="radio-button-list-list-item" id={`${baseId}-checked`} checked>
                Checked radio button
            </RadioButtonListItem>
            <RadioButtonListItem onChange={fn()} value="value 2" name="radio-button-list-list-item" id={`${baseId}-unchecked`}>
                Unchecked radio button
            </RadioButtonListItem>
        </>
    );
};

const render: Story["render"] = (args) => (
    <RadioButtonList {...args}>
        <SharedChildren />
    </RadioButtonList>
);

export const Default: Story = {
    args: { legend: "Default radio button list" },
    render
};

export const Required: Story = {
    args: { legend: "Required radio button list", required: true },
    render
};

export const Compact: Story = {
    args: { legend: "Compact radio button list", compact: true },
    render
};

// `legendSize` renders the legend through Header, so the group heading can take
// part in the page's heading scale.
export const WithLegendSize: Story = {
    args: { legend: "Radio button list with a sized legend", legendSize: 3 },
    render
};

// In `optional` mode the group is marked when it is *not* required, instead of
// the asterisk on required groups.
export const OptionalIndicator: Story = {
    args: {
        legend: "Optional radio button list",
        required: false,
        requirementIndicatorMode: "optional"
    },
    render
};

// Unlike the checkbox list, no indicator is drawn: a radio group has one answer,
// so a read-only view renders just the selected option.
export const ContentOnly: Story = {
    args: { legend: "Content only radio button list" },
    render: (args) => (
        <RadioButtonList {...args}>
            <RadioButtonListItem contentOnly checked value="a" name="contentonly" id="rb-co-1">
                Label for the selected option
            </RadioButtonListItem>
        </RadioButtonList>
    )
};
