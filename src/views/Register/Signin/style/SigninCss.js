import { makeStyles, createMuiTheme } from '@material-ui/core';

var today = new Date();
var hour = today.getHours();
let imageUrl =
  hour > 6 && hour < 20
    ? 'url(' + require('../Images/day.jpg') + ')'
    : 'url(' + require('../Images/night.jpg') + ')';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: imageUrl,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: '#AA00FF',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  routerLink: {
    textDecoration: 'none',
    color: '#651FFF',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: '#6200EA' },
  },
});

export { useStyles, theme };
