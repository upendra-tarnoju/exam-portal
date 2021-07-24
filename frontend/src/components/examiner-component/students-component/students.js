import React from 'react';
import Moment from 'react-moment';
import {
	Card,
	Paper,
	TableContainer,
	TableRow,
	Typography,
	Table,
	TableHead,
	TableBody,
	IconButton,
	TablePagination,
} from '@material-ui/core';
import { Add, ViewHeadline } from '@material-ui/icons';

import ExaminerService from '../../../services/examinerApi';
import CustomSnackBar from '../../../common/customSnackbar';
import factories from '../../../factories/factories';
import { StyledTableCell, StyledTableRow } from '../../../common/customTable';
import BootstrapTooltip from '../../../common/customTooltip';

class Students extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			examList: [],
			pageSize: 5,
			pageIndex: 0,
			pageCount: 0,
			snackBar: {
				status: false,
				msg: 'You cannot add students to expired exam',
				type: 'error',
			},
		};
		this.examinerService = new ExaminerService();
	}

	addNewStudent = (examId, examDate, startTime) => {
		let verifiedExam = factories.verifyExamExpiry(examDate, startTime);

		if (verifiedExam) {
			this.props.history.push(`/examiner/exam/${examId}/addStudent`);
		} else {
			let msg = 'You cannot add students to expired exam';
			this.handleSnackBar(true, msg, 'error');
		}
	};

	handleSnackBar = (status) => {
		this.setState((prevState) => ({
			snackBar: { ...prevState.snackBar, status: status },
		}));
	};

	viewExams = () => {
		let { pageIndex, pageSize } = this.state;
		this.examinerService
			.getExamStudentsCount(pageIndex, pageSize)
			.then((res) => {
				this.setState({
					examList: res.data.examData,
					pageCount: res.data.examCount,
				});
			});
	};

	viewStudents = (examId) => {
		this.props.history.push(`/examiner/exam/${examId}/students`);
	};

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value - 1 }, () => this.viewExams());
	};

	componentDidMount() {
		this.viewExams();
	}

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value }, () => this.viewExams());
	};

	handlePageSize = (event) => {
		this.setState({ pageSize: parseInt(event.target.value, 10) }, () =>
			this.viewExams()
		);
	};

	render() {
		let { pageIndex, pageSize, examList, pageCount } = this.state;
		return (
			<div className='p-4'>
				<Card className='p-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Exams List</Typography>
							<Typography variant='subtitle1'>
								Add students in your exams
							</Typography>
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
								<StyledTableCell>Total students</StyledTableCell>
								<StyledTableCell>Actions</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{examList.map((exam, index) => (
								<StyledTableRow key={exam._id}>
									<StyledTableCell component='th' scope='row'>
										{index + 1}
									</StyledTableCell>
									<StyledTableCell>{exam.subject}</StyledTableCell>
									<StyledTableCell>{exam.examCode}</StyledTableCell>
									<StyledTableCell>
										<Moment format='MMM Do, YYYY'>{exam.examDate}</Moment>
										<Moment format='(hh:mm A)' className='ml-1'>
											{exam.startTime}
										</Moment>
									</StyledTableCell>
									<StyledTableCell className='text-center	'>
										{exam.count}
									</StyledTableCell>
									<StyledTableCell>
										<BootstrapTooltip title='Add students'>
											<IconButton
												size='small'
												onClick={() =>
													this.addNewStudent(
														exam._id,
														exam.examDate,
														exam.startTime
													)
												}
											>
												<Add size='small' />
											</IconButton>
										</BootstrapTooltip>
										<BootstrapTooltip title='View students'>
											<IconButton
												size='small'
												onClick={() => this.viewStudents(exam._id)}
											>
												<ViewHeadline size='small' />
											</IconButton>
										</BootstrapTooltip>
									</StyledTableCell>
								</StyledTableRow>
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

				<CustomSnackBar
					handleSnackBar={this.handleSnackBar}
					show={this.state.snackBar.status}
					message={this.state.snackBar.msg}
					snackBarType={this.state.snackBar.type}
				/>
			</div>
		);
	}
}

export default Students;
