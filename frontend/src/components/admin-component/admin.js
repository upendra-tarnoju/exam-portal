import React, { Component } from 'react';
import cookie from 'js-cookie';
import styles from './admin.module.css';
import AdminSidebar from './admin-sidebar-component/adminSidebar';
import { connect } from 'react-redux';
import JwtDecode from 'jwt-decode';
import * as ActionTypes from '../../action';
import SidebarContent from './sidebar-content-component/sidebarContent';
import Sidebar from '../sidebar-component/sidebar';

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
			<div className='container-fluid'>
				<div className='row'>
					<div
						className={`col-md-3 col-lg-2 bg-dark ${styles.sidenav} p-0`}
					>
						<Sidebar content={<AdminSidebar />} />
					</div>
					<main className='col-md-9 ml-sm-auto col-lg-10 p-0'>
						<SidebarContent />
					</main>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		panel: state.adminReducer.panel,
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
