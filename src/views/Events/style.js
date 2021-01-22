import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  pagination: {
    '& > * + *': {
      marginTop: theme.spacing(2),
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
  typography: {
    padding: theme.spacing(2),
  },

  list: {
    maxHeight: '300px !important',
  },
}));

export { useStyles };
