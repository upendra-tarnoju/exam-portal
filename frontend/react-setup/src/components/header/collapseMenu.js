import React from 'react';

import { Menu, MenuItem, Link } from '@material-ui/core';

const CollapseMenu = (props) => {
	return (
		<Menu
			id='simple-menu'
			anchorEl={props.anchorEl}
			keepMounted
			open={Boolean(props.anchorEl)}
			onClose={props.handleMenuClick}
		>
			<Link href='/login'>
				<MenuItem>Login</MenuItem>
			</Link>
			<Link href='/signup'>
				<MenuItem>Signup</MenuItem>
			</Link>
			<Link href='/pricing'>
				<MenuItem>Pricing</MenuItem>
			</Link>
		</Menu>
	);
};

export default CollapseMenu;
