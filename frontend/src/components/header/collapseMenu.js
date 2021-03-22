import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';

const CollapseMenu = (props) => {
	return (
		<Menu
			id='simple-menu'
			anchorEl={props.anchorEl}
			keepMounted
			open={Boolean(props.anchorEl)}
			onClose={props.handleMenuClick}
		>
			<MenuItem>Profile</MenuItem>
			<MenuItem>My account</MenuItem>
			<MenuItem>Logout</MenuItem>
		</Menu>
	);
};

export default CollapseMenu;
