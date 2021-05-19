import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import ViewExaminers from './view-examiners-component/viewExaminers';
import AdminDashboard from './admin-dashboard-component/adminDashboard';
import ViewSubAdmin from './view-sub-admin-component/viewSubAdmin';

const useStyles = makeStyles((theme) => ({
	containerHeight: {
		height: 'calc(100% - 64px)',
	},
}));

const AdminSidebarContent = (props) => {
	const classes = useStyles();

	return (
		<div className={`bgGrey ${classes.containerHeight}`}>
			<Switch>
				<Route exact path='/admin' component={AdminDashboard} />
				<Route path='/admin/examiner' component={ViewExaminers} />
				<Route path='/admin/subadmin/details' component={ViewSubAdmin} />
				<Redirect from='/admin/*' to='/admin' />
			</Switch>
		</div>
	);
};

export default AdminSidebarContent;
