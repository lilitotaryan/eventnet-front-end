import { eventsConstants } from 'redux/constants';
import {
  fetchEvents,
  postEvent,
  deleteEvent,
  editEvent,
  fetchCompanyEvents,
  authStripe,
} from 'data/providers';

const getEvents = () => (dispatch, getState) => {
  const { search, categories, states, cities, ordering, isAll, page } = getState().sortingData;

  fetchEvents(page, categories, states, cities, ordering, isAll, search)
    .then(events => {
      if (!events.OK) {
        dispatch({ type: eventsConstants.GET_EVENTS_DATA, error: events.errors[0].error_message });
      } else {
        dispatch({ type: eventsConstants.GET_EVENTS_DATA, events });
      }
    })
    .catch(e => console.error(e));
};

const getAuth = (state, code) => dispatch => {
  authStripe(state, code)
    .then(data => {
      console.log('auth data res', data);
      dispatch({ type: eventsConstants.GET_AUTH_DATA, data });
    })
    .catch(e => console.error(e));
};

const getCompanyEvents = () => (dispatch, getState) => {
  const { token } = getState().userData;
  const { search, page, categories, states, cities, ordering, isAll } = getState().sortingData;

  fetchCompanyEvents(page, token, categories, states, cities, ordering, isAll, search)
    .then(events => {
      if (!events.OK) {
        dispatch({ type: eventsConstants.GET_EVENTS_DATA, error: events.errors[0].error_message });
      } else {
        dispatch({ type: eventsConstants.GET_EVENTS_DATA, events });
      }
    })
    .catch(e => console.error(e));
};

const addEvent = (
  title,
  description,
  start_date,
  end_date,
  contactPhone,
  address1,
  address2,
  city,
  state,
  categories,
  ticket_fee,
  vip_ticket_fee,
  available_places,
  isResponsible,
  username
) => (dispatch, getState) => {
  const { token } = getState().userData;
  return postEvent(
    title,
    description,
    start_date,
    end_date,
    contactPhone,
    address1,
    address2,
    city,
    state,
    categories,
    ticket_fee,
    vip_ticket_fee,
    available_places,
    isResponsible,
    username,
    token
  )
    .then(event => {
      if (!event.OK) {
        console.log('add event error message', event.errors[0].error_message);
        const message =
          event.errors[0].error_code === 21
            ? event.errors[0].error_fields[0].error_field.toLocaleUpperCase() +
              ' ' +
              event.errors[0].error_fields[0].error_message.replace('This', ' ')
            : event.errors[0].error_message;
        dispatch({
          type: eventsConstants.CREATE_EVENT,
          error: message,
        });
      } else {
        dispatch({
          type: eventsConstants.CREATE_EVENT,
          event,
        });
      }
    })
    .catch(e => console.error(e));
};

const removeEvent = eventId => (dispatch, getState) => {
  const { token } = getState().userData;
  return deleteEvent(eventId, token)
    .then(event => {
      if (!event.OK) {
        dispatch({
          type: eventsConstants.DELETE_EVENTS_DATA,
          error: event.errors[0].error_message,
        });
      } else {
        dispatch({
          type: eventsConstants.DELETE_EVENTS_DATA,
          eventId,
        });
      }
    })
    .catch(e => console.error(e));
};

const editEventAction = (eventId, title, description, start_date, end_date, contactPhone) => (
  dispatch,
  getState
) => {
  const { token } = getState().userData;
  return editEvent(eventId, title, description, start_date, end_date, contactPhone, token)
    .then(event => {
      if (!event.OK) {
        console.log('edit event error message', event.errors[0].error_message);
        const message =
          event.errors[0].error_code === 21
            ? event.errors[0].error_fields[0].error_field.toLocaleUpperCase() +
              ' ' +
              event.errors[0].error_fields[0].error_message.replace('This', ' ')
            : event.errors[0].error_message;
        dispatch({
          type: eventsConstants.UPDATE_EVENTS_DATA,
          error: message,
        });
      } else {
        dispatch({
          type: eventsConstants.UPDATE_EVENTS_DATA,
          eventId,
          title,
          description,
          start_date,
          end_date,
          contactPhone,
        });
      }
    })
    .catch(e => console.error(e));
};

const handleEditClose = () => dispatch => dispatch({ type: eventsConstants.EDIT_CLOSE });

const handleDeleteClose = () => dispatch => dispatch({ type: eventsConstants.DELETE_CLOSE });

export default {
  getEvents,
  getCompanyEvents,
  addEvent,
  removeEvent,
  editEventAction,
  getAuth,
  handleEditClose,
  handleDeleteClose,
};
