import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

ReactDOM.render(
	<BrowserRouter>
		<App />
		<ToastContainer autoClose={3000}/>
	</BrowserRouter>,
	document.getElementById('root')
);
