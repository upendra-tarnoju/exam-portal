import React from 'react';
import {
	Modal,
	Button,
	Paper,
	makeStyles,
	Typography,
	Backdrop,
	Fade,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

const DeleteModal = (props) => {
	const classes = useStyles();
	return (
		<Modal
			open={props.show}
			onClose={() => props.hideModal(false, '')}
			className={classes.modal}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={props.show}>
				<Paper className='w-25 p-4'>
					<Typography variant='h6' component='p'>
						Are you sure ?
					</Typography>
					<Typography variant='body1' component='p' className='my-3'>
						You're about to delete this {props.heading}. You can not retreive
						this {props.heading} later. Are you sure ?
					</Typography>
					<div className='d-flex justify-content-end'>
						<Button
							variant='contained'
							className='bg-white mr-2'
							onClick={() => props.hideModal(false, '')}
						>
							Cancel
						</Button>
						<Button
							variant='contained'
							className='bg-dark text-white'
							onClick={props.deleteContent}
						>
							Confirm
						</Button>
					</div>
				</Paper>
			</Fade>
		</Modal>
	);
};

export default DeleteModal;
