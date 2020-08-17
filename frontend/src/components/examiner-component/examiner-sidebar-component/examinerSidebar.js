import React, { Component } from 'react';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionTypes from '../../../action';

class ExaminerSidebar extends Component {
	render() {
		return (
			<ul className='nav flex-column'>
				<li className={`nav-item py-2 px-4 text-white-50 iconHover`}>
					<i
						className='fa fa-sign-out fa-lg text-white-50 pr-3'
						aria-hidden='true'
					></i>{' '}
					Create exam
				</li>
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
