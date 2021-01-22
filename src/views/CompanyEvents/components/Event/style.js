import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 450,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  button: {
    marginLeft: 'auto',
  },

  avatar: {
    backgroundColor: '#9c27b0',
  },
  text: {
    margin: '15px',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    flex: 1,
  },
  search: {
    color: 'white',
    marginRight: '8px',
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export { useStyles };
