import React, { Component } from 'react';
// import cookie from 'js-cookie';
// import axios from 'axios';
import styles from './admin.module.css';

class Admin extends Component {
	componentDidMount() {
		// let cookieData = cookie.getJSON();
		// axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin`, {
		// 	headers: {
		// 		cookieData,
		// 	},
		// });
	}

	render() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<nav
						className={`col-md-3 d-md-block col-lg-2 bg-light ${styles.sidebar} collapse`}
					>
						<div className={`${styles.stickySidebar} pt-3`}>
							<div className='d-flex flex-row'>
								<img
									className={styles.examinerIcon}
									src={require('../../assets/examinerIcon.png')}
									alt='Examiner icon'
								/>
								<h5 className='pb-0 my-auto ml-2 font-weight-normal'>
									Examiner
								</h5>
							</div>
							<ul className='nav flex-column justify-content-center py-2'>
								<li className={`nav-item ${styles.icon}`}>
									<img
										className={`${styles.navIcon} mr-1 mb-2`}
										src={require('../../assets/approvedIcon.jpg')}
									/>{' '}
									Approved
								</li>
								<li className={`nav-item ${styles.icon}`}>
									<img
										className={`${styles.navIcon} mr-1 mb-2`}
										src={require('../../assets/pendingIcon.png')}
									/>{' '}
									Pending
								</li>
								<li className={`nav-item ${styles.icon}`}>
									<img
										className={`${styles.navIcon} mr-1 `}
										src={require('../../assets/declinedIcon.jpg')}
									/>{' '}
									Declined
								</li>
							</ul>
							<div className='d-flex flex-row'>
								<img
									className={styles.examinerIcon}
									src={require('../../assets/examIcon.png')}
									alt='Examiner icon'
								/>
								<h5 className='pb-0 my-auto ml-2 font-weight-normal'>
									Exam
								</h5>
							</div>
							<ul className='nav flex-column justify-content-center py-2'>
								<li className={`nav-item ${styles.icon}`}>
									<img
										className={`${styles.navIcon} mr-1 mb-2`}
										src={require('../../assets/approvedIcon.jpg')}
									/>{' '}
									Approved
								</li>
								<li className={`nav-item ${styles.icon}`}>
									<img
										className={`${styles.navIcon} mr-1 `}
										src={require('../../assets/declinedIcon.jpg')}
									/>{' '}
									Declined
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		);
	}
}

export default Admin;
