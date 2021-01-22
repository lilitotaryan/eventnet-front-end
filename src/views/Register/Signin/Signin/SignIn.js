import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Footer from 'views/Footer/Footer';
import { signActions } from 'redux/actions';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { useStyles, theme } from '../style/SigninCss';
import { deviceDetect } from 'react-device-detect';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles1 = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loginIsValid, setLoginIsValid] = useState(true);

  const email = useEmail();
  const password = usePassword();
  const [open, setOpen] = useState(false);
  const [err, setError] = useState('');
  const signinInfo = useSelector(state => state.userAuth);

  const classes1 = useStyles1();
  const state = {
    vertical: 'top',
    horizontal: 'right',
  };

  useEffect(() => {
    dispatch(signActions.updateState());
  }, []);

  useEffect(() => {
    if (signinInfo.loggedIn === false && signinInfo.error) {
      setOpen(true);
      setError(signinInfo.error);
    }
    return function cleanup() {
      setOpen(false);
    };
  }, [signinInfo.loggedIn, signinInfo.error]);

  const { vertical, horizontal } = state;

  const handleClose = () => {
    setOpen(false);
  };

  function handleLogin() {
    if (email.isValidEmail && password.isValidPassword) {
      const user = {
        email: email.value,
        password: password.value,
        device_brand: 'Samsung',
        os_system: `${deviceDetect().osName}`,
      };
      dispatch(signActions.signIn(user));
    } else {
      setLoginIsValid(false);
      console.log('false');
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <MuiThemeProvider theme={theme}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {/* <form className={classes.form} noValidate> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!email.isValidEmail && !loginIsValid}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={email.onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!password.isValidPassword && !loginIsValid}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={password.onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!(email.isValidEmail && password.isValidPassword)}
              onClick={handleLogin}
              onKeyPress={e => {
                if (e.keyCode === 13 || e.which === 13) {
                  e.preventDefault();
                  handleLogin();
                }
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={`/forgot`} className={classes.routerLink}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to={`/signup`} className={classes.routerLink}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Footer />
            </Box>
            {/* </form> */}
          </MuiThemeProvider>
        </div>
      </Grid>
      <div className={classes1.root}>
        {signinInfo.loggingin ? null : (
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}
          >
            <Alert severity={'error'} onClose={handleClose}>
              {err}
            </Alert>
          </Snackbar>
        )}
      </div>
    </Grid>
  );
}
function usePassword() {
  const [password, setPassword] = useState('');
  const [isValidPassword, setValidPassword] = useState(false);
  function handlePasswordChange(event) {
    if (event.target.value !== null && event.target.value.length) {
      setPassword(event.target.value);
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }
  return {
    value: password,
    onChange: handlePasswordChange,
    isValidPassword,
  };
}
function useEmail() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setValidEmail] = useState(false);
  function handleEmailChange(event) {
    if (event.target.value !== null && event.target.value.length) {
      setEmail(event.target.value);
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }
  return {
    value: email,
    onChange: handleEmailChange,
    isValidEmail,
  };
}
