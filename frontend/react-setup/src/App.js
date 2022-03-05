import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import SignUp from './components/signup-component/signup';
import Login from './components/login-component/login';
import Admin from './components/admin-component/admin';
import Examiner from './components/examiner-component/examiner';
import ProtectedRoute from './hoc/protectedRoute';
import Student from './components/student-component/student';
import SubAdmin from './components/subadmin-component/subAdmin';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Home}></Route>
				<Route path='/signup' component={SignUp}></Route>
				<Route path='/login' component={Login}></Route>
				<Route path='/admin' component={ProtectedRoute(Admin, 'admin')}></Route>
				<Route
					path='/subAdmin'
					component={ProtectedRoute(SubAdmin, 'subAdmin')}
				/>
				<Route
					path='/examiner'
					component={ProtectedRoute(Examiner, 'examiner')}
				></Route>
				<Route path='/student' component={ProtectedRoute(Student, 'student')} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
