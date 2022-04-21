import {
	Modal,
	Paper,
	withStyles,
	Typography,
	Button,
	Backdrop,
	Fade,
} from '@material-ui/core';
import React from 'react';

const useStyles = (theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const ApproveDeclineModal = (props) => {
	let { show, classes } = props;

	return (
		<Modal
			className={classes.modal}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
			open={show}
		>
			<Fade in={props.show}>
				<Paper className='w-50 p-4'>
					<Typography variant='h6' component='p'>
						Are you sure ?
					</Typography>
					<Typography variant='body1' component='p' className='my-3'>
						You're about to {props.type === 'approved' ? 'approve' : 'decline'}{' '}
						this examiner. Are you sure you want to do this?
					</Typography>
					<div className='d-flex justify-content-end'>
						<Button
							variant='contained'
							className='bg-white mr-2'
							onClick={() => props.closeModal(false)}
						>
							Cancel
						</Button>
						<Button
							variant='contained'
							className='bg-dark text-white'
							onClick={props.approveDeclineExaminer}
						>
							Confirm
						</Button>
					</div>
				</Paper>
			</Fade>
		</Modal>
	);
};

export default withStyles(useStyles)(ApproveDeclineModal);
