import React from 'react';
import { Typography, Link, makeStyles } from '@material-ui/core';

import styles from '../home.module.css';
import CollapseMenu from './collapseMenu';
import { connect } from 'react-redux';
import UserService from '../../services/userApi';
import * as ActionType from '../../action';
import { withRouter } from 'react-router';
import LogOutModal from '../../modals/logOutModal';

const useStyles = makeStyles((theme) => ({
	buttonBar: {
		[theme.breakpoints.down('xs')]: {
			display: 'none !important',
		},
		background: 'transparent',
	},
}));

const AppbarCollapse = (props) => {
	let { active } = props;
	let [show, setModal] = React.useState(false);

	let logOutUser = () => {
		let userService = new UserService();
		userService.removeCookie();
		props.setAuthenticatedUser(false);
		setModal(false);
		props.history.push('/login');
	};

	const classes = useStyles();
	return (
		<div className={`ml-auto ${classes.buttonBar}`} id='appbar-collapse'>
			{props.authenticated ? (
				<div className='d-flex'>
					<Typography variant='body1' className='text-info'>
						{`Hie ${props.name}`}
					</Typography>
					<Typography
						onClick={() => {
							setModal(true);
						}}
						variant='body1'
						className={`mx-2 ${styles.navbarItem} cursor-pointer text-dark`}
					>
						Logout
					</Typography>
				</div>
			) : (
				<div className='d-flex'>
					<Typography
						variant='body1'
						className={`mx-2 ${styles.navbarItem} cursor-pointer ${
							active === 'login' ? styles.activeTab : 'mt-1'
						}`}
					>
						<Link
							href='/login'
							className={active === 'login' ? 'text-white' : 'text-dark'}
						>
							Login
						</Link>
					</Typography>
					<Typography
						variant='body1'
						className={`mx-2 ${styles.navbarItem} cursor-pointer ${
							active === 'signup' ? styles.activeTab : 'mt-1 text-dark'
						}`}
					>
						<Link
							href='/signup'
							className={active === 'signup' ? 'text-white' : 'text-dark'}
						>
							Sign Up
						</Link>
					</Typography>
					<Typography
						variant='body1'
						className={`mx-2 ${styles.navbarItem} cursor-pointer ${
							active === 'pricing' ? styles.activeTab : 'mt-1 text-dark'
						} `}
					>
						<Link
							href='/pricing'
							className={active === 'pricing' ? 'text-white' : 'text-dark'}
						>
							Pricing
						</Link>
					</Typography>
				</div>
			)}

			<CollapseMenu
				anchorEl={props.anchorEl}
				handleMenuClick={props.handleMenuClick}
			/>
			<LogOutModal show={show} closeModal={setModal} logOutUser={logOutUser} />
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		setAuthenticatedUser: (authenticatedState) => {
			dispatch({
				type: ActionType.SET_AUTHENTICATED_USER,
				authenticated: authenticatedState,
			});
		},
	};
};

const mapStateToProps = (state) => {
	return {
		authenticated: state.adminReducer.authenticated,
		name: state.adminReducer.name,
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AppbarCollapse)
);
