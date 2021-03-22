import React from 'react';
import { useLocation } from 'react-router';
import {
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
	IconButton,
} from '@material-ui/core';

import { MoreVert } from '@material-ui/icons';
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
}));

const Navbar = () => {
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

	return (
		<AppBar position='static' className='bg-white'>
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

export default Navbar;
