import React from 'react';
import Moment from 'react-moment';
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
			studentList: [],
			pageSize: 5,
			pageIndex: 0,
			pageCount: 0,
			totalExams: 0,
			snackBar: {
				status: false,
				msg: 'You cannot add students to expired exam',
				type: 'error',
			},
		};
		this.examinerService = new ExaminerService();
	}

	addNewStudent = (student) => {
		this.props.history.push(`/examiner/student/new`);
		// let currentDate = new Date();

		// let formattedExamDate = moment(student.examDate).format('YYYY-MM-DD');
		// let formattedCurrentDate = moment(currentDate).format('YYYY-MM-DD');

		// if (formattedExamDate <= formattedCurrentDate) {
		// 	let formattedExamEndTime = moment(student.endTime).format('HH:mm:ss a');
		// 	let formattedCurrentTime = moment(currentDate).format('HH:mm:ss a');
		// 	if (formattedExamEndTime < formattedCurrentTime) {
		// 		this.handleSnackBar(true);
		// 	} else {
		// 	}
		// }
	};

	handleSnackBar = (status) => {
		this.setState((prevState) => ({
			snackBar: {
				...prevState.snackBar,
				status: status,
			},
		}));
	};

	viewStudents() {
		let { pageIndex, pageSize } = this.state;
		this.examinerService.getAllStudents(pageIndex, pageSize).then((res) => {
			let examsLength = res.data.totalExams;
			this.setState({
				studentList: res.data.studentData,
				totalExams: examsLength,
				pageCount: Math.ceil(examsLength / this.state.pageSize),
			});
		});
	}

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value - 1 }, () => this.viewStudents());
	};

	componentDidMount() {
		this.viewStudents();
	}

	deleteStudent = () => {
		let studentId = this.state.deleteModal.id;
		this.examinerService.deleteStudent(studentId).then((response) => {
			let updatedStudentList = this.state.studentList.filter(
				(data) => data.studentId !== studentId
			);
			this.setState((prevState) => ({
				...prevState,
				studentList: updatedStudentList,
				snackBar: { show: true, msg: response.data.msg },
				deleteModal: { show: false, heading: '' },
			}));
		});
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
		let { pageIndex, pageSize, studentList, pageCount } = this.state;
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
							{studentList.map((student, index) => (
								<StyledTableRow key={student._id}>
									<StyledTableCell component='th' scope='row'>
										{index + 1}
									</StyledTableCell>
									<StyledTableCell>{student.subject}</StyledTableCell>
									<StyledTableCell>{student.examCode}</StyledTableCell>
									<StyledTableCell>
										<Moment format='MMM Do, YYYY'>{student.examDate}</Moment>
										<Moment format='(hh:mm A)' className='ml-1'>
											{student.startTime}
										</Moment>
									</StyledTableCell>
									<StyledTableCell>{student.totalStudents}</StyledTableCell>
									<StyledTableCell>
										<BootstrapTooltip title='Add students'>
											<IconButton size='small'>
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
