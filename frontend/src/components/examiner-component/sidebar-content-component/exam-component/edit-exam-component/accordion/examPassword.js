import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Edit, Close, Update } from '@material-ui/icons';

import styles from '../../exam.module.css';
import { ExamPasswordForm } from '../../../../../../forms/editExamForm';

const ExamPassword = (props) => {
	let { fields, updateExamDetails, handleCollapseChange } = props;
	let passwordRef = React.useRef();
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
													passwordRef.current.handleSubmit()
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
								<div>
									<ExamPasswordForm
										passwordRef={passwordRef}
										handleSubmit={updateExamDetails}
									/>
								</div>
							</Collapse>
						</div>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

export default ExamPassword;
