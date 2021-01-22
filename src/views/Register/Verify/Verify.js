import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';

export default function Verify(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'VERIFY YOUR EMAIL ADDRESS'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To continue using EventNet, please verify your email address.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.verify} color="primary">
            <Link to={`/verify`}>Verify Email</Link>
          </Button>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Cancel{' '}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
