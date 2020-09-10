import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Tooltip, OverlayTrigger, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as ActionTypes from '../../../../action';
import ExaminerService from '../../../../services/examinerApi';

class ExamTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDialog: false,
			showEditDialog: false,
			deleteIndex: '',
		};
		this.ShowDeleteDialog = this.ShowDeleteDialog.bind(this);
		this.ShowEditDialog = this.ShowEditDialog.bind(this);
		this.deleteExam = this.deleteExam.bind(this);
		this.examinerService = new ExaminerService();
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
		let { exam, index } = this.props;
		return (
			<tr key={exam._id}>
				<td>{index + 1}</td>
				<td>{exam.subject}</td>
				<td>{exam.examCode}</td>
				<td>
					<Moment format='MMM Do, YYYY'>{exam.examDate}</Moment>
				</td>
				<td>
					<div className='text-right'>{exam.totalMarks}</div>
				</td>
				<td>
					<div className='text-right'>{exam.passingMarks}</div>
				</td>
				<td>
					<Moment format='hh:mm A'>{exam.startTime}</Moment>
				</td>
				<td>
					<Moment format='hh:mm A'>{exam.endTime}</Moment>
				</td>
				<td>
					<Moment format='MMM Do, YYYY hh:mm A'>{exam.createdAt}</Moment>
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
					<OverlayTrigger
						placement='bottom'
						overlay={<Tooltip id='button-tooltip'>Update exam</Tooltip>}
					>
						<Link to={`/examiner/exam/${exam._id}`}>
							<i className='fa fa-check-square-o cursor-pointer text-white align-self-center'></i>
						</Link>
					</OverlayTrigger>
				</td>
				<this.ShowDeleteDialog />
				<this.ShowEditDialog />
			</tr>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		examsList: state.examReducer.examsList,
		input: state.examReducer.editExamInputs,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setExamList: (examsList) => {
			dispatch({
				type: ActionTypes.SET_EXAM_LIST,
				examList: examsList,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamTable);
