import type { Meta, StoryObj } from '@storybook/react-vite';

import ThemeProvider from '../components/ThemeProvider';
import type { ThemeProps } from '../components/Theme';
import ErrorMessage, {
  type ErrorMessageProps,
} from '../components/ErrorMessage';

type ExtendedArgs = ErrorMessageProps & { theme?: ThemeProps };

const meta: Meta<typeof ErrorMessage> = {
  title: 'Example/ErrorMessage',
  component: ErrorMessage,
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
const render: Story['render'] = (args) => <ErrorMessage {...args} />;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'Wrong value',
  },
  render,
};
