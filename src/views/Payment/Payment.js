import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from './constants/theme';
import Header from './Header';
import Main from './Main';

export default function Payment(props) {
  return (
    <ThemeProvider theme={theme}>
      <Header {...props} />
      <Main {...props} />
    </ThemeProvider>
  );
}
