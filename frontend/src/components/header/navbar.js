import React from 'react';
import { useLocation } from 'react-router';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import AppbarCollapse from './appbarCollapse';

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
}));

const Navbar = (props) => {
	const classes = useStyles();
	const location = useLocation();
	const [active, setActive] = React.useState(0);

	React.useEffect(() => {
		let pathname = location.pathname;
		if (pathname === '/examiner/exam') setActive(0);
		else if (pathname === '/examiner/course') setActive(1);
		else if (pathname === '/examiner/students') setActive(2);
		else if (pathname === '/examiner/settings') setActive(3);
		else if (pathname === '/admin') setActive(5);
		else if (pathname === '/admin/examiner') setActive(6);
		else if (pathname === '/admin/subadmin/details') setActive(7);
		else if (pathname === '/admin/settings') setActive(8);
	}, [location]);

	return (
		<AppBar position='static' className={clsx(classes.navbar)}>
			<Toolbar>
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
				<AppbarCollapse activeTab={active} setActiveTab={setActive} />
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
