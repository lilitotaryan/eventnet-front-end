import { paymentConstants } from 'redux/constants';
import { makeGet, makeDelete, makePut, makePost } from 'App/components/CheckAuth/CheckAuth';
// import { history } from 'redux/helpers';

const edit = formObj => dispatch => {
  dispatch({
    type: paymentConstants.EDIT_FORM,
    key: formObj.key,
    payload: formObj.value,
  });
  //   makeGet('user/')
  //     .then(data => {
  //       dispatch({ type: userConstants.GET_SUCCESS, user: data.data });
  //     })
  //     .catch(error => dispatch({ type: userConstants.GET_FAILURE, error }));
};

const clearForm = () => dispatch => {
  dispatch({
    type: paymentConstants.EMPTY_FORM,
  });
  //   makeGet('user/')
  //     .then(data => {
  //       dispatch({ type: userConstants.GET_SUCCESS, user: data.data });
  //     })
  //     .catch(error => dispatch({ type: userConstants.GET_FAILURE, error }));
};

const stripeCall = data => dispatch => {
  dispatch({
    type: paymentConstants.STRIPE_CALL,
  });
  makePost('payment/')
    .then(data => {
      dispatch({ type: paymentConstants.STRIPE_CALL_SUCCESS, clientSectret: data });
    })
    .catch(error => dispatch({ type: paymentConstants.STRIPE_CALL_FAILURE, error }));
};

const reserveTicket = data => dispatch => {
  // dispatch({
  //   type: paymentConstants.MAKE_PAY,
  // });
  makePost('payment/ticket/', {}, data)
    .then(data => {
      dispatch({ type: paymentConstants.PAY_SUCCESS });
    })
    .catch(error => dispatch({ type: paymentConstants.PAY_FAILURE, error }));
};

const selectEvent = data => dispatch => {
  dispatch({
    type: paymentConstants.SELECT,
    data,
  });
  // makePost('payment/ticket/', {}, data)
  //   .then(data => {
  //     dispatch({ type: paymentConstants.PAY_SUCCESS });
  //   })
  //   .catch(error => dispatch({ type: paymentConstants.PAY_FAILURE, error }));
};

const getFreeTicket = (event_id, data) => dispatch => {
  makePost(`event/${event_id}/ticket/`, {}, data)
    .then(data => {
      dispatch({ type: paymentConstants.GET_TICKET_SUCCESS, payload: data });
    })
    .catch(error => dispatch({ type: paymentConstants.GET_TICKET_FAILURE, error }));
};

export default { edit, clearForm, stripeCall, reserveTicket, selectEvent, getFreeTicket };
