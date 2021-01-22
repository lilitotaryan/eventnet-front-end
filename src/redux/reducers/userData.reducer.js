import { userConstants } from '../constants';

const initialState = {
  first_name: '',
  last_name: '',
  phone_number: '+37455889968',
  gender: 'F',
  email: 'diana.gevorgyan16@gmail.com',
  birth_date: null,
  is_verified: false,
  is_termsandconditions_accepted: true,
  address: '',
  is_company: false,
  name: '',
  category: [[]],
  stripe_id: '',
};

function userData(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_REQUEST:
      console.log('here');

      return {
        loading: true,
      };
    case userConstants.GET_SUCCESS:
      return {
        stripe_id: action.user.stripe_id,
        first_name: action.user.first_name,
        last_name: action.user.last_name,
        phone_number: action.user.phone_number,
        gender: action.user.gender,
        email: action.user.email,
        birth_date: action.user.birth_date,
        is_verified: action.user.is_verified,
        address: action.user.address,
        is_company: action.user.is_company,
        name: action.user.name,
        loaded: true,
        token: document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, '$1'),
        loading: false,
      };
    case userConstants.GET_FAILURE:
      return {
        ...state,
        getError: action.error.error_message,
        loaded: false,
        loading: false,
      };
    case userConstants.UPDATE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.UPDATE_ADDRESS_REQUEST:
      return {
        ...state,
        updating: true,
        addressUpdated: false,
      };
    case userConstants.UPDATE_ADDRESS_SUCCESS:
      console.log(action);

      return {
        ...state,
        address: action.payload,
        addressUpdated: true,
        updating: false,
      };
    case userConstants.UPDATE_ADDRESS_FAILURE:
      return {
        ...state,
        addressError: action.payload,
        addressUpdated: false,
        updating: false,
      };
    case userConstants.RESET_REQUEST: {
      return { ...state, resetting: true };
    }
    case userConstants.RESET_SUCCESS:
      return {
        ...state,
        resetSuccess: action.payload,
        resetting: false,
      };
    case userConstants.RESET_FAILURE:
      return {
        ...state,
        resetError: action.payload,
        resetting: false,
        reset: false,
      };
    case userConstants.DELETE_REQUEST:
      return {
        ...state,
        deleting: true,
      };
    case 'RESET_DONE':
      return {
        ...state,
        resetSuccess: false,
      };
    default:
      return state;
  }
}

export default userData;
