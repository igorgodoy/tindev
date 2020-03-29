import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login.js';
import Main from './pages/Main.js';

import { isAuthenticated } from "./services/Auth.js";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

function Routes() {
  return (
    <BrowserRouter>
      {/* Switch não permite que mais de uma rota seja chamada ao mesmo tempo */}
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/main/:devId" component={Main} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
  
  export default Routes;