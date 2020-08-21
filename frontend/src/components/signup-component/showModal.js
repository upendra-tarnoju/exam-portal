import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ShowModal = ({ handleClose, show, message }) => {
	return (
		<Modal show={show} onHide={handleClose} animation={false} centered>
			<Modal.Header closeButton>
				<Modal.Title>Message</Modal.Title>
			</Modal.Header>
			<Modal.Body>{message}</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ShowModal;
