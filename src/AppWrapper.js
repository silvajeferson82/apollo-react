// import React, { useEffect } from 'react';
// import { Route, withRouter, useLocation } from 'react-router-dom';
// import App from "./App";
// import { Login } from "./pages/Login";
// import { Error } from "./pages/Error";
// import { NotFound } from "./pages/NotFound";
// import { Access } from "./pages/Access";
// import PrivateRoute from './routes/PrivateRoute';
// import PrivateRouteDefault from './routes/PrivateRouteDefault';
// import SignIn from './pages/SignIn';
// import Dashboard from './components/Dashboard';

// const AppWrapper = (props) => {
// 	let location = useLocation();

// 	useEffect(() => {
// 		window.scrollTo(0, 0)
// 	}, [location]);

// 	switch (props.location.pathname) {
// 		case "/login":
// 			return <PrivateRouteDefault path="/login" component={SignIn} />
// 		// case "/login":
// 		// 	return <Route path="/login" component={Login} />
// 		// case "/error":
// 			// return <Route path="/error" component={Error} />
// 		default:
// 			return <PrivateRoute  component={App} />;
// 	}

// }


// export default withRouter(AppWrapper);