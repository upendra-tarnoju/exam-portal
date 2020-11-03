import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { TextField } from '@material-ui/core';
import { Edit, Close, Update } from '@material-ui/icons';

import styles from '../../exam.module.css';

const ExamPassword = (props) => {
	let {
		fields,
		updateExamDetails,
		handleCollapseChange,
		handlePasswordChange,
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
					Exam password
				</Accordion.Toggle>
				<Accordion.Collapse eventKey='0'>
					<Card.Body>
						<div className='container'>
							<div className='d-flex justify-content-between flex-row'>
								<label className={`${styles.editExamHeading}`}>
									Password{' '}
									{fields.password.msg ? (
										<span className='d-block invalid-feedback'>
											* {fields.password.msg}
										</span>
									) : null}
								</label>
								{fields.editExam ? (
									fields.password.collapse ? (
										<div className='align-self-center'>
											<Update
												className='cursor-pointer edit-text align-self-center'
												onClick={() =>
													updateExamDetails({
														password: {
															current: fields.current,
															new: fields.new,
															reTypeNew: fields.reTypeNew,
														},
													})
												}
											/>
											<Close
												fontSize='small'
												className='cursor-pointer edit-text align-self-center'
												onClick={() =>
													handleCollapseChange('password')
												}
											/>
										</div>
									) : (
										<Edit
											fontSize='small'
											className='cursor-pointer edit-text align-self-center'
											onClick={() =>
												handleCollapseChange('password')
											}
										/>
									)
								) : null}
							</div>
							<Collapse in={fields.password.collapse}>
								<form>
									<div className='mt-2 mb-4'>
										<TextField
											type='password'
											variant='outlined'
											label='Current password'
											value={fields.current.value}
											onChange={handlePasswordChange}
											size='small'
											error={fields.current.msg !== ''}
											helperText={fields.current.msg}
											fullWidth
										/>
									</div>
									<div className='mb-4'>
										<TextField
											type='password'
											name='new'
											variant='outlined'
											label='New password'
											value={fields.new.value}
											onChange={handlePasswordChange}
											size='small'
											error={fields.new.msg !== ''}
											helperText={fields.new.msg}
											fullWidth
										/>
									</div>
									<TextField
										type='password'
										name='reTypeNew'
										variant='outlined'
										label='Re-type password'
										className='w-100 form-control mr-2'
										value={fields.reTypeNew.value}
										onChange={handlePasswordChange}
										size='small'
										error={fields.reTypeNew.msg !== ''}
										helperText={fields.reTypeNew.msg}
										fullWidth
									/>
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
