import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Grid, Typography } from '@material-ui/core';
import { paymentActions } from 'redux/actions';

const ServiceForm = () => {
  const formValues = useSelector(state => state.payment);
  const dispatch = useDispatch();

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Additional data</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="date"
          label="date"
          name="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={formValues.date}
          onChange={e =>
            dispatch(
              paymentActions.edit({
                key: 'date',
                value: e.target.value,
              })
            )
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Service"
          name="service"
          variant="outlined"
          fullWidth
          value={formValues.service}
          onChange={e =>
            dispatch(
              paymentActions.edit({
                key: 'service',
                value: e.target.value,
              })
            )
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Social Network?</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="facebook"
          name="facebook"
          variant="outlined"
          fullWidth
          value={formValues.facebook}
          onChange={e =>
            dispatch(
              paymentActions.edit({
                key: 'facebook',
                value: e.target.value,
              })
            )
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="twitter"
          name="twitter"
          variant="outlined"
          fullWidth
          value={formValues.twitter}
          onChange={e =>
            dispatch(
              paymentActions.edit({
                key: 'twitter',
                value: e.target.value,
              })
            )
          }
        />
      </Grid>
    </>
  );
};

export default ServiceForm;
