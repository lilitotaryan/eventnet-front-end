import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { homeRoutes } from './routes';
import Auth from 'views/Register/Signin/Auth';

export default function Home() {
  // window.addEventListener("storage", e => {
  //   if (e.key === "token" && !e.oldValue && e.newValue !== null) {
  //     window.location.reload();
  //   }
  // });
  return (
    <Switch>
      {homeRoutes.map((elem, key) => {
        return <Route exact path={elem.path} component={elem.component} key={key} />;
      })}
      <Route path="/auth/forgot_password/" component={Auth} key={100} />;
      {/* <Redirect from="/" to="/" /> */}
    </Switch>
  );
}
