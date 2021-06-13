import React from 'react';
import {
	Modal,
	Paper,
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
				<Paper className='w-25 p-4'>
					<Typography variant='h6' className='mb-3' component='p'>
						Exam password
					</Typography>

					<ExamKeyForm
						hideModal={props.hideModal}
						handleSubmit={props.handleSubmit}
					/>
				</Paper>
			</Fade>
		</Modal>
	);
};

export default ExamKeyModal;
