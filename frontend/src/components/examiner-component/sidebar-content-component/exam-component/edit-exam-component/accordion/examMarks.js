import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const ExamMarks = ({
	state,
	handleExamChange,
	handleCollapseChange,
	updateExamDetails,
}) => {
	return (
		<Accordion defaultActiveKey='0'>
			<Card className='mb-2'>
				<Accordion.Toggle
					className='bg-dark text-white'
					as={Card.Header}
					variant='link'
					eventKey='0'
				>
					Exam marks
				</Accordion.Toggle>
				<Accordion.Collapse eventKey='0'>
					<Card.Body>
						<div className='container'>
							<div className='d-flex justify-content-between flex-row'>
								<label>Total marks</label>
								<p>{state.totalMarks.prev}</p>
								<p
									className='cursor-pointer edit-text'
									onClick={() => handleCollapseChange('totalMarks')}
								>
									Edit
								</p>
							</div>
							<Collapse in={state.totalMarks.collapse}>
								<div className='row'>
									<div className='col-md-10'>
										<input
											type='text'
											name='totalMarks'
											maxLength={4}
											className='w-100 form-control mr-2'
											value={state.totalMarks.new}
											onChange={handleExamChange}
										/>
										{state.totalMarks.msg ? (
											<span>{state.totalMarks.msg}</span>
										) : null}
									</div>
									<div className='col-md-2'>
										<button
											type='button'
											className='btn btn-primary'
											onClick={
												state.totalMarks.new != null
													? () =>
															updateExamDetails({
																totalMarks:
																	state.totalMarks.new,
															})
													: null
											}
										>
											Update
										</button>
									</div>
								</div>
							</Collapse>
							<div className='d-flex justify-content-between flex-row mt-2'>
								<label>Passing marks</label>
								<p>{state.passingMarks.prev}</p>
								<p
									className='cursor-pointer edit-text'
									onClick={() => handleCollapseChange('passingMarks')}
								>
									Edit
								</p>
							</div>
							<Collapse in={state.passingMarks.collapse}>
								<div className='row'>
									<div className='col-md-10'>
										<input
											type='text'
											name='passingMarks'
											maxLength={4}
											className='w-100 form-control mr-2'
											value={state.passingMarks.new}
											onChange={handleExamChange}
										/>
										{state.passingMarks.msg ? (
											<span>{state.passingMarks.msg}</span>
										) : null}
									</div>
									<div className='col-md-2'>
										<button
											type='button'
											className='btn btn-primary'
											onClick={
												state.passingMarks.new != null
													? () =>
															updateExamDetails({
																passingMarks:
																	state.passingMarks.new,
															})
													: null
											}
										>
											Update
										</button>
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

export default ExamMarks;
