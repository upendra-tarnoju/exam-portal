import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from '@material-ui/core';
import Moment from 'react-moment';

import styles from '../../exam.module.css';

const ExamTime = ({
	state,
	handleExamChange,
	handleCollapseChange,
	updateExamDetails,
}) => {
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
											{state.examDate.prev}
										</Moment>
									</p>
								</div>
								{state.editExam ? (
									<p
										className='cursor-pointer edit-text align-self-center'
										onClick={() => handleCollapseChange('examDate')}
									>
										Edit
									</p>
								) : null}
							</div>
							<Collapse in={state.examDate.collapse}>
								<div className='row'>
									<div className='col-md-10'>
										<input
											type='date'
											name='examDate'
											maxLength={4}
											className='w-100 form-control mr-2'
											value={state.examDate.new}
											onChange={handleExamChange}
										/>
										{state.totalMarks.msg ? (
											<span>{state.examDate.msg}</span>
										) : null}
									</div>
									<div className='col-md-2 d-flex'>
										<Button
											type='button'
											size='small'
											variant='contained'
											color='primary'
											className='align-self-center'
											onClick={
												state.totalMarks.new != null
													? () =>
															updateExamDetails({
																examDate: state.examDate.new,
															})
													: null
											}
										>
											Update
										</Button>
									</div>
								</div>
							</Collapse>
							<div className='d-flex justify-content-between flex-row mt-2'>
								<div className='flex-column'>
									<label className={`mb-0 ${styles.editExamHeading}`}>
										Start time
									</label>
									<p className={styles.editExamContent}>
										<Moment parse='HH:mm' format='hh:mm A'>
											{state.startTime.prev}
										</Moment>
									</p>
								</div>
								{state.editExam ? (
									<p
										className='cursor-pointer edit-text align-self-center'
										onClick={() => handleCollapseChange('startTime')}
									>
										Edit
									</p>
								) : null}
							</div>
							<Collapse in={state.startTime.collapse}>
								<div className='row'>
									<div className='col-md-10'>
										<input
											type='time'
											name='startTime'
											maxLength={4}
											className='w-100 form-control mr-2'
											value={state.startTime.new}
											onChange={handleExamChange}
										/>
										{state.startTime.msg ? (
											<span>{state.startTime.msg}</span>
										) : null}
									</div>
									<div className='col-md-2 d-flex'>
										<Button
											type='button'
											size='small'
											variant='contained'
											color='primary'
											className='align-self-center'
											onClick={
												state.passingMarks.new != null
													? () =>
															updateExamDetails({
																startTime: state.startTime.new,
															})
													: null
											}
										>
											Update
										</Button>
									</div>
								</div>
							</Collapse>
							<div className='d-flex justify-content-between flex-row mt-2'>
								<div className='flex-column'>
									<label className={`mb-0 ${styles.editExamHeading}`}>
										End time
									</label>
									<p className={styles.editExamContent}>
										<Moment parse='HH:mm' format='hh:mm A'>
											{state.endTime.prev}
										</Moment>
									</p>
								</div>
								{state.editExam ? (
									<p
										className='cursor-pointer edit-text align-self-center'
										onClick={() => handleCollapseChange('endTime')}
									>
										Edit
									</p>
								) : null}
							</div>
							<Collapse in={state.endTime.collapse}>
								<div className='row'>
									<div className='col-md-10'>
										<input
											type='time'
											name='endTime'
											maxLength={4}
											className='w-100 form-control mr-2'
											value={state.endTime.new}
											onChange={handleExamChange}
										/>
										{state.endTime.msg ? (
											<span>{state.endTime.msg}</span>
										) : null}
									</div>
									<div className='col-md-2 d-flex'>
										<Button
											type='button'
											size='small'
											variant='contained'
											color='primary'
											className='align-self-center'
											onClick={
												state.endTime.new != null
													? () =>
															updateExamDetails({
																endTime: state.endTime.new,
															})
													: null
											}
										>
											Update
										</Button>
									</div>
								</div>
							</Collapse>
						</div>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

export default ExamTime;
