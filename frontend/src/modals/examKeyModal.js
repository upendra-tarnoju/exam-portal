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
				<Paper className={`p-4 ${classes.modalContainer}`}>
					<Typography variant='h5' className='mb-3 text-center' component='p'>
						EXAM PASSWORD
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
