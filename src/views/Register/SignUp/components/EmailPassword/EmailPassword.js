import React, { useState } from 'react';
import {
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function EmailPassword(props) {
  const [showPassword, setVisibility] = useState(false);
  const [showRepeatedPassword, setRepeatedVisibility] = useState(false);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          name="email"
          fullWidth
          error={!props.isValidEmail && !props.canRegister}
          label="Email Address"
          helperText={!props.isValidEmail && !props.canRegister ? props.emailError : null}
          onChange={props.handleEmailChange}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth required>
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={!props.isValidPassword && !props.canRegister}
          >
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            error={!props.isValidPassword && !props.canRegister}
            type={showPassword ? 'text' : 'password'}
            onChange={props.handlePasswordChange}
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
            labelWidth={75}
          />
          <FormHelperText error={!props.isValidPassword && !props.canRegister}>
            {!props.isValidPassword && !props.canRegister ? props.passwordError : null}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth required>
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={!props.passwordMatches && !props.canRegister}
          >
            Repeat Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            error={!props.passwordMatches && !props.canRegister}
            type={showRepeatedPassword ? 'text' : 'password'}
            onChange={props.handleRepeatedPassword}
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
          <FormHelperText error={!props.passwordMatches && !props.canRegister}>
            {!props.passwordMatches && !props.canRegister ? props.error : null}
          </FormHelperText>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
}
