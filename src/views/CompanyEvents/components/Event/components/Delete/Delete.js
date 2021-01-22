import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { eventsActions } from 'redux/actions';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Delete(props) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(eventsActions.removeEvent(props.id));
    // setDeleteOpen(false);
  };

  return (
    <div>
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Delete action is final. Do you want to remove the event?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </div>
  );
}

Delete.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
