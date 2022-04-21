import React from 'react';
import { Modal, Paper, withStyles, Typography } from '@material-ui/core';

import CreatePasswordForm from '../forms/createPasswordForm';

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
	},
});

const CreatePasswordModal = (props) => {
	let { show, classes } = props;
	return (
		<Modal
			className={classes.modal}
			open={show}
			onClose={() => props.hideModal(false)}
		>
			<Paper className={classes.paper}>
				<Typography variant='h6' className='p-3'>
					Change password
				</Typography>
				<CreatePasswordForm
					updatePassword={props.updatePassword}
					hideModal={props.hideModal}
				/>
			</Paper>
		</Modal>
	);
};

export default withStyles(useStyles)(CreatePasswordModal);
