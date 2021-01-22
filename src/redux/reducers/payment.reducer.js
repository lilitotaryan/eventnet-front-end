import { paymentConstants } from '../constants';
const initialState = {
  formValues: {
    date: '',
    service: '',
    facebook: '',
    twitter: '',
    firstname: '',
    lastname: '',
    email: '',
    line1: '',
    line2: '',
    postal_code: '',
    city: '',
    country: null,
    currency: null,
    amount: '',
  },
};

export default function payment(state = initialState, action) {
  switch (action.type) {
    case paymentConstants.EDIT_FORM:
      state.formValues[action.key.toLowerCase()] = action.payload;
      return { ...state };
    case paymentConstants.EMPTY_FORM:
      return {
        ...state,
        formValues: initialState.formValues,
      };
    default:
      return state;
  }
  return state;
}
