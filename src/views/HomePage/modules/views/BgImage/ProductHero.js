import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import Particles from 'react-particles-js';

const backgroundImage =
  'https://specials-images.forbesimg.com/imageserve/5e04ea52e961e1000739f249/960x0.jpg?fit=scale';
const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
  typ: {
    color: '#9C27B0',
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Particles
          params={{
            particles: {
              number: {
                value: 300,
                density: {
                  enable: true,
                  value_area: 1000,
                },
              },
            },
            line_linked: {
              shadow: {
                enable: true,
                color: '#3CA9D1',
                blur: 5,
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: 'repulse',
                },
              },
            },
          }}
        />
      </div>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2">
        We believe in fast and secure organization of events!
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Here is our story
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
