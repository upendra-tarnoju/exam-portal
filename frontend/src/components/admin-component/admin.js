import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navbar from '../header/navbar';
import ViewExaminers from './view-examiners-component/viewExaminers';
import AdminDashboard from './admin-dashboard-component/adminDashboard';
import ViewSubAdmin from './view-sub-admin-component/viewSubAdmin';
import Settings from './settings-component/settings';

const Admin = (props) => {
	return (
		<div className='h-100 bgGrey'>
			<Navbar {...props} />
			<Switch>
				<Route exact path='/admin' component={AdminDashboard} />
				<Route path='/admin/examiner' component={ViewExaminers} />
				<Route path='/admin/subadmin/details' component={ViewSubAdmin} />
				<Route path='/admin/settings' component={Settings} />
				<Redirect from='/admin/*' to='/admin' />
			</Switch>
		</div>
	);
};

export default Admin;
