import React from 'react';
import {
	Typography,
	Link,
	makeStyles,
	Menu,
	MenuItem,
	MenuList,
	ListItemIcon,
} from '@material-ui/core';
import { Settings, ExitToApp } from '@material-ui/icons';

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
	menuList: {
		padding: 0,
	},
	userButton: {
		color: 'black',
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
		paddingRight: 10,
		'&:hover': {
			borderRadius: 10,
			backgroundColor: '#585F63',
			color: 'white',
		},
	},
}));

const TypographyMenu = (props) => {
	const classes = useStyles();
	return (
		<Menu
			open={Boolean(props.anchorEl)}
			keepMounted
			getContentAnchorEl={null}
			disableAutoFocusItem
			id='user-menu'
			onClose={props.handleClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
		>
			<MenuList className={classes.menuList}>
				<MenuItem>
					<ListItemIcon>
						<Settings fontSize='small' />
					</ListItemIcon>
					<Typography variant='inherit'>Settings</Typography>
				</MenuItem>
				<MenuItem
					onClick={() => {
						props.handleClose();
						props.setLogoutModal(true);
					}}
				>
					<ListItemIcon>
						<ExitToApp fontSize='small' />
					</ListItemIcon>
					<Typography variant='inherit'>Logout</Typography>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

const AppbarCollapse = (props) => {
	let { active } = props;
	let [show, setModal] = React.useState(false);
	const [userMenu, setUserMenu] = React.useState(null);

	let logOutUser = () => {
		let userService = new UserService();
		userService.removeCookie();
		props.setAuthenticatedUser(false);
		setModal(false);
		props.history.push('/login');
	};

	const handleClick = (event) => {
		setUserMenu(event.currentTarget);
	};

	const handleClose = () => {
		setUserMenu(null);
	};

	const classes = useStyles();
	return (
		<div className={`ml-auto ${classes.buttonBar}`} id='appbar-collapse'>
			{props.authenticated ? (
				<div className='d-flex'>
					<Typography
						variant='body1'
						className={` text-white align-self-center mr-2 ${styles.navbarItem} cursor-pointer ${styles.activeTab}`}
					>
						My exams
					</Typography>
					<div
						aria-controls='user-menu'
						aria-haspopup='true'
						onClick={handleClick}
						className={`${classes.userButton} cursor-pointer`}
					>
						{`${props.name.split(' ')[0]}`}
					</div>
					<TypographyMenu
						anchorEl={userMenu}
						handleClose={handleClose}
						setLogoutModal={setModal}
					/>
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
