import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PublicRoute = ({component: Component, auth, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            auth && restricted ?
                <Redirect to="/list" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute
