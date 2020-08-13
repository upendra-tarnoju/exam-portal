import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './adminPanel.module.css';
import * as actionTypes from '../../../action';
import axios from 'axios';
import cookie from 'js-cookie';
import { withRouter } from 'react-router-dom';

class AdminPanel extends Component {
	render() {
		return (
			<div className='pt-3'>
				<div className='text-center'>
					<img
						alt='logo'
						src={require('../../../assets/logo.png')}
						className={`${styles.logo}`}
					/>
					<h4 className='text-center text-light font-weight-normal'>
						Examin
					</h4>
				</div>
				<ul className='nav flex-column'>
					<li
						onClick={() => this.props.panelWindow('')}
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
					<li
						onClick={() => {
							axios
								.get(
									`${process.env.REACT_APP_BASE_URL}/api/admin/examiner`
								)
								.then((res) => {
									this.props.panelWindow(
										'examiner',
										'Manage Examiner'
									);
									this.props.examinerCount(res.data);
								});
						}}
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
					<li
						onClick={() => this.props.panelWindow('exam', 'Manage Exams')}
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
					<li
						onClick={() =>
							this.props.panelWindow('settings', 'Manage Settings')
						}
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
					<li
						onClick={() => {
							cookie.remove('token');
							cookie.remove('type');
							this.props.setAuthenticatedUser(false);
							this.props.history.push('/login');
						}}
						className={
							this.props.panel === 'settings'
								? `nav-item py-2 px-4 text-white ${styles.iconHover}`
								: `nav-item py-2 px-4 text-white-50 ${styles.iconHover}`
						}
					>
						<i
							className={
								this.props.panel === 'settings'
									? 'fa fa-sign-out fa-lg text-white pr-3'
									: 'fa fa-sign-out fa-lg text-white-50 pr-3'
							}
							aria-hidden='true'
						></i>{' '}
						Log out
					</li>
				</ul>
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
	connect(mapStateToProps, mapDispatchToProps)(AdminPanel)
);
