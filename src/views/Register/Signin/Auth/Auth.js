import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, signActions } from 'redux/actions';
import Error from 'views/Reset/Error';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Button from '@material-ui/core/Button';
import {
  IconButton,
  Icon,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';
import { useStyles, theme } from 'views/MyProfile/style/MyProfileCss';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { history } from 'redux/helpers';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer.js';
let passwordValidator = require('password-validator');

export default function Auth() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formValue = useSelector(state => state.resetForm);
  // const old_password = usePassword();
  const newpassword = useNewPassword();
  const repeatedPassword = useRepeatedPassword();
  let msg = useSelector(state => state.userData.resetError);
  let resetSuccess = useSelector(state => state.userData.resetSuccess);

  const [reset, setValue] = useState(true);
  const [showOldPassword, setOldVisibility] = useState(false);
  const [showPassword, setVisibility] = useState(false);
  const [showRepeatedPassword, setRepeatedVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [err, setError] = useState(false);

  useEffect(() => {
    dispatch(
      userActions.editResetForm({
        // old_password: '',
        newpassword: '',
        repeatedPassword: '',
      })
    );
  }, []);

  function handleReset() {
    if (
      // old_password.isValidPassword &&
      newpassword.isValidPassword &&
      repeatedPassword.isValidPassword
    ) {
      dispatch(
        signActions.changePass({
          // old_password: old_password.value,
          password1: newpassword.value,
          password2: repeatedPassword.value,
        })
      );
      handleErrorClick();
    } else {
      setValue(false);
    }
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleErrorClick = () => {
    setError(true);
  };

  const handleErrorClose = () => {
    setError(false);
  };

  return (
    <>
      <GridContainer justify="center">
        <MuiThemeProvider theme={theme}>
          <GridItem xs={12} sm={12} md={4} style={{ marginTop: theme.spacing(13) }}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Forgot Password</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete the form to change your password
                </p>
              </CardHeader>
              <CardBody>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    required
                    style={{ marginTop: theme.spacing(1) }}
                  >
                    <InputLabel
                      htmlFor="outlined-adornment-password"
                      error={!newpassword.isValidPassword && !reset}
                    >
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      value={formValue.newpassword}
                      id="outlined-adornment-password"
                      error={!newpassword.isValidPassword && !reset}
                      type={showPassword ? 'text' : 'password'}
                      onChange={event => {
                        const value = event.target.value;
                        newpassword.handlePasswordChange(event);
                        dispatch(
                          userActions.editResetForm({
                            newpassword: value,
                          })
                        );
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setVisibility(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={120}
                    />
                    <FormHelperText error={!newpassword.isValidPassword && !reset}>
                      {!newpassword.isValidPassword && !reset ? newpassword.error : null}
                    </FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    required
                    style={{ marginTop: theme.spacing(1) }}
                  >
                    <InputLabel
                      htmlFor="outlined-adornment-password"
                      error={!repeatedPassword.isValidPassword && !reset}
                    >
                      Repeat Password
                    </InputLabel>
                    <OutlinedInput
                      value={formValue.repeatedPassword}
                      id="outlined-adornment-password"
                      error={!repeatedPassword.isValidPassword && !reset}
                      type={showRepeatedPassword ? 'text' : 'password'}
                      onChange={event => {
                        const value = event.target.value;
                        repeatedPassword.handleRepeatedPassword(event);
                        dispatch(
                          userActions.editResetForm({
                            repeatedPassword: value,
                          })
                        );
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setRepeatedVisibility(!showRepeatedPassword)}
                            edge="end"
                          >
                            {showRepeatedPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={140}
                    />
                    <FormHelperText error={!repeatedPassword.isValidPassword && !reset}>
                      {!repeatedPassword.isValidPassword && !reset ? 'Invalid Input' : null}
                    </FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} md={6}>
                  <Button color="primary" onClick={handleReset}>
                    {'Confirm'}
                  </Button>
                </GridItem>
              </CardBody>
            </Card>
          </GridItem>
        </MuiThemeProvider>
      </GridContainer>
      <Error
        open={err}
        handleClose={handleErrorClose}
        handleClick={handleErrorClick}
        vertical={'top'}
        horizontal={'center'}
      />
    </>
  );
}

function useNewPassword() {
  const [value, setValue] = useState('');
  const [isValidPassword, setValidPassword] = useState(false);
  const [error, setError] = useState('Field is required');

  function handlePasswordChange(event) {
    let schema = new passwordValidator();
    schema
      .is()
      .min(8)
      .is()
      .max(40)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits()
      .has()
      .not()
      .spaces()
      .is()
      .not()
      .oneOf(['Passw0rd', 'Password123']);

    if (schema.validate(event.target.value)) {
      setValidPassword(true);
    } else {
      switch (schema.validate(event.target.value, { list: true })[0]) {
        case 'min':
          setError('Password must contain at least 8 characters!');
          break;
        case 'max':
          setError('Password must contain at most 150 characters!');
          break;
        case 'spaces':
          setError('Password cannot contain spaces!');
          break;
        case 'digits':
          setError('Password must contain at least one number!');
          break;
        case 'lowercase':
          setError('Password must contain at least one lowercase letter!');
          break;
        case 'uppercase':
          setError('Password must contain at least one uppercase letter!');
          break;
        default:
          setError('Please enter a valid password');
      }
      setValidPassword(false);
    }
    setValue(event.target.value);
  }

  return {
    value,
    handlePasswordChange,
    isValidPassword,
    error,
  };
}

function useRepeatedPassword() {
  const [password, setPassword] = useState('');
  const [isValidPassword, setValidPassword] = useState(false);
  function handleRepeatedPassword(event) {
    if (event.target.value !== null && event.target.value.length) {
      setPassword(event.target.value);
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }
  return {
    handleRepeatedPassword,
    value: password,
    isValidPassword,
  };
}
