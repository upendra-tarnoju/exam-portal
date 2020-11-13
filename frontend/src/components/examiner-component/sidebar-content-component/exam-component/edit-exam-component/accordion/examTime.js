import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Grid } from '@material-ui/core';
import Moment from 'react-moment';
import { Edit, Close, Update, DeleteForever } from '@material-ui/icons';
import moment from 'moment';

import styles from '../../exam.module.css';
import DeleteModal from '../../../../../../modals/deleteModal';
import {
	ExamDateForm,
	ExamStartTimeForm,
	ExamEndTimeForm,
	ExamDurationForm,
} from '../../../../../../forms/editExamForm';

const ExamTime = (props) => {
	let [deleteModal, setModal] = React.useState(false);
	let {
		fields,
		handleCollapseChange,
		deleteDuration,
		updateExamDetails,
	} = props;

	let hideModal = () => setModal(false);

	let getIcons = (key, ref) => {
		if (fields.editExam) {
			if (fields[key].collapse) {
				return (
					<div className='align-self-center'>
						<Update
							className='cursor-pointer edit-text align-self-center'
							onClick={() => ref.current.handleSubmit()}
						/>
						{key === 'duration' && fields[key].prev !== undefined ? (
							<DeleteForever
								className='cursor-pointer edit-text align-self-center'
								onClick={() => setModal(true)}
							/>
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

	let ExamDateField = () => {
		let examDateRef = React.useRef();
		return (
			<div>
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
					{getIcons('examDate', examDateRef)}
				</div>
				<Collapse in={fields.examDate.collapse}>
					<Grid container>
						<ExamDateForm
							value={fields.examDate.new}
							examDateRef={examDateRef}
							handleSubmit={updateExamDetails}
						/>
					</Grid>
				</Collapse>
			</div>
		);
	};

	let ExamStartTimeField = () => {
		let startTimeRef = React.useRef();
		return (
			<div>
				<div className='d-flex justify-content-between flex-row mt-2'>
					<div className='flex-column'>
						<label className={`mb-0 ${styles.editExamHeading}`}>
							Start time
						</label>
						<p className={styles.editExamContent}>
							{moment(fields.startTime.prev).format('HH:mm A')}
						</p>
					</div>
					{getIcons('startTime', startTimeRef)}
				</div>
				<Collapse in={fields.startTime.collapse}>
					<Grid container>
						<ExamStartTimeForm
							value={fields.startTime.new}
							startTimeRef={startTimeRef}
							handleSubmit={updateExamDetails}
							examDate={fields.examDate.new}
						/>
					</Grid>
				</Collapse>
			</div>
		);
	};

	let ExamEndTimeField = () => {
		let endTimeRef = React.useRef();
		return (
			<div>
				<div className='d-flex justify-content-between flex-row mt-2'>
					<div className='flex-column'>
						<label className={`mb-0 ${styles.editExamHeading}`}>
							End time
						</label>
						<p className={styles.editExamContent}>
							{moment(fields.endTime.prev).format('HH:mm A')}
						</p>
					</div>
					{getIcons('endTime', endTimeRef)}
				</div>
				<Collapse in={fields.endTime.collapse}>
					<Grid container>
						<ExamEndTimeForm
							value={fields.endTime.new}
							endTimeRef={endTimeRef}
							handleSubmit={updateExamDetails}
							startTime={fields.startTime.new}
						/>
					</Grid>
				</Collapse>
			</div>
		);
	};

	let ExamDurationField = () => {
		let durationRef = React.useRef();
		return (
			<div>
				<div className='d-flex justify-content-between flex-row mt-2'>
					<div className='flex-column'>
						<label className={`mb-0 ${styles.editExamHeading}`}>
							Duration
						</label>
						<p className={styles.editExamContent}>
							{fields.duration.prev !== undefined
								? `${fields.duration.prev} minutues`
								: 'NA'}
						</p>
					</div>
					{getIcons('duration', durationRef)}
				</div>
				<Collapse in={fields.duration.collapse}>
					<div>
						<ExamDurationForm
							value={fields.duration.new}
							durationRef={durationRef}
							handleSubmit={updateExamDetails}
							startTime={fields.startTime.new}
							endTime={fields.endTime.new}
						/>
					</div>
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
					Exam time
				</Accordion.Toggle>
				<Accordion.Collapse eventKey='0'>
					<Card.Body>
						<div className='container'>
							<ExamDateField />
							<ExamStartTimeField />
							<ExamEndTimeField />
							<ExamDurationField />
							<DeleteModal
								show={deleteModal}
								hideModal={hideModal}
								heading='duration'
								deleteContent={deleteDuration}
							/>
						</div>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

export default ExamTime;
//236
