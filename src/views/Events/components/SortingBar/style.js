import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
