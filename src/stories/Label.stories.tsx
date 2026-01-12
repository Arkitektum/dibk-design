// stories/Label.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';

import Label from '../components/Label';

const meta: Meta<typeof Label> = {
  title: 'Example/Label',
  component: Label,
  argTypes: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const render: Story['render'] = (args) => <Label {...args} />;

export const Default: Story = {
  args: {
    children: 'Label',
  },
  render,
};

export const Inline: Story = {
  args: {
    children: 'Inline label',
    inline: true,
  },
  render,
};

export const LabelStyledSpan: Story = {
  args: {
    children: 'Label styled span',
    htmlTag: 'span',
  },
  render,
};

export const WithSubLabel: Story = {
  args: {
    children: 'Label',
    subLabel: 'Støtter PDF, PNG og JPG. Maks 15MB.',
  },
  render,
};

export const WithLabelOnly: Story = {
  args: {
    children: 'Label',
  },
  render,
};
