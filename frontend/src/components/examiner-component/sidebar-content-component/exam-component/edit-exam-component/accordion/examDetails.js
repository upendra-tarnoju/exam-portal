import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const ExamDetails = ({
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
					Exam details
				</Accordion.Toggle>
				<Accordion.Collapse eventKey='0'>
					<Card.Body>
						<div className='container'>
							<div className='d-flex justify-content-between flex-row'>
								<label>Subject</label>
								<p>{state.subject.prev}</p>
								<p onClick={() => handleCollapseChange('subject')}>
									Edit
								</p>
							</div>
							<Collapse in={state.subject.collapse}>
								<div className='row'>
									<div className='col-md-10'>
										<input
											type='text'
											name='subject'
											className='w-100 form-control mr-2'
											value={state.subject.new}
											onChange={handleExamChange}
										/>
										{state.subject.msg ? (
											<span>{state.subject.msg}</span>
										) : null}
									</div>
									<div className='col-md-2'>
										<button
											type='button'
											className='btn btn-primary'
											onClick={
												state.subject.new != null
													? () =>
															updateExamDetails({
																subject: state.subject.new,
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
								<label>Exam code</label>
								<p>{state.examCode.prev}</p>
								<p onClick={() => handleCollapseChange('examCode')}>
									Edit
								</p>
							</div>
							<Collapse in={state.examCode.collapse}>
								<div className='row'>
									<div className='col-md-10'>
										<input
											type='text'
											name='examCode'
											className='w-100 form-control mr-2'
											value={state.examCode.new}
											onChange={handleExamChange}
										/>
										{state.examCode.msg ? (
											<span>{state.examCode.msg}</span>
										) : null}
									</div>
									<div className='col-md-2'>
										<button
											type='button'
											className='btn btn-primary'
											onClick={
												state.examCode.new != null
													? () =>
															updateExamDetails({
																examCode: state.examCode.new,
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

export default ExamDetails;
