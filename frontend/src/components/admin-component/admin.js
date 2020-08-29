import React, { Component } from 'react';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import JwtDecode from 'jwt-decode';

import './admin.css';
import AdminSidebar from './admin-sidebar-component/adminSidebar';
import * as ActionTypes from '../../action';
import SidebarContent from './sidebar-content-component/sidebarContent';

class Admin extends Component {
	componentDidMount() {
		let cookieData = cookie.getJSON();
		if (Object.keys(cookieData).length !== 0) {
			let decodedToken = JwtDecode(cookieData.token);
			if (
				Date.now() >= decodedToken.exp * 1000 ||
				decodedToken.type !== 'admin'
			) {
				this.props.history.push('/login');
				this.props.setAuthenticatedUser(false);
			} else {
				this.props.setAuthenticatedUser(true);
			}
		} else {
			this.props.history.replace('/login');
			this.props.setAuthenticatedUser(false);
		}
	}

	render() {
		return (
			<div
				className={`d-flex ${this.props.toggle ? 'toggled' : ''}`}
				id='wrapper'
			>
				<AdminSidebar />
				<SidebarContent />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		panel: state.adminReducer.panel,
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
