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
					<DialogTitle className={styles.keyHeading}>
						Enter exam key
					</DialogTitle>
					<Divider />
					<DialogContent>
						<div class='py-3'>
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
					<DialogActions className='my-2'>
						<Button
							onClick={() => props.handleClose()}
							variant='outlined'
							color='secondary'
						>
							Cancel
						</Button>
						<Button
							variant='outlined'
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
