import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Start from './start';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Start}></Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
