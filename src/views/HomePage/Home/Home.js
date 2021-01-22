import withRoot from '../modules/withRoot';
import React, { useEffect } from 'react';
import Axios from 'axios';
import { WindMillLoading } from 'react-loadingg';
import ProductCategories from '../modules/views/Categories/ProductCategories';
import { Grid } from '@material-ui/core';
import ProductHeroHome from '../modules/views/BgImage/ProductHeroHome';
import ProductHowItWorks from '../modules/views/HowWorks/ProductHowItWorks';
import Footer from '../modules/views/Footer/Footer';
import { postsText } from '../modules/views/Posts/Text/PostsText';
import Typography from '../modules/components/Typography';
import FeaturedPost from '../modules/views/Posts/FeaturedPost';
import AppAppBar from '../modules/views/Header/AppAppBar';

const getEvents = () => {
  return new Promise(async (resolve, reject) => {
    const response = await Axios.get('https://www.eventnet-api-staging.ml/event/all/', {
      headers: {
        'Content-Type': 'application/json',
        'API-KEY': '12bf8fffa86840aee50aeb408621f0ba9c131d8e0edca457ec68a48674f1d4a5',
      },
    });
    console.log(response.data);
    response.data.OK
      ? resolve({ data: response.data.data, OK: true })
      : resolve({ err: response.data.errors[0].error_message, OK: false });
  });
};

function Index() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    capture();
  }, []);
  const capture = async () => {
    setLoading(true);
    const response = await getEvents();
    if (response.OK) {
      // const
      setEvents(response.data.events.slice(0, 3));
      setLoading(false);
    } else {
      setEvents(postsText);
    }
  };

  // async function dispatchEvents() {
  //   await dispatch(eventsActions.getCompanyEvents());
  // }
  // useEffect(() => {
  //   async function fetchData() {
  //     await dispatchEvents();
  //   }
  //   fetchData();
  // }, []);

  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHeroHome />
      <Typography variant="h4" component="h2" align="center" style={{ marginTop: '35px' }}>
        Recent Events
      </Typography>

      <Grid container>
        {events.map((post, i) => (
          <FeaturedPost key={i} post={post} />
        ))}
      </Grid>

      <ProductHowItWorks />
      <ProductCategories />
      <Footer />
    </React.Fragment>
  );
}

export default withRoot(Index);
