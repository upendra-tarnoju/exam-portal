import React, { Component } from 'react';
import styles from './examinerPanel.module.css';
import axios from 'axios';
import { connect } from 'react-redux';
import AdminModal from '../../../modal-component/modal';
import Alert from 'react-bootstrap/Alert';

class ExaminerPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableData: [],
			accountStatus: '',
			msg: '',
			pageIndex: 0,
			pageSize: 5,
			tableIndex: 0,
			maxSizeIndex: 5,
			showModal: false,
			fullName: '',
			modalData: { id: '', type: '', success: false },
		};
		this.examinerData = this.examinerData.bind(this);
		this.paginateExaminers = this.paginateExaminers.bind(this);
		this.changePageSize = this.changePageSize.bind(this);
		this.handleModal = this.handleModal.bind(this);
		this.handleAlert = this.handleAlert.bind(this);
	}

	handleModal(status) {
		this.setState({ showModal: status });
	}

	handleAlert(status, msg) {
		this.setState((prevState) => ({
			...prevState,
			msg: msg,
			modalData: {
				...prevState.modalData,
				success: status,
			},
		}));
	}

	approveOrDeclineExaminers(firstName, lastName, modalType, id) {
		this.setState({
			fullName: `${firstName} ${lastName}`,
			showModal: true,
			modalData: { id: id, type: modalType, success: false },
		});
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
				let maxIndex;
				if (this.props.examinerCount[type] < this.state.maxSizeIndex) {
					maxIndex = this.props.examinerCount[type];
				} else maxIndex = this.state.maxSizeIndex;
				this.setState({
					tableData: res.data.examiner,
					accountStatus: type,
					msg: res.data.msg,
					maxSizeIndex: maxIndex,
				});
			});
	}

	paginateExaminers(examinerType, paginateType) {
		let pageIndex = this.state.pageIndex;
		let pageSize = this.state.pageSize;
		if (paginateType === 'inc') pageIndex = pageIndex + 1;
		else pageIndex = pageIndex - 1;
		let maxSizeIndex = (pageIndex + 1) * pageSize;
		if (maxSizeIndex > this.props.examinerCount.pending)
			maxSizeIndex = this.props.examinerCount.pending;
		if (
			pageIndex >= 0 &&
			(this.state.maxSizeIndex !== this.props.examinerCount.pending ||
				maxSizeIndex !== this.props.examinerCount.pending)
		) {
			this.setState(
				{
					pageIndex: pageIndex,
					tableIndex: pageIndex * pageSize,
					maxSizeIndex: maxSizeIndex,
				},
				() => {
					this.handleCardClick(examinerType);
				}
			);
		}
	}

	changePageSize(event) {
		let newPageSize = event.target.value;
		this.setState(
			{ pageSize: newPageSize, pageIndex: 0, maxSizeIndex: 10 },
			() => {
				this.handleCardClick('pending');
			}
		);
	}

	examinerData() {
		let examiners = this.state.tableData.map((data, index) => (
			<tr key={data._id}>
				<th scope='row'>{this.state.tableIndex + index + 1}</th>
				<td>{data.firstName}</td>
				<td>{data.lastName}</td>
				<td>{data.email}</td>
				<td>
					{this.state.accountStatus === 'pending' ||
					this.state.accountStatus === 'approved' ? (
						<button
							type='button'
							className={`${styles.icon} btn p-0`}
							data-toggle='tooltip'
							data-placement='top'
							title='Decline'
							onClick={() => {
								this.approveOrDeclineExaminers(
									data.firstName,
									data.lastName,
									'decline',
									data._id
								);
							}}
						>
							<i
								className={'fa fa-trash-o cursor-pointer text-white'}
							></i>
						</button>
					) : null}
					{this.state.accountStatus === 'pending' ||
					this.state.accountStatus === 'declined' ? (
						<button
							type='button'
							className={`${styles.icon} btn pr-2`}
							data-toggle='tooltip'
							data-placement='top'
							title='Approve'
							onClick={() =>
								this.approveOrDeclineExaminers(
									data.firstName,
									data.lastName,
									'approve',
									data._id
								)
							}
						>
							<i className='fa fa-check-square-o cursor-pointer text-white'></i>
						</button>
					) : null}
				</td>
			</tr>
		));
		return (
			<div className='mt-4 table-responsive'>
				<Alert
					variant='success'
					show={this.state.modalData.success}
					onClose={() => this.handleAlert(false, this.state.msg)}
					dismissible
					animation='false'
				>
					{this.state.msg}
				</Alert>
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
						onChange={this.changePageSize}
						value={this.state.pageSize}
						className={`form-control form-control-sm ${styles.dropdown} mr-3`}
					>
						<option>5</option>
						<option>10</option>
						<option>15</option>
					</select>
					<span className='align-self-center mr-3'>
						{this.state.tableIndex + 1}- {this.state.maxSizeIndex} of{' '}
						{this.props.examinerCount[this.state.accountStatus]}
					</span>
					<i
						onClick={() => this.paginateExaminers('pending', 'dec')}
						className='fa fa-2x fa-angle-left align-self-center mr-3 cursor-pointer'
					></i>
					<i
						onClick={() => this.paginateExaminers('pending', 'inc')}
						className='fa fa-2x fa-angle-right align-self-center cursor-pointer'
					></i>
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
				<AdminModal
					name={this.state.fullName}
					show={this.state.showModal}
					closeModal={this.handleModal}
					openAlert={this.handleAlert}
					modalData={this.state.modalData}
				/>
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
