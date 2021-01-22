import React, { useState, useEffect } from 'react';
import { userActions } from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import MuiPhoneInput from 'material-ui-phone-number';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { theme } from '../style/MyProfileCss';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Error from './Error';

export default function EditProfile(props) {
  const { open, handleClose } = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.userData);
  const editUser = useSelector(state => state.updateData);
  const [success, setSuccess] = useState(false);
  const [canSave, setSave] = useState(true);
  const firstName = useName(setSave);
  const lastName = useName(setSave);
  const phone = usePhone(setSave);

  const handleSuccessClick = () => {
    setSuccess(true);
  };

  const handleSuccessClose = () => {
    setSuccess(false);
  };

  useEffect(() => {
    if (
      !(
        editUser.first_name.length > 1 ||
        editUser.last_name.length > 1 ||
        editUser.phone_number.length === 12
      )
    ) {
      setSave(false);
    }
  }, [editUser]);

  function handleConfirm() {
    const updatedUser = {
      first_name: editUser.first_name.length > 1 ? editUser.first_name : user.first_name,
      last_name: editUser.last_name.length > 1 ? editUser.last_name : user.last_name,
      phone_number: editUser.phone_number.length === 12 ? editUser.phone_number : user.phone_number,
    };
    dispatch(userActions.edit(updatedUser, 'UPDATE_REQUEST'));
    if (canSave) {
      setSave(false);
      setSuccess(true);
      handleClose();
    }
  }

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
          <DialogContent>
            <DialogContentText>Complete the fields you want to edit</DialogContentText>
            <TextField
              id="standard-textarea"
              label="First Name "
              multiline
              fullWidth
              name="firstname"
              // value={editUser.first_name}
              onChange={(event, value) => {
                firstName.onChange(event);
                dispatch(
                  userActions.edit(
                    {
                      first_name: event.target.value,
                    },
                    'UPDATE_USER_DATA'
                  )
                );
              }}
              style={{ marginBottom: theme.spacing(3) }}
            />
            <TextField
              id="standard-textarea"
              label="Last Name"
              name="lastname"
              // value={editUser.last_name}
              onChange={(event, value) => {
                lastName.onChange(event);
                dispatch(
                  userActions.edit(
                    {
                      last_name: event.target.value,
                    },
                    'UPDATE_USER_DATA'
                  )
                );
              }}
              multiline
              fullWidth
              style={{ marginBottom: theme.spacing(4) }}
            />
            <MuiPhoneInput
              onChange={(event, value) => {
                phone.onChange(event);
                dispatch(
                  userActions.edit(
                    {
                      phone_number: event,
                    },
                    'UPDATE_USER_DATA'
                  )
                );
              }}
              // value={editUser.phone_number}
              defaultCountry="am"
              regions={'asia'}
              inputProps={{ minLength: 12, maxLength: 12 }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              style={{ margin: theme.spacing(1) }}
              startIcon={<CancelIcon />}
              onClick={() => {
                handleClose();
                setSave(false);
                dispatch(userActions.edit({}, 'EMPTY_FORM'));
              }}
            >
              Close
            </Button>
            <Button
              style={{ margin: theme.spacing(1), color: !canSave ? 'gray' : '#2196F3' }}
              startIcon={<SaveIcon />}
              onClick={handleConfirm}
              disabled={!canSave}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
      <Error
        open={success}
        handleClose={handleSuccessClose}
        handleClick={handleSuccessClick}
        vertical={'bottom'}
        horizontal={'center'}
        message={`Profile updated successfully!`}
        editProfile={true}
      />
    </div>
  );
}

function useName(handleSave) {
  const [value, setValue] = useState('');
  const [isValid, setValidName] = useState(false);
  const [error, setError] = useState('');

  function handleChange(event) {
    if (event.target.value.match(/^[a-zA-Z ]{2,30}$/) && event.target.value.length > 0) {
      setValue(event.target.value);
      setValidName(true);
      handleSave(true);
    } else {
      setValidName(false);
      setError('Invalid Input');
    }
  }

  return {
    value,
    setValue,
    onChange: handleChange,
    isValid,
    error,
  };
}

function usePhone(handleSave) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(true);
  const [isValidPhone, setValidPhone] = useState(false);

  function handleChange(value) {
    if (value.length === 12) {
      setValue(value);
      setValidPhone(true);
      setError('');
      handleSave(true);
    } else {
      setError('Invalid phone number');
      setValidPhone(false);
    }
  }

  return {
    value,
    setValue,
    onChange: handleChange,
    isValid,
    error,
    isValidPhone,
  };
}
