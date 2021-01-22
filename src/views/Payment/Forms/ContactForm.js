import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Grid, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { paymentActions } from 'redux/actions';

const ContactForm = () => {
  const formValues = useSelector(state => state.payment);
  const dispatch = useDispatch();

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Contact information</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="First Name"
          name="firstname"
          variant="outlined"
          required
          fullWidth
          value={formValues.firstname}
          onChange={e =>
            dispatch(
              paymentActions.edit({
                key: 'firstname',
                value: e.target.value,
              })
            )
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Last Name"
          name="lastname"
          variant="outlined"
          required
          fullWidth
          value={formValues.lastname}
          onChange={e =>
            dispatch(
              paymentActions.edit({
                key: 'lastname',
                value: e.target.value,
              })
            )
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField label="Email Address" name="email" variant="outlined" required fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Street Address 1"
          name="line1"
          variant="outlined"
          required
          fullWidth
          value={formValues.line1}
          onChange={e =>
            dispatch(
              paymentActions.edit({
                key: 'line1',
                value: e.target.value,
              })
            )
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Street Address 2 (optional)"
          name="line2"
          variant="outlined"
          fullWidth
          value={formValues.line2}
          onChange={e =>
            dispatch(
              paymentActions.edit({
                key: 'line2',
                value: e.target.value,
              })
            )
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Postal Code"
          name="postal_code"
          variant="outlined"
          required
          fullWidth
          value={formValues.postal_code}
          onChange={e =>
            dispatch(
              paymentActions.edit({
                key: 'postal_code',
                value: e.target.value,
              })
            )
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="City"
          name="city"
          variant="outlined"
          required
          fullWidth
          value={formValues.city}
          onChange={e =>
            dispatch(
              paymentActions.edit({
                key: 'city',
                value: e.target.value,
              })
            )
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Autocomplete
          options={countries}
          getOptionLabel={option => option.name}
          renderInput={params => (
            <TextField
              label="Country"
              name="country"
              variant="outlined"
              required
              fullWidth
              {...params}
            />
          )}
          value={formValues.country}
          onChange={(event, value) => {
            dispatch(
              paymentActions.edit({
                key: 'country',
                value: value,
              })
            );
          }}
        />
      </Grid>
    </>
  );
};

export default ContactForm;

const countries = [{ name: 'Armenia', code: 'AM' }];
