import React from 'react';
import ReactDOM from 'react-dom';
import { store } from 'redux/store';
import { Provider } from 'react-redux';

import App from './App';
import 'assets/css/material-dashboard-react.css?v=1.8.0';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createBrowserHistory } from 'history';
// import { Router, Route, Switch } from 'react-router-dom';

// // core components
// import Home from './App/components/Routes/Home';
// import { User } from './App/components/Routes/User';
// import 'assets/css/material-dashboard-react.css?v=1.8.0';
// const loggedin = false;

// const hist = createBrowserHistory();

// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       {loggedin ? <Route path="/" component={User} /> : <Route path="/" component={Home} />}
//     </Switch>
//   </Router>,
//   document.getElementById('root')
// );
