import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../../components/Typography';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
  },
  images: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '25vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url: 'url(' + require('../../../events/5.jpg') + ')',
      title: 'Color Festival',
      width: '40%',
      href: 'https://en.wikipedia.org/wiki/Holi',
    },
    {
      url: 'url(' + require('../../../events/2.jpg') + ')',
      title: 'Cinema',
      width: '20%',
      href: 'http://www.arm-cinema.am/',
    },
    {
      url: 'url(' + require('../../../events/9.jpg') + ')',
      title: 'Hiking',
      width: '40%',
      href: 'https://hikearmenia.org/',
    },
    {
      url: 'url(' + require('../../../events/3.jpg') + ')',
      title: 'Party',
      width: '36%',
      href: 'https://en.wikipedia.org/wiki/Party',
    },
    {
      url: 'url(' + require('../../../events/7.jpg') + ')',
      title: 'Hot Air Balloon Festival',
      width: '36%',
      href: 'https://news.am/eng/news/415419.html',
    },
    {
      url: 'url(' + require('../../../events/4.jpg') + ')',
      title: 'Music',
      width: '28%',
      href: 'https://musicofarmenia.com/events',
    },
    {
      url: 'url(' + require('../../../events/6.jpg') + ')',
      title: 'Wine Festival',
      width: '35%',
      href:
        'https://armeniadiscovery.com/en/event/areni-wine-festival#:~:text=The%20%E2%80%9CAreni%20Wine%E2%80%9D%20Festival%20is,for%20its%20great%20winemaking%20traditions.',
    },
    {
      url: 'url(' + require('../../../events/8.jpg') + ')',
      title: 'Science',
      width: '30%',
      href: 'https://www.sciencemag.org/',
    },
    {
      url: 'url(' + require('../../../events/1.jpg') + ')',
      title: 'Museum',
      width: '35%',
      href: 'https://www.tripadvisor.com/Attractions-g293931-Activities-c49-Armenia.html',
    },
  ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" align="center" component="h2">
        For all hobbies and all interests
      </Typography>
      <div className={classes.images}>
        {images.map(image => (
          <ButtonBase
            focusRipple={true}
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <Link href={image.href} rel="noopener noreferrer" target="_blank">
              <div
                className={classes.imageSrc}
                style={{
                  backgroundImage: image.url,
                }}
              />
              <div className={classes.imageBackdrop} />
              <div className={classes.imageButton}>
                <Typography component="h2" variant="h6" color="inherit">
                  {image.title}
                </Typography>
              </div>
            </Link>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);
