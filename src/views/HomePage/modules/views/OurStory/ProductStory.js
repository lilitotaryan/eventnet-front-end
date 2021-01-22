import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../../components/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#E8EAF6',
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
    backgroundColor: 'black',
  },
});

function ProductStory(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography variant="h4" className={classes.title} component="h2">
          Our Story
        </Typography>
        <div>
          <Grid container>
            <Typography variant="h5" align="center">
              Armenian people are known for their unique and unlimited hospitality. Therefore, to
              help both locals and tourists to enjoy our culture and events, we tried to create a
              handy tool called EventNet. Our aim is to make EventNet a valuable software for event
              management and ticketing. We believe that it will be practical for anyone who plans to
              have a good time or visit Armenia (after the corona) for some time and enjoy to the
              fullest. Our platform will help its users to learn about events and purchase online
              tickets, which are happening not only in Yerevan but also in whole Armenia.{' '}
            </Typography>
          </Grid>
        </div>
      </Container>
    </section>
  );
}

ProductStory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductStory);
