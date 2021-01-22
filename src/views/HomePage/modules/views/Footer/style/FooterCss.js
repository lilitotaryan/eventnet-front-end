import { makeStyles, createMuiTheme } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0),
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    color: '#651FFF',
  },
  lightBlue: {
    color: '#55acee',
  },
  blue: {
    color: '#3b5999',
  },
  linkedin: {
    color: '#0077B5',
  },
  black: {
    color: '#212121',
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: { main: '#8BC34A' },
  },
});

export { useStyles, theme };
