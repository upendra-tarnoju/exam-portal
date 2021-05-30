import React from 'react';
import {
	Modal,
	makeStyles,
	Backdrop,
	Fade,
	Typography,
	Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		fontSize: '36px !important',
	},
	paper: {
		width: '40%',
	},
}));

const CreateStudentSelectionModal = (props) => {
	const classes = useStyles();

	return (
		<Modal
			open={props.show}
			onClose={() => props.hideModal(false)}
			className={classes.modal}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={props.show}>
				<Paper className={`${classes.paper} p-4`}>
					<Typography variant='h5'>Create new student</Typography>
					<Typography variant='h6' className='text-center mb-3'>
						Single
					</Typography>
					<div className='d-flex justify-content-between bg-secondary p-3 rounded cursor-pointer mb-2'>
						<i
							className={`fa fa-plus-circle ${classes.icon} align-self-center`}
						/>
						<div className='d-flex flex-column justify-content-end'>
							<Typography
								variant='caption'
								display='block'
								className='text-white font-weight-bold align-self-end'
							>
								Add single student
							</Typography>
							<Typography
								variant='body2'
								className='text-white-50 align-self-end'
							>
								You can manually add new students
							</Typography>
						</div>
					</div>

					<Typography variant='h6' className='text-center my-3'>
						Multiple
					</Typography>
					<div
						className='d-flex justify-content-between bg-secondary p-3 rounded cursor-pointer mb-2'
						onClick={props.downloadSampleStudentFile}
					>
						<i
							className={`fa fa-cloud-download ${classes.icon} align-self-center`}
						/>
						<div className='d-flex flex-column justify-content-end'>
							<Typography
								variant='caption'
								display='block'
								className='text-white font-weight-bold'
							>
								Download the Excel spreadsheet
							</Typography>
							<Typography variant='body2' className='text-white-50'>
								You will add students in bulk
							</Typography>
						</div>
					</div>
					<div className='d-flex justify-content-between bg-secondary p-3 rounded cursor-pointer'>
						<i
							className={`fa fa-cloud-upload ${classes.icon} align-self-center`}
						/>
						<div className='d-flex flex-column justify-content-end'>
							<Typography
								variant='caption'
								display='block'
								className='text-white font-weight-bold align-self-end'
							>
								Send your spreadsheet you download
							</Typography>
							<Typography variant='body2' className='text-white-50'>
								The changes you make may take few minutes to view
							</Typography>
						</div>
					</div>
				</Paper>
			</Fade>
		</Modal>
	);
};

export default CreateStudentSelectionModal;
