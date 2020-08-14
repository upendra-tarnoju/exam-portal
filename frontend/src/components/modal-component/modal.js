import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';

const AdminModal = ({ name, show, closeModal, modalData }) => {
	const approveOrDeclineExaminer = () => {
		axios
			.patch(
				`${process.env.REACT_APP_BASE_URL}/api/admin/examiner`,
				modalData
			)
			.then((res) => {
				closeModal(false);
			});
	};
	return (
		<Modal
			show={show}
			animation={false}
			onHide={() => closeModal(false)}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>Message</Modal.Title>
			</Modal.Header>
			<Modal.Body className='text-center'>
				<p>{name}</p>
				<h4>Are you sure you want to {modalData.type} this examiner ?</h4>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => closeModal(false)}>
					Close
				</Button>
				<Button variant='primary' onClick={approveOrDeclineExaminer}>
					{modalData.type}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AdminModal;
