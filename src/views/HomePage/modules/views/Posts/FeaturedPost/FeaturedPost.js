import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Event from './Event';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(12),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 8),
  },
  title: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(15),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  description: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
  },
  cardMedia: {
    width: 160,
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
}));

export default function FeaturedPost(props) {
  const { post } = props;
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <div className={classes.item}>
            <Grid item>
              <Event post={post} />
            </Grid>
          </div>
        </Grid>
      </Container>
    </section>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
