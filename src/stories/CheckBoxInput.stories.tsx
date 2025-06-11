import type { Meta, StoryObj } from '@storybook/react-vite';
import CheckBoxInput, {
  type CheckBoxInputProps,
} from '../components/CheckBoxInput';
import ThemeProvider from '../components/ThemeProvider';
import type { ThemeProps } from '../components/Theme';

type ExtendedArgs = CheckBoxInputProps & { theme?: ThemeProps };

const meta: Meta<typeof CheckBoxInput> = {
  title: 'Example/CheckBoxInput',
  component: CheckBoxInput,
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

const render: Story['render'] = (args) => <CheckBoxInput {...args} />;

export const Unchecked: Story = {
  args: {
    id: 'checkBoxInput-1',
    children: 'Label for unchecked checkbox',
  },
  render,
};

export const Checked: Story = {
  args: {
    id: 'checkBoxInput-2',
    children: 'Label for checked checkbox',
    checked: true,
  },
  render,
};

export const CheckedDisabled: Story = {
  args: {
    id: 'checkBoxInput-3',
    children: 'Label for checked disabled checkbox',
    checked: true,
    disabled: true,
  },
  render,
};

export const UncheckedContentOnly: Story = {
  args: {
    id: 'checkBoxInput-4',
    children: 'Label for unchecked checkbox with content only',
    contentOnly: true,
  },
  render,
};

export const CheckedContentOnly: Story = {
  args: {
    id: 'checkBoxInput-5',
    children: 'Label for checked checkbox with content only',
    checked: true,
    contentOnly: true,
  },
  render,
};

export const CheckedCustomCheckmark: Story = {
  args: {
    id: 'checkBoxInput-6',
    children: 'Label for checked checkbox with custom checkmark',
    checked: true,
    disabled: true,
    checkmarkCharacter: '✕',
  },
  render,
};

export const HasErrors: Story = {
  args: {
    id: 'checkBoxInput-7',
    children: 'Label for checkbox with errors',
    hasErrors: true,
  },
  render,
};

export const HasErrorsDisabled: Story = {
  args: {
    id: 'checkBoxInput-8',
    children: 'Label for disabled checkbox with errors',
    hasErrors: true,
    disabled: true,
  },
  render,
};

export const HasErrorsChecked: Story = {
  args: {
    id: 'checkBoxInput-9',
    children: 'Label for checked checkbox with errors',
    hasErrors: true,
    checked: true,
  },
  render,
};

export const HasErrorsCheckedDisabled: Story = {
  args: {
    id: 'checkBoxInput-10',
    children: 'Label for checked disabled checkbox with errors',
    hasErrors: true,
    checked: true,
    disabled: true,
  },
  render,
};

export const Required: Story = {
  args: {
    id: 'checkBoxInput-11',
    required: true,
    children: 'Label for required checkbox',
  },
  render,
};
