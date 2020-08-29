import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';

import * as actionTypes from '../../../action';
import AdminService from '../../../services/adminApi';
import UserService from '../../../services/userApi';

class AdminSidebar extends Component {
	constructor(props) {
		super(props);
		this.adminService = new AdminService();
		this.userService = new UserService();
	}
	handleAdminQueryParams(params) {
		if (params.tab === 'examiner') {
			this.adminService.getAllExaminer().then((res) => {
				this.props.panelWindow('examiner', 'Manage Examiner');
				this.props.examinerCount(res.data);
			});
		} else if (params.tab === undefined) {
			this.props.panelWindow('', 'Dashboard');
		}
	}

	componentDidMount() {
		let params = queryString.parse(this.props.location.search);
		this.handleAdminQueryParams(params);
		this.props.history.listen((location, action) => {
			let params = queryString.parse(location.search);
			this.handleAdminQueryParams(params);
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
						href='#'
						className={`list-group-item list-group-item-action bg-dark adminIcon ${
							this.props.panel === '' ? 'text-white' : 'text-white-50'
						}`}
					>
						<i className='fa fa-desktop'></i> Dashboard
					</Link>
					<Link
						to='/admin?tab=examiner'
						className={`list-group-item list-group-item-action bg-dark ${
							this.props.panel === 'examiner'
								? 'text-white'
								: 'text-white-50'
						}`}
					>
						<i className='fa fa-user-circle'></i> Examiners
					</Link>
					<Link
						to='/admin?tab=exam'
						className={`list-group-item list-group-item-action bg-dark ${
							this.props.panel === 'exam'
								? 'text-white'
								: 'text-white-50'
						}`}
					>
						<i className='fa fa-book'></i> Exam
					</Link>
					<Link
						to='/admin?tab=setting'
						className={`list-group-item list-group-item-action bg-dark ${
							this.props.panel === 'settings'
								? 'text-white'
								: 'text-white-50'
						}`}
					>
						<i className='fa fa-cog'></i> Settings
					</Link>
					<a
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

const mapStateToProps = (state) => {
	return {
		panel: state.adminReducer.panel,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		panelWindow: (source, heading) => {
			dispatch({
				type: actionTypes.SET_PANEL_WINDOW,
				panelValue: source,
				panelHeading: heading,
			});
		},
		examinerCount: (count) => {
			dispatch({
				type: actionTypes.SET_EXAMINER_COUNT,
				examinerCount: count,
			});
		},
		setAuthenticatedUser: (authenticatedState) => {
			dispatch({
				type: actionTypes.SET_AUTHENTICATED_USER,
				authenticated: authenticatedState,
			});
		},
	};
};
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AdminSidebar)
);
