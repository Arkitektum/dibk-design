import type { Meta, StoryObj } from "@storybook/react-vite";
import Tabs from "../components/Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Primitives/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultIndex: 0,
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab>Overview</Tabs.Tab>
        <Tabs.Tab>Details</Tabs.Tab>
        <Tabs.Tab>Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel>Content for the overview tab.</Tabs.Panel>
        <Tabs.Panel>Additional details live in this tab.</Tabs.Panel>
        <Tabs.Panel>Configuration related content goes here.</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const WithBadges: Story = {
  args: {
    defaultIndex: 1,
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab amount={4}>Pending</Tabs.Tab>
        <Tabs.Tab amount={12}>Active</Tabs.Tab>
        <Tabs.Tab>Archived</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel>Pending items are listed here.</Tabs.Panel>
        <Tabs.Panel>Active content for the selected category.</Tabs.Panel>
        <Tabs.Panel>Archived records live in this view.</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};
