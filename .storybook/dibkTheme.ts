import { create } from 'storybook/theming';
// @ts-expect-error SVGs can be imported as ReactComponent or URL depending on setup

import dibkLogoWithTitle from '../src/assets/svg/dibk-logo-with-title.svg?url';

const dibkTheme = create({
  base: 'light',
  brandTitle: 'DIBK design',
  brandUrl: 'https://dibk.no/',
  brandImage: dibkLogoWithTitle,
  brandTarget: '_self',
  // Typography
  fontBase: '"PP Mori", sans-serif',
  // fontSize: '16px',

  // Colors
  colorPrimary: '#072938',
});

export default dibkTheme;
