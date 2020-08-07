import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Start from './components/start';
import Navbar from './components/header/navbar';
import SignUp from './components/signup-component/signup';
import Login from './components/login-component/login';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Start}></Route>
				<Route path='/signup' component={SignUp}></Route>
				<Route path='/login' component={Login}></Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
