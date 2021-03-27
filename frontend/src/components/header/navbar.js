import React from 'react';
import { useLocation } from 'react-router';
import {
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
	IconButton,
} from '@material-ui/core';
import { MoreVert, Menu } from '@material-ui/icons';
import { connect } from 'react-redux';

import AppbarCollapse from './appbarCollapse';
import * as ActionType from '../../action';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
	buttonBar: {
		[theme.breakpoints.down('xs')]: {
			display: 'none !important',
		},
		background: 'transparent',
	},
	verticalButton: {
		[theme.breakpoints.up('sm')]: {
			display: 'none !important',
		},
	},
	navbar: {
		backgroundColor: 'white',
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},

	navbarShift: {
		width: 'calc(100% - 240px)',
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
}));

const Navbar = (props) => {
	const classes = useStyles();
	const location = useLocation();
	const [active, setActive] = React.useState('');

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	React.useEffect(() => {
		setActive(location.pathname.split('/')[1]);
	}, [location]);

	let handleSidebar = () => {
		let toggle = props.toggle;
		props.setSidebar(!toggle);
	};

	return (
		<AppBar
			position={props.authenticated ? 'fixed' : 'static'}
			className={clsx(classes.navbar, {
				[classes.navbarShift]: props.toggle,
			})}
		>
			<Toolbar>
				{props.authenticated ? (
					<IconButton color='primary' onClick={handleSidebar}>
						<Menu />
					</IconButton>
				) : null}

				<img
					src={require('../../assets/logo.png')}
					width='40'
					height='40'
					className='align-top mr-2'
					alt='logo'
				/>
				<Typography variant='h6' className='text-dark'>
					Examin
				</Typography>
				<AppbarCollapse
					active={active}
					anchorEl={anchorEl}
					handleMenuClick={handleClose}
				/>

				<div className={`ml-auto ${classes.verticalButton}`}>
					<IconButton onClick={handleMenuClick}>
						<MoreVert />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSidebar: (toggle) => {
			dispatch({
				type: ActionType.COLLAPSE_SIDEBAR,
				toggle: toggle,
			});
		},
	};
};

const mapStateToProps = (state) => {
	return {
		toggle: state.adminReducer.sidebarToggle,
		authenticated: state.adminReducer.authenticated,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
