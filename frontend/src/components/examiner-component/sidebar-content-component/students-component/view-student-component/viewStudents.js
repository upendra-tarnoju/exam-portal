import React from 'react';
import {
	Typography,
	Card,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	withStyles,
	TableBody,
	Tooltip,
	makeStyles,
	IconButton,
	TablePagination,
} from '@material-ui/core';
import { Delete, Block } from '@material-ui/icons';

import ExaminerService from '../../../../../services/examinerApi';
import DeleteModal from '../../../../../modals/deleteModal';
import EditStudentModal from '../edit-student-component/editStudent';
import EditPasswordModal from '../edit-student-component/editPassword';
import Snackbar from '../../../../customSnackbar';

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

class ViewStudents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studentsList: [],
			pageIndex: 0,
			pageSize: 5,
			pageCount: 0,
			deleteModal: { show: false, id: '' },
			snackBar: { show: false, msg: '', type: '' },
			editModal: { show: false, data: {} },
			passwordModal: { show: true, studentId: '' },
		};
		this.examinerService = new ExaminerService();
	}

	viewStudents = () => {
		let examId = this.props.match.params.examId;
		let { pageIndex, pageSize } = this.state;
		this.examinerService
			.getParticularExamStudents(examId, { pageIndex, pageSize })
			.then((res) => {
				this.setState({
					studentsList: res.data.studentsList,
					pageCount: res.data.count,
				});
			});
	};

	componentDidMount() {
		this.viewStudents();
	}

	capitalizeName(name) {
		return name
			.split(' ')
			.map(
				(value) =>
					value.slice(0, 1).toUpperCase() + value.slice(1, value.length)
			)
			.join(' ');
	}

	handleSwitchChange = (event, studentId) => {
		let checked = event.target.checked;
		let examId = this.props.match.params.examId;

		this.examinerService.updateStudent(studentId, {
			accountStatus: checked === true ? 'enabled' : 'disabled',
			examId: examId,
		});
	};

	handleSnackBar = (show, msg, type) => {
		this.setState({
			snackBar: { show: show, msg: msg, type },
		});
	};

	handleDeleteModal = (show, id) => {
		this.setState({ deleteModal: { show: show, id: id } });
	};

	handleEditModal = (show, data) => {
		this.setState({ editModal: { show: show, data: data } });
	};

	handlePasswordModal = (show, studentId) => {
		this.setState({ passwordModal: { show: show, studentId: studentId } });
	};

	removeStudent = () => {
		let { deleteModal } = this.state;

		this.examinerService.deleteStudent(deleteModal.id).then((response) => {
			this.viewStudents();
			this.handleSnackBar(true, response.data.msg);
			this.handleDeleteModal(false, '');
		});
	};

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value }, () => this.viewStudents());
	};

	handlePageSize = (event) => {
		this.setState({ pageSize: parseInt(event.target.value, 10) }, () =>
			this.viewStudents()
		);
	};

	render() {
		let {
			snackBar,
			studentsList,
			pageCount,
			pageIndex,
			pageSize,
			deleteModal,
		} = this.state;
		return (
			<div className='container p-5'>
				<Card className='p-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Exam</Typography>
							<Typography variant='subtitle1'>Explore exam students</Typography>
						</div>
					</div>
				</Card>
				<TableContainer component={Paper} className='mt-4'>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell>S.No</StyledTableCell>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>Status</StyledTableCell>
								<StyledTableCell>Actions</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{studentsList.map((student, index) => (
								<StyledTableRow key={student._id}>
									<StyledTableCell component='th' scope='row'>
										{index + 1}
									</StyledTableCell>
									<StyledTableCell>
										{student.userDetails.firstName}{' '}
										{student.userDetails.lastName}
									</StyledTableCell>
									<StyledTableCell>{student.userDetails.email}</StyledTableCell>
									<StyledTableCell>{student.status}</StyledTableCell>
									<StyledTableCell>
										<BootstrapTooltip title='Block student'>
											<IconButton size='small'>
												<Block size='small' />
											</IconButton>
										</BootstrapTooltip>
										<BootstrapTooltip title='Remove student'>
											<IconButton
												size='small'
												onClick={() =>
													this.handleDeleteModal(true, student._id)
												}
											>
												<Delete size='small' />
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
				<DeleteModal
					show={deleteModal.show}
					heading='student'
					hideModal={this.handleDeleteModal}
					deleteContent={this.removeStudent}
				/>
				<Snackbar
					show={snackBar.show}
					message={snackBar.msg}
					snackBarType={snackBar.type}
					handleSnackBar={this.handleSnackBar}
				/>
				<EditStudentModal
					show={this.state.editModal.show}
					hideModal={this.handleEditModal}
					student={this.state.editModal.data}
					updateStudent={this.updateStudent}
				/>
				<EditPasswordModal
					show={this.state.passwordModal.show}
					hideModal={this.handlePasswordModal}
					studentId={this.state.passwordModal.studentId}
				/>
			</div>
		);
	}
}

export default ViewStudents;
