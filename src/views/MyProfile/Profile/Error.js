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
  const msg = useSelector(state => state.userData.addressError);
  const loading = useSelector(state => state.userData.updating);
  const success = useSelector(state => state.userData.addressUpdated);
  const message = !success ? msg : props.message;

  // useEffect(() => {
  //   if (success) {
  //     // document.cookie = 'authToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  //     // setTimeout(function() {
  //     history.push('/myProfile');
  //     //   window.location.reload();
  //     // }, 3000);
  //     // ;
  //     // dispatch(
  //     //   userActions.editResetForm({
  //     //     old_password: '',
  //     //     newpassword: '',
  //     //     repeatedPassword: '',
  //     //   })
  //     // );
  //   }
  // }, [success]);

  const { vertical, horizontal } = props;

  return (
    <div className={classes.root}>
      {!props.editProfile ? (
        loading ? null : (
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={props.open}
            onClose={props.handleClose}
            key={vertical + horizontal}
          >
            <Alert severity={success ? 'success' : 'error'} onClose={props.handleClose}>
              {message}
            </Alert>
          </Snackbar>
        )
      ) : (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={props.open}
          onClose={props.handleClose}
          key={vertical + horizontal}
        >
          <Alert severity={'success'} onClose={props.handleClose}>
            {props.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
