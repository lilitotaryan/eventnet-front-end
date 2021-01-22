import React, { useEffect } from 'react';
import { WindMillLoading } from 'react-loadingg';

// @material-ui/core components
import Pagination from '@material-ui/lab/Pagination';
import GridContainer from 'components/Grid/GridContainer.js';
import Event from './components/Event';
import GridItem from 'components/Grid/GridItem.js';

import { useDispatch, useSelector } from 'react-redux';
import { eventsActions, sortingActions } from 'redux/actions';

import SortingBar from './components/SortingBar';
import Payment from 'views/Payment/Payment';

import { useStyles } from './style';

export default function Events() {
  const events = useSelector(state => state.eventsData.events);
  const pageNumber = useSelector(state => state.eventsData.pageNumber);
  const eventsGotResponse = useSelector(state => state.eventsData.eventsGotResponse);

  const page = useSelector(state => state.sortingData.pageNo);

  const dispatch = useDispatch();

  const [isVisible, setVisible] = React.useState(true);

  function handleVisibility() {
    setVisible(!isVisible);
  }

  async function dispatchEvents() {
    await dispatch(eventsActions.getEvents());
  }

  useEffect(() => {
    async function fetchData() {
      await dispatchEvents(1);
    }
    fetchData();
  }, []);

  const classes = useStyles();

  const handleChange = (event, value) => {
    dispatch(sortingActions.changePage(value));
    dispatchEvents();
  };
  const allMappedEvents =
    Array.isArray(events) &&
    events.map(event => (
      <Event
        key={event.public_id}
        public_id={event.public_id}
        title={event.title}
        description={event.description}
        start_date={event.start_date}
        end_date={event.end_date}
        fee={event.ticket_fee}
        vipFee={event.vip_ticket_fee}
        address={event.address}
        companyName={event.users.companies[0].name}
        setVisible={handleVisibility}
        availablePlaces={event.available_places}
        categories={event.category}
        isResponsibe={event.is_responsible}
      />
    ));

  return (
    <>
      {isVisible ? (
        <div>
          <GridContainer>
            <GridItem xs={12}>
              <div className={classes.ButtonGroup}>
                <SortingBar />
              </div>
            </GridItem>
            {allMappedEvents}
            {eventsGotResponse && events.length > 0 ? (
              <GridItem xs={12}>
                <div className={classes.pagination}>
                  <Pagination
                    count={pageNumber}
                    page={page}
                    onChange={handleChange}
                    defaultPage={1}
                    boundaryCount={2}
                    showFirstButton
                    showLastButton
                  />
                </div>
              </GridItem>
            ) : (
              ''
            )}

            {eventsGotResponse && events.length === 0 ? (
              <GridItem xs={12}>
                <h3 style={{ marginLeft: '50%', padding: '25px' }}>No Events to show</h3>
              </GridItem>
            ) : (
              ''
            )}
          </GridContainer>
          {!eventsGotResponse ? <WindMillLoading /> : ''}
        </div>
      ) : (
        <Payment setVisible={handleVisibility} />
      )}
    </>
  );
}
