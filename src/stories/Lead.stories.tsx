import type { Meta, StoryObj } from '@storybook/react-vite';

import Lead, { type LeadProps } from '../components/Lead';
import ThemeProvider from '../components/ThemeProvider';
import type { ThemeProps } from '../components/Theme';

type ExtendedArgs = LeadProps & { theme?: ThemeProps };

const meta: Meta<typeof Lead> = {
  title: 'Example/Lead',
  component: Lead,
  argTypes: {
    htmlTag: { control: 'select', options: ['p', 'span', 'div'] },
  },
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

const render: Story['render'] = (args) => <Lead {...args} />;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Lead text',
  },
  render,
};
