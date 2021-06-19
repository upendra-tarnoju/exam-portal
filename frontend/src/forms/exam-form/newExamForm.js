import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import DateFnsUtils from '@date-io/date-fns';
import {
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	FormHelperText,
	Typography,
	Divider,
	Button,
	FormControlLabel,
	Switch,
} from '@material-ui/core';
import {
	DatePicker,
	MuiPickersUtilsProvider,
	TimePicker,
} from '@material-ui/pickers';

import schema from '../../schema/exam/newExamSchema';

let NewExamForm = (props) => {
	let [visibility, setVisibility] = React.useState(true);

	const setExamTime = (examDate, examTime) => {
		let date = examDate.getDate();
		let month = examDate.getMonth();
		let year = examDate.getFullYear();
		examTime.setDate(date);
		examTime.setMonth(month);
		examTime.setYear(year);
		return examTime;
	};

	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => {
				props.handleSubmit(values);
			}}
			initialValues={{
				subject: '',
				course: '',
				examCode: '',
				password: '',
				totalMarks: '',
				passingMarks: '',
				negativeMarks: 0,
				examDate: null,
				startTime: null,
				endTime: null,
				hideDuration: true,
				duration: '',
			}}
		>
			{(formikProps) => (
				<Form noValidate onSubmit={formikProps.handleSubmit}>
					<Typography variant='h6' component='p' className='my-3'>
						Exam details
					</Typography>
					<div className='container mb-4'>
						<div className='row'>
							<div className='col-md-6'>
								<TextField
									variant='outlined'
									className='w-100'
									name='subject'
									label='Subject'
									value={formikProps.values.subject}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.subject && !!formikProps.errors.subject
									}
									helperText={
										formikProps.touched.subject && formikProps.errors.subject
									}
								/>
							</div>
							<div className='col-md-6'>
								<FormControl variant='outlined' className='w-100'>
									<InputLabel>Course</InputLabel>
									<Select
										value={formikProps.values.course}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.course && !!formikProps.errors.course
										}
										label='Course'
										inputProps={{
											name: 'course',
											id: 'outlined-age-native-simple',
										}}
									>
										{props.coursesList.map((course) => {
											return (
												<MenuItem key={course._id} value={course._id}>
													{`${course.courseId.name} - ${course.courseId.description}`}
												</MenuItem>
											);
										})}
									</Select>
									<FormHelperText>
										{formikProps.touched.course && formikProps.errors.course}
									</FormHelperText>
								</FormControl>
							</div>
						</div>
						<div className='row mt-5'>
							<div className='col-md-6'>
								<TextField
									variant='outlined'
									className='w-100'
									name='password'
									label='Exam password'
									type='password'
									value={formikProps.values.password}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.password &&
										!!formikProps.errors.password
									}
									helperText={
										formikProps.touched.password && formikProps.errors.password
									}
								/>
							</div>
							<div className='col-md-6'>
								<TextField
									variant='outlined'
									className='w-100'
									name='examCode'
									label='Exam Code'
									value={formikProps.values.examCode}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.examCode &&
										!!formikProps.errors.examCode
									}
									helperText={
										formikProps.touched.examCode && formikProps.errors.examCode
									}
								/>
							</div>
						</div>
					</div>
					<Divider />
					<Typography variant='h6' component='p' className='my-3'>
						Marking scheme
					</Typography>
					<div className='container mb-4'>
						<div className='row'>
							<div className='col-md-4'>
								<TextField
									variant='outlined'
									className='w-100'
									name='totalMarks'
									label='Total marks'
									value={formikProps.values.totalMarks}
									onChange={(event) => {
										let regex = /^[0-9\b]+$/;
										if (
											regex.test(event.target.value) ||
											event.target.value === ''
										) {
											formikProps.setFieldValue(
												'totalMarks',
												event.target.value
											);
										}
									}}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.totalMarks &&
										!!formikProps.errors.totalMarks
									}
									helperText={
										formikProps.touched.totalMarks &&
										formikProps.errors.totalMarks
									}
								/>
							</div>
							<div className='col-md-4'>
								<TextField
									variant='outlined'
									className='w-100'
									name='passingMarks'
									label='Passing marks'
									value={formikProps.values.passingMarks}
									onChange={(event) => {
										let regex = /^[0-9\b]+$/;
										if (
											regex.test(event.target.value) ||
											event.target.value === ''
										) {
											formikProps.setFieldValue(
												'passingMarks',
												event.target.value
											);
										}
									}}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.passingMarks &&
										!!formikProps.errors.passingMarks
									}
									helperText={
										formikProps.touched.passingMarks &&
										formikProps.errors.passingMarks
									}
								/>
							</div>
							<div className='col-md-4'>
								<FormControl variant='outlined' className='w-100'>
									<InputLabel id='exam-negative-marks'>
										Negative marks
									</InputLabel>
									<Select
										labelId='exam-negative-marks'
										id='demo-simple-select-outlined'
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										value={formikProps.values.negativeMarks}
										label='Negative marks'
										name='negativeMarks'
										error={
											formikProps.touched.negativeMarks &&
											!!formikProps.errors.negativeMarks
										}
									>
										<MenuItem value={0}>0</MenuItem>
										<MenuItem value={1}>1</MenuItem>
										<MenuItem value={2}>2</MenuItem>
										<MenuItem value={3}>3</MenuItem>
									</Select>
								</FormControl>
							</div>
						</div>
					</div>
					<Divider />
					<Typography variant='h6' component='p' className='my-3'>
						Time period
					</Typography>
					<div className='container'>
						<div className='row'>
							<div className='col-md-4'>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<DatePicker
										className='w-100'
										label='Exam date'
										inputVariant='outlined'
										name='examDate'
										disablePast={true}
										value={formikProps.values.examDate}
										onChange={(examDate) => {
											setVisibility(false);
											formikProps.setFieldValue('examDate', examDate);
											formikProps.setFieldValue('startTime', null);
											formikProps.setFieldValue('endTime', null);
										}}
										format={'dd-MM-yyyy'}
										onBlur={formikProps.handleBlur}
										helperText={
											formikProps.touched.examDate &&
											formikProps.errors.examDate
										}
										error={Boolean(
											formikProps.touched.examDate &&
												!!formikProps.errors.examDate
										)}
									/>
								</MuiPickersUtilsProvider>
							</div>
							<div className='col-md-4'>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<TimePicker
										className='w-100'
										label='Start time'
										inputVariant='outlined'
										name='startTime'
										value={formikProps.values.startTime}
										disabled={visibility}
										onChange={(startTime) => {
											startTime = setExamTime(
												formikProps.values.examDate,
												startTime
											);
											formikProps.setFieldValue('startTime', startTime);
										}}
										helperText={
											!visibility &&
											formikProps.touched.startTime &&
											formikProps.errors.startTime
										}
										error={Boolean(
											!visibility &&
												formikProps.touched.startTime &&
												!!formikProps.errors.startTime
										)}
									/>
								</MuiPickersUtilsProvider>
							</div>
							<div className='col-md-4'>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<TimePicker
										className='w-100'
										label='End time'
										name='endTime'
										inputVariant='outlined'
										value={formikProps.values.endTime}
										disabled={visibility}
										onChange={(endTime) => {
											endTime = setExamTime(
												formikProps.values.examDate,
												endTime
											);
											formikProps.setFieldValue('endTime', endTime);
										}}
										helperText={
											!visibility &&
											formikProps.touched.endTime &&
											formikProps.errors.endTime
										}
										error={Boolean(
											!visibility &&
												formikProps.touched.endTime &&
												!!formikProps.errors.endTime
										)}
									/>
								</MuiPickersUtilsProvider>
							</div>
						</div>
					</div>
					<div className='container mt-5'>
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
										value={formikProps.values.duration}
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
					<div className='d-flex justify-content-end mt-3 px-3'>
						<Button
							variant='outlined'
							type='submit'
							className='bg-dark text-white'
						>
							Create
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default NewExamForm;
