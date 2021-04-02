import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import ViewExaminers from './view-examiners-component/viewExaminers';
import * as ActionType from '../../../action';
import AdminDashboard from './admin-dashboard-component/adminDashboard';

const AdminSidebarContent = (props) => {
	let handleSidebar = () => {
		let toggle = props.toggle;
		props.setSidebar(!toggle);
	};

	return (
		<div className='bgGrey'>
			<div className='h-100 mt-5'>
				<Switch>
					<Route exact path='/admin' component={AdminDashboard} />
					<Route path='/admin/examiner' component={ViewExaminers} />
					<Redirect from='/admin/*' to='/admin' />
				</Switch>
			</div>
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
