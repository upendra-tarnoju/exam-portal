import React from 'react';
import {
	Typography,
	Card,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableBody,
	IconButton,
	TablePagination,
	Chip,
} from '@material-ui/core';
import { Delete, Block, Lock, PersonAdd } from '@material-ui/icons';

import ExaminerService from '../../../../services/examinerApi';
import DeleteModal from '../../../../modals/deleteModal';
import CreatePasswordModal from '../../../../modals/createPasswordModal';
import Snackbar from '../../../../common/customSnackbar';
import BlockUnblockStudentModal from '../../../../modals/blockUnblockStudentModal';
import factories from '../../../../factories/factories';
import {
	StyledTableRow,
	StyledTableCell,
} from '../../../../common/customTable';
import BootstrapTooltip from '../../../../common/customTooltip';

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
			blockUnblockModal: { show: false, heading: '', id: '' },
			passwordModal: { show: false, studentId: '' },
			examDate: 0,
			startTime: 0,
		};
		this.examinerService = new ExaminerService();
	}

	viewStudents = () => {
		let examId = this.props.match.params.examId;
		let { pageIndex, pageSize } = this.state;
		this.examinerService
			.getParticularExamStudents(examId, { pageIndex, pageSize })
			.then((res) => {
				let data = res.data;
				this.setState({
					studentsList: data.studentsList,
					pageCount: data.count,
					examDate: data.examDetails.examDate,
					startTime: data.examDetails.startTime,
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
		let { snackBar } = this.state;
		if (type === undefined) {
			type = snackBar.type;
		}
		this.setState({
			snackBar: { show: show, msg: msg, type },
		});
	};

	handleDeleteModal = (show, id) => {
		let { examDate, startTime } = this.state;
		let verifiedExam = factories.verifyExamExpiry(examDate, startTime);

		if (verifiedExam) {
			this.setState({ deleteModal: { show: show, id: id } });
		} else {
			let msg = 'You cannot delete student in expired exam';
			this.handleSnackBar(true, msg, 'error');
		}
	};

	handleEditModal = (show, data) => {
		this.setState({ editModal: { show: show, data: data } });
	};

	handlePasswordModal = (show, studentId) => {
		let { examDate, startTime } = this.state;
		let verifiedExam = factories.verifyExamExpiry(examDate, startTime);

		if (verifiedExam) {
			this.setState({ passwordModal: { show: show, studentId: studentId } });
		} else {
			let msg = 'You cannot change password in expired exam';
			this.handleSnackBar(true, msg, 'error');
		}
	};

	handleBlockUnblockModal = (show, heading, id) => {
		let { examDate, startTime } = this.state;
		let verifiedExam = factories.verifyExamExpiry(examDate, startTime);

		if (verifiedExam) {
			this.setState({ blockUnblockModal: { show, heading, id } });
		} else {
			let msg = `You cannot ${
				heading === 'BLOCKED' ? 'block' : 'unblock'
			} students in expired exam`;
			this.handleSnackBar(true, msg, 'error');
		}
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

	updatePassword = (values) => {
		let { passwordModal } = this.state;
		this.examinerService
			.updateStudent(passwordModal.studentId, values)
			.then((res) => {
				this.handleSnackBar(true, res.data.msg, 'success');
				this.handlePasswordModal(false, '');
			});
	};

	blockUnblockStudent = () => {
		let { blockUnblockModal } = this.state;
		let data = { status: blockUnblockModal.heading };
		this.examinerService
			.blockUnblockStudent(blockUnblockModal.id, data)
			.then((res) => {
				this.handleSnackBar(true, res.data.msg, 'success');
				this.viewStudents();
				this.handleBlockUnblockModal(false, blockUnblockModal.heading, '');
			});
	};

	render() {
		let {
			snackBar,
			studentsList,
			pageCount,
			pageIndex,
			pageSize,
			deleteModal,
			passwordModal,
			blockUnblockModal,
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
										{factories.capitalizeName(student.userDetails.firstName)}{' '}
										{factories.capitalizeName(student.userDetails.lastName)}
									</StyledTableCell>
									<StyledTableCell>{student.userDetails.email}</StyledTableCell>
									<StyledTableCell>
										{student.status === 'BLOCKED' ? (
											<Chip
												label='Blocked'
												color='secondary'
												variant='default'
											/>
										) : (
											<Chip label='Active' color='primary' variant='default' />
										)}
									</StyledTableCell>
									<StyledTableCell>
										<BootstrapTooltip title='Change password'>
											<IconButton
												size='small'
												onClick={() =>
													this.handlePasswordModal(
														true,
														student.userDetails._id
													)
												}
											>
												<Lock size='small' />
											</IconButton>
										</BootstrapTooltip>
										{student.status === 'ACTIVE' ? (
											<BootstrapTooltip title='Block student'>
												<IconButton
													size='small'
													onClick={() =>
														this.handleBlockUnblockModal(
															true,
															'BLOCKED',
															student.userDetails._id
														)
													}
												>
													<Block size='small' />
												</IconButton>
											</BootstrapTooltip>
										) : (
											<BootstrapTooltip title='Unblock student'>
												<IconButton
													size='small'
													onClick={() =>
														this.handleBlockUnblockModal(
															true,
															'ACTIVE',
															student.userDetails._id
														)
													}
												>
													<PersonAdd size='small' />
												</IconButton>
											</BootstrapTooltip>
										)}
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
				<CreatePasswordModal
					show={passwordModal.show}
					hideModal={this.handlePasswordModal}
					studentId={passwordModal.studentId}
					updatePassword={this.updatePassword}
				/>
				<BlockUnblockStudentModal
					show={blockUnblockModal.show}
					heading={blockUnblockModal.heading}
					hideModal={this.handleBlockUnblockModal}
					blockUnblockStudent={this.blockUnblockStudent}
				/>
			</div>
		);
	}
}

export default ViewStudents;
