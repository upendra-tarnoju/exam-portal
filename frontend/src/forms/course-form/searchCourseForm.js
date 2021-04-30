import { Formik } from 'formik';
import React from 'react';
import { Search } from '@material-ui/icons';
import { TextField, Button } from '@material-ui/core';
import { Form } from 'react-bootstrap';

import schema from '../../schema/searchCourseSchema';

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
						<div className='col-md-3'>
							<TextField
								variant='outlined'
								className='w-100'
								label='Course name'
								placeholder='Course name'
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								value={formikProps.values.name}
								InputLabelProps={{ shrink: true }}
							/>
						</div>
						<div className='col-md-3'>
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
							/>
						</div>
						<div className='col-md-3'>
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
							/>
						</div>
						<div className='col-md-3'>
							<Button
								variant='contained'
								className='w-100 bg-dark text-white'
								startIcon={<Search />}
								type='submit'
							>
								Search
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default SearchCourseForm;
