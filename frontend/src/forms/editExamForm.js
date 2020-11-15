import { TextField } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';

import factories from '../factories/factories';
import validationMethod from '../services/validation';

let currentDate = new Date();

currentDate = factories.formatDate(currentDate);

export const SubjectForm = (props) => (
	<Formik
		innerRef={props.subjectRef}
		onSubmit={(values) => {
			props.handleSubmit(values);
		}}
		validationSchema={Yup.object({
			subject: Yup.string().required('Required field'),
		})}
		initialValues={{ subject: props.value }}
	>
		{(formikProps) => (
			<TextField
				name='subject'
				label='Subject'
				className='w-100'
				variant='outlined'
				size='small'
				defaultValue={formikProps.values.subject}
				onChange={formikProps.handleChange}
				helperText={formikProps.errors.subject}
				error={formikProps.errors.subject}
				onKeyDown={(event) => {
					if (event.keyCode === 13) {
						formikProps.handleSubmit();
					}
				}}
			/>
		)}
	</Formik>
);

export const ExamCodeForm = (props) => (
	<Formik
		innerRef={props.examCodeRef}
		initialValues={{ examCode: props.value }}
		validationSchema={Yup.object({
			examCode: Yup.string().required('Exam code is required'),
		})}
		onSubmit={(values) => {
			props.handleSubmit(values);
		}}
	>
		{(formikProps) => (
			<TextField
				name='examCode'
				label='Exam code'
				className='w-100'
				variant='outlined'
				size='small'
				defaultValue={formikProps.values.examCode}
				onChange={formikProps.handleChange}
				error={formikProps.errors.examCode}
				helperText={formikProps.errors.examCode}
				onKeyDown={(event) => {
					if (event.keyCode === 13) formikProps.handleSubmit();
				}}
			/>
		)}
	</Formik>
);

export const TotalMarksForm = (props) => (
	<Formik
		innerRef={props.totalMarksRef}
		initialValues={{ totalMarks: props.value }}
		validationSchema={Yup.object({
			totalMarks: Yup.string()
				.matches(/^[0-9\b]+$/, 'Invalid total marks')
				.min(1)
				.required('Total marks is required'),
		})}
		onSubmit={(values) => {
			props.handleSubmit(values);
		}}
	>
		{(formikProps) => (
			<TextField
				name='totalMarks'
				label='Total marks'
				inputProps={{ maxLength: 4 }}
				className='w-100'
				variant='outlined'
				size='small'
				value={formikProps.values.totalMarks}
				onChange={formikProps.handleChange}
				error={formikProps.errors.totalMarks}
				helperText={formikProps.errors.totalMarks}
				onKeyDown={(event) => {
					if (event.keyCode === 13) formikProps.handleSubmit();
				}}
			/>
		)}
	</Formik>
);

export const PassingMarksForm = (props) => (
	<Formik
		innerRef={props.passingMarksRef}
		initialValues={{ passingMarks: props.value }}
		validationSchema={Yup.object({
			passingMarks: Yup.number()
				.required('Passing marks is required')
				.max(
					props.totalMarks,
					'Passing marks should not be greater than total marks'
				),
		})}
		onSubmit={(values) => {
			props.handleSubmit();
		}}
	>
		{(formikProps) => (
			<TextField
				name='passingMarks'
				label='Passing marks'
				inputProps={{ maxLength: 4 }}
				className='w-100'
				variant='outlined'
				size='small'
				value={formikProps.values.passingMarks}
				onChange={formikProps.handleChange}
				error={formikProps.errors.passingMarks}
				helperText={formikProps.errors.passingMarks}
				onKeyDown={(event) => {
					if (event.keyCode === 13) formikProps.handleSubmit();
				}}
			/>
		)}
	</Formik>
);

export const ExamDateForm = (props) => (
	<Formik
		innerRef={props.examDateRef}
		validationSchema={Yup.object({
			examDate: Yup.date()
				.min(currentDate, `Selected date cannot be less than today's date`)
				.required('Required exam date'),
		})}
		onSubmit={(values) => {
			props.handleSubmit(values);
		}}
		initialValues={{ examDate: props.value }}
	>
		{(formikProps) => (
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					name='examDate'
					margin='normal'
					id='exam-date-picker'
					label='Exam date'
					format='MM/dd/yyyy'
					value={formikProps.values.examDate || Date.now()}
					className='w-100 mt-0'
					variant='dialog'
					onChange={(date) => {
						formikProps.setFieldValue('examDate', date);
					}}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
					error={formikProps.errors.examDate}
					helperText={formikProps.errors.examDate}
					onBlur={formikProps.handleBlur}
				/>
			</MuiPickersUtilsProvider>
		)}
	</Formik>
);

export const ExamStartTimeForm = (props) => (
	<Formik
		innerRef={props.startTimeRef}
		validationSchema={Yup.object({
			startTime: Yup.string()
				.required('Required Start time')
				.test('', 'Invalid start time', function (startTime) {
					let examDate = new Date(props.examDate);
					let boolState = validationMethod.validateStartTime(
						examDate,
						startTime
					);
					return boolState;
				}),
		})}
		onSubmit={(values) => console.log(values)}
		initialValues={{ startTime: props.value }}
	>
		{(formikProps) => (
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardTimePicker
					margin='normal'
					id='start-time-picker'
					label='Start time'
					fullWidth
					className='mt-0'
					value={formikProps.values.startTime || Date.now()}
					onChange={(startTime) => {
						formikProps.setFieldValue('startTime', startTime);
					}}
					KeyboardButtonProps={{
						'aria-label': 'change time',
					}}
					error={formikProps.errors.startTime}
					helperText={formikProps.errors.startTime}
				/>
			</MuiPickersUtilsProvider>
		)}
	</Formik>
);

export const ExamEndTimeForm = (props) => (
	<Formik
		innerRef={props.endTimeRef}
		validationSchema={Yup.object({
			endTime: Yup.string()
				.required('Required End time')
				.test('', 'End time cannot be less than start time', function (
					endTime
				) {
					if (Date.parse(endTime) < Date.parse(props.startTime))
						return false;
					else return true;
				}),
		})}
		initialValues={{ endTime: props.value }}
		onSubmit={(values) => props.handleSubmit(values)}
	>
		{(formikProps) => (
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardTimePicker
					margin='normal'
					id='end-time-picker'
					label='End time'
					fullWidth
					className='mt-0'
					value={formikProps.values.endTime || Date.now()}
					onChange={(endTime) =>
						formikProps.setFieldValue('endTime', endTime)
					}
					KeyboardButtonProps={{
						'aria-label': 'change time',
					}}
					error={formikProps.errors.endTime}
					helperText={formikProps.errors.endTime}
				/>
			</MuiPickersUtilsProvider>
		)}
	</Formik>
);

export const ExamDurationForm = (props) => (
	<Formik
		innerRef={props.durationRef}
		validationSchema={Yup.object({
			duration: Yup.string()
				.matches(/^[0-9\b]+$/, 'Invalid exam duration')
				.test('', 'Invalid exam duration', function (duration) {
					let { startTime, endTime } = props;
					let boolState = validationMethod.validateExamDuration(
						duration,
						startTime,
						endTime
					);
					return boolState;
				}),
		})}
		initialValues={{ duration: props.value }}
		onSubmit={(values) => props.handleSubmit(values)}
	>
		{(formikProps) => (
			<TextField
				name='duration'
				label='duration'
				className='w-100'
				variant='outlined'
				size='small'
				value={formikProps.values.duration}
				onChange={formikProps.handleChange}
				error={formikProps.errors.duration}
				helperText={formikProps.errors.duration}
				onKeyDown={(event) => {
					if (event.keyCode === 13) formikProps.handleSubmit();
				}}
			/>
		)}
	</Formik>
);

export const ExamPasswordForm = (props) => (
	<Formik
		innerRef={props.passwordRef}
		initialValues={{
			current: '',
			new: '',
			reTypeNew: '',
		}}
		validationSchema={Yup.object({
			current: Yup.string().required('Required field'),
			new: Yup.string()
				.required('Required field')
				.min(6, 'Minimum password length should be 6'),
			reTypeNew: Yup.string()
				.oneOf([Yup.ref('new'), null], 'Password must match')
				.required('Required field'),
		})}
		onSubmit={(values) => props.handleSubmit({ password: values })}
	>
		{(formikProps) => (
			<div>
				<div className='mt-2 mb-4'>
					<TextField
						type='password'
						variant='outlined'
						label='Current password'
						value={formikProps.values.current}
						onChange={formikProps.handleChange}
						size='small'
						error={
							formikProps.touched.current &&
							Boolean(formikProps.errors.current)
						}
						helperText={
							formikProps.touched.current
								? formikProps.errors.current
								: ''
						}
						onBlur={formikProps.handleBlur}
						fullWidth
						name='current'
					/>
				</div>
				<div className='mb-4'>
					<TextField
						type='password'
						name='new'
						variant='outlined'
						label='New password'
						value={formikProps.values.new}
						onChange={formikProps.handleChange}
						size='small'
						error={
							formikProps.touched.new && Boolean(formikProps.errors.new)
						}
						helperText={
							formikProps.touched.new ? formikProps.errors.new : ''
						}
						onBlur={formikProps.handleBlur}
						fullWidth
					/>
				</div>
				<div className='mb-4'>
					<TextField
						type='password'
						name='reTypeNew'
						variant='outlined'
						label='Re-type password'
						className='w-100 form-control mr-2'
						value={formikProps.values.reTypeNew}
						onChange={formikProps.handleChange}
						onBlur={formikProps.handleBlur}
						size='small'
						error={
							formikProps.touched.reTypeNew &&
							Boolean(formikProps.errors.reTypeNew)
						}
						helperText={
							formikProps.touched.reTypeNew
								? formikProps.errors.reTypeNew
								: ''
						}
						fullWidth
					/>
				</div>
			</div>
		)}
	</Formik>
);
