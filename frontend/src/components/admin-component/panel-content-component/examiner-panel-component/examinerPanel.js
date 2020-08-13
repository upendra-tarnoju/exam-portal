import React, { Component } from 'react';
import styles from './examinerPanel.module.css';
import axios from 'axios';
import { connect } from 'react-redux';

class ExaminerPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableData: [],
			accountStatus: '',
			msg: '',
			pageIndex: 0,
			pageSize: 5,
		};
		this.examinerData = this.examinerData.bind(this);
	}

	handleCardClick(type) {
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/api/admin/examiner`, {
				params: {
					type: type,
					pageIndex: this.state.pageIndex,
					pageSize: this.state.pageSize,
				},
			})
			.then((res) => {
				this.setState({
					tableData: res.data.examiner,
					accountStatus: type,
					msg: res.data.msg,
				});
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
					<span className='align-self-center mr-3'>Items per page</span>
					<select
						className={`form-control form-control-sm ${styles.dropdown} mr-3`}
					>
						<option>5</option>
						<option>10</option>
						<option>15</option>
					</select>
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
									{this.props.examinerCount.approved}
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
									{this.props.examinerCount.pending}
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
									{this.props.examinerCount.declined}
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

const mapStateToProps = (state) => {
	return {
		examinerCount: state.adminReducer.examinerCount,
	};
};
export default connect(mapStateToProps, null)(ExaminerPanel);
