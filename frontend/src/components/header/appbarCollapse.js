import React from 'react';
import { Typography, Link, makeStyles } from '@material-ui/core';

import styles from '../home.module.css';
import CollapseMenu from './collapseMenu';

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

	const classes = useStyles();
	return (
		<div className={`ml-auto d-flex ${classes.buttonBar}`} id='appbar-collapse'>
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
			<CollapseMenu
				anchorEl={props.anchorEl}
				handleMenuClick={props.handleMenuClick}
			/>
		</div>
	);
};

export default AppbarCollapse;
