// stories/Label.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';

import Label, { type LabelProps } from '../components/Label';
import ThemeProvider from '../components/ThemeProvider';
import type { ThemeProps } from '../components/Theme';

type ExtendedArgs = LabelProps & { theme?: ThemeProps };

const meta: Meta<typeof Label> = {
  title: 'Example/Label',
  component: Label,
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
