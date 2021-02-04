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

const validateExamkey = (examId, examKey) => {
	let studentService = new StudentService();
	studentService.validateExamKey(examId, examKey).then((res) => {});
};

const Examkey = (props) => {
	return (
		<Formik
			initialValues={{ password: '' }}
			validationSchema={Yup.object({
				password: Yup.string().required('Required'),
			})}
			onSubmit={(values) => {
				validateExamkey(props.selectedExam, values.password);
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
