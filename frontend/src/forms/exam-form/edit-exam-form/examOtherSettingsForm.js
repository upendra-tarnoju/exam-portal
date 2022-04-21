import React from 'react';
import { Formik } from 'formik';
import { Button, Switch, TextField, Typography } from '@material-ui/core';
import { Form } from 'react-bootstrap';

import schema from '../../../schema/exam/edit-exam/otherExamSettingsSchema';

const ExamOtherSettingsForm = (props) => {
	return (
		<Formik
			enableReinitialize
			validationSchema={schema}
			onSubmit={(values) => props.handleSubmit(values)}
			initialValues={{
				examSwitchingAttempts: props.examDetails.examSwitchingAttempts,
				updatePreviousQuestion: props.examDetails.updatePreviousQuestion,
				shuffleQuestions: props.examDetails.shuffleQuestions,
			}}
		>
			{(formikProps) => (
				<Form className='mt-3' onSubmit={formikProps.handleSubmit}>
					<Typography variant='h6' className='mb-3' component='p'>
						Update other details
					</Typography>
					<TextField
						variant='outlined'
						className='w-100 mt-3'
						name='examSwitchingAttempts'
						label='Maximum exam switching window attempts'
						value={formikProps.values.examSwitchingAttempts || ''}
						onChange={(event) => {
							let regex = /^[0-9\b]+$/;
							if (regex.test(event.target.value) || event.target.value === '') {
								formikProps.setFieldValue(
									'examSwitchingAttempts',
									event.target.value
								);
							}
						}}
						onBlur={formikProps.handleBlur}
						error={
							formikProps.touched.examSwitchingAttempts &&
							!!formikProps.errors.examSwitchingAttempts
						}
						helperText={
							formikProps.touched.examSwitchingAttempts &&
							formikProps.errors.examSwitchingAttempts
						}
					/>
					<div className='d-flex justify-content-between mt-2'>
						<Typography className='align-self-center'>
							Do you want to shuffle questions during exam ?
						</Typography>
						<Switch
							checked={formikProps.values.updatePreviousQuestion}
							onChange={formikProps.handleChange}
							name='updatePreviousQuestion'
						/>
					</div>
					<div className='d-flex justify-content-between mt-2'>
						<Typography className='align-self-center'>
							Allow student to access and update previous question ?
						</Typography>
						<Switch
							checked={formikProps.values.shuffleQuestions}
							onChange={formikProps.handleChange}
							name='shuffleQuestions'
						/>
					</div>
					{/* <FormControlLabel
						className='w-100'
						control={
							<Switch
								checked={formikProps.values.hideDuration}
								onChange={formikProps.handleChange}
								name='hideDuration'
							/>
						}
						label='Do you want to shuffle questions during exam ?'
					/> */}
					<Button
						variant='outlined'
						size='large'
						className='text-white bg-dark my-3'
						type='submit'
					>
						Change
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default ExamOtherSettingsForm;
