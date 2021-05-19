import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000099',
    // accent: '#f1c40f',
    // background: '', // background color for pages, such as lists.
    // surface: '', //background color for elements containing content, such as cards
    // text: '', //text color for content
    //disabled: '', //color for disabled elements
    //placeholder: '', //color for placeholder text, such as input placeholder.
    //backdrop: '', //color for backdrops of various components such as modals
  },
};