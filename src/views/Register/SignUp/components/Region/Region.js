import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStyles } from 'views/Register/SignUp/style/SignUpCss';
import { Grid } from '@material-ui/core';

export default function Region(props) {
  const classes = useStyles();

  const regions = [
    'Aragatsotn',
    'Ararat',
    'Armavir',
    'Gegharquniq',
    'Lori',
    'Kotayq',
    'Shirak',
    'Syuniq',
    'Vayots Dzor',
    'Tavush',
    'Yerevan',
  ];

  return (
    <Grid item xs={12}>
      <Autocomplete
        options={regions}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        getOptionLabel={option => option}
        onInputChange={props.onChange}
        renderOption={option => <React.Fragment>{option}</React.Fragment>}
        renderInput={params => (
          <TextField
            {...params}
            label="Choose a State"
            required={props.isRequired}
            variant="outlined"
            fullWidth
            helperText={!props.isValid && !props.canRegister ? props.error : null}
            error={!props.isValid && !props.canRegister}
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </Grid>
  );
}
