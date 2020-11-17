import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ExaminerService from '../../../../../services/examinerApi';

const EditPassword = (props) => {
	return (
		<Modal
			size='sm'
			show={props.show}
			onHide={() => props.hideModal(false)}
			centered
		>
			<Formik
				initialValues={{ new: '', confirm: '' }}
				validationSchema={Yup.object({
					new: Yup.string().required('Required Field'),
					confirm: Yup.string()
						.required('Required Field')
						.oneOf([Yup.ref('new'), null], 'Passwords must match'),
				})}
				onSubmit={(values) => {
					let examinerService = new ExaminerService();
					examinerService
						.updateStudent(props.studentId, values)
						.then((res) => {
							props.hideModal(false);
						});
				}}
			>
				{(formikProps) => (
					<div>
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
								name='new'
								size='small'
								helperText={formikProps.errors.new}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								value={formikProps.values.new}
								error={formikProps.errors.new}
							/>
							<TextField
								variant='outlined'
								label='Confirm password'
								type='password'
								fullWidth
								name='confirm'
								size='small'
								helperText={
									formikProps.touched.confirm &&
									formikProps.errors.confirm
								}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								value={formikProps.values.confirm}
								error={
									formikProps.touched.confirm &&
									formikProps.errors.confirm
								}
							/>
						</Modal.Body>

						<Modal.Footer>
							<Button
								size='small'
								variant='contained'
								color='primary'
								className='mr-2'
								onClick={formikProps.handleSubmit}
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
					</div>
				)}
			</Formik>
		</Modal>
	);
};

export default EditPassword;
