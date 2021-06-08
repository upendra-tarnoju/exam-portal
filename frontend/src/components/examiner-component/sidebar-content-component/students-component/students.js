import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import {
	Card,
	Paper,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
	withStyles,
	Table,
	TableHead,
	TableBody,
	makeStyles,
	Tooltip,
	IconButton,
	TablePagination,
} from '@material-ui/core';
import { Add, ViewHeadline } from '@material-ui/icons';

import ExaminerService from '../../../../services/examinerApi';
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

	addNewStudent = (examId, examDate, startTime, endTime) => {
		let fullDate = new Date();
		examDate = moment(examDate).format('YYYY-MM-DD');
		let currentDate = moment(fullDate).format('YYYY-MM-DD');
		let verifyBeforeDate = moment(currentDate).isBefore(examDate);
		let verifySameDate = moment(currentDate).isSame(examDate);

		if (verifyBeforeDate) {
			this.props.history.push(`/examiner/exam/${examId}/addStudent`);
		} else if (verifySameDate) {
			let currentTime = moment(fullDate).format('h:mm:ssa');
			startTime = moment(startTime).format('h:mm:ssa');

			let verifyTime = moment(currentTime).isBefore(startTime);
			if (verifyTime) {
				this.props.history.push(`/examiner/exam/${examId}/addStudent`);
			} else {
				let msg = 'You cannot add students to expired exam';
				this.handleSnackBar(true, msg, 'error');
			}
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

	viewStudents() {
		let { pageIndex, pageSize } = this.state;
		this.examinerService
			.getExamStudentsCount(pageIndex, pageSize)
			.then((res) => {
				this.setState({
					examList: res.data.examData,
					pageCount: res.data.examCount,
				});
			});
	}

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value - 1 }, () => this.viewStudents());
	};

	componentDidMount() {
		this.viewStudents();
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
			<div className='container p-4'>
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
														exam.startTime,
														exam.endTime
													)
												}
											>
												<Add size='small' />
											</IconButton>
										</BootstrapTooltip>
										<BootstrapTooltip title='View students'>
											<IconButton size='small'>
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
