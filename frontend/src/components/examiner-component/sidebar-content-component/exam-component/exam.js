import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';

import ExaminerService from '../../../../services/examinerApi';
import ExamDetails from './examDetails';
import ExamPeriod from './examPeriod';
import style from './exam.module.css';
import ExamTable from './examTable';
import * as ActionTypes from '../../../../action';

class Exam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createExam: false,
			nextInputs: false,
		};
		this.examinerService = new ExaminerService();
		this.updateExam = this.updateExam.bind(this);
		this.handleStates = this.handleStates.bind(this);
	}

	handleStates(key, value) {
		if (key === 'createExam' && value === false) {
			this.props.clearExamInputs();
		}
		this.setState({
			[key]: value,
		});
	}

	componentDidMount() {
		this.examinerService.getAllExams().then((res) => {
			this.props.setExamList(res.data);
		});
	}

	updateExam() {
		this.examinerService.updateExam(this.props.inputs).then((response) => {
			let prevExams = this.props.examsList;
			let index = this.props.selectedExamIndex;
			prevExams[index] = response.data;
			this.props.editExam(false, '');
			this.props.setExamList(prevExams);
		});
	}

	render() {
		const allExams = this.props.examsList.map((exam, index) => {
			return <ExamTable exam={exam} index={index} key={exam._id} />;
		});
		return (
			<div className='p-4'>
				<div className='d-flex justify-content-end'>
					{this.state.createExam ? (
						<button
							type='button'
							className='btn btn-danger'
							onClick={() => this.handleStates('createExam', false)}
						>
							Cancel
						</button>
					) : (
						<button
							type='submit'
							className='btn btn-primary'
							onClick={() => this.handleStates('createExam', true)}
						>
							Create
						</button>
					)}
				</div>
				{this.state.createExam ? (
					<div className='card mt-4 w-50 mx-auto'>
						<div className='card-header bg-white text-center'>
							<h3 className='font-weight-normal'>Create new Exam</h3>
						</div>
						{!this.state.nextInputs ? (
							<ExamDetails handleInputs={this.handleStates} />
						) : (
							<ExamPeriod handleInputs={this.handleStates} />
						)}
					</div>
				) : (
					<div className='mt-2'>
						<p className={`${style.heading} text-center`}>
							List of all created Exams
						</p>
						<Table striped bordered hover variant='dark'>
							<thead>
								<tr>
									<th>S.No</th>
									<th>Subject</th>
									<th>Exam code</th>
									<th>Exam date</th>
									<th className='text-right'>Total marks</th>
									<th className='text-right'>Passing marks</th>
									<th>Start time</th>
									<th>End time</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>{allExams}</tbody>
						</Table>
						{this.props.editExamStatus ? (
							<div className='d-flex justify-content-end'>
								<button
									type='button'
									className='btn btn-primary mr-2'
									onClick={this.updateExam}
								>
									Update
								</button>
								<button type='button' className='btn btn-danger'>
									Cancel
								</button>
							</div>
						) : null}
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		editExamStatus: state.examReducer.editExam,
		selectedExamIndex: state.examReducer.selectedExamIndex,
		examsList: state.examReducer.examsList,
		inputs: state.examReducer.editExamInputs,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		clearExamInputs: () => {
			dispatch({
				type: ActionTypes.CLEAR_EXAM_DETAILS_FIELDS,
			});
		},
		setExamList: (examList) => {
			dispatch({
				type: ActionTypes.SET_EXAM_LIST,
				examList: examList,
			});
		},
		editExam: (status, index) => {
			dispatch({
				type: ActionTypes.EDIT_EXAM_STATUS,
				status: status,
				index: index,
			});
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Exam);
