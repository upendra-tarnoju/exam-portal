import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { withRouter, Link } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';

import styles from './adminSidebar.module.css';
import * as actionTypes from '../../../action';

class AdminSidebar extends Component {
	handleAdminQueryParams(params) {
		if (params.tab === 'examiner') {
			axios
				.get(`${process.env.REACT_APP_BASE_URL}/api/admin/examiner`)
				.then((res) => {
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
			<ul className='nav flex-column'>
				<Link to='/admin' className='text-decoration-none'>
					<li
						className={
							this.props.panel === ''
								? `nav-item py-2 px-4 text-white ${styles.iconHover}`
								: `nav-item py-2 px-4 text-white-50 ${styles.iconHover}`
						}
					>
						<i
							className={
								this.props.panel === ''
									? 'fa fa-desktop fa-lg text-white pr-3'
									: 'fa fa-desktop fa-lg text-white-50 pr-3'
							}
							aria-hidden='true'
						></i>{' '}
						Dashboard
					</li>
				</Link>
				<Link to='/admin?tab=examiner' className='text-decoration-none'>
					<li
						className={
							this.props.panel === 'examiner'
								? `nav-item py-2 px-4 text-white ${styles.iconHover}`
								: `nav-item py-2 px-4 text-white-50 ${styles.iconHover}`
						}
					>
						<i
							className={
								this.props.panel === 'examiner'
									? 'fa fa-user-circle fa-lg text-white pr-3'
									: 'fa fa-user-circle fa-lg text-white-50 pr-3'
							}
							aria-hidden='true'
						></i>{' '}
						Examiner
					</li>
				</Link>
				<Link to='/admin?tab=exam' className='text-decoration-none'>
					<li
						className={
							this.props.panel === 'exam'
								? `nav-item py-2 px-4 text-white ${styles.iconHover}`
								: `nav-item py-2 px-4 text-white-50 ${styles.iconHover}`
						}
					>
						<i
							className={
								this.props.panel === 'exam'
									? 'fa fa-book fa-lg text-white pr-3'
									: 'fa fa-book fa-lg text-white-50 pr-3'
							}
							aria-hidden='true'
						></i>{' '}
						Exam
					</li>
				</Link>
				<Link to='/admin?tab=setting' className='text-decoration-none'>
					<li
						className={
							this.props.panel === 'settings'
								? `nav-item py-2 px-4 text-white ${styles.iconHover}`
								: `nav-item py-2 px-4 text-white-50 ${styles.iconHover}`
						}
					>
						<i
							className={
								this.props.panel === 'settings'
									? 'fa fa-cog fa-lg text-white pr-3'
									: 'fa fa-cog fa-lg text-white-50 pr-3'
							}
							aria-hidden='true'
						></i>{' '}
						Settings
					</li>
				</Link>
				<li
					onClick={() => {
						cookie.remove('token');
						cookie.remove('type');
						this.props.setAuthenticatedUser(false);
						this.props.history.push('/login');
					}}
					className={`nav-item py-2 px-4 text-white-50 ${styles.iconHover}`}
				>
					<i
						className='fa fa-sign-out fa-lg text-white-50 pr-3'
						aria-hidden='true'
					></i>{' '}
					Log out
				</li>
			</ul>
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
