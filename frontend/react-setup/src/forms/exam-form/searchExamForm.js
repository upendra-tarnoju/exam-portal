import { Formik } from 'formik';
import React from 'react';
import { Backspace, Search } from '@material-ui/icons';
import {
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';
import { Form } from 'react-bootstrap';

import schema from '../../schema/exam/searchExamSchema';

const SearchExamForm = (props) => {
	return (
		<Formik
			enableReinitialize
			validationSchema={schema}
			initialValues={{
				startDate: '',
				endDate: '',
				name: '',
				status: '',
			}}
			onSubmit={(values) => props.handleFilter(values)}
		>
			{(formikProps) => (
				<Form onSubmit={formikProps.handleSubmit}>
					<div className='row mt-3'>
						<div className='col-md-3'>
							<TextField
								variant='outlined'
								className='w-100'
								label='Exam code or subject'
								placeholder='Exam code or subject'
								name='name'
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								value={formikProps.values.name || ''}
								InputLabelProps={{ shrink: true }}
							/>
						</div>
						<div className='col-md-3'>
							<FormControl variant='outlined' className='w-100'>
								<InputLabel id='exam-select-status'>Status</InputLabel>
								<Select
									labelId='exam-select-status'
									id='demo-simple-select-outlined'
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									value={formikProps.values.status || ''}
									label='Status'
									name='status'
								>
									<MenuItem value='CREATED'>Created</MenuItem>
									<MenuItem value='DELETED'>Deleted</MenuItem>
									<MenuItem value='ACTIVE'>Active</MenuItem>
								</Select>
							</FormControl>
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
								value={formikProps.values.startDate || ''}
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
								value={formikProps.values.endDate || ''}
								InputLabelProps={{ shrink: true }}
							/>
						</div>
					</div>
					<div className='mt-3 mr-1 d-flex justify-content-end'>
						<Button
							variant='contained'
							className='bg-dark text-white'
							startIcon={<Search />}
							type='submit'
						>
							Search
						</Button>
						<Button
							variant='contained'
							className='bg-danger text-white ml-2'
							startIcon={<Backspace />}
							onClick={() => {
								formikProps.resetForm();
								props.viewExams();
							}}
						>
							Clear
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default SearchExamForm;
