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
import { useDispatch } from 'react-redux';
import { useStyles, theme } from './style/Style';

export default function Confirm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const email = useEmail();

  function handleEmail() {
    dispatch(signActions.recover(email.value));
  }
  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmailIcon />
        </Avatar>
        <MuiThemeProvider theme={theme}>
          <Typography component="h1" variant="h5" align="center">
            Please type your email
          </Typography>
          <Typography component="h1" variant="body1" align="center">
            We will send a temporary password to your mailbox
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!email.isValid}
              name="email"
              label="email"
              type="email"
              id="email"
              onChange={email.onChange}
            />
            {/* <Button
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
              <Link to={`/signin`} className={classes.routerLink}>
                Verify
              </Link>
            </Button> */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleEmail}
            >
              Send
            </Button>
            <Link to={`/signin`} className={classes.routerLink}>
              <Button fullWidth variant="contained" color="primary" className={classes.submit}>
                Back
              </Button>
            </Link>
          </form>
        </MuiThemeProvider>
      </div>
    </Container>
  );
}
function useEmail() {
  const [email, setEmail] = useState('');
  const [isValid, setValid] = useState(true);
  function handleCodeChange(event) {
    if (event.target.value !== null && event.target.value.length) {
      setEmail(event.target.value);
      setValid(true);
    } else {
      setValid(false);
    }
  }
  return {
    value: email,
    onChange: handleCodeChange,
    isValid,
  };
}
