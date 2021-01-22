import React, { useEffect } from 'react';
import { WindMillLoading } from 'react-loadingg';

// @material-ui/core components
import Pagination from '@material-ui/lab/Pagination';
// import Typography from '@material-ui/core/Typography';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import Event from './components/Event';
import GridItem from 'components/Grid/GridItem.js';

import { useDispatch, useSelector } from 'react-redux';
import { eventsActions, sortingActions } from 'redux/actions';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';

import SortingBar from './components/SortingBar';
import { useStyles } from './style';

export default function Events() {
  const events = useSelector(state => state.eventsData.events);
  const pageNumber = useSelector(state => state.eventsData.pageNumber);
  const page = useSelector(state => state.sortingData.pageNo);
  const eventsGotResponse = useSelector(state => state.eventsData.eventsGotResponse);

  const dispatch = useDispatch();

  async function dispatchEvents() {
    await dispatch(eventsActions.getCompanyEvents());
  }

  useEffect(() => {
    async function fetchData() {
      await dispatchEvents();
    }
    fetchData();
  }, []);

  const classes = useStyles();

  // const handleChange = event => {

  // };

  const handleChange = (event, value) => {
    dispatch(sortingActions.changePage(value));
    dispatchEvents();
  };

  const allMappedEvents =
    Array.isArray(events) &&
    events.map(event => (
      <Event
        id={event.public_id}
        key={event.public_id}
        title={event.title}
        description={event.description}
        start_date={event.start_date}
        end_date={event.end_date}
        fee={event.ticket_fee}
        vipFee={event.vip_ticket_fee}
        address={event.address}
        companyName={event.users.companies[0].name}
        availablePlaces={event.available_places}
        categories={event.category}
        isResponsibe={event.is_responsible}
      />
    ));

  return (
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
  );
}
