import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

import ExamService from '../../../../services/examApi';
import DeleteModal from '../../../../modals/deleteModal';
import factories from '../../../../factories/factories';

class ExamTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deleteModal: { show: false, id: '' },
			snackBar: false,
		};
		this.examService = new ExamService();
	}

	handleDeleteDialog = (show, id) => {
		this.setState({
			deleteModal: {
				show: show,
				id: id,
			},
		});
	};

	deleteExam = () => {
		let examId = this.props.examsList[this.state.deleteModal.id]._id;
		this.examService.deleteExam(examId).then((response) => {
			let msg = 'Exam deleted successfully';
			this.props.handleSnackBar(true, msg, 'success');
		});
	};

	handleSnackBar = (status) => {
		this.setState({ snackBar: status });
	};

	redirectToAddQuestion = (examId, examDate) => {
		let currentDate = new Date();
		let boolStatus;
		currentDate = factories.formatDate(currentDate);

		if (examDate >= currentDate) boolStatus = false;
		else boolStatus = true;

		this.handleSnackBar(boolStatus);

		if (!boolStatus) {
			this.props.history.push(`/examiner/exam/${examId}/question/new`);
		}
	};

	render() {
		let { exam, index, pageIndex, pageSize } = this.props;
		return (
			<tr key={exam._id}>
				<td>{pageIndex * pageSize + index + 1}</td>
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
					<Moment format='MMM Do, YYYY (hh:mm A)'>{exam.createdAt}</Moment>
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
						<i
							className='fa fa-plus cursor-pointer text-white align-self-center'
							onClick={() =>
								this.redirectToAddQuestion(exam._id, exam.examDate)
							}
						></i>
					</OverlayTrigger>
					<OverlayTrigger
						placement='bottom'
						overlay={
							<Tooltip id='button-tooltip'>View questions</Tooltip>
						}
					>
						<Link to={`/examiner/exam/${exam._id}/questions`}>
							<i className='fa fa-question cursor-pointer text-white align-self-center'></i>
						</Link>
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
				<DeleteModal
					show={this.state.deleteModal.show}
					hideModal={this.handleDeleteDialog}
					heading='exam'
					deleteContent={this.deleteExam}
				/>
				<Snackbar
					open={this.state.snackBar}
					onClose={() => this.handleSnackBar(false)}
				>
					<MuiAlert
						elevation={6}
						variant='filled'
						onClose={() => this.handleSnackBar(false)}
						severity='error'
					>
						You cannot add questions in expired exam
					</MuiAlert>
				</Snackbar>
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

export default withRouter(connect(mapStateToProps)(ExamTable));
