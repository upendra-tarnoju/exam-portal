import React, { Component } from 'react';
import styles from './examinerPanel.module.css';
import axios from 'axios';

class ExaminerPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableData: [],
		};
		this.examinerData = this.examinerData.bind(this);
	}

	handleCardClick(type) {
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/api/admin/examiner`, {
				params: { type: type },
			})
			.then((res) => {
				if (res.data.length !== 0) {
					this.setState({
						tableData: res.data,
					});
				}
			});
	}

	examinerData() {
		let examiners = this.state.tableData.map((data, index) => (
			<tr key={data._id}>
				<th scope='row'>{index + 1}</th>
				<td>{data.firstName}</td>
				<td>{data.lastName}</td>
				<td>{data.email}</td>
				<td>
					<button
						type='button'
						className={`${styles.icon} btn p-0`}
						data-toggle='tooltip'
						data-placement='top'
						title='Decline'
					>
						<i className={'fa fa-trash-o cursor-pointer text-white'}></i>
					</button>
					<button
						type='button'
						className={`${styles.icon} btn pr-2`}
						data-toggle='tooltip'
						data-placement='top'
						title='Approve'
					>
						<i className='fa fa-check-square-o cursor-pointer text-white'></i>
					</button>
				</td>
			</tr>
		));
		return (
			<div className='mt-4 table-responsive'>
				<table className='table table-hover table-dark'>
					<thead>
						<tr>
							<th scope='col'>S.No</th>
							<th scope='col'>First name</th>
							<th scope='col'>Last name</th>
							<th scope='col'>Email</th>
							<th scope='col'>Actions</th>
						</tr>
					</thead>
					<tbody>{examiners}</tbody>
				</table>
			</div>
		);
	}

	render() {
		return (
			<div className={`container pt-4`}>
				<div className='row'>
					<div className='col-md-4'>
						<div
							className={`card p-3 ${styles.approvedCard} cursor-pointer ${styles.iconHover}`}
						>
							<img
								alt='approved icon'
								src={require('../../../../assets/icons/approvedIcon.jpg')}
								width='65px'
								className='mx-auto'
							/>
							<h3 className='mb-0 text-center text-white font-weight-normal'>
								Approved
							</h3>
							<div className='d-flex justify-content-between mt-2'>
								<p
									className={`mb-0 font-weight-bold text-white ${styles.textStyle}`}
								>
									Total approved
								</p>
								<p className={`mb-0 text-white ${styles.textStyle}`}>
									120
								</p>
							</div>
						</div>
					</div>
					<div className='col-md-4'>
						<div
							className={`card p-3 ${styles.pendingCard} cursor-pointer ${styles.iconHover}`}
							onClick={() => this.handleCardClick('pending')}
						>
							<img
								alt='pending icon'
								src={require('../../../../assets/icons/pendingIcon.png')}
								width='65px'
								className='mx-auto'
							/>
							<h3 className='mb-0 text-center text-white font-weight-normal'>
								Pending
							</h3>
							<div className='d-flex justify-content-between mt-2'>
								<p
									className={`mb-0 font-weight-bold text-white ${styles.textStyle}`}
								>
									Total pending
								</p>
								<p className={`mb-0 text-white ${styles.textStyle}`}>
									25
								</p>
							</div>
						</div>
					</div>
					<div className='col-md-4'>
						<div
							className={`card p-3 ${styles.declinedCard} cursor-pointer ${styles.iconHover}`}
						>
							<img
								alt='declined icon'
								src={require('../../../../assets/icons/declinedIcon.jpg')}
								width='65px'
								className='mx-auto'
							/>
							<h3 className='mb-0 text-center text-white font-weight-normal'>
								Declined
							</h3>
							<div className='d-flex justify-content-between mt-2'>
								<p
									className={`mb-0 font-weight-bold text-white ${styles.textStyle}`}
								>
									Total declined
								</p>
								<p className={`mb-0 text-white ${styles.textStyle}`}>
									10
								</p>
							</div>
						</div>
					</div>
				</div>
				{this.state.tableData.length !== 0 ? <this.examinerData /> : null}
			</div>
		);
	}
}
export default ExaminerPanel;
