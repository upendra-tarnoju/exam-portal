import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Grid } from '@material-ui/core';
import Moment from 'react-moment';
import { Edit, Close, Update } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';

import styles from '../../exam.module.css';

const ExamTime = (props) => {
	let {
		fields,
		handleExamChange,
		handleCollapseChange,
		updateExamDetails,
	} = props;
	return (
		<Accordion defaultActiveKey='0'>
			<Card className='mb-2'>
				<Accordion.Toggle
					className={`bg-dark text-white ${styles.accordionHeading}`}
					as={Card.Header}
					variant='link'
					eventKey='0'
				>
					Exam time
				</Accordion.Toggle>
				<Accordion.Collapse eventKey='0'>
					<Card.Body>
						<div className='container'>
							<div className='d-flex justify-content-between flex-row'>
								<div className='flex-column'>
									<label className={`mb-0 ${styles.editExamHeading}`}>
										Exam date
									</label>
									<p className={styles.editExamContent}>
										<Moment parse='YYYY-MM-DD' format='MMM Do, YYYY'>
											{fields.examDate.prev}
										</Moment>
									</p>
								</div>
								{fields.editExam ? (
									fields.examDate.collapse ? (
										<div className='align-self-center'>
											<Update
												className='cursor-pointer edit-text align-self-center'
												onClick={
													fields.examDate.new != null
														? () =>
																updateExamDetails({
																	examDate:
																		fields.examDate.new,
																})
														: null
												}
											/>
											<Close
												fontSize='small'
												className='cursor-pointer edit-text align-self-center'
												onClick={() =>
													handleCollapseChange('examDate')
												}
											/>
										</div>
									) : (
										<Edit
											fontSize='small'
											className='cursor-pointer edit-text align-self-center'
											onClick={() =>
												handleCollapseChange('examDate')
											}
										/>
									)
								) : null}
							</div>
							<Collapse in={fields.examDate.collapse}>
								<Grid container>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											margin='normal'
											id='exam-date-picker'
											label='Exam date'
											format='MM/dd/yyyy'
											value={fields.examDate.new}
											className='w-100 mt-0'
											variant='dialog'
											onChange={(date) =>
												handleExamChange({ examDate: date })
											}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
											error={fields.examDate.msg !== ''}
											helperText={fields.examDate.msg}
											name='examDate'
										/>
									</MuiPickersUtilsProvider>
								</Grid>
							</Collapse>
							<div className='d-flex justify-content-between flex-row mt-2'>
								<div className='flex-column'>
									<label className={`mb-0 ${styles.editExamHeading}`}>
										Start time
									</label>
									<p className={styles.editExamContent}>
										{moment(fields.startTime.prev).format('HH:mm A')}
									</p>
								</div>
								{fields.editExam ? (
									fields.startTime.collapse ? (
										<div className='align-self-center'>
											<Update
												className='cursor-pointer edit-text align-self-center'
												onClick={
													fields.startTime.new != null
														? () =>
																updateExamDetails({
																	startTime:
																		fields.startTime.new,
																})
														: null
												}
											/>
											<Close
												fontSize='small'
												className='cursor-pointer edit-text align-self-center'
												onClick={() =>
													handleCollapseChange('startTime')
												}
											/>
										</div>
									) : (
										<Edit
											fontSize='small'
											className='cursor-pointer edit-text align-self-center'
											onClick={() =>
												handleCollapseChange('startTime')
											}
										/>
									)
								) : null}
							</div>
							<Collapse in={fields.startTime.collapse}>
								<Grid container>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardTimePicker
											margin='normal'
											id='end-time-picker'
											label='Start time'
											fullWidth
											className='mt-0'
											value={fields.startTime.new}
											onChange={(time) =>
												handleExamChange({ startTime: time })
											}
											KeyboardButtonProps={{
												'aria-label': 'change time',
											}}
											error={fields.startTime.msg !== ''}
											helperText={fields.startTime.msg}
										/>
									</MuiPickersUtilsProvider>
								</Grid>
							</Collapse>
							<div className='d-flex justify-content-between flex-row mt-2'>
								<div className='flex-column'>
									<label className={`mb-0 ${styles.editExamHeading}`}>
										End time
									</label>
									<p className={styles.editExamContent}>
										{moment(fields.endTime.prev).format('HH:mm A')}
									</p>
								</div>
								{fields.editExam ? (
									fields.endTime.collapse ? (
										<div className='align-self-center'>
											<Update
												className='cursor-pointer edit-text align-self-center'
												onClick={
													fields.endTime.new != null
														? () =>
																updateExamDetails({
																	endTime: fields.endTime.new,
																})
														: null
												}
											/>
											<Close
												fontSize='small'
												className='cursor-pointer edit-text align-self-center'
												onClick={() =>
													handleCollapseChange('endTime')
												}
											/>
										</div>
									) : (
										<Edit
											fontSize='small'
											className='cursor-pointer edit-text align-self-center'
											onClick={() => handleCollapseChange('endTime')}
										/>
									)
								) : null}
							</div>
							<Collapse in={fields.endTime.collapse}>
								<Grid container>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardTimePicker
											margin='normal'
											id='end-time-picker'
											label='End time'
											fullWidth
											className='mt-0'
											value={fields.endTime.new}
											onChange={(time) =>
												handleExamChange({ endTime: time })
											}
											KeyboardButtonProps={{
												'aria-label': 'change time',
											}}
											error={fields.endTime.msg !== ''}
											helperText={fields.endTime.msg}
										/>
									</MuiPickersUtilsProvider>
								</Grid>
							</Collapse>
						</div>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

export default ExamTime;
