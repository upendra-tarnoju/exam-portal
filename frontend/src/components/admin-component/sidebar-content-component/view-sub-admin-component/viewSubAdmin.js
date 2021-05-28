import React from 'react';
import {
	Typography,
	Card,
	TableCell,
	TableRow,
	withStyles,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableBody,
	makeStyles,
	Chip,
	IconButton,
	Tooltip,
	TablePagination,
} from '@material-ui/core';
import { CheckBox, DeleteOutline } from '@material-ui/icons';

import AdminService from '../../../../services/adminApi';
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

class ViewSubAdmin extends React.Component {
	constructor() {
		super();
		this.state = {
			pageIndex: 0,
			pageSize: 5,
			pageCount: 0,
			subAdminList: [],
			snackbar: { show: false, msg: '', type: '' },
		};
		this.adminService = new AdminService();
	}

	componentDidMount() {
		this.viewSubAdmin();
	}

	viewSubAdmin() {
		let { pageIndex, pageSize } = this.state;
		this.adminService.getSubAdminList({ pageIndex, pageSize }).then((res) => {
			this.setState({
				subAdminList: res.data.subAdminList,
				pageCount: res.data.count,
			});
		});
	}

	createNewSubAdmin = () => {
		this.props.history.push('/admin/subAdmin/new');
	};

	updateSubAdminStatus = (subAdminId, status) => {
		let data = { subAdminId, status };
		this.adminService.changeSubAdminStatus(data).then((res) => {
			this.handleSnackBar(true, res.data.msg, 'success');
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
		this.setState({ snackbar: { show: status, msg: msg, type: type } });
	};

	render() {
		const { subAdminList, pageCount, pageIndex, pageSize, snackbar } =
			this.state;
		return (
			<div className='container py-5'>
				<Card className='p-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Sub admin</Typography>
							<Typography variant='subtitle1'>View your sub admin</Typography>
						</div>
					</div>
				</Card>
				<Card className='mt-3'>
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
								{subAdminList.map((subAdmin, index) => (
									<StyledTableRow key={subAdmin._id}>
										<StyledTableCell component='th' scope='row'>
											{index + 1}
										</StyledTableCell>
										<StyledTableCell>
											{subAdmin.firstName} {subAdmin.lastName}
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
															this.updateSubAdminStatus(
																subAdmin._id,
																'declined'
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
															this.updateSubAdminStatus(
																subAdmin._id,
																'approved'
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
				</Card>
			</div>
		);
	}
}

export default ViewSubAdmin;
