import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CopyRight from '../CopyRight';
import Divider from '@material-ui/core/Divider';
import { useStyles, theme } from '../style/FooterCss';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

export default function Footer(props) {
  const classes = useStyles();
  const { title } = props;

  return (
    <footer className={classes.footer}>
      <MuiThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Typography variant="h5" align="center" gutterBottom>
            {title}
          </Typography>
          <Typography align="center" gutterBottom>
            <Link
              href="https://github.com/SmartFarm-FTC/SmartFarm"
              className={classes.routerLink}
              target="_blank"
            >
              <GitHubIcon className={classes.black} />
            </Link>
            <Link
              href="https://twitter.com/SmartfarmF"
              className={classes.routerLink}
              target="_blank"
            >
              <TwitterIcon className={classes.lightBlue} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/smartfarm-ftc-3554901a3/"
              className={classes.routerLink}
              target="_blank"
            >
              <LinkedInIcon className={classes.linkedin} />
            </Link>
          </Typography>
          <CopyRight />
          <Typography component={'span'} gutterBottom>
            <Divider />
          </Typography>
          <Typography align="center">
            <RouterLink to="/" className={classes.toolbarLink}>
              <span>Home</span>
            </RouterLink>
            <RouterLink to="/about" className={classes.toolbarLink}>
              <span>About</span>
            </RouterLink>
          </Typography>
        </Container>
      </MuiThemeProvider>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
