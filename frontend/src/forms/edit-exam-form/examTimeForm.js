import { Formik } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';
import DateFnsUtils from '@date-io/date-fns';
import {
	DatePicker,
	MuiPickersUtilsProvider,
	TimePicker,
} from '@material-ui/pickers';
import {
	Button,
	FormControlLabel,
	Switch,
	TextField,
	Typography,
} from '@material-ui/core';

import schema from '../../schema/edit-exam/examTimeSchema';

const ExamTimeForm = (props) => {
	return (
		<Formik
			enableReinitialize
			validationSchema={schema}
			onSubmit={(values) => {
				values.examDate = values.examDate.valueOf();
				values.startTime = Date.parse(values.startTime);
				values.endTime = Date.parse(values.endTime);
				props.handleSubmit(values);
			}}
			initialValues={{
				examDate: props.examDetails.examDate,
				startTime: props.examDetails.startTime,
				endTime: props.examDetails.endTime,
				duration: props.examDetails.duration,
				hideDuration: props.examDetails.durationStatus === 'COMPLETE',
			}}
		>
			{(formikProps) => (
				<Form className='mt-3' onSubmit={formikProps.handleSubmit}>
					<Typography variant='h6' className='mb-3' component='p'>
						Update exam time
					</Typography>
					<div className='container'>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<DatePicker
								className='w-100'
								label='Exam date'
								inputVariant='outlined'
								name='examDate'
								disablePast={true}
								value={formikProps.values.examDate}
								onChange={(examDate) => {
									formikProps.setFieldValue('examDate', examDate);
								}}
								format={'dd-MM-yyyy'}
								onBlur={formikProps.handleBlur}
								helperText={
									formikProps.touched.examDate && formikProps.errors.examDate
								}
								error={Boolean(
									formikProps.touched.examDate && !!formikProps.errors.examDate
								)}
							/>
						</MuiPickersUtilsProvider>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<TimePicker
								className='w-100 mt-3'
								label='Start time'
								inputVariant='outlined'
								name='startTime'
								value={formikProps.values.startTime}
								onChange={(startTime) => {
									formikProps.setFieldValue('startTime', startTime);
								}}
								helperText={
									formikProps.touched.startTime && formikProps.errors.startTime
								}
								error={Boolean(
									formikProps.touched.startTime &&
										!!formikProps.errors.startTime
								)}
							/>
						</MuiPickersUtilsProvider>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<TimePicker
								className='w-100 mt-3'
								label='End time'
								name='endTime'
								inputVariant='outlined'
								value={formikProps.values.endTime}
								onChange={(endTime) => {
									formikProps.setFieldValue('endTime', endTime);
								}}
								helperText={
									formikProps.touched.endTime && formikProps.errors.endTime
								}
								error={Boolean(
									formikProps.touched.endTime && !!formikProps.errors.endTime
								)}
							/>
						</MuiPickersUtilsProvider>
						<div className='container mt-3'>
							<div className='row align-items-center'>
								<div className='col-md-7'>
									<FormControlLabel
										control={
											<Switch
												checked={formikProps.values.hideDuration}
												onChange={formikProps.handleChange}
												name='hideDuration'
											/>
										}
										label='Do you want to have exam duration to be same as difference
                     between start time and end time ?'
									/>
								</div>
								<div className='col-md-5'>
									{!formikProps.values.hideDuration ? (
										<TextField
											variant='outlined'
											className='w-100'
											name='duration'
											label='Duration'
											value={formikProps.values.duration || ''}
											onChange={formikProps.handleChange}
											onBlur={formikProps.handleBlur}
											error={
												formikProps.touched.duration &&
												!!formikProps.errors.duration
											}
											helperText={
												formikProps.touched.duration &&
												formikProps.errors.duration
											}
										/>
									) : null}
								</div>
							</div>
						</div>

						<Button
							variant='outlined'
							type='submit'
							size='large'
							className='bg-dark text-white mb-3'
						>
							Update
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ExamTimeForm;
