import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import React from 'react';

import AdminService from '../services/adminApi';

const ApproveDeclineModal = ({
	show,
	closeModal,
	modalData,
	handleSnackBar,
}) => {
	const approveOrDeclineExaminer = () => {
		let adminService = new AdminService();
		adminService.approveOrDeclineExaminer(modalData).then((res) => {
			closeModal(false);
			handleSnackBar(true, res.data.msg);
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
				<p>{modalData.fullName}</p>
				<h4>Are you sure you want to {modalData.type} this examiner ?</h4>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='contained'
					color='secondary'
					onClick={() => closeModal(false)}
					className='mr-2'
				>
					Close
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={approveOrDeclineExaminer}
				>
					{modalData.type}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ApproveDeclineModal;
