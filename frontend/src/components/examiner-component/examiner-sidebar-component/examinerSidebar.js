import React, { Component } from 'react';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actionTypes from '../../../action';
import queryString from 'query-string';

class ExaminerSidebar extends Component {
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
			<ul className='nav flex-column'>
				<Link to='/examiner?tab=exam' className='text-decoration-none'>
					<li
						className={
							this.props.examinerTab === 'manageExam'
								? `nav-item py-2 px-4 text-white iconHover`
								: `nav-item py-2 px-4 text-white-50 iconHover`
						}
					>
						<i
							className={
								this.props.examinerTab === 'manageExam'
									? 'fa fa-book fa-lg text-white pr-3'
									: 'fa fa-book fa-lg text-white-50 pr-3'
							}
							aria-hidden='true'
						></i>{' '}
						Exam
					</li>
				</Link>
				<Link to='/examiner?tab=course' className='text-decoration-none'>
					<li
						className={
							this.props.examinerTab === 'manageCourse'
								? `nav-item py-2 px-4 text-white iconHover`
								: `nav-item py-2 px-4 text-white-50 iconHover`
						}
					>
						<i
							className={
								this.props.examinerTab === 'manageCourse'
									? 'fa fa-certificate fa-lg text-white pr-3'
									: 'fa fa-certificate fa-lg text-white-50 pr-3'
							}
							aria-hidden='true'
						></i>{' '}
						Courses
					</li>
				</Link>
				<li
					onClick={() => {
						cookie.remove('token');
						cookie.remove('type');
						this.props.setAuthenticatedUser(false);
						this.props.history.push('/login');
					}}
					className={`nav-item py-2 px-4 text-white-50 iconHover`}
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
