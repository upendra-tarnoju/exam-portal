import React from 'react';
import { ButtonBase, Grid, Paper } from '@material-ui/core';
import AdminService from '../../../../services/adminApi';

import styles from './adminDashboard.module.css';

class AdminDashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			totalExaminers: 0,
			totalExams: 0,
			totalStudents: 0,
			totalEarning: 0,
		};
		this.adminService = new AdminService();
	}

	componentDidMount() {
		this.adminService.getDashboardCardDetails().then((response) => {
			let data = response.data;
			this.setState({
				totalExaminers: data.totalExaminers,
				totalExams: data.totalExams,
				totalStudents: data.totalStudents,
				totalEarning: data.totalExaminers * 15,
			});
		});
	}
	render() {
		let {
			totalExaminers,
			totalExams,
			totalStudents,
			totalEarning,
		} = this.state;
		return (
			<div style={{ flexGrow: 1 }}>
				<Grid container spacing={3} className='px-5 py-4'>
					<Grid item xs={3}>
						<Paper className='py-3 px-5'>
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
					</Grid>
					<Grid item xs>
						<Paper className='py-3 px-5'>
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
					</Grid>
					<Grid item xs>
						<Paper className='py-3 px-5'>
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
					</Grid>
					<Grid item xs>
						<Paper className='py-3 px-5'>
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
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default AdminDashboard;
