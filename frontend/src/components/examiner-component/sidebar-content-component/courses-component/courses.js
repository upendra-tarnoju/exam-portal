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
		};
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

	componentDidMount() {
		let token = cookie.get('token');
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/api/examiner/course`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			this.setState({ courses: response.data.courses });
		});
	}

	render() {
		let courses = this.state.courses.map((data, index) => (
			<tr key={data._id}>
				<th scope='row'>index</th>
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
				<div className='card'>
					<div className={`card-header text-center ${styles.heading}`}>
						Courses
					</div>
					<div className='card-body'>
						{this.state.courses.length === 0 ? (
							<p className='mb-0'>
								No course existed. Create a new one{' '}
							</p>
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
							</div>
						)}
					</div>
				</div>
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
