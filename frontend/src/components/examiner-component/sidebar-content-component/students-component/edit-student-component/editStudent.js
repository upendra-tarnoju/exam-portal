import { Button, MenuItem, TextField } from '@material-ui/core';
import React from 'react';
import { Modal } from 'react-bootstrap';

import EditStudentForm from '../../../../../forms/student-form/editStudentForm';

const EditStudent = (props) => {
	return (
		<Modal
			size='lg'
			centered
			show={props.show}
			onHide={() => props.hideModal(false, '')}
		>
			<Modal.Header closeButton>
				<h4>Delmor Callacher</h4>
			</Modal.Header>
			<Modal.Body>
				<EditStudentForm {...props} />
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='contained'
					color='primary'
					size='small'
					className='mr-2'
				>
					Edit
				</Button>
				<Button
					variant='contained'
					color='secondary'
					size='small'
					onClick={() => props.hideModal(false, '')}
				>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default EditStudent;
