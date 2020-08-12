import React, { Component } from 'react';
import styles from './examinerPanel.module.css';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';

class ExaminerPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableData: [],
			accountStatus: '',
			msg: '',
		};
		this.examinerData = this.examinerData.bind(this);
		this.paginatorList = [
			{ key: 100, value: 5, text: '05' },
			{ key: 101, value: 10, text: '10' },
			{ key: 102, value: 15, text: '15' },
		];
	}

	handleCardClick(type) {
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/api/admin/examiner`, {
				params: { type: type },
			})
			.then((res) => {
				let newState = {};
				if (res.data.examiner.length !== 0) {
					newState = {
						tableData: res.data.examiner,
						accountStatus: type,
					};
				} else {
					newState = {
						msg: res.data.msg,
					};
				}

				this.setState(newState);
			});
	}

	examinerData() {
		let examiners = this.state.tableData.map((data, index) => (
			<tr key={data._id}>
				<th scope='row'>{index + 1}</th>
				<td>{data.firstName}</td>
				<td>{data.lastName}</td>
				<td>{data.email}</td>
				{this.state.accountStatus === 'pending' ? (
					<td>
						<button
							type='button'
							className={`${styles.icon} btn p-0`}
							data-toggle='tooltip'
							data-placement='top'
							title='Decline'
						>
							<i
								className={'fa fa-trash-o cursor-pointer text-white'}
							></i>
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
				) : null}
			</tr>
		));
		return (
			<div className='mt-4 table-responsive'>
				<table className='table table-hover table-dark mb-0'>
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
				<div className='py-2 px-1 bg-light d-flex justify-content-end'>
					<Dropdown
						className={`${styles.dropdown} mr-2`}
						placeholder='Items per page'
						fluid
						selection
						options={this.paginatorList}
					/>
					<span className='align-self-center mr-3'>1-10 of 100</span>
					<i className='fa fa-2x fa-angle-left align-self-center mr-3'></i>
					<i className='fa fa-2x fa-angle-right align-self-center'></i>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className={`container pt-4`}>
				<div className='row'>
					<div className='col-md-4'>
						<div
							onClick={() => this.handleCardClick('approved')}
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
									{this.state.tableData.length}
								</p>
							</div>
						</div>
					</div>
					<div className='col-md-4'>
						<div
							className={`card p-3 ${styles.declinedCard} cursor-pointer ${styles.iconHover}`}
							onClick={() => this.handleCardClick('declined')}
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
				{this.state.tableData.length !== 0 ? (
					<this.examinerData />
				) : (
					<h3 className='pt-4 font-weight-normal text-center'>
						{this.state.msg}
					</h3>
				)}
			</div>
		);
	}
}
export default ExaminerPanel;
