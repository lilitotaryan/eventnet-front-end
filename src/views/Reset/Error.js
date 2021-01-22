import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { history } from 'redux/helpers';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Error(props) {
  const classes = useStyles();
  const msg = useSelector(state => state.userData.resetError);
  const loading = useSelector(state => state.userData.resetting);
  const resetSuccess = useSelector(state => state.userData.resetSuccess);
  const message = !resetSuccess
    ? msg
    : `Your Password has been successfully updated!
  You will be redirected to a signin page in a few seconds ...`;

  useEffect(() => {
    if (resetSuccess) {
      document.cookie = 'authToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      setTimeout(function() {
        history.push('/');
        window.location.reload();
      }, 3000);
      // ;
      // dispatch(
      //   userActions.editResetForm({
      //     old_password: '',
      //     newpassword: '',
      //     repeatedPassword: '',
      //   })
      // );
    }
  }, [resetSuccess]);

  const { vertical, horizontal } = props;

  return (
    <div className={classes.root}>
      {loading ? null : (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={props.open}
          onClose={props.handleClose}
          key={vertical + horizontal}
        >
          <Alert severity={resetSuccess ? 'success' : 'error'} onClose={props.handleClose}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
