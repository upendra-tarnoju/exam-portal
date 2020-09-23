import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

import schema from '../schema/examinerInputSchema';
import ExaminerService from '../services/examinerApi';

let ExaminerInputForm = ({ handleRedirect }) => {
	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => {
				let examinerService = new ExaminerService();
				examinerService.saveExaminerDetails(values).then((res) => {
					handleRedirect();
				});
			}}
			initialValues={{
				designation: '',
				department: '',
				collegeName: '',
			}}
		>
			{({
				touched,
				values,
				errors,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => (
				<Form noValidate onSubmit={handleSubmit}>
					<div className='px-3 pb-4'>
						<Form.Group>
							<Form.Label>College name</Form.Label>
							<Form.Control
								type='text'
								name='collegeName'
								placeholder='College name'
								value={values.collegeName}
								onBlur={handleBlur}
								onChange={handleChange}
								isInvalid={touched.collegeName && !!errors.collegeName}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.collegeName}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Designation</Form.Label>
							<Form.Control
								type='text'
								name='designation'
								placeholder='Designation'
								value={values.designation}
								onBlur={handleBlur}
								onChange={handleChange}
								isInvalid={touched.designation && !!errors.designation}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.designation}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Department</Form.Label>
							<Form.Control
								type='text'
								name='department'
								placeholder='Department'
								value={values.department}
								onBlur={handleBlur}
								onChange={handleChange}
								isInvalid={touched.department && !!errors.department}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.department}
							</Form.Control.Feedback>
						</Form.Group>
						<div className='d-flex justify-content-end'>
							<Button type='submit' variant='contained' color='primary'>
								Update
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ExaminerInputForm;
