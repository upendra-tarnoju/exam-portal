import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import UserService from '../../../services/userApi';
import * as actionTypes from '../../../action';

class ExaminerSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: '',
		};
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
						to='/examiner/exam'
						className={`list-group-item list-group-item-action bg-dark adminIcon ${
							this.state.selectedTab === 'exam'
								? 'text-white'
								: 'text-white-50'
						}`}
					>
						<i className='fa fa-book'></i> Exam
					</Link>
					<Link
						to='/examiner/course'
						className={`list-group-item list-group-item-action bg-dark adminIcon ${
							this.state.selectedTab === 'course'
								? 'text-white'
								: 'text-white-50'
						}`}
					>
						<i className='fa fa-certificate'></i> Course
					</Link>
					<Link
						to='/examiner/questions'
						className={`list-group-item list-group-item-action bg-dark adminIcon ${
							this.state.selectedTab === 'questions'
								? 'text-white'
								: 'text-white-50'
						}`}
					>
						<i className='fa fa-question-circle'></i> Questions
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

export default withRouter(connect(null, mapDispatchToProps)(ExaminerSidebar));
