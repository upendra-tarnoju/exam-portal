import {
	Backdrop,
	Fade,
	Modal,
	Paper,
	Typography,
	Button,
	makeStyles,
	TextField,
} from '@material-ui/core';

import React from 'react';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

const NewQuestionOptionModal = (props) => {
	const classes = useStyles();
	let { formikProps, submitType } = props;
	const handleSubmit = () => {
		if (submitType === 'updateOption') {
			props.updateOption(formikProps);
		} else {
			props.addNewQption(formikProps);
		}
		props.hideModal(false, '', props.formikProps);
	};

	return (
		<Modal
			open={props.show}
			onClose={() => props.hideModal(false, '', formikProps)}
			className={classes.modal}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{ timeout: 500 }}
		>
			<Fade in={props.show}>
				<Paper className='w-25 p-4'>
					<form onSubmit={() => handleSubmit(formikProps)}>
						<Typography variant='h6' component='p'>
							{props.submitType === 'updateOption'
								? 'Update Option'
								: 'Create new option'}
						</Typography>
						<TextField
							variant='outlined'
							className='w-100 my-3'
							name='option'
							onChange={(event) =>
								formikProps.setFieldValue('option', event.target.value)
							}
							value={formikProps.values.option}
						/>
						<div className='d-flex justify-content-end'>
							<Button
								variant='contained'
								className='bg-white mr-2'
								onClick={() => props.hideModal(false, '', formikProps)}
							>
								Cancel
							</Button>
							<Button
								variant='contained'
								className='bg-dark text-white'
								type='submit'
							>
								{props.submitType === 'updateOption' ? 'Update' : 'Create'}
							</Button>
						</div>
					</form>
				</Paper>
			</Fade>
		</Modal>
	);
};

export default NewQuestionOptionModal;
