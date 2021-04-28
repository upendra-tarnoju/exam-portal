import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { Button, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import schema from '../schema/courseSchema';
import CourseService from '../services/courseApi';

let CourseForm = (props) => {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const loading = open && options.length === 0;

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			let courseService = new CourseService();
			const response = await courseService.viewDefaultCourses();

			const courses = response.data;

			if (active) {
				setOptions(courses);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => {
				props.handleSubmit(values);
			}}
			initialValues={{ name: '', description: '' }}
		>
			{(formikProps) => (
				<Form noValidate onSubmit={formikProps.handleSubmit}>
					<Autocomplete
						open={open}
						className='mb-3'
						onOpen={() => {
							setOpen(true);
						}}
						onClose={() => {
							setOpen(false);
						}}
						getOptionSelected={(option, value) => option.name === value.name}
						getOptionLabel={(option) =>
							`${option.name} - ${option.description}`
						}
						options={options}
						loading={loading}
						onChange={(e, course) =>
							formikProps.setFieldValue('name', course ? course._id : '')
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Name'
								name='name'
								helperText={formikProps.errors.name}
								placeholder='E.g. B.Tech, MBA'
								variant='outlined'
								autoComplete='new-password'
								error={!!formikProps.errors.name}
								onBlur={formikProps.handleBlur}
								inputProps={{
									...params.inputProps,
									autoComplete: 'new-password',
								}}
							/>
						)}
					/>
					<TextField
						name='description'
						label='Description'
						placeholder='E.g. Bachelor of Technology'
						className='w-100 mb-3'
						variant='outlined'
						value={formikProps.values.description}
						onChange={formikProps.handleChange}
						onBlur={formikProps.handleBlur}
						error={!!formikProps.errors.description}
						helperText={formikProps.errors.description}
					/>
					<div className='d-flex justify-content-end'>
						<Button type='submit' variant='contained' color='primary'>
							Create
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default CourseForm;
