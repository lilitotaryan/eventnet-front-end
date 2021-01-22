import React, { useState } from 'react';
import { Grid, Typography, FormControlLabel, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Link as MaterialLink } from '@material-ui/core';
import TermsConditions from './TermsConditions';
import { useStyles, CustomCheckbox } from 'views/Register/SignUp/style/SignUpCss';

export default function FormFooter(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleClick = isOpen => {
    setOpen(isOpen);
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography align="center">
          <FormControlLabel onChange={props.onChange} control={<CustomCheckbox />} />
          Check here to indicate that you have read and agreed to the
          <MaterialLink onClick={() => handleClick(true)} className={classes.color}>
            {' '}
            EventNet Terms and Conditions
          </MaterialLink>
        </Typography>
        <TermsConditions handleClick={handleClick} open={open} />
      </Grid>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={!props.isChecked}
        className={classes.submit}
        onClick={props.handleSubmit}
        onKeyPress={e => {
          if (e.keyCode === 13 || e.which === 13) {
            e.preventDefault();
            props.handleSubmit();
          }
        }}
      >
        Sign Up
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link to={`/signin`} className={classes.routerLink}>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
