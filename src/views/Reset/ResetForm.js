import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from 'redux/actions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'views/MyProfile/style/MyProfileCss';
import { TextField, Button } from '@material-ui/core';

export default function ResetForm(props) {
  const dispatch = useDispatch();
  const [isValid, setValid] = useState(false);

  function handleChange(event) {
    event.target.value === 'DELETE' ? setValid(true) : setValid(false);
  }

  function handleConfirm() {
    dispatch(userActions.deleteUser());
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>Please type 'DELETE' to delete your account.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="text"
            type="text"
            color="primary"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setValid(false);
              props.handleClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" disabled={!isValid}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
}
