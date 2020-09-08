import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const ExamPassword = ({
	state,
	handlePasswordChange,
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
					Exam password
				</Accordion.Toggle>
				<Accordion.Collapse eventKey='0'>
					<Card.Body>
						<div className='container'>
							<div className='d-flex justify-content-between flex-row'>
								<label>Password</label>
								<p
									className='cursor-pointer edit-text'
									onClick={() => handleCollapseChange('password')}
								>
									Edit
								</p>
							</div>
							<Collapse in={state.password.collapse}>
								<form>
									<div className='form-group'>
										<label>Current</label>
										<input
											type='password'
											name='current'
											className='w-100 form-control mr-2'
											value={state.current.value}
											onChange={handlePasswordChange}
										/>
									</div>
									<div className='form-group'>
										<label>New</label>
										<input
											type='password'
											name='new'
											className='w-100 form-control mr-2'
											value={state.new.value}
											onChange={handlePasswordChange}
										/>
									</div>
									<div className='form-group'>
										<label>Re-type new</label>
										<input
											type='password'
											name='reTypeNew'
											className='w-100 form-control mr-2'
											value={state.reTypeNew.value}
											onChange={handlePasswordChange}
										/>
									</div>
									<div className='d-flex justify-content-end'>
										<button
											type='button'
											className='btn btn-primary'
											onClick={() =>
												updateExamDetails({
													password: {
														current: state.current,
														new: state.new,
														reTypeNew: state.reTypeNew,
													},
												})
											}
										>
											Update
										</button>
									</div>
								</form>
							</Collapse>
						</div>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

export default ExamPassword;
