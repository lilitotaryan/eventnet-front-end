import React, { useEffect } from 'react';
import queryString from 'query-string';

import { history } from 'redux/helpers';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import Button from '@material-ui/core/Button';

import { useDispatch, useSelector } from 'react-redux';
import { eventsActions, userActions } from 'redux/actions';

export default function Processing() {
  const error = useSelector(state => state.stripeData.error);

  const authGotResponse = useSelector(state => state.stripeData.authGotResponse);

  const dispatch = useDispatch();

  async function dispatchAuthGet(state, code) {
    await dispatch(eventsActions.getAuth(state, code));
  }

  const handleClickOpen = () => {
    history.push('/addevent');
  };
  // const token = useSelector(state => state.stripeData.authData.auth_token);

  useEffect(() => {
    const values = queryString.parse(history.location.search);
    const state = values.state;
    console.log('state', state, 'values', values);
    const code = values.code;
    async function fetchData() {
      await dispatchAuthGet(state, code);
    }
    fetchData();
    return () => {
      console.log('update authGotResponse', authGotResponse, ' update error', error);
      // document.cookie = 'authToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      // document.cookie = 'authToken=' + token;
      dispatch(userActions.getUser());
    };
  }, [authGotResponse]);

  console.log('authGotResponse', authGotResponse, 'error', error);
  return (
    <GridContainer>
      {!authGotResponse ? (
        <div style={{ padding: '10px' }}>Processing...</div>
      ) : (
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Done
        </Button>
      )}
      {!authGotResponse && error.length > 0 ? <div>{error}</div> : ''}
    </GridContainer>
  );
}
