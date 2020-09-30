import React from 'react';
import JwtDecode from 'jwt-decode';
import cookie from 'js-cookie';
import { connect } from 'react-redux';

import * as ActionTypes from '../action';

export default function (WrappedComponent) {
	class ProtectedRoute extends React.Component {
		checkAuthentication() {
			let cookieData = cookie.getJSON();
			if (Object.keys(cookieData).length !== 0) {
				let decodedToken = JwtDecode(cookieData.token);
				if (
					Date.now() >= decodedToken.exp * 1000 ||
					decodedToken.type !== 'examiner'
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

		componentDidMount() {
			this.checkAuthentication();
		}

		componentDidUpdate() {
			this.checkAuthentication();
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

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

	return connect(null, mapDispatchToProps)(ProtectedRoute);
}
