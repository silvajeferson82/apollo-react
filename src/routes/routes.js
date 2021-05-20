import React from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';

const Route = () => ({ isPrivate = false, component: Component, ...rest }) => {
  const user = true;

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/home',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
