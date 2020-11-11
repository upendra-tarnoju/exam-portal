import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { TextField } from '@material-ui/core';
import { Edit, Close, Update } from '@material-ui/icons';

import styles from '../../exam.module.css';

const ExamMarks = (props) => {
	let {
		fields,
		updateExamDetails,
		handleCollapseChange,
		handleExamChange,
	} = props;

	let handleSubmit = (field) => {
		updateExamDetails({ [field]: fields[field].new });
	};

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
					Exam marks
				</Accordion.Toggle>
				<Accordion.Collapse eventKey='0'>
					<Card.Body>
						<div className='container'>
							<div className='d-flex justify-content-between flex-row'>
								<div className='flex-column'>
									<label className={`mb-0 ${styles.editExamHeading}`}>
										Total marks
									</label>
									<p className={styles.editExamContent}>
										{fields.totalMarks.prev}
									</p>
								</div>
								{getIcons('totalMarks')}
							</div>
							<Collapse in={fields.totalMarks.collapse}>
								<TextField
									name='totalMarks'
									label='Total marks'
									inputProps={{ maxLength: 4 }}
									className='w-100'
									variant='outlined'
									size='small'
									value={fields.totalMarks.new}
									onChange={handleExamChange}
									error={fields.totalMarks.msg !== ''}
									helperText={fields.totalMarks.msg}
									onKeyDown={(event) => {
										if (
											event.keyCode === 13 &&
											fields.totalMarks.new != null
										)
											handleSubmit('totalMarks');
									}}
								/>
							</Collapse>
							<div className='d-flex justify-content-between flex-row mt-2'>
								<div className='flex-column'>
									<label className={`mb-0 ${styles.editExamHeading}`}>
										Passing marks
									</label>
									<p className={styles.editExamContent}>
										{fields.passingMarks.prev}
									</p>
								</div>
								{getIcons('passingMarks')}
							</div>
							<Collapse in={fields.passingMarks.collapse}>
								<TextField
									name='passingMarks'
									label='Passing marks'
									inputProps={{ maxLength: 4 }}
									className='w-100'
									variant='outlined'
									size='small'
									value={fields.passingMarks.new}
									onChange={handleExamChange}
									error={fields.passingMarks.msg !== ''}
									helperText={fields.passingMarks.msg}
									onKeyDown={(event) => {
										if (
											event.keyCode === 13 &&
											fields.passingMarks.new != null
										)
											handleSubmit('passingMarks');
									}}
								/>
							</Collapse>
						</div>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

export default ExamMarks;
