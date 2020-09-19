import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, hideModal, heading, deleteContent }) => {
	return (
		<Modal show={show} onHide={() => hideModal(false, '')} centered>
			<Modal.Header closeButton>Are you sure ?</Modal.Header>
			<Modal.Body>
				You're about to delete this {heading}. You can not RETREIVE this{' '}
				{heading} later. Are you sure ?
			</Modal.Body>
			<Modal.Footer>
				<Button variant='success' onClick={() => hideModal(false, '')}>
					Cancel
				</Button>
				<Button variant='danger' onClick={deleteContent}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteModal;
