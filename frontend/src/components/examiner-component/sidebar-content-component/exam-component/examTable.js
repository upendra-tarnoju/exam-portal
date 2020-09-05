import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { Tooltip, OverlayTrigger, Modal, Button } from 'react-bootstrap';

import * as ActionTypes from '../../../../action';
import ExaminerService from '../../../../services/examinerApi';
import styles from './exam.module.css';

class ExamTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDialog: false,
			showEditDialog: false,
			deleteIndex: '',
		};
		this.handleExamChange = this.handleExamChange.bind(this);
		this.ShowDeleteDialog = this.ShowDeleteDialog.bind(this);
		this.ShowEditDialog = this.ShowEditDialog.bind(this);
		this.deleteExam = this.deleteExam.bind(this);
		this.examinerService = new ExaminerService();
	}

	editExam(status, index) {
		this.props.editExam(status, index);
		if (status && index !== '') {
			let currentDate = moment(Date()).format('YYYY-MM-DD');
			let examDate = this.props.examsList[index].examDate;
			if (examDate >= currentDate) {
				if (status) {
					let particularExam = this.props.examsList[index];
					this.props.setExamInputs(particularExam);
				}
			} else {
				this.setState({ showEditDialog: true });
			}
		}
	}

	handleExamChange(event) {
		let update = false;
		let key = event.target.name;
		let value = event.target.value;
		if (key === 'totalMarks' || key === 'passingMarks') {
			let letters = /^[0-9\b]+$/;
			if (letters.test(value) || value === '') {
				update = true;
			}
		} else {
			update = true;
		}
		if (update) {
			this.props.updateExamInputs(key, value);
		}
	}

	handleDeleteDialog(showDialog, deleteIndex) {
		this.setState({ showDialog, deleteIndex });
	}

	handleEditDialog(showEditDialog) {
		this.setState({ showEditDialog });
	}

	deleteExam() {
		let examId = this.props.examsList[this.state.deleteIndex]._id;
		this.examinerService.deleteExam(examId).then((response) => {
			let updatedExams = this.props.examsList.filter(
				(exam) => exam._id !== response.data._id
			);
			this.props.setExamList(updatedExams);
		});
	}

	ShowDeleteDialog() {
		return (
			<Modal
				show={this.state.showDialog}
				onHide={() => this.handleDeleteDialog(false)}
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Header closeButton>Caution</Modal.Header>
				<Modal.Body>Do you want to delete this exam ?</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={() => this.handleDeleteDialog(false)}
					>
						Close
					</Button>
					<Button variant='primary' onClick={this.deleteExam}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	ShowEditDialog() {
		return (
			<Modal
				show={this.state.showEditDialog}
				onHide={() => this.handleEditDialog(false)}
				centered
			>
				<Modal.Header closeButton>Warning</Modal.Header>
				<Modal.Body>You cannot edit expired exam.</Modal.Body>
				<Modal.Footer>
					<Button
						variant='primary'
						onClick={() => this.handleEditDialog(false)}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	render() {
		let {
			exam,
			index,
			selectedExamIndex,
			editExam,
			input,
			errors,
		} = this.props;
		return (
			<tr key={exam._id}>
				<td>{index + 1}</td>
				<td>
					{selectedExamIndex === index && editExam ? (
						<div className='d-flex flex-column'>
							<input
								type='text'
								name='subject'
								className='w-100 form-control form-control-sm'
								value={input.subject}
								onChange={this.handleExamChange}
							/>
							<span className={`${styles.errorText} text-danger mt-1`}>
								{errors.subject}
							</span>
						</div>
					) : (
						exam.subject
					)}
				</td>
				<td>
					{selectedExamIndex === index && editExam ? (
						<div className='d-flex flex-column'>
							<input
								type='text'
								name='examCode'
								className='w-100 form-control form-control-sm'
								value={input.examCode}
								onChange={this.handleExamChange}
							/>
							<span className={`${styles.errorText} text-danger mt-1`}>
								{errors.examCode}
							</span>
						</div>
					) : (
						exam.examCode
					)}
				</td>
				<td>
					{selectedExamIndex === index && editExam ? (
						<div className='d-flex flex-column'>
							<input
								type='date'
								name='examDate'
								value={moment(
									input.examDate.value,
									'YYYY-MM-DD'
								).format('YYYY-MM-DD')}
								onChange={this.handleExamChange}
								className='w-100 form-control form-control-sm'
							/>
							<span className={`${styles.errorText} text-danger mt-1`}>
								{errors.examDate}
							</span>
						</div>
					) : (
						<Moment format='MMM Do, YYYY'>{exam.examDate}</Moment>
					)}
				</td>
				<td>
					{selectedExamIndex === index && editExam ? (
						<div className='d-flex flex-column'>
							<input
								type='text'
								name='totalMarks'
								value={input.totalMarks}
								onChange={this.handleExamChange}
								className='w-100 form-control text-right form-control-sm'
							/>
							<span className={`${styles.errorText} text-danger mt-1`}>
								{errors.totalMarks}
							</span>
						</div>
					) : (
						<div className='text-right'>{exam.totalMarks}</div>
					)}
				</td>
				<td>
					{selectedExamIndex === index && editExam ? (
						<div className='d-flex flex-column'>
							<input
								type='text'
								name='passingMarks'
								value={input.passingMarks}
								onChange={this.handleExamChange}
								className='w-100 form-control text-right form-control-sm'
							/>
							<span className={`${styles.errorText} text-danger mt-1`}>
								{errors.passingMarks}
							</span>
						</div>
					) : (
						<div className='text-right'>{exam.passingMarks}</div>
					)}
				</td>
				<td>
					{selectedExamIndex === index && editExam ? (
						<div className='d-flex flex-column'>
							<input
								type='time'
								name='startTime'
								value={input.startTime}
								onChange={this.handleExamChange}
								className='w-100 form-control form-control-sm'
							/>
							<span className={`${styles.errorText} text-danger mt-1`}>
								{errors.startTime}
							</span>
						</div>
					) : (
						<Moment format='hh:mm A'>{exam.startTime}</Moment>
					)}
				</td>
				<td>
					{selectedExamIndex === index && editExam ? (
						<div className='d-flex flex-column'>
							<input
								type='time'
								name='endTime'
								value={input.endTime}
								onChange={this.handleExamChange}
								className='w-100 form-control form-control-sm'
							/>
							<span className={`${styles.errorText} text-danger mt-1`}>
								{errors.endTime}
							</span>
						</div>
					) : (
						<Moment format='hh:mm A'>{exam.endTime}</Moment>
					)}
				</td>
				<td className='d-flex justify-content-around'>
					<OverlayTrigger
						placement='bottom'
						overlay={<Tooltip id='button-tooltip'>Delete</Tooltip>}
					>
						<i
							className='fa fa-trash-o cursor-pointer text-white align-self-center'
							onClick={() => this.handleDeleteDialog(true, index)}
						></i>
					</OverlayTrigger>
					<OverlayTrigger
						placement='bottom'
						overlay={<Tooltip id='button-tooltip'>Add Questions</Tooltip>}
					>
						<i className='fa fa-plus cursor-pointer text-white align-self-center'></i>
					</OverlayTrigger>
					{selectedExamIndex === index && editExam ? (
						<OverlayTrigger
							placement='bottom'
							overlay={<Tooltip id='button-tooltip'>Cancel</Tooltip>}
						>
							<i
								className='fa fa-times cursor-pointer text-white align-self-center'
								onClick={() => this.editExam(false, '')}
							></i>
						</OverlayTrigger>
					) : (
						<OverlayTrigger
							placement='bottom'
							overlay={
								<Tooltip id='button-tooltip'>Update exam</Tooltip>
							}
						>
							<i
								className='fa fa-check-square-o cursor-pointer text-white align-self-center'
								onClick={() => this.editExam(true, index)}
							></i>
						</OverlayTrigger>
					)}
				</td>
				<this.ShowDeleteDialog />
				<this.ShowEditDialog />
			</tr>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		editExam: state.examReducer.editExam,
		selectedExamIndex: state.examReducer.selectedExamIndex,
		examsList: state.examReducer.examsList,
		input: state.examReducer.editExamInputs,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		editExam: (status, index) => {
			dispatch({
				type: ActionTypes.EDIT_EXAM_STATUS,
				status: status,
				index: index,
			});
		},
		updateExamInputs: (key, value) => {
			dispatch({
				type: ActionTypes.EDIT_EXAM_INPUTS,
				key: key,
				value: value,
			});
		},
		setExamInputs: (inputs) => {
			dispatch({
				type: ActionTypes.SET_EXAM_INPUTS,
				inputs: inputs,
			});
		},
		setExamList: (examsList) => {
			dispatch({
				type: ActionTypes.SET_EXAM_LIST,
				examList: examsList,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamTable);
