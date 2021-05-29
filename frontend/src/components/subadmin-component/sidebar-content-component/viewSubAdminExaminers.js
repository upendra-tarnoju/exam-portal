import React from 'react';
import {
	Button,
	Card,
	Chip,
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
import Moment from 'react-moment';

import CreateExaminerModal from '../../../modals/createExaminerModal';
import SubAdminService from '../../../services/subAdminApi';
import Snackbar from '../../customSnackbar';
import DeleteModal from '../../../modals/deleteModal';

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

class ViewSubAdminExaminers extends React.Component {
	constructor() {
		super();
		this.state = {
			examinerList: [],
			snackbar: { show: false, msg: '', type: '' },
			createExaminer: false,
			pageIndex: 0,
			pageSize: 5,
			totalExaminers: 0,
			deleteModal: { show: false, id: '' },
		};
		this.subAdminService = new SubAdminService();
	}

	handleCreateExaminerModal = (show) => {
		this.setState({ createExaminer: show });
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
					deleteModal: { id: '', show: false },
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

	handleDeleteModal = (show, id) => {
		this.setState({ deleteModal: { show, id } });
	};

	componentDidMount() {
		this.viewExaminerList();
	}

	deleteExaminer = () => {
		let { deleteModal } = this.state;
		this.subAdminService.removeExaminer(deleteModal.id).then((res) => {
			this.handleSnackBar(true, res.data.msg, 'success');
			this.viewExaminerList();
		});
	};

	render() {
		let {
			examinerList,
			deleteModal,
			createExaminer,
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
										<BootstrapTooltip title='Edit'>
											<IconButton size='small'>
												<Edit fontSize='small' />
											</IconButton>
										</BootstrapTooltip>
										<BootstrapTooltip title='Delete'>
											<IconButton
												size='small'
												onClick={() =>
													this.handleDeleteModal(true, examiner._id)
												}
											>
												<Delete fontSize='small' />
											</IconButton>
										</BootstrapTooltip>
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
					show={createExaminer}
					handleSubmit={this.handleSubmit}
					hideModal={this.handleCreateExaminerModal}
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
					heading='examiner'
					deleteContent={this.deleteExaminer}
				/>
			</div>
		);
	}
}

export default ViewSubAdminExaminers;
