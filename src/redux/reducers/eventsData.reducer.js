import { eventsConstants } from 'redux/constants';

const initialState = {
  events: [],
  eventsGotResponse: false,
  pageNumber: 1,
  error: '',
  addError: '',
  editError: '',
  deleteError: '',
  addSuccess: false,
  editSuccess: false,
  deleteSuccess: false,
  editIsOpen: false,
  deleteIsOpen: false,
};
function eventsData(state = initialState, action) {
  switch (action.type) {
    case eventsConstants.GET_EVENTS_DATA:
      return {
        events: action.error ? [] : action.events.data.events,
        pageNumber: action.error ? 1 : action.events.data.last_page,
        eventsGotResponse: true,
        error: action.error ? action.error : '',
        addError: '',
        editError: '',
        deleteError: '',
        addSuccess: false,
        editSuccess: false,
        deleteSuccess: false,
      };

    // case eventsConstants.TOGGLE_EVENT_RESPONSE:
    //   return {
    //     events: [],
    //     eventsGotResponse: false,
    //   };

    case eventsConstants.CREATE_EVENT:
      return {
        ...state,
        events: action.error ? [...state.events] : [...state.events],
        addError: action.error ? action.error : '',
        addSuccess: action.error ? false : true,
      };

    case eventsConstants.DELETE_EVENTS_DATA:
      return {
        ...state,
        events: action.error
          ? [...state.events]
          : state.events.filter(event => action.eventId !== event.public_id),
        deleteError: action.error ? action.error : '',
        deleteSuccess: action.error ? false : true,
      };

    case eventsConstants.UPDATE_EVENTS_DATA:
      return {
        ...state,
        events: !action.error
          ? state.events.map(event =>
              event.id === action.eventId
                ? {
                    ...event,
                    title: action.title ? action.title : event.title,
                    descrition: action.descrition ? action.descrition : event.descrition,
                    start_date: action.start_date ? action.start_date : event.start_date,
                    end_date: action.end_date ? action.end_date : event.end_date,
                    contactPhone: action.contact_phone_number
                      ? action.contact_phone_number
                      : event.contactPhone,
                  }
                : event
            )
          : [...state.events],
        editError: action.error ? action.error : '',
        editSuccess: action.error ? false : true,
      };

    case eventsConstants.EDIT_CLOSE:
      return {
        ...state,
        editError: '',
        editSuccess: false,
        editIsOpen: false,
      };
    case eventsConstants._DELETE_CLOSE:
      return {
        ...state,
        deleteError: '',
        deleteSuccess: false,
        deleteIsOpen: false,
      };

    default:
      return state;
  }
}

export default eventsData;
