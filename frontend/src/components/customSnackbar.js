import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const customSnackBar = (props) => (
	<Snackbar
		open={props.show}
		autoHideDuration={6000}
		onClose={() => props.handleSnackBar(false)}
	>
		<MuiAlert
			elevation={6}
			variant='filled'
			onClose={() => props.handleSnackBar(false)}
			severity={props.snackBarType}
		>
			{props.message}
		</MuiAlert>
	</Snackbar>
);

export default customSnackBar;
