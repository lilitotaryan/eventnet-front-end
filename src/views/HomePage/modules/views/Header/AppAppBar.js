import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as Rlink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import AppBar from '../../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../../components/Toolbar';
import Typography from '../../components/Typography';

const styles = theme => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
    '&:hover': {
      color: '#E040FB',
    },
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/premium-themes/onepirate/"
          >
            {'EventNet'}
          </Link>
          <div className={classes.right}>
            <Rlink to="/" style={{ textDecoration: 'none' }}>
              <Typography
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
              >
                {'Home'}
              </Typography>
            </Rlink>
            <Rlink to="/about" style={{ textDecoration: 'none' }}>
              <Typography
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
              >
                {'About'}
              </Typography>
            </Rlink>
            <Rlink to="/signin" style={{ textDecoration: 'none' }}>
              <Typography
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
              >
                {'Sign In'}
              </Typography>
            </Rlink>
            <Rlink to="/signup" style={{ textDecoration: 'none' }}>
              <Typography
                variant="h6"
                underline="none"
                className={classes.rightLink}
                href="/premium-themes/onepirate/sign-up/"
              >
                {'Sign Up'}
              </Typography>
            </Rlink>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
