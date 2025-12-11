import type { Meta, StoryObj } from '@storybook/react-vite';

import NavigationBar, {
  type ListItemObject,
} from '../components/NavigationBar';

const meta: Meta<typeof NavigationBar> = {
  title: 'Example/NavigationBar',
  component: NavigationBar,
  argTypes: {
    compact: {
      control: 'boolean',
      defaultValue: false,
    },
    primaryListItems: {
      control: 'object',
      defaultValue: [],
    },
    secondaryListItems: {
      control: 'object',
      defaultValue: [],
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const primaryListItems: ListItemObject[] = [
  {
    name: 'Primary item 1',
    listItems: [
      { name: 'Sub item 1', href: '#' },
      { name: 'Sub item 2', href: '#' },
    ],
    href: '#',
  },
  { name: 'Primary item 2', href: '#' },
  { name: 'Primary item 3', href: '#' },
];

const secondaryListItems: ListItemObject[] = [
  { name: 'Secondary item 1', href: '#' },
  { name: 'Secondary item 2', href: '#' },
];

export const Default: Story = {
  args: {},
};

export const WithLogoLink: Story = {
  args: {
    logoLink: 'https://dibk.no/',
    logoLinkTitle: 'Gå til forside',
    openLogoLinkInNewTab: true,
    mainContentId: 'main-content',
  },
};

export const WithListItems: Story = {
  args: {
    primaryListItems,
    secondaryListItems,
    mainContentId: 'main-content',
  },
};

export const WithChildElements: Story = {
  args: {
    children: <span>Content here</span>,
    mainContentId: 'main-content',
  },
};

export const WithSecondaryColor: Story = {
  args: {
    primaryListItems,
    secondaryListItems,
    color: 'secondary',
    mainContentId: 'main-content',
  },
};
