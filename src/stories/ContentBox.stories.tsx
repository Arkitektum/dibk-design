import type { Meta, StoryObj } from '@storybook/react-vite';
import ContentBox, { type ContentBoxProps } from '../components/ContentBox';
import ThemeProvider from '../components/ThemeProvider';
import type { ThemeProps } from '../components/Theme';

type ExtendedArgs = ContentBoxProps & { theme?: ThemeProps };

const meta: Meta<typeof ContentBox> = {
  title: 'Example/ContentBox',
  component: ContentBox,
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

const render: Story['render'] = (args) => <ContentBox {...args} />;

export const DefaultWithoutTitle: Story = {
  args: {
    color: 'default',
    children: <>Box with default color</>,
    titleSize: 'regular',
  },
  render,
};

export const Default: Story = {
  args: {
    color: 'default',
    title: 'Box title',
    children: <>Box with default color</>,
  },
  render,
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    title: 'Box title',
    children: <>Box with secondary color</>,
  },
  render,
};
