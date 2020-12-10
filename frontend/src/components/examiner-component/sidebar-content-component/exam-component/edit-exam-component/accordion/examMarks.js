import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Edit, Close, Update } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

import styles from '../../exam.module.css';
import {
	TotalMarksForm,
	PassingMarksForm,
} from '../../../../../../forms/editExamForm';
import factories from '../../../../../../factories/factories';

const ExamMarks = (props) => {
	let { fields, updateExamDetails, handleCollapseChange } = props;

	let getIcons = (key, ref) => {
		if (fields.editExam) {
			if (fields[key].collapse) {
				return (
					<div className='align-self-center'>
						<Update
							className='cursor-pointer edit-text align-self-center'
							onClick={() => {
								if (key === 'negativeMarks') {
									props.updateExamDetails({
										[key]: fields[key].new,
									});
								} else {
									ref.current.handleSubmit();
								}
							}}
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

	let TotalMarksField = () => {
		let totalMarksRef = React.useRef();
		return (
			<div>
				<div className='d-flex justify-content-between flex-row'>
					<div className='flex-column'>
						<label className={`mb-0 ${styles.editExamHeading}`}>
							Total marks
						</label>
						<p className={styles.editExamContent}>
							{fields.totalMarks.prev}
						</p>
					</div>
					{getIcons('totalMarks', totalMarksRef)}
				</div>
				<Collapse in={fields.totalMarks.collapse}>
					<div>
						<TotalMarksForm
							value={fields.totalMarks.prev}
							totalMarksRef={totalMarksRef}
							handleSubmit={updateExamDetails}
						/>
					</div>
				</Collapse>
			</div>
		);
	};

	let PassingMarksField = () => {
		let passingMarksRef = React.useRef();
		return (
			<div>
				<div className='d-flex justify-content-between flex-row mt-2'>
					<div className='flex-column'>
						<label className={`mb-0 ${styles.editExamHeading}`}>
							Passing marks
						</label>
						<p className={styles.editExamContent}>
							{fields.passingMarks.prev}
						</p>
					</div>
					{getIcons('passingMarks', passingMarksRef)}
				</div>
				<Collapse in={fields.passingMarks.collapse}>
					<div>
						<PassingMarksForm
							value={fields.passingMarks.prev}
							totalMarksRef={passingMarksRef}
							handleSubmit={updateExamDetails}
							totalMarks={fields.totalMarks.prev}
						/>
					</div>
				</Collapse>
			</div>
		);
	};

	let getSelectedItems = () => {
		let selectedNegativeMarks = props.fields.negativeMarks.new;

		let item;
		item = factories.negativeMarksList.find((opt) => {
			if (opt.value === selectedNegativeMarks) {
				return opt;
			}
		});
		return item || { value: '', label: '' };
	};

	let NegativeMarksField = () => {
		let negativeMarksRef = React.useRef();
		return (
			<div>
				<div className='d-flex justify-content-between flex-row mt-2'>
					<div className='flex-column'>
						<label className={`mb-0 ${styles.editExamHeading}`}>
							Negative marks
						</label>
						<p className={styles.editExamContent}>
							{fields.negativeMarks.prev}
						</p>
					</div>
					{getIcons('negativeMarks', negativeMarksRef)}
				</div>
				<Collapse in={fields.negativeMarks.collapse}>
					<Autocomplete
						id='negative-marks-combo-box'
						options={factories.negativeMarksList}
						getOptionLabel={(option) => option.label}
						value={getSelectedItems()}
						size='small'
						fullWidth
						className='mb-2'
						renderInput={(params) => (
							<TextField
								{...params}
								label='Negative marks'
								variant='outlined'
								error={fields.negativeMarks.msg !== ''}
							/>
						)}
						onChange={(event, marks) => {
							props.handleNegativeMarksChange(marks);
						}}
					/>
				</Collapse>
			</div>
		);
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
							{TotalMarksField()}
							{PassingMarksField()}
							{NegativeMarksField()}
						</div>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

export default ExamMarks;
