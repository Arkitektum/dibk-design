import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import WizardNavigation from '../components/WizardNavigation';

import type { ThemeProps } from '../components/Theme';
import type { WizardNavigationProps } from '../components/WizardNavigation';
import ThemeProvider from '../components/ThemeProvider';

type ExtendedArgs = WizardNavigationProps & { theme?: ThemeProps };

const meta: Meta<typeof WizardNavigation> = {
  title: 'Example/WizardNavigation',
  component: WizardNavigation,
  argTypes: {
    activeStepId: {
      control: 'select',
      options: [
        'SignIn',
        'AvailableReportees',
        'Import',
        'NextProcessCategory',
        'Receipt',
      ],
    },
    direction: { control: 'radio', options: ['vertical', 'horizontal'] },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const { theme, ...rest } = context.args as ExtendedArgs;
      return (
        <MemoryRouter initialEntries={['/']}>
          <ThemeProvider theme={theme}>
            <Story args={rest} />
          </ThemeProvider>
        </MemoryRouter>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: {
      SignIn: { id: 'SignIn', name: 'Start', finished: true, hasErrors: false },
      AvailableReportees: {
        id: 'AvailableReportees',
        name: 'Velg hvem du representerer',
        finished: true,
        hasErrors: false,
      },
      Import: {
        id: 'Import',
        name: 'Importer fil fra ByggSøk',
        finished: false,
        hasErrors: true,
      },
      NextProcessCategory: {
        id: 'NextProcessCategory',
        name: 'Velg søknadstype',
        finished: false,
        hasErrors: false,
      },
      Receipt: {
        id: 'Receipt',
        name: 'Velg søknadssystem',
        finished: false,
        hasErrors: false,
      },
    },
    activeStepId: 'NextProcessCategory',
  },
};

export const WithLinks: Story = {
  args: {
    steps: Object.fromEntries(
      [
        'SignIn',
        'AvailableReportees',
        'Import',
        'NextProcessCategory',
        'Receipt',
      ].map((id) => [
        id,
        {
          id,
          name: `Step: ${id}`,
          finished: id === 'SignIn' || id === 'AvailableReportees',
          hasErrors: id === 'Import',
          link: { pathname: id, search: window.location.search },
        },
      ])
    ) as WizardNavigationProps['steps'],
    activeStepId: 'NextProcessCategory',
  },
};
