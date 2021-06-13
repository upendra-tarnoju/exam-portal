import React from 'react';
import {
	Card,
	withStyles,
	TableRow,
	TableCell,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableBody,
	IconButton,
	Typography,
	Chip,
	Tooltip,
	makeStyles,
	TablePagination,
} from '@material-ui/core';
import { DeleteOutline, CheckBox } from '@material-ui/icons';
import Moment from 'react-moment';

import AdminService from '../../../../services/adminApi';
import ApproveDeclineModal from '../../../../modals/approveDeclineModal';
import Snackbar from '../../../customSnackbar';
import factories from '../../../../factories/factories';

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
			snackbar: { show: false, msg: '' },
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
		this.setState({
			approveDeclineModal: {
				show: status,
				data: '',
			},
		});
	};

	handleSnackBar = (status, msg, type) => {
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
			<div className='container pt-4'>
				<Card className='p-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Examiners</Typography>
							<Typography variant='subtitle1'>Handle your examiners</Typography>
						</div>
					</div>
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
