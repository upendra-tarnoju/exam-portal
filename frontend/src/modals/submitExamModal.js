import React from 'react';
import {
	Modal,
	Button,
	Paper,
	makeStyles,
	Typography,
	Backdrop,
	Fade,
	TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

const SubmitExamModal = (props) => {
	let [buttonDisabled, setButton] = React.useState(true);

	let handleTextChange = (event) => {
		let { value } = event.target;
		if (value === 'submit') setButton(false);
		else setButton(true);
	};
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
				<Paper className='w-50 p-4'>
					<Typography variant='h6' component='p'>
						Submit exam
					</Typography>
					<Typography variant='body1' component='p' className='my-3'>
						Are you sure you want to submit the exam. You won't be able to
						attempt any question after submission. If yes, type
						<strong> submit</strong> in following box
					</Typography>
					<TextField
						variant='outlined'
						label='Submit exam'
						className='w-100 mt-3'
						name='submit'
						onChange={handleTextChange}
					/>
					<div className='d-flex justify-content-end mt-3'>
						<Button
							variant='contained'
							className='bg-white mr-2'
							onClick={() => props.handleModal(false)}
						>
							Cancel
						</Button>
						<Button
							variant='contained'
							disabled={buttonDisabled}
							className='bg-dark text-white'
							onClick={props.submitExam}
						>
							Confirm
						</Button>
					</div>
				</Paper>
			</Fade>
		</Modal>
	);
};

export default SubmitExamModal;
