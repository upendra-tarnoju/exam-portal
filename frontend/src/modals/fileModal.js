import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FileModal = ({ show, hideModal, uploadFile }) => {
	return (
		<Modal show={show} onHide={() => hideModal(false, '')} centered>
			<Modal.Header closeButton>Are you sure ?</Modal.Header>
			<Modal.Body>
				Are you sure you want to upload this file this exam ?
			</Modal.Body>
			<Modal.Footer>
				<Button variant='success' onClick={() => hideModal(false, '')}>
					Cancel
				</Button>
				<Button variant='danger' onClick={uploadFile}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default FileModal;
