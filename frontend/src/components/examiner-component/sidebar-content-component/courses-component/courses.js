import React, { Component } from 'react';
import styles from './courses.module.css';
import CreateCourses from './createCourses';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import cookie from 'js-cookie';

class Courses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			create: false,
			alert: false,
			msg: '',
			courses: [],
			pageIndex: 0,
			pageSize: 5,
			maxSizeIndex: 5,
			tableIndex: 0,
			totalCount: 0,
		};
		this.changePageSize = this.changePageSize.bind(this);
	}

	handleCreate = (status) => {
		this.setState({
			create: status,
		});
	};

	handleAlert = (status, msg) => {
		this.setState({
			alert: status,
			msg: msg,
		});
	};

	viewCourses() {
		let token = cookie.get('token');
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/api/examiner/course`,
			params: {
				pageIndex: this.state.pageIndex,
				pageSize: this.state.pageSize,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			let maxIndex;
			if (response.data.totalCourses < this.state.maxSizeIndex)
				maxIndex = response.data.totalCourses;
			else maxIndex = this.state.maxSizeIndex;
			this.setState({
				courses: response.data.courses,
				maxSizeIndex: maxIndex,
				totalCount: response.data.totalCourses,
			});
		});
	}

	componentDidMount() {
		this.viewCourses();
	}

	changePageSize(event) {
		let newPageSize = event.target.value;
		this.setState({ pageIndex: 0, pageSize: newPageSize }, () => {
			this.viewCourses();
		});
	}

	paginateCourses(paginateType) {
		let pageIndex = this.state.pageIndex;
		let pageSize = this.state.pageSize;
		if (paginateType === 'inc') pageIndex = pageIndex + 1;
		else pageIndex = pageIndex - 1;
		let maxSizeIndex = (pageIndex + 1) * pageSize;
		if (maxSizeIndex > this.state.totalCount) {
			maxSizeIndex = this.state.totalCount;
		}

		if (
			pageIndex >= 0 &&
			(this.state.maxSizeIndex !== this.state.totalCount ||
				maxSizeIndex !== this.state.totalCount)
		) {
			this.setState(
				{
					pageIndex: pageIndex,
					tableIndex: pageIndex * pageSize,
					maxSizeIndex: maxSizeIndex,
				},
				() => {
					this.viewCourses();
				}
			);
		}
	}

	render() {
		let courses = this.state.courses.map((data, index) => (
			<tr key={data._id}>
				<th scope='row'>{this.state.tableIndex + index + 1}</th>
				<td>{data.name}</td>
				<td>{data.description}</td>
				<td>
					<button
						data-toggle='tooltip'
						data-placement='top'
						title='Edit'
						type='button'
						className='btn p-0'
					>
						<i
							className={
								'fa fa-pencil-square-o cursor-pointer text-white'
							}
						></i>
					</button>{' '}
					<button
						type='button'
						data-toggle='tooltip'
						data-placement='top'
						title='Delete'
						className='btn p-0'
					>
						<i className={'fa fa-trash-o cursor-pointer text-white'}></i>
					</button>
				</td>
			</tr>
		));

		return (
			<div className='container'>
				<div className='d-flex justify-content-end py-4'>
					<button
						type='button'
						className='btn btn-primary'
						onClick={() => this.handleCreate(true)}
					>
						Create
					</button>
				</div>
				<Alert
					variant='success'
					show={this.state.alert}
					onClose={() => this.handleAlert(false, '')}
					dismissible
					animation='false'
				>
					{this.state.msg}
				</Alert>
				<div className={`text-center ${styles.heading} mb-2`}>Courses</div>
				{this.state.courses.length === 0 ? (
					<p className='mb-0'>No course existed. Create a new one </p>
				) : (
					<div className='table-responsive'>
						<table className='table table-hover table-dark mb-0'>
							<thead>
								<tr>
									<th scope='col'>S.No</th>
									<th scope='col'>Name</th>
									<th scope='col'>Description</th>
									<th scope='col'>Actions</th>
								</tr>
							</thead>
							{courses}
						</table>
						<div className='py-2 px-1 bg-light d-flex justify-content-end'>
							<span className='align-self-center mr-3'>
								Item per page
							</span>
							<select
								onChange={this.changePageSize}
								value={this.state.pageSize}
								className={`form-control ${styles.selectWidth} form-control-sm mr-3`}
							>
								<option>5</option>
								<option>10</option>
								<option>15</option>
							</select>
							<span className='align-self-center mr-3'>
								{this.state.tableIndex + 1} - {this.state.maxSizeIndex}{' '}
								of {this.state.totalCount}
							</span>
							<i
								onClick={() => this.paginateCourses('dec')}
								className='fa fa-2x fa-angle-left align-self-center mr-3 cursor-pointer'
							></i>
							<i
								onClick={() => this.paginateCourses('inc')}
								className='fa fa-2x fa-angle-right align-self-center cursor-pointer'
							></i>
						</div>
					</div>
				)}
				<CreateCourses
					show={this.state.create}
					closeModal={this.handleCreate}
					handleAlert={this.handleAlert}
				/>
			</div>
		);
	}
}

export default Courses;
