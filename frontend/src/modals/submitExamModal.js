import React from 'react';
import { Modal } from 'react-bootstrap';
import { TextField, Button } from '@material-ui/core';

const SubmitExamModal = (props) => {
	let [button, setButton] = React.useState(true);

	let handleTextChange = (event) => {
		let { value } = event.target;
		if (value === 'submit') setButton(false);
		else setButton(true);
	};

	return (
		<Modal show={props.show}>
			<Modal.Header closeButton className='bg-dark text-white'>
				Submit exam
			</Modal.Header>
			<Modal.Body className='text-justify'>
				<p className='mb-0'>
					Are you sure you want to submit the exam. You won't be able to attempt
					any question after submission. If yes, type
					<strong> submit</strong> in following box
				</p>
				<TextField
					variant='outlined'
					label='Submit exam'
					size='small'
					className='w-100 mt-3'
					name='submit'
					onChange={handleTextChange}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='contained'
					color='primary'
					disabled={button}
					onClick={props.submitExam}
				>
					End
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default SubmitExamModal;
