import React from 'react';
import { Formik } from 'formik';
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

import schema from '../../schema/subAdmin/searchSubAdminSchema';

const SearchSubAdminForm = (props) => {
	return (
		<Formik
			validationSchema={schema}
			initialValues={{ email: '', name: '', status: '' }}
			onSubmit={(values) => props.handleFilter(values)}
		>
			{(formikProps) => (
				<Form onSubmit={formikProps.handleSubmit}>
					<div className='row d-flex align-items-center'>
						<div className='col-md-3'>
							<TextField
								variant='outlined'
								className='w-100'
								name='name'
								label='Name'
								placeholder='Name'
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								value={formikProps.values.name}
							/>
						</div>
						<div className='col-md-3'>
							<TextField
								variant='outlined'
								className='w-100'
								label='Email'
								placeholder='Email'
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								value={formikProps.values.email}
								name='email'
							/>
						</div>
						<div className='col-md-3'>
							<FormControl variant='outlined' className='w-100'>
								<InputLabel id='status-label'>Status</InputLabel>
								<Select
									id='status-label'
									placeholder='Status'
									label='Status'
									name='status'
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									value={formikProps.values.status}
								>
									<MenuItem value='approved'>Approved</MenuItem>
									<MenuItem value='pending'>Pending</MenuItem>
									<MenuItem value='declined'>Declined</MenuItem>
								</Select>
							</FormControl>
						</div>

						<div className='col-md-3'>
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
									props.viewSubAdmin();
								}}
							>
								Clear
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default SearchSubAdminForm;
