import React, { Component } from 'react';
import styles from './courses.module.css';
import CreateCourses from './createCourses';
import Alert from 'react-bootstrap/Alert';

class Courses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			create: false,
			alert: false,
			msg: '',
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

	render() {
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
						<p className='mb-0'>No course existed. Create a new one </p>
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
