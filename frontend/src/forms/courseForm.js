import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

import schema from '../schema/courseSchema';

let CourseForm = ({ state, modalType, handleSubmit }) => {
	return (
		<Formik
			validationSchema={modalType !== 'search' ? schema : null}
			onSubmit={(values) => {
				handleSubmit(values);
			}}
			initialValues={state}
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
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							name='name'
							placeholder='Course name'
							value={values.name}
							onBlur={handleBlur}
							onChange={handleChange}
							isInvalid={touched.name && !!errors.name}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.name}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							type='text'
							name='description'
							placeholder='Course description'
							value={values.description}
							onBlur={handleBlur}
							onChange={handleChange}
							isInvalid={touched.description && !!errors.description}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.description}
						</Form.Control.Feedback>
					</Form.Group>
					<div className='d-flex justify-content-end'>
						<Button type='submit' variant='contained' color='primary'>
							{modalType}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default CourseForm;
