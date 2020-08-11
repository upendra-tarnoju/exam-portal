import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './adminPanel.module.css';
import * as actionTypes from '../../../action';

class AdminPanel extends Component {
	render() {
		return (
			<div className={`${styles.stickySidebar} pt-3`}>
				<div className='text-center'>
					<img
						alt='logo'
						src={require('../../../assets/logo.png')}
						className={`${styles.logo}`}
					/>
					<h4 className='text-center text-light font-weight-normal'>
						Examin
					</h4>
				</div>
				<ul className='nav flex-column'>
					<li
						onClick={() => this.props.panelWindow('dashboard')}
						className={`nav-item py-2 px-4 text-white-50 ${styles.iconHover}`}
					>
						<i
							className='fa fa-desktop fa-lg text-white-50 pr-3'
							aria-hidden='true'
						></i>{' '}
						Dashboard
					</li>
					<li
						onClick={() => this.props.panelWindow('examiner')}
						className={`nav-item py-2 px-4 text-white-50 ${styles.iconHover}`}
					>
						<i
							className='fa fa-user-circle fa-lg text-white-50 pr-3'
							aria-hidden='true'
						></i>{' '}
						Examiner
					</li>
					<li
						onClick={() => this.props.panelWindow('exam')}
						className={`nav-item py-2 px-4 text-white-50 ${styles.iconHover}`}
					>
						<i
							className='fa fa-book fa-lg text-white-50 pr-3'
							aria-hidden='true'
						></i>{' '}
						Exam
					</li>
					<li
						onClick={() => this.props.panelWindow('settings')}
						className={`nav-item py-2 px-4 text-white-50 ${styles.iconHover}`}
					>
						<i
							className='fa fa-cog fa-lg text-white-50 pr-3'
							aria-hidden='true'
						></i>{' '}
						Settings
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
