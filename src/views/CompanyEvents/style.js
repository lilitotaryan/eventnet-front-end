import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  pagination: {
    '& > * + *': {
      marginTop: theme.spacing(2),
      marginLeft: '50%',
    },
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export { useStyles };
