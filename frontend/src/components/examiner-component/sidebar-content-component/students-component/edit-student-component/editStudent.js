import { Button, MenuItem, TextField } from '@material-ui/core';
import React from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';

let gender = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
];

const EditStudent = (props) => {
	console.log(props.student);
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
				<div className='container'>
					<h4>Personal details</h4>
					<div className='row mb-4'>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='First name'
								defaultValue={
									props.student.userData
										? props.student.userData.firstName
										: ''
								}
								fullWidth
							/>
						</div>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Last name'
								defaultValue={
									props.student.userData
										? props.student.userData.lastName
										: ''
								}
								fullWidth
							/>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Gender'
								fullWidth
								value={props.student.gender}
								select
							>
								{gender.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</div>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Email'
								fullWidth
								value={
									props.student.userData
										? props.student.userData.email
										: ''
								}
							/>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Student ID'
								fullWidth
								value={props.student.studentId}
							/>
						</div>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Mobile number'
								fullWidth
								value={
									props.student.userData
										? props.student.userData.mobileNumber
										: ''
								}
							/>
						</div>
					</div>

					<h4>Other details</h4>
					<div className='row mb-4'>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Father name'
								fullWidth
								value={props.student.fatherName}
							/>
						</div>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Mother name'
								fullWidth
								value={props.student.motherName}
							/>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Date of birth'
								fullWidth
								type='date'
								defaultValue={moment(props.student.dob).format(
									'yyyy-MM-DD'
								)}
								InputLabelProps={{ shrink: true }}
							/>
						</div>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Home address'
								fullWidth
								value={props.student.address}
							/>
						</div>
					</div>
				</div>
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
