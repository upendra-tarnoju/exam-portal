import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '@material-ui/core';

const FullScreenModal = (props) => {
	return (
		<Modal show={props.show}>
			<Modal.Header className='bg-dark text-white d-flex justify-content-center'>
				Full screen
			</Modal.Header>
			<Modal.Body>This exam needs to be opened in full screen mode.</Modal.Body>
			<Modal.Footer>
				<Button
					variant='contained'
					color='primary'
					onClick={props.openFullScreen}
				>
					Full Screen
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default FullScreenModal;
