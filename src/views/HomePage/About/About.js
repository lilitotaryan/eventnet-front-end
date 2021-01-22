import withRoot from '../modules/withRoot';
import React from 'react';
import { Grid } from '@material-ui/core';
import ProductHero from '../modules/views/BgImage/ProductHero';
import ProductStory from '../modules/views/OurStory/ProductStory';
import Footer from '../modules/views/Footer/Footer';
import ProductCTA from '../modules/views/Subscribe/ProductCTA';
import AppAppBar from '../modules/views/Header/AppAppBar';
import Slider from 'views/HomePage/modules/views/Slider/components/Slider';

function Index() {
  const images = [
    require('views/HomePage/modules/views/Slider/events/1.jpg'),
    require('views/HomePage/modules/views/Slider/events/2.jpg'),
    require('views/HomePage/modules/views/Slider/events/3.jpg'),
    require('views/HomePage/modules/views/Slider/events/4.jpg'),
    require('views/HomePage/modules/views/Slider/events/5.jpg'),
  ];
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductStory />
      <Grid container>
        <Slider slides={images} />
        <ProductCTA />
      </Grid>
      <Footer />
    </React.Fragment>
  );
}

export default withRoot(Index);
