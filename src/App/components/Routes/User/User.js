import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { userActions } from 'redux/actions';
import { userRoutes, companyRoutes } from './routes';
import Processing from 'views/Processing';
import { useSelector, useDispatch } from 'react-redux';
import App from 'App/App';
import { WaveLoading } from 'react-loadingg';

export default function User() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!userInfo.loaded) {
      dispatch(userActions.getUser());
    }
    setLoaded(userInfo.loaded);
  }, [userInfo.loading]);

  const company = (
    <Switch>
      {companyRoutes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />;
      })}
      <Route exact path={'/processing'} component={Processing} key={1234} />
      <Redirect from="/signin" to="/events" />
    </Switch>
  );

  const user = (
    <Switch>
      {userRoutes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  );

  return (
    <>
      {loaded ? (
        <div>
          {userInfo.is_company ? (
            <App switchRoutes={company} routes={companyRoutes} />
          ) : (
            <App switchRoutes={user} routes={userRoutes} />
          )}
        </div>
      ) : (
        <WaveLoading />
      )}
    </>
  );
}
