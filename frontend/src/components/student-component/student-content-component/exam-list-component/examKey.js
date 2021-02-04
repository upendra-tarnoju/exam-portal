import React from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	TextField,
	Button,
} from '@material-ui/core';

import styles from '../../student.module.css';

const Examkey = (props) => {
	return (
		<Dialog
			open={props.open}
			onClose={() => props.handleClose(false)}
			maxWidth='xs'
			fullWidth={true}
		>
			<DialogTitle className={styles.keyHeading}>Enter exam key</DialogTitle>
			<Divider />
			<DialogContent>
				<div class='py-3'>
					<TextField
						label='Password'
						type='password'
						fullWidth
						variant='outlined'
						size='medium'
					/>
				</div>
			</DialogContent>
			<Divider />
			<DialogActions className='my-2'>
				<Button
					onClick={() => props.handleClose()}
					variant='outlined'
					color='secondary'
				>
					Cancel
				</Button>
				<Button variant='outlined' color='primary'>
					Take test
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Examkey;
