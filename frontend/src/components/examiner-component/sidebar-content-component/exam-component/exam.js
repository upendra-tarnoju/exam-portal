import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';

import ExamService from '../../../../services/examApi';
import ExamDetails from './exam-inputs-component/examDetails';
import ExamPeriod from './exam-inputs-component/examPeriod';
import style from './exam.module.css';
import ExamTable from './examTable';
import * as ActionTypes from '../../../../action';
import SortExamMenu from './menuItems';

class Exam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createExam: false,
			nextInputs: false,
			pageIndex: 0,
			pageSize: 5,
			snackBar: { show: false, msg: '' },
			sortedBy: 'createdAt',
		};
		this.examService = new ExamService();
	}

	handleSnackBar = (status, msg) => {
		this.setState(
			{
				createExam: false,
				nextInputs: false,
				snackBar: { show: status, msg: msg },
			},
			() => this.viewExams()
		);
	};

	handleStates = (key, value) => {
		if (key === 'createExam' && value === false) {
			this.props.clearExamInputs();
		}
		this.setState({
			[key]: value,
		});
	};

	handleSortOptions = (option) => {
		console.log(option);
		this.setState({ sortedBy: option }, () => this.viewExams());
	};

	viewExams() {
		this.examService
			.getAllExams({
				pageIndex: this.state.pageIndex,
				pageSize: this.state.pageSize,
				sort: this.state.sortedBy,
			})
			.then((res) => {
				this.setState({ pageCount: res.data.pageCount }, () =>
					this.props.setExamList(res.data.exams)
				);
			});
	}

	componentDidMount() {
		this.viewExams();
	}

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value - 1 }, () => this.viewExams());
	};

	render() {
		let { pageIndex, pageSize } = this.state;
		const allExams = this.props.examsList.map((exam, index) => {
			return (
				<ExamTable
					exam={exam}
					index={index}
					key={exam._id}
					handleSnackBar={this.handleSnackBar}
					pageIndex={pageIndex}
					pageSize={pageSize}
				/>
			);
		});
		return (
			<div className='p-4'>
				<div className='d-flex justify-content-end'>
					{this.state.createExam ? (
						<Button
							type='button'
							variant='contained'
							color='secondary'
							onClick={() => this.handleStates('createExam', false)}
						>
							Cancel
						</Button>
					) : (
						<div>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								onClick={() => this.handleStates('createExam', true)}
							>
								Create
							</Button>
						</div>
					)}
					<SortExamMenu sortExams={this.handleSortOptions} />
				</div>
				<Snackbar
					open={this.state.snackBar.show}
					autoHideDuration={6000}
					onClose={() => this.handleSnackBar(false)}
				>
					<MuiAlert
						elevation={6}
						variant='filled'
						onClose={() => this.handleSnackBar(false)}
						severity='success'
					>
						{this.state.snackBar.msg}
					</MuiAlert>
				</Snackbar>
				{this.state.createExam ? (
					<div className='card mt-4 w-50 mx-auto'>
						<div className='card-header bg-white text-center'>
							<h3 className='font-weight-normal'>Create new Exam</h3>
						</div>
						{!this.state.nextInputs ? (
							<ExamDetails handleInputs={this.handleStates} />
						) : (
							<ExamPeriod
								handleInputs={this.handleStates}
								handleSnackBar={this.handleSnackBar}
							/>
						)}
					</div>
				) : (
					<div className='mt-2'>
						<p className={`${style.heading} text-center`}>
							List of all created Exams
						</p>
						{this.props.examsList.length !== 0 ? (
							<div>
								<Table
									striped
									bordered
									hover
									variant='dark'
									className='mb-0'
								>
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
											<th>Created at</th>
											<th>Exam actions</th>
										</tr>
									</thead>
									<tbody>{allExams}</tbody>
								</Table>
								<div className='bg-white py-3 d-flex justify-content-center'>
									<Pagination
										count={this.state.pageCount}
										variant='outlined'
										color='secondary'
										size='large'
										onChange={this.handlePageChange}
										showFirstButton
										showLastButton
									/>
								</div>
							</div>
						) : (
							<div className={`${style.heading} text-center`}>
								No exam available. Create new exam
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectedExamIndex: state.examReducer.selectedExamIndex,
		examsList: state.examReducer.examsList,
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
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Exam);
