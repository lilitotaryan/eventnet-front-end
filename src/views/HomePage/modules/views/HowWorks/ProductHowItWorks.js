import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../../components/Button';
import { Link as Rlink } from 'react-router-dom';
import Typography from '../../components/Typography';
import LockIcon from '@material-ui/icons/Lock';
import BookIcon from '@material-ui/icons/Book';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

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

function ProductHowItWorks(props) {
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
          How it works
        </Typography>
        <div>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div>
                  <LockIcon style={{ fontSize: 60 }} />
                </div>
                <Typography variant="h5" align="center">
                  Register in our platform.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div>
                  <BookIcon style={{ fontSize: 60 }} />
                </div>
                <Typography variant="h5" align="center">
                  Depending on your account type resgister an event or book a ticket.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div>
                  <EmojiEmotionsIcon style={{ fontSize: 60 }} />
                </div>
                <Typography variant="h5" align="center">
                  {'New offers every week. New experiences, new surprises. '}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Rlink to="/signup" style={{ textDecoration: 'none' }}>
          <Button color="primary" size="large" variant="contained" className={classes.button}>
            Get started
          </Button>
        </Rlink>
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
