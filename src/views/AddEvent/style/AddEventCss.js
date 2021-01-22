import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, Switch } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative',
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px',
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  container: {
    backgroundColor: theme.palette.background.paper,
  },
  date: {
    margin: '12px',
  },
  text: {
    marginBottom: '12px',
    marginTop: '8px',
  },
  textFieldDate: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
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
