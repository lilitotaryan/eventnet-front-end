import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import logo from '../logo.svg';

const useStyles = makeStyles(theme => ({
  topAppBar: {
    Height: '20vh',
    minHeight: '200px',
  },
  toolbar: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
    verticalAlign: 'middle',
    display: 'inline-flex',
  },
}));

const AppBars = props => {
  const classes = useStyles();
  const { setVisible } = props;
  return (
    <AppBar position="static" elevation={0} color="default" className={classes.topAppBar}>
      <Toolbar className={classes.toolbar}>
        <Grid
          container
          item
          direction="row"
          alignItems="flex-end"
          justify="space-between"
          xs={12}
          sm={6}
        >
          <Grid item>
            <Button onClick={setVisible} className={classes.button}>
              Go Back
            </Button>
          </Grid>
          <Grid item>
            <Typography
              className={classes.title}
              variant="h4"
              component="h1"
              noWrap
              color="primary"
            >
              Pay for Ticket
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppBars;
