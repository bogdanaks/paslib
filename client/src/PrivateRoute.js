import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Comp, auth, path, ...rest }) => {
    return (
      <Route
        exact
        path={path}
        {...rest}
        render={props => {
          return auth ? <Comp {...props} /> : <Redirect to="/auth" />;
        }}
      />
    );
  };

export default PrivateRoute
