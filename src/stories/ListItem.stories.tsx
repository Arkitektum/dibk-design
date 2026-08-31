import type { Meta, StoryObj } from "@storybook/react-vite";

import List from "../components/List";
import ListItem from "../components/ListItem";

const meta: Meta<typeof ListItem> = {
    title: "Primitives/ListItem",
    component: ListItem,
    argTypes: {
        compact: { control: "boolean" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

// ListItem renders an <li>, so it needs a List around it to be valid markup.
const render: Story["render"] = (args) => (
    <List>
        <ListItem>item 1</ListItem>
        <ListItem {...args} />
        <ListItem>item 3</ListItem>
    </List>
);

export const Default: Story = {
    args: {
        children: "item 2"
    },
    render
};

export const Compact: Story = {
    args: {
        compact: true,
        children: "item 2 (compact)"
    },
    render
};

// A list item inherits `compact` from the list around it, and can opt out with
// compact={false}.
export const InheritedFromCompactList: Story = {
    args: {
        children: "item 2 (inherits compact from the list)"
    },
    render: (args) => (
        <List compact>
            <ListItem>item 1</ListItem>
            <ListItem {...args} />
            <ListItem compact={false}>item 3 (opts out of compact)</ListItem>
        </List>
    )
};

export const WithNestedList: Story = {
    args: {
        children: (
            <>
                item 2
                <List>
                    <ListItem>subitem 1</ListItem>
                    <ListItem>subitem 2</ListItem>
                </List>
            </>
        )
    },
    render
};
