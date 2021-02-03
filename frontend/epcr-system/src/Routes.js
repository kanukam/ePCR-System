import {Route, Redirect } from "react-router-dom";
import React from "react";


// If authenticated, render component, else, redirect to login page. Can be used for everything besides login route
export const ProtectedRoute = ({auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => auth? (
                <Component {...props}/>
            ):
                (
                    <Redirect to="/"/>
                )
            }
        />
    )
}

// If authorized, redirect to dashboard
export const ProtectedLogin = ({auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => !auth? (
                <Component />
            ):
                (
                    <Redirect to="/Dashboard" />
                )
            }
        />
    )
}
