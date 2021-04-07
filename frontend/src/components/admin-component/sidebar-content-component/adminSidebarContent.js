import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import ViewExaminers from './view-examiners-component/viewExaminers';
import * as ActionType from '../../../action';
import AdminDashboard from './admin-dashboard-component/adminDashboard';

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
				<Redirect from='/admin/*' to='/admin' />
			</Switch>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		toggle: state.adminReducer.sidebarToggle,
		name: state.adminReducer.name,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSidebar: (toggle) => {
			dispatch({
				type: ActionType.COLLAPSE_SIDEBAR,
				toggle: toggle,
			});
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminSidebarContent);
