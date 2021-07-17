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
import { withRouter } from 'react-router';

import styles from '../home.module.css';
import CollapseMenu from './collapseMenu';
import { connect } from 'react-redux';
import UserService from '../../services/userApi';
import * as ActionType from '../../action';
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
	activeUserButton: {
		backgroundColor: 'black',
		color: 'white !important',
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
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
	navbarItem: {
		fontFamily: 'Raleway',
		fontSize: 15,
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
	let [activeTab, setActiveTab] = React.useState(0);
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

	const handleTabChange = (index) => {
		setActiveTab(index);
		// let pathName = this.props.location.pathname.split('/')[2];
		// this.setState({ selectedTab: pathName });
		// this.props.history.listen((location, action) => {
		// 	let pathName = location.pathname.split('/')[2];
		// 	this.setState({ selectedTab: pathName });
		// });

		if (index === 0) props.history.push('/examiner/exam');
		else if (index === 1) props.history.push('/examiner/course');
		else if (index === 2) props.history.push('/examiner/students');
		else if (index === 3) props.history.push('/examiner/settings');
		else if (index === 4) return null;
		else if (index === 5) props.history.push('/admin');
		else if (index === 6) props.history.push('/admin/examiner');
		else if (index === 7) props.history.push('/admin/subadmin/details');
		else if (index === 8) props.history.push('/admin/settings');
	};

	const classes = useStyles();
	return (
		<div className={`ml-auto ${classes.buttonBar}`} id='appbar-collapse'>
			{props.authenticated ? (
				<div className='d-flex'>
					{props.role === 'student' ? (
						<div
							onClick={() => handleTabChange(4)}
							className={`${classes.userButton} cursor-pointer mr-2 ${
								activeTab === 0 ? classes.activeUserButton : ''
							}`}
						>
							My Exams
						</div>
					) : props.role === 'examiner' ? (
						<div className='d-flex'>
							<div
								onClick={() => handleTabChange(0)}
								className={`${classes.userButton} cursor-pointer mr-2 ${
									activeTab === 0 ? classes.activeUserButton : ''
								}`}
							>
								Exams
							</div>
							<div
								onClick={() => handleTabChange(1)}
								className={`${classes.userButton} cursor-pointer mr-2 ${
									activeTab === 1 ? classes.activeUserButton : ''
								}`}
							>
								Courses
							</div>
							<div
								onClick={() => handleTabChange(2)}
								className={`${classes.userButton} cursor-pointer mr-2 ${
									activeTab === 2 ? classes.activeUserButton : ''
								}`}
							>
								Students
							</div>
							<div
								onClick={() => handleTabChange(3)}
								className={`${classes.userButton} cursor-pointer mr-2 ${
									activeTab === 3 ? classes.activeUserButton : ''
								}`}
							>
								Settings
							</div>
						</div>
					) : props.role === 'admin' ? (
						<div className='d-flex'>
							<div
								onClick={() => handleTabChange(5)}
								className={`${classes.userButton} cursor-pointer mr-2 ${
									activeTab === 5 ? classes.activeUserButton : ''
								}`}
							>
								Dashboard
							</div>
							<div
								onClick={() => handleTabChange(6)}
								className={`${classes.userButton} cursor-pointer mr-2 ${
									activeTab === 6 ? classes.activeUserButton : ''
								}`}
							>
								Examiners
							</div>
							<div
								onClick={() => handleTabChange(7)}
								className={`${classes.userButton} cursor-pointer mr-2 ${
									activeTab === 7 ? classes.activeUserButton : ''
								}`}
							>
								Sub admin
							</div>
							<div
								onClick={() => handleTabChange(8)}
								className={`${classes.userButton} cursor-pointer mr-2 ${
									activeTab === 8 ? classes.activeUserButton : ''
								}`}
							>
								Settings
							</div>
						</div>
					) : null}
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
		role: state.adminReducer.role,
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AppbarCollapse)
);
