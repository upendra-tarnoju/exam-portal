import React, { Component } from 'react';
import cookie from 'js-cookie';
import styles from './admin.module.css';
import AdminPanel from './admin-panel-component/adminPanel';
import { connect } from 'react-redux';
import JwtDecode from 'jwt-decode';
import * as ActionTypes from '../../action';
import PanelContent from './panel-content-component/panelContent';

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
					<nav
						className={`col-md-3 d-md-block p-0 col-lg-2 bg-dark ${styles.sidebar}`}
					>
						<AdminPanel />
					</nav>
					<main className='col-md-9 ml-sm-auto col-lg-10 p-0'>
						{this.props.panel !== '' ? (
							<PanelContent />
						) : (
							<div className='text-center'>
								<h3>Select any option from panel to continue</h3>
							</div>
						)}
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
