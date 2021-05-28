import React from 'react';
import {
	Button,
	Card,
	Chip,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
	withStyles,
} from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import Moment from 'react-moment';

import CreateExaminerModal from '../../../modals/createExaminerModal';
import SubAdminService from '../../../services/subAdminApi';
import Snackbar from '../../customSnackbar';

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

class ViewSubAdminExaminers extends React.Component {
	constructor() {
		super();
		this.state = {
			examinerList: [],
			snackbar: { show: false, msg: '', type: '' },
			deleteModal: false,
			pageIndex: 0,
			pageSize: 5,
			totalExaminers: 0,
		};
		this.subAdminService = new SubAdminService();
	}

	handleCreateExaminerModal = (show) => {
		this.setState({ deleteModal: show });
	};

	handleSnackBar = (status, msg, type) => {
		this.setState({ snackbar: { show: status, msg: msg, type: type } });
	};

	handleSubmit = (values) => {
		this.subAdminService
			.requestForExaminer(values)
			.then((res) => {
				this.setState({ deleteModal: false });
				this.viewExaminerList();
				this.handleSnackBar(true, res.data.msg, 'success');
			})
			.catch((err) => {
				this.handleSnackBar(true, err.response.data.msg, 'error');
			});
	};

	viewExaminerList() {
		let { pageSize, pageIndex } = this.state;
		this.subAdminService
			.getExaminerList({ pageSize, pageIndex })
			.then((res) => {
				this.setState({
					examinerList: res.data.examinerList,
					totalExaminers: res.data.count,
				});
			});
	}

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value }, () => this.viewExaminerList());
	};

	handlePageSize = (event) => {
		this.setState({ pageSize: parseInt(event.target.value, 10) }, () =>
			this.viewExaminerList()
		);
	};

	componentDidMount() {
		this.viewExaminerList();
	}

	render() {
		let {
			examinerList,
			deleteModal,
			snackbar,
			pageIndex,
			pageSize,
			totalExaminers,
		} = this.state;
		return (
			<div className='container py-5'>
				<Card className='p-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Examiners</Typography>
							<Typography variant='subtitle1'>View your examiners</Typography>
						</div>
						<div className='align-self-center'>
							<Button
								variant='contained'
								className='bg-dark text-white'
								startIcon={<Add />}
								onClick={() => this.handleCreateExaminerModal(true)}
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
								<StyledTableCell>S.no</StyledTableCell>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>Status</StyledTableCell>
								<StyledTableCell>Created date</StyledTableCell>
								<StyledTableCell>Actions</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{examinerList.length === 0 ? (
								<StyledTableRow component='th' scope='row'>
									<StyledTableCell
										colSpan={5}
										className='text-center font-weight-bold'
									>
										No examiner available
									</StyledTableCell>
								</StyledTableRow>
							) : null}
							{examinerList.map((examiner, index) => (
								<StyledTableRow key={examiner._id}>
									<StyledTableCell component='th' scope='row'>
										{index + 1}
									</StyledTableCell>
									<StyledTableCell>
										{examiner.firstName} {examiner.lastName}
									</StyledTableCell>
									<StyledTableCell>{examiner.email}</StyledTableCell>
									<StyledTableCell>
										<Moment format='MMM Do, YYYY (hh:mm A)'>
											{examiner.createdDate}
										</Moment>
									</StyledTableCell>
									<StyledTableCell>
										{examiner.status === 'pending' ? (
											<Chip
												label='Pending'
												className='bg-dark text-white'
												variant='default'
											/>
										) : examiner.status === 'approved' ? (
											<Chip
												label='Approved'
												color='primary'
												variant='default'
											/>
										) : (
											<Chip
												label='Declined'
												color='secondary'
												variant='default'
											/>
										)}
									</StyledTableCell>
									<StyledTableCell>
										<IconButton size='small'>
											<Edit fontSize='small' />
										</IconButton>
										<IconButton
											size='small'
											onClick={() => this.handleDeleteModal(true, examiner._id)}
										>
											<Delete fontSize='small' />
										</IconButton>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component='div'
						count={totalExaminers}
						rowsPerPage={pageSize}
						page={pageIndex}
						onChangePage={this.handlePageChange}
						onChangeRowsPerPage={this.handlePageSize}
					></TablePagination>
				</TableContainer>
				<CreateExaminerModal
					show={deleteModal}
					handleSubmit={this.handleSubmit}
					hideModal={this.handleCreateExaminerModal}
				/>
				<Snackbar
					show={snackbar.show}
					message={snackbar.msg}
					snackBarType={snackbar.type}
					handleSnackBar={this.handleSnackBar}
				/>
			</div>
		);
	}
}

export default ViewSubAdminExaminers;
