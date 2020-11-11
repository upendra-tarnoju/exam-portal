import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Grid } from '@material-ui/core';
import Moment from 'react-moment';
import { Edit, Close, Update, DeleteForever } from '@material-ui/icons';
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

	let getIcons = (key) => {
		if (fields.editExam) {
			if (fields[key].collapse) {
				return (
					<div className='align-self-center'>
						<Update
							className='cursor-pointer edit-text align-self-center'
							onClick={
								fields[key].new !== null
									? () =>
											updateExamDetails({
												[key]: fields[key].new,
											})
									: null
							}
						/>
						{key === 'duration' ? (
							<DeleteForever className='cursor-pointer edit-text align-self-center' />
						) : null}

						<Close
							fontSize='small'
							className='cursor-pointer edit-text align-self-center'
							onClick={() => handleCollapseChange(key)}
						/>
					</div>
				);
			} else
				return (
					<Edit
						fontSize='small'
						className='cursor-pointer edit-text align-self-center'
						onClick={() => handleCollapseChange(key)}
					/>
				);
		} else return null;
	};

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
								{getIcons('examDate')}
							</div>
							<Collapse in={fields.examDate.collapse}>
								<Grid container>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											margin='normal'
											id='exam-date-picker'
											label='Exam date'
											format='MM/dd/yyyy'
											value={fields.examDate.new || Date.now()}
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
								{getIcons('startTime')}
							</div>
							<Collapse in={fields.startTime.collapse}>
								<Grid container>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardTimePicker
											margin='normal'
											id='start-time-picker'
											label='Start time'
											fullWidth
											className='mt-0'
											value={fields.startTime.new || Date.now()}
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
								{getIcons('endTime')}
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
											value={fields.endTime.new || Date.now()}
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
