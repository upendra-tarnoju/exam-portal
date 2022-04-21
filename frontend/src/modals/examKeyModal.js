import React from 'react';
import {
	Modal,
	Card,
	makeStyles,
	Typography,
	Backdrop,
	Fade,
} from '@material-ui/core';

import ExamKeyForm from '../forms/exam-form/examKeyForm';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalContainer: {
		width: '35%',
	},
}));

const ExamKeyModal = (props) => {
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
				<Card className={`${classes.modalContainer}`}>
					<Typography
						variant='h6'
						className='mb-3 p-3 text-white bg-dark'
						component='p'
					>
						Exam password
					</Typography>

					<ExamKeyForm
						hideModal={props.hideModal}
						handleSubmit={props.handleSubmit}
					/>
				</Card>
			</Fade>
		</Modal>
	);
};

export default ExamKeyModal;
