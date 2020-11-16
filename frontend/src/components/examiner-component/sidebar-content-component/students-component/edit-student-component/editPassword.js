import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button, TextField } from '@material-ui/core';

const EditPassword = (props) => {
	return (
		<Modal
			size='sm'
			show={props.show}
			onHide={() => props.hideModal(false)}
			centered
		>
			<Modal.Header closeButton>
				<h4>Change password</h4>
			</Modal.Header>
			<Modal.Body>
				<TextField
					variant='outlined'
					label='New password'
					type='password'
					fullWidth
					className='mb-4'
				/>
				<TextField
					variant='outlined'
					label='Confirm password'
					type='password'
					fullWidth
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size='small'
					variant='contained'
					color='primary'
					className='mr-2'
				>
					Update
				</Button>
				<Button
					size='small'
					variant='contained'
					color='secondary'
					onClick={() => props.hideModal(false)}
				>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default EditPassword;
