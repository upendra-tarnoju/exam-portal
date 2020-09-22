import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionTypes from '../../../action';
import AdminService from '../../../services/adminApi';
import UserService from '../../../services/userApi';

class AdminSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: '',
		};
		this.adminService = new AdminService();
		this.userService = new UserService();
	}

	componentDidMount() {
		let pathName = this.props.location.pathname.split('/')[2];
		this.setState({ selectedTab: pathName });
		this.props.history.listen((location, action) => {
			let pathName = location.pathname.split('/')[2];
			this.setState({ selectedTab: pathName });
		});
	}

	render() {
		return (
			<div className='bg-dark' id='sidebar-wrapper'>
				<div className='text-center pt-4'>
					<img
						alt='logo'
						src={require('../../../assets/logo.png')}
						className='logo'
					/>
					<h4 className='text-center text-light font-weight-normal'>
						Examin
					</h4>
				</div>
				<div className='list-group list-group-flush'>
					<Link
						to='/admin'
						className={`list-group-item list-group-item-action bg-dark adminIcon ${
							this.state.selectedTab === undefined
								? 'text-white'
								: 'text-white-50'
						}`}
					>
						<i className='fa fa-desktop'></i> Dashboard
					</Link>
					<Link
						to='/admin/examiner'
						className={`list-group-item list-group-item-action bg-dark ${
							this.state.selectedTab === 'examiner'
								? 'text-white'
								: 'text-white-50'
						}`}
					>
						<i className='fa fa-user-circle'></i> Examiners
					</Link>
					<Link
						to='/admin/exam'
						className={`list-group-item list-group-item-action bg-dark ${
							this.state.selectedTab === 'exam'
								? 'text-white'
								: 'text-white-50'
						}`}
					>
						<i className='fa fa-book'></i> Exam
					</Link>
					<Link
						to='/admin/setting'
						className={`list-group-item list-group-item-action bg-dark ${
							this.state.selectedTab === 'settings'
								? 'text-white'
								: 'text-white-50'
						}`}
					>
						<i className='fa fa-cog'></i> Settings
					</Link>
					<a
						href='/login'
						onClick={() => {
							this.userService.removeCookie();
							this.props.setAuthenticatedUser(false);
							this.props.history.push('/login');
						}}
						className='list-group-item cursor-pointer list-group-item-action bg-dark text-white-50'
					>
						<i className='fa fa-sign-out'></i> Sign Out
					</a>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setAuthenticatedUser: (authenticatedState) => {
			dispatch({
				type: actionTypes.SET_AUTHENTICATED_USER,
				authenticated: authenticatedState,
			});
		},
	};
};
export default withRouter(connect(null, mapDispatchToProps)(AdminSidebar));
