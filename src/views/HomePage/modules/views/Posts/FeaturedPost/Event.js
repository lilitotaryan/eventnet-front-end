import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import ReactCardFlip from 'react-card-flip';

const useStyles = makeStyles({
  root: {
    maxWidth: 370,
  },
  flippedRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: 400,
    height: 400,
  },
});

const cardImg =
  'https://images.pexels.com/photos/2440984/pexels-photo-2440984.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
export default function Event(props) {
  const [isFlipped, setFlipped] = useState(false);
  const { post } = props;

  function handleClick(e) {
    e.preventDefault();
    setFlipped(!isFlipped);
  }
  const classes = useStyles();

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <Card className={classes.root} onMouseOver={handleClick}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="400"
            image={cardImg}
            title="Contemplative Reptile"
            style={{ opacity: '0.9' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {post.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent onMouseLeave={handleClick}>
            <div className={classes.flippedRoot}>
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <GridList className={classes.gridList}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ width: '100%' }}
                >
                  {post.description}
                </Typography>
              </GridList>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </ReactCardFlip>
  );
}
