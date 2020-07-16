import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Start from './components/start';
import Navbar from './components/header/navbar';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Start}></Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
