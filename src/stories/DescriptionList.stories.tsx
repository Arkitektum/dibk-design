import type { Meta, StoryObj } from '@storybook/react-vite';
import ThemeProvider from '../components/ThemeProvider';
import type { ThemeProps } from '../components/Theme';

import DescriptionList, {
  type DescriptionListProps,
} from '../components/DescriptionList';
import DescriptionTerm from '../components/DescriptionTerm';
import DescriptionDetails from '../components/DescriptionDetails';

type ExtendedArgs = DescriptionListProps & { theme?: ThemeProps };

const meta: Meta<typeof DescriptionList> = {
  title: 'Example/DescriptionList',
  component: DescriptionList,
  argTypes: {},
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const { theme, ...rest } = context.args as ExtendedArgs;
      return (
        <ThemeProvider theme={theme}>
          <Story args={rest} />
        </ThemeProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const commonChildren = (
  <>
    <DescriptionTerm>Description term 1</DescriptionTerm>
    <DescriptionDetails>Description details 1</DescriptionDetails>
    <DescriptionTerm>Description term 2</DescriptionTerm>
    <DescriptionDetails>Description details 2</DescriptionDetails>
    <DescriptionTerm>Description term 3</DescriptionTerm>
    <DescriptionDetails>Description details 3</DescriptionDetails>
  </>
);

const render: Story['render'] = (args) => (
  <DescriptionList {...args}>{commonChildren}</DescriptionList>
);

export const Default: Story = {
  args: {},
  render,
};

export const WithCustomTitleWidth: Story = {
  args: {
    titleWidth: '160px',
  },
  render,
};

export const Compact: Story = {
  args: {
    compact: true,
  },
  render,
};

export const CompactWithCustomTitleWidth: Story = {
  args: {
    compact: true,
    titleWidth: '160px',
  },
  render,
};
