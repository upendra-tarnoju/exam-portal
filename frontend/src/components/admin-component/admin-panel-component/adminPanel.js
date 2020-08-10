import React, { Component } from 'react';
import styles from './adminPanel.module.css';

class AdminPanel extends Component {
	render() {
		return (
			<div className={`${styles.stickySidebar} pt-3`}>
				<div className='d-flex flex-row'>
					<img
						className={styles.examinerIcon}
						src={require('../../../assets/icons/examinerIcon.png')}
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
							src={require('../../../assets/icons/approvedIcon.jpg')}
							alt='approved icon'
						/>{' '}
						Approved
					</li>
					<li className={`nav-item ${styles.icon}`}>
						<img
							className={`${styles.navIcon} mr-1 mb-2`}
							src={require('../../../assets/icons/pendingIcon.png')}
							alt='pending icon'
						/>{' '}
						Pending
					</li>
					<li className={`nav-item ${styles.icon}`}>
						<img
							className={`${styles.navIcon} mr-1 `}
							src={require('../../../assets/icons/declinedIcon.jpg')}
							alt='declined icon'
						/>{' '}
						Declined
					</li>
				</ul>
				<div className='d-flex flex-row'>
					<img
						className={styles.examinerIcon}
						src={require('../../../assets/icons/examIcon.png')}
						alt='Examiner icon'
					/>
					<h5 className='pb-0 my-auto ml-2 font-weight-normal'>Exam</h5>
				</div>
				<ul className='nav flex-column justify-content-center py-2'>
					<li className={`nav-item ${styles.icon}`}>
						<img
							className={`${styles.navIcon} mr-1 mb-2`}
							src={require('../../../assets/icons/approvedIcon.jpg')}
							alt='approved icon'
						/>{' '}
						Approved
					</li>
					<li className={`nav-item ${styles.icon}`}>
						<img
							className={`${styles.navIcon} mr-1 `}
							src={require('../../../assets/icons/declinedIcon.jpg')}
							alt='declined icon'
						/>{' '}
						Declined
					</li>
				</ul>
			</div>
		);
	}
}

export default AdminPanel;
