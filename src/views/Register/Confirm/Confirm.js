import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { signActions } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles, theme } from './Style';
import { WaveLoading } from 'react-loadingg';

export default function Confirm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let data = useSelector(state => state.userAuth);
  const verificationCode = useVerification();

  function handleVerification() {
    if (verificationCode.isValid) {
      dispatch(signActions.verifyEmail({ token: verificationCode.value }));
    }
  }

  function handleResend() {
    if (data.loggedIn) {
      dispatch(signActions.verify(data.user));
    }
  }
  return (
    <>
      {' '}
      {data.loggedIn ? (
        <Container component="main" maxWidth="xs" className={classes.container}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <EmailIcon />
            </Avatar>
            <MuiThemeProvider theme={theme}>
              <Typography component="h1" variant="h5" align="center">
                Please verify your email
              </Typography>
              <Typography component="h1" variant="body1" align="center">
                You're almost there! We sent an email to {data.user.email}
              </Typography>
              <Typography component="h1" variant="body1" align="center">
                Just put the verification code in the field below.
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={!verificationCode.isValid}
                  name="code"
                  label="code"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={verificationCode.onChange}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleVerification}
                  onKeyPress={e => {
                    if (e.keyCode === 13 || e.which === 13) {
                      e.preventDefault();
                      handleVerification();
                    }
                  }}
                >
                  Verify
                </Button>
                <Typography component="h1" variant="body1" align="center">
                  {' '}
                  If you don't see it, you may need to check your spam folder.
                </Typography>
                <Typography component="h1" variant="h6" align="center">
                  Still can't find the email ?
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleResend}
                >
                  Resend
                </Button>
                <Typography align="center">
                  <Link to="/" className={classes.toolbarLink}>
                    <span>Home</span>
                  </Link>
                  <Link to="/about" className={classes.toolbarLink}>
                    <span>About</span>
                  </Link>
                </Typography>
              </form>
            </MuiThemeProvider>
          </div>
        </Container>
      ) : (
        <WaveLoading />
      )}
    </>
  );
}
function useVerification() {
  const [verificationCode, setVerification] = useState('');
  const [isValid, setValid] = useState(true);
  function handleCodeChange(event) {
    if (event.target.value !== null && event.target.value.length) {
      setVerification(event.target.value);
      setValid(true);
    } else {
      setValid(false);
    }
  }
  return {
    value: verificationCode,
    onChange: handleCodeChange,
    isValid,
  };
}
