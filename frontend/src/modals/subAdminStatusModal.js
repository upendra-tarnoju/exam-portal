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
		width: '25%',
		'&:focus': {
			outline: 'none',
		},
	},
});

const SubAdminStatusModal = (props) => {
	let { show, closeModal, classes } = props;

	return (
		<Modal
			className={classes.modal}
			open={show}
			onClose={() => closeModal(false)}
		>
			<Paper className={`${classes.paper} bgGrey p-3`}>
				<Typography variant='h6' component='p' className='text-secondary'>
					ARE YOU SURE ?
				</Typography>
				<Typography variant='body1' component='p' className='my-3'>
					Do you want to {props.type === 'approved' ? 'APPROVE' : 'DECLINE'}{' '}
					this sub admin
				</Typography>
				<div className='d-flex justify-content-end mt-2'>
					<Button
						variant='outlined'
						className='bg-dark text-white mr-3'
						size='large'
						onClick={props.updateSubAdminStatus}
					>
						{props.type === 'approved' ? 'APPROVE' : 'DECLINE'}
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

export default withStyles(useStyles)(SubAdminStatusModal);
