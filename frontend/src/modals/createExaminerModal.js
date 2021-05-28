import React from 'react';
import {
	Backdrop,
	Fade,
	makeStyles,
	Modal,
	Paper,
	Typography,
} from '@material-ui/core';
import CreateExaminerForm from '../forms/examiner-form/createExaminerForm';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		width: '42%',
	},
}));

const CreateExaminerModal = (props) => {
	const classes = useStyles();

	return (
		<Modal
			open={props.show}
			className={classes.modal}
			onClose={() => props.hideModal(false, '')}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={props.show}>
				<Paper className={`p-4 ${classes.paper}`}>
					<Typography variant='h5' component='p'>
						Request new examiner
					</Typography>
					<CreateExaminerForm handleSubmit={props.handleSubmit} />
				</Paper>
			</Fade>
		</Modal>
	);
};

export default CreateExaminerModal;
