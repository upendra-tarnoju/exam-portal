import React from 'react';
import {
	Button,
	ButtonBase,
	Divider,
	Paper,
	Menu,
	MenuItem,
	Fade,
	Table,
	TableContainer,
	TableCell,
	TableHead,
	TableRow,
	TableBody,
	Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { AddCircleOutlineOutlined, DeleteOutline } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import AdminService from '../../../../services/adminApi';
import styles from './adminDashboard.module.css';
import { Pagination } from '@material-ui/lab';
import factories from '../../../../factories/factories';
import ApproveDeclineModal from '../../../../modals/approveDeclineModal';

const useStyles = (theme) => ({
	informationCard: {
		[theme.breakpoints.down('sm')]: {
			marginTop: '10px',
		},
	},
	examinerChartCard: {
		[theme.breakpoints.down('sm')]: {
			marginTop: '15px',
		},

		[theme.breakpoints.up('sm')]: {
			marginTop: '0px',
		},
	},
});

class AdminDashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			totalExaminers: 0,
			totalExams: 0,
			totalStudents: 0,
			totalEarning: 0,
			examChart: {
				options: {
					xaxis: { categories: [] },
				},
				series: [{ data: [] }],
			},
			monthMenu: null,
			examinerPieChart: { series: [], options: { labels: [] } },
			latestExaminers: [],
			latestExaminersPage: { pageIndex: 0, pageSize: 2, pageCount: 0 },
			approveDeclineModal: { show: false, data: '' },
			snackBar: { show: false, msg: '' },
		};
		this.adminService = new AdminService();
	}

	handleExamMonthChange = (value) => {
		this.setState({
			monthMenu: value,
		});
	};

	viewExamMonthData = (minDate, maxDate) => {
		this.adminService.getExamChartDetails(minDate, maxDate).then((response) => {
			let examData = response.data;
			this.setState((prevState) => ({
				...prevState,
				examChart: {
					options: {
						chart: { id: 'basic-bar', toolbar: { show: false } },
						xaxis: {
							categories: examData.map(
								(data) =>
									`${data.examDate}-${moment(minDate.getMonth(), 'M').format(
										'MMM'
									)}`
							),
						},
					},
					series: [
						{
							name: 'Total exams',
							data: examData.map((data) => data.count),
						},
					],
				},
			}));
		});
	};

	viewLatestExaminer(pageIndex, pageSize) {
		this.adminService
			.getAllExaminer({
				type: 'latestExaminer',
				pageIndex: pageIndex,
				pageSize: pageSize,
			})
			.then((response) => {
				this.setState((prevState) => ({
					latestExaminers: response.data.examiners,
					latestExaminersPage: {
						...prevState.latestExaminersPage,
						pageCount: Math.ceil(
							response.data.count / this.state.latestExaminersPage.pageSize
						),
					},
				}));
			});
	}

	handlePageChange = (event, value) => {
		this.setState(
			{
				latestExaminersPage: {
					pageIndex: value - 1,
					pageSize: this.state.latestExaminersPage.pageSize,
				},
			},
			() =>
				this.viewLatestExaminer(
					this.state.latestExaminersPage.pageIndex,
					this.state.latestExaminersPage.pageSize
				)
		);
	};

	handleModal = (status) => {
		this.setState({
			approveDeclineModal: {
				show: status,
				data: '',
			},
		});
	};

	changeExamMonthData = (month) => {
		let minDate = new Date();
		minDate.setDate(1);
		minDate.setMonth(month);
		let maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, 0);
		this.viewExamMonthData(minDate, maxDate);
	};

	componentDidMount() {
		let { latestExaminersPage } = this.state;
		this.adminService.getDashboardCardDetails().then((response) => {
			let data = response.data;
			this.setState({
				totalExaminers: data.totalExaminers,
				totalExams: data.totalExams,
				totalStudents: data.totalStudents,
				totalEarning: data.totalExaminers * 15,
			});
		});

		let minDate = new Date();
		minDate.setDate(1);
		let maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, 0);
		this.viewExamMonthData(minDate, maxDate);

		this.adminService.getAllExaminer({ type: 'examinerCount' }).then((res) => {
			this.setState({
				examinerPieChart: {
					series: Object.values(res.data),
					options: {
						labels: Object.keys(res.data).map(
							(data) =>
								data.slice(0, 1).toUpperCase() + data.slice(1, data.length)
						),
					},
				},
			});
		});

		this.viewLatestExaminer(
			latestExaminersPage.pageIndex,
			latestExaminersPage.pageSize
		);
	}

	approveOrDeclineExaminers = (firstName, lastName, modalType, id) => {
		this.setState({
			approveDeclineModal: {
				show: true,
				data: {
					id: id,
					type: modalType,
					success: false,
					fullName: `${firstName} ${lastName}`,
				},
			},
		});
	};

	handleSnackBar = (status, data) => {
		this.setState({
			latestExaminers: this.state.latestExaminers.filter(
				(examiner) => examiner.examinerData._id !== data._id
			),
			snackBar: { show: status, msg: data.msg },
		});
	};

	render() {
		let {
			totalExaminers,
			totalExams,
			totalStudents,
			totalEarning,
		} = this.state;

		let { classes } = this.props;

		let monthExamMenu = factories.monthMenu.map((month, index) => {
			return (
				<MenuItem
					onClick={() => this.changeExamMonthData(index + 1)}
					key={index}
				>
					{month}
				</MenuItem>
			);
		});
		return (
			<div className='container-fluid'>
				<div className='row h-100 py-5'>
					<div
						className={`col-xs-12 col-sm-6 col-md-3  ${classes.informationCard}`}
					>
						<Paper className='p-3'>
							<div className='d-flex justify-content-between'>
								<div className='text-center align-self-center'>
									<p
										className={`mb-0 ${styles.examinerPaperValue} font-weight-bold`}
									>
										{totalExaminers}
									</p>
									<p
										className={`mb-0 ${styles.examinerPaperText} text-secondary`}
									>
										{totalExaminers === 1 ? 'EXAMINER' : 'EXAMINERS'}
									</p>
								</div>
								<ButtonBase>
									<i
										className={`fa fa-user-circle ${styles.dashboardIcon}`}
									></i>
								</ButtonBase>
							</div>
						</Paper>
					</div>
					<div
						className={`col-xs-12 col-sm-6 col-md-3 ${classes.informationCard}`}
					>
						<Paper className='p-3'>
							<div className='d-flex justify-content-between'>
								<ButtonBase>
									<i className={`fa fa-book ${styles.dashboardIcon}`}></i>
								</ButtonBase>
								<div className='text-center align-self-center'>
									<p
										className={`mb-0 ${styles.examinerPaperValue} font-weight-bold`}
									>
										{totalExams}
									</p>
									<p
										className={`mb-0 ${styles.examinerPaperText} text-secondary`}
									>
										{totalExams === 1 ? 'EXAM' : 'EXAMS'}
									</p>
								</div>
							</div>
						</Paper>
					</div>
					<div
						className={`col-xs-12 col-sm-6 col-md-3 ${classes.informationCard}`}
					>
						<Paper className='p-3'>
							<div className='d-flex justify-content-between'>
								<div className='text-center align-self-center'>
									<p
										className={`mb-0 ${styles.examinerPaperValue} font-weight-bold`}
									>
										{totalStudents}
									</p>
									<p
										className={`mb-0 ${styles.examinerPaperText} text-secondary`}
									>
										{totalStudents === 1 ? 'STUDENT' : 'STUDENTS'}
									</p>
								</div>
								<ButtonBase>
									<i className={`fa fa-child ${styles.dashboardIcon}`}></i>
								</ButtonBase>
							</div>
						</Paper>
					</div>
					<div
						className={`col-xs-12 col-sm-6 col-md-3 ${classes.informationCard}`}
					>
						<Paper className='p-3'>
							<div className='d-flex justify-content-between'>
								<ButtonBase>
									<i className={`fa fa-money ${styles.dashboardIcon}`}></i>
								</ButtonBase>
								<div className='text-center align-self-center'>
									<p
										className={`mb-0 ${styles.examinerPaperValue} font-weight-bold`}
									>
										${totalEarning}
									</p>
									<p
										className={`mb-0 ${styles.examinerPaperText} text-secondary`}
									>
										EARNING
									</p>
								</div>
							</div>
						</Paper>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-7'>
						<Paper>
							<div className='d-flex justify-content-between px-3 py-2'>
								<span
									className={`${styles.examinerChartHeading} align-self-center`}
								>
									Exams
								</span>
								<Button
									aria-controls='change-month-menu'
									aria-haspopup='true'
									onClick={(event) =>
										this.handleExamMonthChange(event.currentTarget)
									}
								>
									Change
								</Button>
								<Menu
									id='change-month-menu'
									anchorEl={this.state.monthMenu}
									keepMounted
									open={Boolean(this.state.monthMenu)}
									onClose={() => this.handleExamMonthChange(null)}
									TransitionComponent={Fade}
								>
									{monthExamMenu}
								</Menu>
							</div>
							<Divider />
							<Chart
								options={this.state.examChart.options}
								series={this.state.examChart.series}
								type='bar'
							/>
						</Paper>
					</div>
					<div className='col-md-5'>
						<Paper className='mb-3'>
							<div className='px-3 py-2'>
								<span className={styles.examinerChartHeading}>Examiner</span>
							</div>
							<Divider />
							<Chart
								options={this.state.examinerPieChart.options}
								series={this.state.examinerPieChart.series}
								type='pie'
								height={220}
							/>
						</Paper>
						<Paper>
							<div className='px-3 py-1'>Latest pending examiner</div>
							<TableContainer component={Paper}>
								<Table aria-label='simple-table' size='small'>
									<TableHead>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell align='right'>Actions</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{this.state.latestExaminers.map((data) => (
											<TableRow key={data._id}>
												<TableCell component='th' scope='row'>
													{factories.capitalizeName(data.firstName)}{' '}
													{factories.capitalizeName(data.lastName)}
												</TableCell>
												<TableCell align='right'>
													<span
														className='cursor-pointer'
														onClick={() => {
															this.approveOrDeclineExaminers(
																data.firstName,
																data.lastName,
																'approve',
																data.examinerData._id
															);
														}}
													>
														<AddCircleOutlineOutlined />
													</span>
													<span
														className='cursor-pointer'
														onClick={() => {
															this.approveOrDeclineExaminers(
																data.firstName,
																data.lastName,
																'decline',
																data.userDataId
															);
														}}
													>
														<DeleteOutline />
													</span>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
								<div className='py-1 d-flex justify-content-center'>
									<Pagination
										count={this.state.latestExaminersPage.pageCount}
										showFirstButton
										showLastButton
										onChange={this.handlePageChange}
									/>
								</div>
							</TableContainer>
						</Paper>
						<Divider />
						<ApproveDeclineModal
							show={this.state.approveDeclineModal.show}
							closeModal={this.handleModal}
							modalData={this.state.approveDeclineModal.data}
							handleSnackBar={this.handleSnackBar}
						/>
						<Snackbar
							open={this.state.snackBar.show}
							onClose={() => this.handleSnackBar(false, '')}
						>
							<MuiAlert
								elevation={6}
								variant='filled'
								onClose={() => this.handleSnackBar(false, '')}
								severity='success'
							>
								{this.state.snackBar.msg}
							</MuiAlert>
						</Snackbar>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(useStyles)(AdminDashboard);
