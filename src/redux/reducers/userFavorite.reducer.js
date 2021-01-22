import { userConstants } from '../constants';

const initialState = {
  categories: [],
  loaded: false,
  loading: true,
};

function userFavorite(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_FAV_REQUEST:
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case userConstants.GET_FAV_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loaded: true,
        loading: false,
      };
    case userConstants.GET_FAV_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}

export default userFavorite;
