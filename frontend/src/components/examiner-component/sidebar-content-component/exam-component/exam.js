import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
	Button,
	Card,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Collapse,
	withStyles,
	Tooltip,
	makeStyles,
	TablePagination,
} from '@material-ui/core';
import {
	Add,
	Delete,
	Edit,
	KeyboardArrowDown,
	KeyboardArrowUp,
	ViewHeadline,
} from '@material-ui/icons';

import ExamService from '../../../../services/examApi';
import * as ActionTypes from '../../../../action';
import DeleteModal from '../../../../modals/deleteModal';
import factories from '../../../../factories/factories';
import CustomSnackBar from '../../../customSnackbar';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStylesBootstrap = makeStyles((theme) => ({
	arrow: {
		color: theme.palette.common.black,
	},
	tooltip: {
		backgroundColor: theme.palette.common.black,
	},
}));

const BootstrapTooltip = (props) => {
	const classes = useStylesBootstrap();
	return <Tooltip arrow classes={classes} {...props} />;
};

class Exam extends Component {
	constructor() {
		super();
		this.state = {
			pageIndex: 0,
			pageSize: 5,
			examsList: [],
			pageCount: 0,
			detailView: {},
			deleteModal: { show: false, id: '' },
			snackbar: { show: false, msg: '', type: '' },
		};
		this.examService = new ExamService();
	}

	viewExams() {
		this.examService
			.getAllExams({
				pageIndex: this.state.pageIndex,
				pageSize: this.state.pageSize,
				sort: this.state.sortedBy,
			})
			.then((res) => {
				this.setState({
					pageCount: res.data.count,
					examsList: res.data.examsList,
				});
			});
	}

	componentDidMount() {
		this.viewExams();
	}

	handleDetailExamView = (index, status) => {
		let newStatus;
		if (status === undefined) newStatus = true;
		else if (status) newStatus = !status;

		this.setState((prevState) => ({
			detailView: { ...prevState.detailView, [index]: newStatus },
		}));
	};

	deleteExam = () => {
		let examId = this.state.deleteModal.id;
		this.examService.deleteExam(examId).then((response) => {
			this.handleDeleteDialog(false, '');
			this.handleSnackBar(true, response.data.msg, 'success');
			this.viewExams();
		});
	};

	addNewQuestion = (examId, examDate) => {
		let currentDate = new Date();
		let boolStatus;
		currentDate = factories.formatDate(currentDate);

		if (examDate >= currentDate) boolStatus = false;
		else boolStatus = true;

		// this.handleSnackBar(boolStatus);

		if (!boolStatus) {
			this.props.history.push(`/examiner/exam/${examId}/question/new`);
		}
	};

	viewQuestions = (examId) => {
		this.props.history.push(`/examiner/exam/${examId}/questions`);
	};

	createNewExam = () => {
		this.props.history.push({ pathname: '/examiner/exam/new' });
	};

	handleDeleteDialog = (show, examId) => {
		this.setState({ deleteModal: { show: show, id: examId } });
	};

	updateExam = (examId) => {
		this.props.history.push({ pathname: `/examiner/exam/${examId}` });
	};

	handleSnackBar = (status, msg, type) => {
		this.setState({ snackbar: { show: status, msg: msg, type: type } });
	};

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value }, () => this.viewExams());
	};

	handlePageSize = (event) => {
		this.setState({ pageSize: parseInt(event.target.value, 10) }, () =>
			this.viewExams()
		);
	};

	render() {
		let {
			examsList,
			detailView,
			deleteModal,
			snackbar,
			pageCount,
			pageIndex,
			pageSize,
		} = this.state;

		return (
			<div className='container p-5'>
				<Card className='p-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Exams</Typography>
							<Typography variant='subtitle1'>Explore your exams</Typography>
						</div>
						<div className='align-self-center'>
							<Button
								variant='contained'
								className='bg-dark text-white'
								startIcon={<Add />}
								onClick={this.createNewExam}
							>
								Create new
							</Button>
						</div>
					</div>
				</Card>
				<TableContainer component={Paper} className='mt-4'>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell>S.No</StyledTableCell>
								<StyledTableCell>Subject</StyledTableCell>
								<StyledTableCell>Exam code</StyledTableCell>
								<StyledTableCell>Exam date</StyledTableCell>
								<StyledTableCell>Actions</StyledTableCell>
								<StyledTableCell></StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{examsList.map((exam, index) => (
								<React.Fragment key={exam._id}>
									<StyledTableRow key={exam._id}>
										<StyledTableCell component='th' scope='row'>
											{index + 1}
										</StyledTableCell>
										<StyledTableCell>{exam.subject}</StyledTableCell>
										<StyledTableCell>{exam.examCode}</StyledTableCell>
										<StyledTableCell>
											<Moment format='MMM Do, YYYY (hh:mm A)'>
												{exam.examDate}
											</Moment>
										</StyledTableCell>
										<StyledTableCell>
											<BootstrapTooltip title='Update exam'>
												<IconButton
													size='small'
													onClick={() => this.updateExam(exam._id)}
												>
													<Edit size='small' />
												</IconButton>
											</BootstrapTooltip>
											<BootstrapTooltip title='Add question'>
												<IconButton
													size='small'
													onClick={() =>
														this.addNewQuestion(exam._id, exam.examDate)
													}
												>
													<Add size='small' />
												</IconButton>
											</BootstrapTooltip>
											<BootstrapTooltip title='View questions'>
												<IconButton
													size='small'
													onClick={() => this.viewQuestions(exam._id)}
												>
													<ViewHeadline size='small' />
												</IconButton>
											</BootstrapTooltip>
											<BootstrapTooltip title='Delete exam'>
												<IconButton
													size='small'
													onClick={() =>
														this.handleDeleteDialog(true, exam._id)
													}
												>
													<Delete size='small' />
												</IconButton>
											</BootstrapTooltip>
										</StyledTableCell>
										<StyledTableCell>
											<IconButton
												size='small'
												onClick={() =>
													this.handleDetailExamView(index, detailView[index])
												}
											>
												{detailView[index] ? (
													<KeyboardArrowUp />
												) : (
													<KeyboardArrowDown />
												)}
											</IconButton>
										</StyledTableCell>
									</StyledTableRow>
									<StyledTableRow>
										<StyledTableCell
											colSpan={6}
											className={!detailView[index] ? 'py-0' : ''}
										>
											<Collapse
												in={detailView[index]}
												timeout='auto'
												unmountOnExit
											>
												<Table>
													<TableHead>
														<TableRow>
															<StyledTableCell>Total marks</StyledTableCell>
															<StyledTableCell>Passing marks</StyledTableCell>
															<StyledTableCell>Negative marks</StyledTableCell>
															<StyledTableCell>Start time</StyledTableCell>
															<StyledTableCell>End time</StyledTableCell>
															<StyledTableCell>Duration</StyledTableCell>
															<StyledTableCell>Status</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														<StyledTableRow>
															<StyledTableCell>
																{exam.totalMarks}
															</StyledTableCell>
															<StyledTableCell>
																{exam.passingMarks}
															</StyledTableCell>
															<StyledTableCell>
																{exam.negativeMarks}
															</StyledTableCell>
															<StyledTableCell>
																<Moment format='hh:mm A'>
																	{exam.startTime}
																</Moment>
															</StyledTableCell>
															<StyledTableCell>
																<Moment format='hh:mm A'>{exam.endTime}</Moment>
															</StyledTableCell>
															<StyledTableCell>
																{exam.duration ? exam.duration : 'None'}
															</StyledTableCell>
															<StyledTableCell>
																{exam.status === 'CREATED'
																	? 'No question added'
																	: ''}
															</StyledTableCell>
														</StyledTableRow>
													</TableBody>
												</Table>
											</Collapse>
										</StyledTableCell>
									</StyledTableRow>
								</React.Fragment>
							))}
						</TableBody>
					</Table>
					<TablePagination
						component='div'
						rowsPerPageOptions={[5, 10, 25]}
						colSpan={5}
						count={pageCount}
						rowsPerPage={pageSize}
						page={pageIndex}
						onChangePage={this.handlePageChange}
						onChangeRowsPerPage={this.handlePageSize}
					></TablePagination>
				</TableContainer>
				<DeleteModal
					show={deleteModal.show}
					hideModal={this.handleDeleteDialog}
					heading='exam'
					deleteContent={this.deleteExam}
				/>
				<CustomSnackBar
					show={snackbar.show}
					handleSnackBar={this.handleSnackBar}
					snackBarType={snackbar.type}
					message={snackbar.msg}
				/>
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
