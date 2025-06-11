// stories/Footer.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import Footer, { type FooterProps } from '../components/Footer';
import ThemeProvider from '../components/ThemeProvider';
import type { ThemeProps } from '../components/Theme';

type ExtendedArgs = FooterProps & { theme?: ThemeProps };

const meta: Meta<typeof Footer> = {
  title: 'Example/Footer',
  component: Footer,
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

const render: Story['render'] = (args) => <Footer {...args} />;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <span>Footer content here</span>,
  },
  render,
};
