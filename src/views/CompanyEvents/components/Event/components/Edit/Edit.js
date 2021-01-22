import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
// import CardHeader from '@material-ui/core/CardHeader';
// import clsx from 'clsx';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import MuiDialogContent from '@material-ui/core/DialogContent';
import PhoneIcon from '@material-ui/icons/Phone';
import MuiPhoneInput from 'material-ui-phone-number';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
// core components
// import GridItem from 'components/Grid/GridItem.js';

// import Popover from '@material-ui/core/Popover';
// import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
// import InfoTable from './components/InfoTable';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { eventsActions } from 'redux/actions';

import { useStyles } from './style';

// const styles = theme => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

function Alert(props) {
  return <MuiAlert elevation={1} variant="filled" {...props} />;
}

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

export default function Edit(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    title: '',
    description: '',
    dateTimeStart: '',
    dateTimeEnd: '',
  });

  const [phone, setPhoneValue] = React.useState('');
  const [alertSuceess, setalertSuceess] = React.useState(false);
  const [alertError, setalertError] = React.useState(false);

  const handlePhoneChange = value => {
    setPhoneValue(value);
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setalertError(false);
    setalertSuceess(false);
  };

  const dispatch = useDispatch();

  const error = useSelector(state => state.eventsData);
  const editSuccess = useSelector(state => state.eventsData.editSuccess);
  const events = useSelector(state => state.eventsData);

  useEffect(() => {
    return () => {
      setalertError(false);
      setalertSuceess(true);
      setValues({
        title: '',
        description: '',
        dateTimeStart: null,
        dateTimeEnd: '',
      });
      setPhoneValue('');
    };
  }, [events]);

  useEffect(() => {
    return () => {
      setalertError(true);
      setalertSuceess(false);
    };
  }, [events]);

  const handleEeventSubmit = () => {
    console.log('submitting', values);
    dispatch(
      eventsActions.editEventAction(
        props.id,
        values.title,
        values.description,
        values.dateTimeStart,
        values.dateTimeEnd,
        phone
      )
    );
  };
  //   const handleClose = () => {
  //     setOpen(false);
  //     setMoreOpen(false);
  //   };

  return (
    <div>
      <DialogContent dividers>
        <div className={classes.text}>
          <TextField
            variant="outlined"
            required
            fullWidth
            autoFocus
            label="Edit of Title"
            value={values.title}
            onChange={handleChange('title')}
          />
        </div>
        <div className={classes.text}>
          <TextField
            variant="outlined"
            required
            fullWidth
            autoFocus
            label="Edit Description"
            value={values.description}
            onChange={handleChange('description')}
          />
        </div>

        <div className={classes.text}>
          <TextField
            id="datetime-local"
            label="Edit Start Date and Time"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.textFieldDate}
            InputLabelProps={{
              shrink: true,
            }}
            value={values.dateTimeStart}
            onChange={handleChange('dateTimeStart')}
          />
        </div>
        <div className={classes.text}>
          <TextField
            id="datetime-local"
            label="Edit End Date and Time"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.textFieldDate}
            InputLabelProps={{
              shrink: true,
            }}
            value={values.dateTimeEnd}
            onChange={handleChange('dateTimeEnd')}
          />
        </div>
        <div className={classes.text}>
          <Typography variant="h6">
            <IconButton>
              <PhoneIcon />
            </IconButton>
            <MuiPhoneInput
              value={phone}
              onChange={handlePhoneChange}
              defaultCountry="am"
              regions={'asia'}
              style={{ marginLeft: '30px' }}
              inputProps={{ minLength: 12, maxLength: 12 }}
              //  value={phone}
            />
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleEeventSubmit} color="primary">
          Edit
        </Button>
      </DialogActions>
      {editSuccess ? (
        <Snackbar open={alertSuceess} autoHideDuration={5000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity="success">
            {props.id} event was deleted!
          </Alert>
        </Snackbar>
      ) : (
        ''
      )}
      {error && error.length ? (
        <Snackbar onClose={handleAlertClose} open={alertError} autoHideDuration={5000}>
          <Alert onClose={handleAlertClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      ) : (
        ''
      )}
    </div>
  );
}

Edit.propTypes = {
  id: PropTypes.string.isRequired,
};
