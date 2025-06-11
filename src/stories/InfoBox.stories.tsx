import type { Meta, StoryObj } from '@storybook/react-vite';
import InfoBox, { type InfoBoxProps } from '../components/InfoBox';
import ThemeProvider from '../components/ThemeProvider';
import type { ThemeProps } from '../components/Theme';
import Header from '../components/Header';

type ExtendedArgs = InfoBoxProps & { theme?: ThemeProps };

const meta: Meta<typeof InfoBox> = {
  title: 'Example/InfoBox',
  component: InfoBox,
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
const render: Story['render'] = (args) => <InfoBox {...args} />;

export const Default: Story = {
  args: {
    children: (
      <>
        <Header size={2}>
          Du kan ikke signere erklæringen før alle opplysningene er fylt ut:
        </Header>
        <ul>
          <li>
            Du må krysse av for at foretaket erklærer ansvar i henhold til plan-
            og bygningsloven.
          </li>
          <li>
            Du må fylle ut mobil- eller telefonnummeret til kontaktpersonen.
          </li>
        </ul>
      </>
    ),
  },
  render,
};
