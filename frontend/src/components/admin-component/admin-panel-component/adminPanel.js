import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './adminPanel.module.css';
import * as actionTypes from '../../../action';

class AdminPanel extends Component {
	render() {
		return (
			<div className={`${styles.stickySidebar} pt-3`}>
				<h4 className='text-center font-weight-normal'>Dashboard</h4>
				<div className='d-flex flex-row px-1 pb-2'>
					<img
						className={styles.examinerIcon}
						src={require('../../../assets/icons/examinerIcon.png')}
						alt='Examiner icon'
					/>
					<h5 className='pb-0 my-auto ml-2 font-weight-normal'>
						Examiner
					</h5>
				</div>
				<ul className='nav flex-column justify-content-center '>
					<li
						onClick={() => {
							this.props.panelWindow('approvedExaminer');
						}}
						className={`nav-item ${styles.icon} bg-primary py-2 px-3 ${styles.iconHover}`}
					>
						<img
							className={`${styles.navIcon} mr-1`}
							src={require('../../../assets/icons/approvedIcon.jpg')}
							alt='approved icon'
						/>{' '}
						Approved
					</li>
					<li
						onClick={() => {
							this.props.panelWindow('pendingExaminer');
						}}
						className={`nav-item ${styles.icon} ${styles.bgOrange} px-3 py-2 ${styles.iconHover}`}
					>
						<img
							className={`${styles.navIcon} mr-1`}
							src={require('../../../assets/icons/pendingIcon.png')}
							alt='pending icon'
						/>{' '}
						Pending
					</li>
					<li
						onClick={() => {
							this.props.panelWindow('declinedExaminer');
						}}
						className={`nav-item ${styles.icon} bg-warning px-3 py-2 ${styles.iconHover}`}
					>
						<img
							className={`${styles.navIcon} mr-1 `}
							src={require('../../../assets/icons/declinedIcon.jpg')}
							alt='declined icon'
						/>{' '}
						Declined
					</li>
				</ul>
				<div className='d-flex flex-row px-1 pt-3 '>
					<img
						className={styles.examinerIcon}
						src={require('../../../assets/icons/examIcon.png')}
						alt='Examiner icon'
					/>
					<h5 className='pb-0 my-auto ml-2 font-weight-normal'>Exam</h5>
				</div>
				<ul className='nav flex-column justify-content-center py-2'>
					<li
						onClick={() => {
							this.props.panelWindow('approvedExam');
						}}
						className={`nav-item ${styles.icon} bg-primary py-2 px-3 ${styles.iconHover}`}
					>
						<img
							className={`${styles.navIcon} mr-1`}
							src={require('../../../assets/icons/approvedIcon.jpg')}
							alt='approved icon'
						/>{' '}
						Approved
					</li>
					<li
						onClick={() => {
							this.props.panelWindow('declinedExam');
						}}
						className={`nav-item ${styles.icon} bg-warning px-3 py-2 ${styles.iconHover}`}
					>
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

const mapDispatchToProps = (dispatch) => {
	return {
		panelWindow: (source) => {
			dispatch({
				type: actionTypes.SET_PANEL_WINDOW,
				panelValue: source,
			});
		},
	};
};
export default connect(null, mapDispatchToProps)(AdminPanel);
