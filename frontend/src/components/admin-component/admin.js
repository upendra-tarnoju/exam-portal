import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navbar from '../header/navbar';
import ViewExaminers from './view-examiners-component/viewExaminers';
import AdminDashboard from './admin-dashboard-component/adminDashboard';
import ViewSubAdmin from './view-sub-admin-component/viewSubAdmin';

const Admin = (props) => {
	return (
		<div className='h-100'>
			<Navbar {...props} />
			<Switch>
				<Route exact path='/admin' component={AdminDashboard} />
				<Route path='/admin/examiner' component={ViewExaminers} />
				<Route path='/admin/subadmin/details' component={ViewSubAdmin} />
				<Redirect from='/admin/*' to='/admin' />
			</Switch>
		</div>
	);
};

export default Admin;
