import React, { useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { userActions } from 'redux/actions';
import Home from './App/components/Routes/Home';
import User from './App/components/Routes/User';
import { useSelector, useDispatch } from 'react-redux';
import { history } from 'redux/helpers';
import { WaveLoading } from 'react-loadingg';

export default function App() {
  const dispatch = useDispatch();
  const getUserInfo = useSelector(state => state.userData);
  const [stateIsReserved, setReservedState] = useState(true);
  let loggedInfo = useSelector(state => state.userAuth);
  useEffect(() => {
    if (
      !(loggedInfo.loggedIn && loggedInfo.verified) &&
      document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    ) {
      dispatch(userActions.getUser());
      setReservedState(false);
    }
  }, []);

  return (
    <>
      {(stateIsReserved ? (
        loggedInfo.logging
      ) : (
        getUserInfo.loading
      )) ? (
        <WaveLoading />
      ) : (
        <Router history={history}>
          <Switch>
            {(stateIsReserved ? (
              loggedInfo.loggedIn && loggedInfo.verified
            ) : (
              getUserInfo.loaded && getUserInfo.is_verified
            )) ? (
              <>
                <Route path="/" component={User} />
                {/* <Redirect from="/" to="/myProfile" /> */}
              </>
            ) : (
              <>
                <Route path="/" component={Home} />
                {/* <Redirect from="/" to="/home" /> */}
              </>
            )}
          </Switch>
        </Router>
      )}
    </>
  );
}
