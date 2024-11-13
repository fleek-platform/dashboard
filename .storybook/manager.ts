import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: 'Fleek.xyz ⚡️',
    brandUrl: 'https://fleek.xyz',
    brandImage: '',
    brandTarget: '_self',
  },
});
