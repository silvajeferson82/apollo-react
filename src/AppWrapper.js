import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
// import Error from './pages/Error';
// import NotFound from './pages/NotFound';
// import Access from './pages/Access';

class AppWrapper extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {
      location: { pathname },
    } = this.props;
    const token = localStorage.getItem('token');

    const routes = (pathname, token) =>
      ({
        // '/home': token !== null ? <App /> : <Login />,
          '/home': token === null ? <App /> : <App />
        //'/login': <Login />,
      }[pathname] || <Login />);

    return routes(pathname, token);
  }
}

export default withRouter(AppWrapper);
