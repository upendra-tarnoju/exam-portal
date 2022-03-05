import React from 'react';
import {
	Modal,
	Button,
	makeStyles,
	Backdrop,
	Paper,
	Fade,
	Typography,
} from '@material-ui/core';

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

const FullScreenModal = (props) => {
	let classes = useStyles();
	let { show, openFullScreen } = props;
	return (
		<Modal
			className={classes.modal}
			open={show}
			onClose={openFullScreen}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={props.show}>
				<Paper className='w-25 p-4'>
					<Typography variant='h6' component='p'>
						Full screen
					</Typography>
					<Typography variant='body1' component='p' className='my-3'>
						This exam needs to be opened in full screen mode.
					</Typography>
					<div className='d-flex justify-content-end'>
						<Button
							variant='contained'
							className='bg-dark text-white'
							onClick={props.openFullScreen}
						>
							Full Screen
						</Button>
					</div>
				</Paper>
			</Fade>
		</Modal>
	);
};

export default FullScreenModal;
