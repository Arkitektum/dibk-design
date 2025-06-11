import type { Meta, StoryObj } from '@storybook/react-vite';
import ThemeProvider from '../components/ThemeProvider';
import type { ThemeProps } from '../components/Theme';

import Container, { type ContainerProps } from '../components/Container';

type ExtendedArgs = ContainerProps & { theme?: ThemeProps };

const meta: Meta<typeof Container> = {
  title: 'Example/Container',
  component: Container,
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

const render: Story['render'] = (args) => <Container {...args} />;

export const Default: Story = {
  args: {
    children: <>Container content here</>,
  },
  render,
};

export const WithMaxWidth: Story = {
  args: {
    children: <>Container with max width</>,
    maxWidth: '230px',
  },
  render,
};
