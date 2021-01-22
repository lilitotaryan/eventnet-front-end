import { makeStyles, createMuiTheme } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    margin: theme.spacing(10, 2),
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 0),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#AA00FF',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    color: '#651FFF',
  },
  routerLink: {
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      color: 'white',
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: '#6200EA' },
  },
});

export { useStyles, theme };
