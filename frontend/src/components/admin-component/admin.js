import React from 'react';
import { connect } from 'react-redux';

import './admin.css';
import AdminSidebar from './admin-sidebar-component/adminSidebar';
import * as ActionTypes from '../../action';
import SidebarContent from './sidebar-content-component/sidebarContent';

const Admin = (props) => {
	return (
		<div className={`d-flex ${props.toggle ? 'toggled' : ''}`} id='wrapper'>
			<AdminSidebar />
			<SidebarContent />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		toggle: state.adminReducer.sidebarToggle,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setAuthenticatedUser: (authenticatedState) => {
			dispatch({
				type: ActionTypes.SET_AUTHENTICATED_USER,
				authenticated: authenticatedState,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
