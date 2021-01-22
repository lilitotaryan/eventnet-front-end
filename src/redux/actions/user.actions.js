import { userConstants } from 'redux/constants';
import Axios from 'axios';
import {
  makeGet,
  makeDelete,
  makePost,
  makePatch,
  logout,
} from 'App/components/CheckAuth/CheckAuth';
import { history } from 'redux/helpers';
// console.log(history.location.pathname);

const getUser = () => dispatch => {
  dispatch({
    type: userConstants.GET_REQUEST,
  });
  makeGet('user/')
    .then(data => {
      if (data.OK) {
        dispatch({ type: userConstants.GET_SUCCESS, user: data.data });
      } else {
        document.cookie = 'authToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        dispatch({ type: userConstants.GET_FAILURE, error: data.errors });
        history.push('/signin');
      }
    })
    .catch(error => dispatch({ type: userConstants.GET_FAILURE, error }));
};

const reset = credentials => dispatch => {
  dispatch({ type: userConstants.RESET_REQUEST });
  makePost('user/reset_password/', {}, credentials)
    .then(data => {
      if (data.OK) {
        dispatch({ type: userConstants.RESET_SUCCESS, payload: true });
      } else {
        const error = data.errors[0];
        console.log(error);

        dispatch({
          type: userConstants.RESET_FAILURE,
          payload:
            error.error_code === 21
              ? `Error in ${error.error_fields[0].error_field}: ${error.error_fields[0].error_message}`
              : error.error_message,
        });
      }
    })
    .catch(error => dispatch({ type: userConstants.RESET_FAILURE, error }));
};

const editResetForm = formValue => dispatch => {
  dispatch({ type: userConstants.EDIT_RESET_FORM, payload: formValue });
};

const edit = (updatedUser, actionType) => dispatch => {
  dispatch({ type: actionType, payload: updatedUser });
  if (actionType === 'UPDATE_REQUEST') {
    dispatch({ type: 'EMPTY_FORM', payload: updatedUser });
    makePatch('user/', {}, updatedUser)
      .then(data => {
        console.log(data);
        if (data.OK) {
          dispatch({ type: userConstants.UPDATE_SUCCESS, payload: updatedUser });
        }
      })
      .catch(error => dispatch({ type: userConstants.UPDATE_FAILURE, error }));
  }
};

const postAddress = address => dispatch => {
  dispatch({ type: userConstants.UPDATE_ADDRESS_REQUEST });
  makePost('user/address/', {}, address)
    .then(data => {
      console.log(data);
      if (data.OK) {
        dispatch({ type: userConstants.UPDATE_ADDRESS_SUCCESS, payload: address });
      } else {
        const error = data.errors[0];
        dispatch({
          type: userConstants.UPDATE_ADDRESS_FAILURE,
          payload:
            error.error_code === 21
              ? `Error in ${error.error_fields[0].error_field}: ${error.error_fields[0].error_message}`
              : error.error_message,
        });
      }
    })
    .catch(error => dispatch({ type: userConstants.UPDATE_ADDRESS_FAILURE, error }));
};

const getAddress = () => dispatch => {
  dispatch({ type: userConstants.UPDATE_REQUEST });
  makeGet('user/address/')
    .then(data => {
      console.log(data);
      dispatch({ type: userConstants.UPDATE_ADDRESS_SUCCESS, payload: data });
    })
    .catch(error => dispatch({ type: userConstants.UPDATE_ADDRESS_FAILURE, error }));
};

const updateAddress = updatedAddress => dispatch => {
  dispatch({ type: userConstants.UPDATE_ADDRESS_REQUEST });
  makePatch('user/address/', {}, updatedAddress)
    .then(data => {
      console.log(data);
      if (data.OK) {
        dispatch({ type: userConstants.UPDATE_ADDRESS_SUCCESS, payload: updatedAddress });
      } else {
        const error = data.errors[0];
        dispatch({
          type: userConstants.UPDATE_ADDRESS_FAILURE,
          payload:
            error.error_code === 21
              ? `Error in ${error.error_fields[0].error_field}: ${error.error_fields[0].error_message}`
              : error.error_message,
        });
      }
    })
    .catch(error => dispatch({ type: userConstants.UPDATE_ADDRESS_FAILURE, error }));
};

const deleteUser = () => dispatch => {
  dispatch({ type: userConstants.DELETE_REQUEST });
  makeDelete('user/', {}, {})
    .then(data => {
      dispatch({ type: userConstants.DELETE_SUCCESS, data });
      document.cookie = 'authToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      history.push('/');
      window.location.reload();
    })
    .catch(error => dispatch({ type: userConstants.DELETE_FAILURE, error }));
};

const getUserById = id => dispatch => {
  dispatch({
    type: userConstants.GET_REQUEST,
  });
  makeGet(`/api/v1/user/${id}`, {}, {}, false)
    .then(data => {
      dispatch({ type: userConstants.GET_SUCCESS, user: data });
    })
    .catch(error => dispatch({ type: userConstants.GET_FAILURE, error }));
};

const getFavorites = () => dispatch => {
  console.log('in get fav');

  dispatch({ type: userConstants.GET_FAV_REQUEST });
  new Promise(async (resolve, reject) => {
    const response = await Axios.get('https://www.eventnet-api-staging.ml/user/categories/', {
      headers: {
        'Content-Type': 'application/json',
        'JWT-TOKEN': document.cookie.replace(
          /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
          '$1'
        ),
        'API-KEY': '12bf8fffa86840aee50aeb408621f0ba9c131d8e0edca457ec68a48674f1d4a5',
      },
    });
    console.log(response.data);
    response.data.OK
      ? dispatch({ type: userConstants.GET_FAV_SUCCESS, payload: response.data.data.categories })
      : dispatch({
          type: userConstants.GET_FAV_FAILURE,
          err: response.data.errors[0].error_message,
        });
  });
};

const postFavorites = data => {
  return new Promise(async (resolve, reject) => {
    const response = await Axios.post(
      'https://www.eventnet-api-staging.ml/user/categories/',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'JWT-TOKEN': document.cookie.replace(
            /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
          ),
          'API-KEY': '12bf8fffa86840aee50aeb408621f0ba9c131d8e0edca457ec68a48674f1d4a5',
        },
      }
    );
    console.log(response.data);
    response.data.OK
      ? resolve(response.data)
      : reject({ err: response.data.errors[0].error_message });
  });
};

const deleteFavorites = data => {
  makeDelete('user/categories/', {}, data)
    .then(data => {
      console.log(data);
    })
    .catch(error => error);
};

export default {
  postAddress,
  getAddress,
  getUser,
  deleteUser,
  getUserById,
  reset,
  updateAddress,
  edit,
  editResetForm,
  getFavorites,
  postFavorites,
  deleteFavorites,
};
