import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
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

// Interaction test: arrow keys must move focus as well as selection. When focus
// stayed behind, every further press recomputed the same target from the
// still-focused tab, so navigation stuck at the second tab.
export const KeyboardNavigation: Story = {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole("tab");

    const expectActive = (index: number) => {
      expect(document.activeElement).toBe(tabs[index]);
      expect(tabs[index].getAttribute("aria-selected")).toBe("true");
      expect(tabs[index].getAttribute("tabindex")).toBe("0");
    };

    tabs[0].focus();
    expectActive(0);

    await userEvent.keyboard("{ArrowRight}");
    expectActive(1);

    // The press that used to do nothing.
    await userEvent.keyboard("{ArrowRight}");
    expectActive(2);

    await userEvent.keyboard("{ArrowRight}");
    expectActive(0);

    await userEvent.keyboard("{ArrowLeft}");
    expectActive(2);

    await userEvent.keyboard("{Home}");
    expectActive(0);

    await userEvent.keyboard("{End}");
    expectActive(2);
  },
};

// Interaction test: a disabled tab must be skipped, because .focus() on a
// disabled button is a no-op and would leave focus and selection out of step.
export const KeyboardNavigationSkipsDisabledTabs: Story = {
  args: {
    defaultIndex: 0,
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab>Overview</Tabs.Tab>
        <Tabs.Tab disabled>Details</Tabs.Tab>
        <Tabs.Tab>Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel>Content for the overview tab.</Tabs.Panel>
        <Tabs.Panel>Additional details live in this tab.</Tabs.Panel>
        <Tabs.Panel>Configuration related content goes here.</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole("tab");

    tabs[0].focus();
    await userEvent.keyboard("{ArrowRight}");

    expect(document.activeElement).toBe(tabs[2]);
    expect(tabs[1].getAttribute("aria-selected")).toBe("false");
  },
};
