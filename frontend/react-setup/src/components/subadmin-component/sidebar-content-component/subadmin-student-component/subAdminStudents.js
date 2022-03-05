import React from 'react';
import {
	Button,
	Card,
	IconButton,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Tooltip,
	Typography,
	withStyles,
} from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';

import CreateStudentSelectionModal from '../../../../modals/createStudentSelectionModal';
import SubAdminService from '../../../../services/subAdminApi';
import Snackbar from '../../../../common/customSnackbar';
import DeleteModal from '../../../../modals/deleteModal';

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

class SubAdminStudents extends React.Component {
	constructor() {
		super();
		this.state = {
			selectionModal: false,
			snackbar: { show: false, msg: '', type: '' },
			studentsList: [],
			pageIndex: 0,
			pageSize: 10,
			pageCount: 0,
			deleteModal: { show: false, id: '' },
		};
		this.subAdminService = new SubAdminService();
	}

	handleSelectionModal = (status) => {
		this.setState({ selectionModal: status });
	};

	handleDeleteModal = (show, id) => {
		this.setState({ deleteModal: { show, id } });
	};

	removeStudent = () => {
		let { deleteModal } = this.state;
		this.subAdminService.removeStudent(deleteModal.id).then((res) => {
			this.handleSnackBar(true, res.data.msg, 'success');
			this.viewStudents();
		});
	};

	downloadSampleStudentFile = () => {
		this.subAdminService.downloadExcelFile().then((res) => {
			let downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
			let link = document.createElement('a');
			link.href = downloadUrl;
			link.setAttribute('download', 'sample.xlsx');
			document.body.appendChild(link);
			link.click();
			link.remove();
		});
	};

	uploadStudentFile = (formData) => {
		this.subAdminService.uploadStudentExcelFile(formData).then((res) => {
			this.setState({ selectionModal: false });
			if ('fileListError' in res.data) {
			} else {
				this.handleSnackBar(true, res.data.msg, 'success');
			}
		});
	};

	viewStudents = () => {
		let { pageIndex, pageSize } = this.state;
		this.subAdminService.listStudents({ pageIndex, pageSize }).then((res) => {
			this.setState({
				studentsList: res.data.studentList,
				pageCount: res.data.count,
				deleteModal: { show: false, id: '' },
			});
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

	handleSnackBar = (status, msg, type) => {
		this.setState({ snackbar: { show: status, msg: msg, type: type } });
	};

	componentDidMount() {
		this.viewStudents();
	}

	editStudent = (studentId) => {
		this.props.history.push(`/subAdmin/student/${studentId}`);
	};

	createNewStudent = () => {
		this.props.history.push('/subAdmin/student/new');
	};

	render() {
		let {
			selectionModal,
			snackbar,
			studentsList,
			pageIndex,
			pageSize,
			pageCount,
			deleteModal,
		} = this.state;
		return (
			<div className='container py-5'>
				<Card className='p-3 mb-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Students</Typography>
							<Typography variant='subtitle1'>View your students</Typography>
						</div>
						<div className='align-self-center'>
							<Button
								variant='contained'
								className='bg-dark text-white'
								startIcon={<Add />}
								onClick={() => this.handleSelectionModal(true)}
							>
								Create new
							</Button>
						</div>
					</div>
				</Card>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<StyledTableRow>
								<StyledTableCell>S.No</StyledTableCell>
								<StyledTableCell>Student ID</StyledTableCell>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>Mobile number</StyledTableCell>
								<StyledTableCell>Actions</StyledTableCell>
							</StyledTableRow>
						</TableHead>
						<TableBody>
							{studentsList.map((data, index) => (
								<StyledTableRow key={data._id}>
									<StyledTableCell component='th' scope='row'>
										{index + 1}
									</StyledTableCell>
									<StyledTableCell>
										{data.studentsData.studentId}
									</StyledTableCell>
									<StyledTableCell>
										{data.firstName} {data.lastName}
									</StyledTableCell>
									<StyledTableCell>{data.email}</StyledTableCell>
									<StyledTableCell>{data.mobileNumber}</StyledTableCell>
									<StyledTableCell>
										<BootstrapTooltip title='Edit student'>
											<IconButton
												size='small'
												onClick={() => this.editStudent(data._id)}
											>
												<Edit size='small' />
											</IconButton>
										</BootstrapTooltip>
										<BootstrapTooltip title='Delete student'>
											<IconButton
												size='small'
												onClick={() => this.handleDeleteModal(true, data._id)}
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
						rowsPerPageOptions={[10, 50, 100]}
						colSpan={5}
						count={pageCount}
						rowsPerPage={pageSize}
						page={pageIndex}
						onChangePage={this.handlePageChange}
						onChangeRowsPerPage={this.handlePageSize}
					></TablePagination>
				</TableContainer>
				<CreateStudentSelectionModal
					show={selectionModal}
					hideModal={this.handleSelectionModal}
					downloadSampleStudentFile={this.downloadSampleStudentFile}
					uploadStudentFile={this.uploadStudentFile}
					handleSnackBar={this.handleSnackBar}
					createNewStudent={this.createNewStudent}
				/>
				<Snackbar
					show={snackbar.show}
					message={snackbar.msg}
					snackBarType={snackbar.type}
					handleSnackBar={this.handleSnackBar}
				/>
				<DeleteModal
					show={deleteModal.show}
					hideModal={this.handleDeleteModal}
					heading='student'
					deleteContent={this.removeStudent}
				/>
			</div>
		);
	}
}

export default SubAdminStudents;
