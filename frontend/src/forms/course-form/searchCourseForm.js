import { Formik } from 'formik';
import React from 'react';
import { Backspace, Search } from '@material-ui/icons';
import { TextField, Button } from '@material-ui/core';
import { Form } from 'react-bootstrap';

import schema from '../../schema/course/searchCourseSchema';

const SearchCourseForm = (props) => {
	return (
		<Formik
			validationSchema={schema}
			initialValues={{ startDate: '', endDate: '', name: '' }}
			onSubmit={(values) => props.handleFilter(values)}
		>
			{(formikProps) => (
				<Form onSubmit={formikProps.handleSubmit}>
					<div className='row d-flex align-items-center'>
						<div className='col-md-4'>
							<TextField
								variant='outlined'
								className='w-100'
								name='name'
								label='Course name'
								placeholder='Course name'
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								value={formikProps.values.name}
								InputLabelProps={{ shrink: true }}
							/>
						</div>
						<div className='col-md-4'>
							<TextField
								variant='outlined'
								className='w-100'
								label='Start date'
								type='date'
								onChange={(event) =>
									formikProps.setFieldValue('startDate', event.target.value)
								}
								value={formikProps.values.startDate}
								InputLabelProps={{ shrink: true }}
								name='startDate'
							/>
						</div>
						<div className='col-md-4'>
							<TextField
								variant='outlined'
								className='w-100'
								label='End date'
								type='date'
								onChange={(event) =>
									formikProps.setFieldValue('endDate', event.target.value)
								}
								value={formikProps.values.endDate}
								InputLabelProps={{ shrink: true }}
								name='endDate'
							/>
						</div>
					</div>
					<div className='mt-3 d-flex justify-content-end'>
						<Button
							variant='contained'
							className=' bg-dark text-white'
							startIcon={<Search />}
							type='submit'
						>
							Search
						</Button>
						<Button
							variant='contained'
							className='bg-danger text-white ml-2'
							startIcon={<Backspace />}
							type='submit'
							onClick={() => {
								formikProps.resetForm();
								props.viewCourses();
							}}
						>
							Cancel
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default SearchCourseForm;
