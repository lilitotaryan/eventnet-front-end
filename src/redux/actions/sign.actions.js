import { signConstants, userConstants } from 'redux/constants';
import { makePost, makeGet, logout } from 'App/components/CheckAuth/CheckAuth';
import { history } from 'redux/helpers';

const signUp = user => dispatch => {
  dispatch({
    type: signConstants.REGISTER_REQUEST,
  });
  makePost('user/', {}, user, false)
    .then(data => {
      dispatch({ type: signConstants.REGISTER_SUCCESS });
    })
    .catch(error => dispatch({ type: signConstants.REGISTER_FAILURE, error }));
};

const signIn = userCredentials => dispatch => {
  dispatch({ type: signConstants.LOGIN_REQUEST, payload: userCredentials });
  makePost('auth/login/', {}, userCredentials, true)
    .then(data => {
      if (data.OK) {
        if (!data.data.is_verified) {
          makeGet('auth/verify_email?email_sent=false', {}, {}).then(newData => {
            dispatch({ type: signConstants.LOGIN_SUCCESS, payload: data });
            dispatch({ type: signConstants.VERIFY_SUCCESS });
          });
          history.push('/verify');
        } else {
          dispatch({ type: signConstants.LOGIN_SUCCESS, payload: data });
          history.push('/events');
          window.location.reload();
        }
      } else {
        dispatch({ type: signConstants.LOGIN_FAILURE, error: data.errors });
      }
    })
    .catch(error => dispatch({ type: signConstants.LOGIN_FAILURE, error }));
};

const verify = userCredentials => dispatch => {
  dispatch({ type: signConstants.VERIFY_REQUEST });
  dispatch({ type: signConstants.LOGIN_REQUEST, payload: userCredentials });
  makePost('auth/login/', {}, userCredentials, true)
    .then(data => {
      makeGet('auth/verify_email?email_sent=false', {}, {}).then(newData => {
        if (newData.OK) {
          dispatch({ type: signConstants.LOGIN_SUCCESS, payload: data });
          dispatch({ type: signConstants.VERIFY_SUCCESS });
        } else {
          history.push('/error');
        }
      });
    })
    .catch(error => dispatch({ type: signConstants.VERIFYEMAIL_FAILURE, error }));
};

const recover = email => dispatch => {
  dispatch({ type: signConstants.RECOVER_REQUEST });
  makeGet(`auth/forgot_password/${email}/`, {}, {})
    .then(data => {
      dispatch({ type: signConstants.RECOVER_SUCCESS });
    })
    .catch(error => dispatch({ type: signConstants.RECOVER_FAILURE, error }));
};

const changePass = credentials => dispatch => {
  dispatch({ type: userConstants.RESET_REQUEST });
  makePost(`${history.location.pathname.slice(1)}`, {}, credentials)
    .then(data => {
      console.log(data);

      if (data.OK) {
        history.push('/signin');
      } else {
        const error = data.errors[0];
        console.log(error);

        dispatch({
          type: userConstants.RESET_FAILURE,
          payload:
            error.error_code === 21
              ? `${error.error_fields[0].error_message}`
              : error.error_message,
        });
      }
    })
    .catch(error => dispatch({ type: userConstants.RESET_FAILURE, error }));
};

const verifyEmail = token => dispatch => {
  dispatch({ type: signConstants.VERIFYEMAIL_REQUEST, token });
  makePost('auth/verify_email/', {}, token)
    .then(data => {
      if (data.OK) {
        dispatch({ type: signConstants.VERIFYEMAIL_SUCCESS, payload: data });
        history.push('/events');
      } else {
        history.push('/error');
      }
    })
    .catch(error => dispatch({ type: signConstants.VERIFYEMAIL_FAILURE, error }));
};

const signOut = () => dispatch => {
  makeGet('auth/logout/?expire_all=True', {}, {}).then(data => {
    logout();
    history.push('/');
    window.location.reload();
    dispatch({
      type: signConstants.LOGOUT_REQUEST,
      payload: false,
    });
  });
};

const updateState = () => dispatch => {
  dispatch({ type: 'UPDATE_STATE' });
};

export default { signIn, signUp, signOut, verify, verifyEmail, recover, updateState, changePass };
