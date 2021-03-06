import React from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	TextField,
	Button,
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import styles from '../../student.module.css';
import StudentService from '../../../../services/studentApi';
import factories from '../../../../factories/factories';

const Examkey = (props) => {
	let [error, setError] = React.useState('');
	return (
		<Formik
			initialValues={{ password: '' }}
			validationSchema={Yup.object({
				password: Yup.string().required('Required'),
			})}
			onSubmit={(values) => {
				let studentService = new StudentService();
				studentService
					.validateExamKey(props.selectedExam, values.password)
					.then((res) => {
						let data = res.data.examDetails;
						props.history.push({
							pathname: `/exam/${props.selectedExam}/guidelines`,
							state: {
								totalMarks: data.totalMarks,
								negativeMarks: data.negativeMarks,
								subject: data.subject,
								duration: data.duration
									? `${data.duration} min`
									: factories.formatDuration(data.startTime, data.endTime),
							},
						});
					})
					.catch((error) => {
						setError(error.response.data.msg);
					});
			}}
		>
			{(formikProps) => (
				<Dialog
					open={props.open}
					onClose={() => props.handleClose(false)}
					maxWidth='xs'
					fullWidth={true}
				>
					<DialogTitle className={`${styles.keyHeading} bg-dark text-white`}>
						Enter exam key
					</DialogTitle>
					<Divider />
					<DialogContent>
						{error ? (
							<p
								className={`${styles.errorMessage} text-danger font-weight-bold mb-0`}
							>
								* {error}
							</p>
						) : null}
						<div className='py-3'>
							<TextField
								label='Password'
								name='password'
								type='password'
								fullWidth
								variant='outlined'
								size='medium'
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								value={formikProps.values.password}
								error={formikProps.errors.password}
								helperText={formikProps.errors.password}
							/>
						</div>
					</DialogContent>
					<Divider />
					<DialogActions className='py-3 bg-dark'>
						<Button
							onClick={() => props.handleClose()}
							variant='contained'
							color='secondary'
							type='button'
						>
							Cancel
						</Button>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							onClick={formikProps.handleSubmit}
						>
							Take test
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Formik>
	);
};

export default Examkey;
