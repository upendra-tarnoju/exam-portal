import React from 'react';
import {
	Typography,
	Card,
	TableRow,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableBody,
	Chip,
	IconButton,
	TablePagination,
} from '@material-ui/core';
import { CheckBox, DeleteOutline } from '@material-ui/icons';

import AdminService from '../../../services/adminApi';
import factories from '../../../factories/factories';
import CustomSnackBar from '../../../common/customSnackbar';
import { StyledTableCell, StyledTableRow } from '../../../common/customTable';
import BootstrapTooltip from '../../../common/customTooltip';
import SubAdminStatusModal from '../../../modals/subAdminStatusModal';
import SearchSubAdminForm from '../../../forms/subadmin-form/searchSubAdminForm';

class ViewSubAdmin extends React.Component {
	constructor() {
		super();
		this.state = {
			pageIndex: 0,
			pageSize: 5,
			pageCount: 0,
			subAdminList: [],
			snackbar: { show: false, msg: '', type: '' },
			approveOrDecline: { show: false, type: '', id: '' },
		};
		this.adminService = new AdminService();
	}

	componentDidMount() {
		this.viewSubAdmin();
	}

	viewSubAdmin = () => {
		let { pageIndex, pageSize } = this.state;
		this.adminService.getSubAdminList({ pageIndex, pageSize }).then((res) => {
			this.setState({
				subAdminList: res.data.subAdminList,
				pageCount: res.data.count,
			});
		});
	};

	createNewSubAdmin = () => {
		this.props.history.push('/admin/subAdmin/new');
	};

	updateSubAdminStatus = () => {
		let { approveOrDecline } = this.state;

		let data = {
			subAdminId: approveOrDecline.id,
			status: approveOrDecline.type,
		};

		this.adminService.changeSubAdminStatus(data).then((res) => {
			this.handleSnackBar(true, res.data.msg, 'success');
			this.handleApproveDeclineModal(false);
			this.viewSubAdmin();
		});
	};

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value }, () => this.viewSubAdmin());
	};

	handlePageSize = (event) => {
		this.setState({ pageSize: parseInt(event.target.value, 10) }, () =>
			this.viewSubAdmin()
		);
	};

	handleSnackBar = (status, msg, type) => {
		let { snackbar } = this.state;
		if (type === undefined) type = snackbar.type;
		this.setState({ snackbar: { show: status, msg: msg, type: type } });
	};

	handleApproveDeclineModal = (show, type, id) => {
		this.setState({ approveOrDecline: { show, type, id } });
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

		this.adminService.getSubAdminList(query).then((res) => {
			this.setState({
				subAdminList: res.data.subAdminList,
				pageCount: res.data.count,
			});
		});
	};

	render() {
		const {
			subAdminList,
			pageCount,
			pageIndex,
			pageSize,
			snackbar,
			approveOrDecline,
		} = this.state;
		return (
			<div className='p-5'>
				<Card className='p-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Sub admin</Typography>
							<Typography variant='subtitle1'>View your sub admin</Typography>
						</div>
					</div>
				</Card>
				<Card className='my-4 p-3'>
					<SearchSubAdminForm
						handleFilter={this.handleFilter}
						viewSubAdmin={this.viewSubAdmin}
					/>
				</Card>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell>S.no</StyledTableCell>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>Mobile number</StyledTableCell>
								<StyledTableCell>College</StyledTableCell>
								<StyledTableCell>Status</StyledTableCell>
								<StyledTableCell>Actions</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{subAdminList.length === 0 ? (
								<StyledTableRow component='th' scope='row'>
									<StyledTableCell
										colSpan={7}
										className='text-center font-weight-bold'
									>
										No sub Admin available
									</StyledTableCell>
								</StyledTableRow>
							) : null}
							{subAdminList.map((subAdmin, index) => (
								<StyledTableRow key={subAdmin._id}>
									<StyledTableCell component='th' scope='row'>
										{index + 1}
									</StyledTableCell>
									<StyledTableCell>
										{factories.capitalizeName(subAdmin.firstName)}{' '}
										{factories.capitalizeName(subAdmin.lastName)}
									</StyledTableCell>
									<StyledTableCell>{subAdmin.email}</StyledTableCell>
									<StyledTableCell>{subAdmin.mobileNumber}</StyledTableCell>
									<StyledTableCell>{subAdmin.collegeId.name}</StyledTableCell>
									<StyledTableCell>
										{subAdmin.status === 'pending' ? (
											<Chip
												label='Pending'
												className='bg-dark text-white'
												variant='default'
											/>
										) : subAdmin.status === 'approved' ? (
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
										{subAdmin.status !== 'declined' ? (
											<BootstrapTooltip title='Decline'>
												<IconButton
													size='small'
													onClick={() =>
														this.handleApproveDeclineModal(
															true,
															'declined',
															subAdmin._id
														)
													}
												>
													<DeleteOutline size='small' />
												</IconButton>
											</BootstrapTooltip>
										) : null}
										{subAdmin.status !== 'approved' ? (
											<BootstrapTooltip title='Approve'>
												<IconButton
													size='small'
													onClick={() =>
														this.handleApproveDeclineModal(
															true,
															'approved',
															subAdmin._id
														)
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
					show={snackbar.show}
					handleSnackBar={this.handleSnackBar}
					snackBarType={snackbar.type}
					message={snackbar.msg}
				/>
				<SubAdminStatusModal
					show={approveOrDecline.show}
					type={approveOrDecline.type}
					closeModal={this.handleApproveDeclineModal}
					updateSubAdminStatus={this.updateSubAdminStatus}
				/>
			</div>
		);
	}
}

export default ViewSubAdmin;
