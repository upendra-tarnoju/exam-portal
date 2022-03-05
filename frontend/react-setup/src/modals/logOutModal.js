import React from 'react';
import { Modal, Paper, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { ErrorOutline } from '@material-ui/icons';

const useStyles = (theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		width: '35%',
		'&:focus': {
			outline: 'none',
		},
	},
});

const LogOutModal = (props) => {
	let { show, closeModal, classes } = props;

	return (
		<Modal
			className={classes.modal}
			open={show}
			onClose={() => closeModal(false)}
		>
			<Paper className={`${classes.paper} py-3 bgGrey`}>
				<div className='text-center'>
					<ErrorOutline
						style={{
							fontSize: '60',
							color: 'red',
						}}
					/>
				</div>
				<Typography variant='h4' className='p-3 text-center text-secondary'>
					ARE YOU SURE ?
				</Typography>
				<Typography variant='body1' className='text-center'>
					YOU WANT TO LOGOUT FROM THIS PANEL
				</Typography>
				<div className='text-center py-3'>
					<Button
						variant='outlined'
						className='bg-dark text-white mr-3'
						size='large'
						onClick={props.logOutUser}
					>
						Logout
					</Button>
					<Button
						variant='outlined'
						className='bg-white text-dark'
						size='large'
						onClick={() => closeModal(false)}
					>
						Cancel
					</Button>
				</div>
			</Paper>
		</Modal>
	);
};

export default withStyles(useStyles)(LogOutModal);
