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
} from '@material-ui/core';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { AddCircleOutlineOutlined, DeleteOutline } from '@material-ui/icons';

import AdminService from '../../../../services/adminApi';
import styles from './adminDashboard.module.css';
import { Pagination } from '@material-ui/lab';

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
			monthMenu: { anchorEl: null, setAnchorEl: null },
			examinerPieChart: { series: [], options: { labels: [] } },
			latestExaminers: [],
			latestExaminersPage: { pageIndex: 0, pageSize: 2, pageCount: 0 },
		};
		this.adminService = new AdminService();
	}

	handleExamMonthChange = (value) => {
		this.setState({
			monthMenu: {
				anchorEl: value,
			},
		});
	};

	viewExamMonthData = (minDate, maxDate) => {
		this.adminService
			.getExamChartDetails(minDate, maxDate)
			.then((response) => {
				let examData = response.data;
				this.setState((prevState) => ({
					...prevState,
					examChart: {
						options: {
							chart: { id: 'basic-bar', toolbar: { show: false } },
							xaxis: {
								categories: examData.map(
									(data) =>
										`${data.examDate}-${moment(
											minDate.getMonth(),
											'M'
										).format('MMM')}`
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

	capitalizeName(name) {
		return name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
	}

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
							response.data.count /
								this.state.latestExaminersPage.pageSize
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

		this.adminService
			.getAllExaminer({ type: 'examinerCount' })
			.then((res) => {
				this.setState({
					examinerPieChart: {
						series: Object.values(res.data),
						options: {
							labels: Object.keys(res.data).map(
								(data) =>
									data.slice(0, 1).toUpperCase() +
									data.slice(1, data.length)
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

	render() {
		let {
			totalExaminers,
			totalExams,
			totalStudents,
			totalEarning,
		} = this.state;
		return (
			<div className='container'>
				<div className='row pt-5 pb-3'>
					<div className='col-md-3'>
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
										EXAMINERS
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
					<div className='col-md-3'>
						<Paper className='p-3'>
							<div className='d-flex justify-content-between'>
								<ButtonBase>
									<i
										className={`fa fa-book ${styles.dashboardIcon}`}
									></i>
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
										EXAMS
									</p>
								</div>
							</div>
						</Paper>
					</div>
					<div className='col-md-3'>
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
										STUDENTS
									</p>
								</div>
								<ButtonBase>
									<i
										className={`fa fa-child ${styles.dashboardIcon}`}
									></i>
								</ButtonBase>
							</div>
						</Paper>
					</div>
					<div className='col-md-3'>
						<Paper className='p-3'>
							<div className='d-flex justify-content-between'>
								<ButtonBase>
									<i
										className={`fa fa-money ${styles.dashboardIcon}`}
									></i>
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
									anchorEl={this.state.monthMenu.anchorEl}
									keepMounted
									open={Boolean(this.state.monthMenu.anchorEl)}
									onClose={() => this.handleExamMonthChange(null)}
									TransitionComponent={Fade}
								>
									<MenuItem
										onClick={() => this.changeExamMonthData(1)}
									>
										January
									</MenuItem>
									<MenuItem
										onClick={() => this.changeExamMonthData(2)}
									>
										Feburary
									</MenuItem>
									<MenuItem
										onClick={() => this.changeExamMonthData(3)}
									>
										March
									</MenuItem>
									<MenuItem
										onClick={() => this.changeExamMonthData(4)}
									>
										April
									</MenuItem>
									<MenuItem
										onClick={() => this.changeExamMonthData(5)}
									>
										May
									</MenuItem>
									<MenuItem
										onClick={() => this.changeExamMonthData(6)}
									>
										June
									</MenuItem>
									<MenuItem
										onClick={() => this.changeExamMonthData(7)}
									>
										July
									</MenuItem>
									<MenuItem
										onClick={() => this.changeExamMonthData(8)}
									>
										Auguest
									</MenuItem>
									<MenuItem
										onClick={() => this.changeExamMonthData(9)}
									>
										September
									</MenuItem>
									<MenuItem
										onClick={() => this.changeExamMonthData(10)}
									>
										October
									</MenuItem>
									<MenuItem
										onClick={() => this.changeExamMonthData(11)}
									>
										November
									</MenuItem>
									<MenuItem
										onClick={() => this.changeExamMonthData(12)}
									>
										December
									</MenuItem>
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
								<span className={styles.examinerChartHeading}>
									Examiner
								</span>
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
													{this.capitalizeName(data.firstName)}{' '}
													{this.capitalizeName(data.lastName)}
												</TableCell>
												<TableCell align='right'>
													<AddCircleOutlineOutlined />
													<DeleteOutline />
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
								<div className='py-1'>
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
					</div>
				</div>
			</div>
		);
	}
}

export default AdminDashboard;
