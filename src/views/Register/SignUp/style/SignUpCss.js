import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, Switch } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#AA00FF',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  color: {
    color: '#651FFF',
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
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
const checkBoxStyles = theme => ({
  root: {
    '&$checked': {
      color: '#AA00FF',
    },
  },
  checked: {},
});
const CustomSwitch = withStyles({
  switchBase: {
    color: '#AA00FF',
    '&$checked': {
      color: '#AA00FF',
    },
    '&$checked + $track': {
      backgroundColor: '#AA00FF',
    },
  },
  checked: {},
  track: {},
})(Switch);

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

export { useStyles, theme, CustomCheckbox, CustomSwitch };
