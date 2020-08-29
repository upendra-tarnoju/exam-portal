import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import queryString from 'query-string';

import UserService from '../../../services/userApi';
import * as actionTypes from '../../../action';

class ExaminerSidebar extends Component {
	constructor(props) {
		super(props);
		this.userService = new UserService();
	}

	handleExaminerQueryParams(params) {
		if (params.tab === 'exam') {
			this.props.setExaminerTab('manageExam', 'Manage exam');
		} else if (params.tab === 'course') {
			this.props.setExaminerTab('manageCourse', 'Manage course');
		}
	}

	componentDidMount() {
		let params = queryString.parse(this.props.location.search);
		this.handleExaminerQueryParams(params);
		this.props.history.listen((location, action) => {
			let params = queryString.parse(location.search);
			this.handleExaminerQueryParams(params);
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
						to='/examiner?tab=exam'
						className={`list-group-item list-group-item-action bg-dark adminIcon ${
							this.props.examinerTab === 'manageExam'
								? 'text-white'
								: 'text-white-50'
						}`}
					>
						<i className='fa fa-book'></i> Exam
					</Link>
					<Link
						to='/examiner?tab=course'
						className={`list-group-item list-group-item-action bg-dark adminIcon ${
							this.props.examinerTab === 'manageCourse'
								? 'text-white'
								: 'text-white-50'
						}`}
					>
						<i className='fa fa-certificate'></i> Course
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
		examinerTab: state.examinerReducer.examinerTab,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setAuthenticatedUser: (authenticatedState) => {
			dispatch({
				type: actionTypes.SET_AUTHENTICATED_USER,
				authenticated: authenticatedState,
			});
		},
		setExaminerTab: (tabValue, heading) => {
			dispatch({
				type: actionTypes.SET_EXAMINER_TAB,
				tab: tabValue,
				heading: heading,
			});
		},
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ExaminerSidebar)
);
