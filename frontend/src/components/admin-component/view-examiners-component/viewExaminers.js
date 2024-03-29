import React from 'react';
import {
	Card,
	TableRow,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableBody,
	IconButton,
	Typography,
	Chip,
	TablePagination,
} from '@material-ui/core';
import { DeleteOutline, CheckBox } from '@material-ui/icons';
import Moment from 'react-moment';

import AdminService from '../../../services/adminApi';
import ApproveDeclineModal from '../../../modals/approveDeclineModal';
import Snackbar from '../../../common/customSnackbar';
import factories from '../../../factories/factories';
import { StyledTableRow, StyledTableCell } from '../../../common/customTable';
import BootstrapTooltip from '../../../common/customTooltip';
import SearchExaminerForm from '../../../forms/examiner-form/searchExaminerForm';

class ViewExaminer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageIndex: 0,
			pageSize: 5,
			pageCount: 0,
			totalExaminers: 0,
			examinerData: [],
			approveDeclineModal: { show: false, id: '', type: '' },
			snackbar: { show: false, msg: '', type: '' },
		};
		this.adminService = new AdminService();
	}

	viewExaminers = () => {
		let { pageIndex, pageSize } = this.state;

		this.adminService.getAllExaminers({ pageIndex, pageSize }).then((res) => {
			this.setState({
				examinerData: res.data.examinerDetails,
				totalExaminers: res.data.count,
			});
		});
	};

	componentDidMount() {
		this.viewExaminers();
	}

	handleModal = (status) => {
		this.setState({ approveDeclineModal: { show: status, data: '' } });
	};

	handleSnackBar = (status, msg, type) => {
		let { snackbar } = this.state;
		if (type === undefined) type = snackbar.type;
		this.setState({ snackbar: { show: status, msg: msg, type: type } });
	};

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value }, () => this.viewExaminers());
	};

	handlePageSize = (event) => {
		this.setState({ pageSize: parseInt(event.target.value, 10) }, () =>
			this.viewExaminers()
		);
	};

	updateExaminerStatus = (modalType, id) => {
		this.setState({
			approveDeclineModal: { show: true, id: id, type: modalType },
		});
	};

	approveDeclineExaminer = () => {
		let { approveDeclineModal } = this.state;
		this.adminService
			.approveOrDeclineExaminer({
				examinerId: approveDeclineModal.id,
				status: approveDeclineModal.type,
			})
			.then((res) => {
				this.handleModal();
				this.viewExaminers();
				this.handleSnackBar(true, res.data.msg, 'success');
			});
	};

	handleFilter = (filteredValues) => {
		let { pageIndex, pageSize } = this.state;

		for (let [key, value] of Object.entries(filteredValues)) {
			if (value === '') {
				delete filteredValues[key];
			} else filteredValues[key] = value.toString();
		}

		let query = {
			...filteredValues,
			pageIndex: pageIndex,
			pageSize: pageSize,
		};

		this.adminService.getAllExaminers(query).then((res) => {
			this.setState({
				examinerData: res.data.examinerDetails,
				totalExaminers: res.data.count,
			});
		});
	};

	render() {
		let {
			examinerData,
			approveDeclineModal,
			snackbar,
			pageIndex,
			pageSize,
			totalExaminers,
		} = this.state;

		return (
			<div className='p-5'>
				<Card className='p-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Examiners</Typography>
							<Typography variant='subtitle1'>Handle your examiners</Typography>
						</div>
					</div>
				</Card>
				<Card className='my-4 p-3'>
					<SearchExaminerForm
						handleFilter={this.handleFilter}
						viewExaminers={this.viewExaminers}
					/>
				</Card>
				<TableContainer component={Paper} className='mt-4'>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell>S.No</StyledTableCell>
								<StyledTableCell>First name</StyledTableCell>
								<StyledTableCell>Last name</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>Requested date</StyledTableCell>
								<StyledTableCell>Status</StyledTableCell>
								<StyledTableCell>Actions</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{examinerData.length === 0 ? (
								<StyledTableRow component='th' scope='row'>
									<StyledTableCell
										colSpan={5}
										className='text-center font-weight-bold'
									>
										No examiner available
									</StyledTableCell>
								</StyledTableRow>
							) : null}
							{examinerData.map((examiner, index) => (
								<StyledTableRow key={examiner._id}>
									<StyledTableCell component='th' scope='row'>
										{index + 1}
									</StyledTableCell>
									<StyledTableCell>
										{factories.capitalizeName(examiner.firstName)}
									</StyledTableCell>
									<StyledTableCell>
										{factories.capitalizeName(examiner.lastName)}
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
										{examiner.status !== 'declined' ? (
											<BootstrapTooltip title='Decline'>
												<IconButton
													size='small'
													onClick={() =>
														this.updateExaminerStatus('declined', examiner._id)
													}
												>
													<DeleteOutline size='small' />
												</IconButton>
											</BootstrapTooltip>
										) : null}
										{examiner.status !== 'approved' ? (
											<BootstrapTooltip title='Approve'>
												<IconButton
													size='small'
													onClick={() =>
														this.updateExaminerStatus('approved', examiner._id)
													}
												>
													<CheckBox size='small' />
												</IconButton>
											</BootstrapTooltip>
										) : null}
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
				<ApproveDeclineModal
					show={approveDeclineModal.show}
					closeModal={this.handleModal}
					type={approveDeclineModal.type}
					approveDeclineExaminer={this.approveDeclineExaminer}
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

export default ViewExaminer;
