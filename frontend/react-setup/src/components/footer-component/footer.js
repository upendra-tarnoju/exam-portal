import {
	AppBar,
	IconButton,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { Facebook, LinkedIn, Twitter, Instagram } from '@material-ui/icons';
import React from 'react';

const styles = makeStyles((theme) => ({
	footer: {
		top: 'auto',
		bottom: 0,
	},
}));

const Footer = () => {
	const classes = styles();
	return (
		<AppBar position='fixed' className={`bg-white ${classes.footer}`}>
			<Toolbar className='d-flex flex-row justify-content-between'>
				<Typography className='text-dark'>
					Copyright &copy; 2021. All rights reserved
				</Typography>
				<div>
					<IconButton>
						<Facebook style={{ color: 'black' }} />
					</IconButton>
					<IconButton>
						<Instagram style={{ color: 'black' }} />
					</IconButton>
					<IconButton>
						<LinkedIn style={{ color: 'black' }} />
					</IconButton>
					<IconButton>
						<Twitter style={{ color: 'black' }} />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Footer;
