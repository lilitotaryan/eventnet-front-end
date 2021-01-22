import React from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import image from 'views/MyProfile/Images/sad.png';

export default function Wrong() {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item style={{ margintTop: '100px' }}>
        <img src={image} />
      </Grid>
      <Grid item>
        <Typography variant="h4" component="h2" gutterBottom>
          Something went wrong click{' '}
          <Link
            to={{
              pathname: '/',
            }}
          >
            here
          </Link>{' '}
          to return to home page.
        </Typography>
      </Grid>
    </Grid>
  );
}
