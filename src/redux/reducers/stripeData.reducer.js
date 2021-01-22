import { eventsConstants } from 'redux/constants';

const initialState = {
  authGotResponse: false,
  authData: {},
  error: '',
};
function stripeData(state = initialState, action) {
  switch (action.type) {
    case eventsConstants.GET_AUTH_DATA:
      return {
        authGotResponse: true,
        authData: action.data.errors ? '' : action.data,
        error:
          !action.data.errors && !action.data.errors.error_message
            ? ''
            : action.data.errors.error_message,
      };

    default:
      return state;
  }
}

export default stripeData;
