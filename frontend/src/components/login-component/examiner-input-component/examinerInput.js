import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

class ExaminerInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collegeName: {
				value: '',
				error: '',
			},
			department: {
				value: '',
				error: '',
			},
			designation: {
				value: '',
				error: '',
			},
			error: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: {
				...this.state[event.target.name],
				value: event.target.value,
			},
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		let token = cookie.get('token');
		let validationState = this.validateInput();
		if (!validationState) {
			axios({
				method: 'patch',
				url: `${process.env.REACT_APP_BASE_URL}/api/examiner`,
				data: {
					institution: this.state.collegeName.value,
					department: this.state.department.value,
					designation: this.state.designation.value,
				},
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				this.props.history.push('/examiner');
			});
		}
	};

	validateInput() {
		let error = false;
		let tempState = this.state;
		if (tempState.collegeName.value === '') {
			tempState.collegeName.error = '* Required';
			error = true;
		}
		if (tempState.department.value === '') {
			tempState.department.error = '* Required';
			error = true;
		}
		if (tempState.designation.value === '') {
			tempState.designation.error = '* Required';
			error = true;
		}
		this.setState(tempState);
		return error;
	}

	render() {
		return (
			<div>
				<h3 className='bg-white text-center'>Enter details</h3>
				<form className='px-3 pb-4' onSubmit={this.handleSubmit}>
					<label className='w-100 text-left'>
						College name{' '}
						{this.state.collegeName.error ? (
							<span className='text-danger'>
								{this.state.collegeName.error}
							</span>
						) : null}
					</label>
					<input
						type='text'
						name='collegeName'
						className='w-100 px-3 py-2 mb-2'
						value={this.state.collegeName.value}
						onChange={this.handleChange}
					/>
					<label className='w-100 text-left'>
						Department{' '}
						{this.state.designation.error ? (
							<span className='text-danger'>
								{this.state.department.error}
							</span>
						) : null}
					</label>
					<input
						type='text'
						className='w-100 px-3 py-2 mb-2'
						name='department'
						value={this.state.department.value}
						onChange={this.handleChange}
					/>
					<label className='w-100 text-left'>
						Designation{' '}
						{this.state.designation.error ? (
							<span className='text-danger'>
								{this.state.designation.error}
							</span>
						) : null}
					</label>
					<input
						type='text'
						className='w-100 px-3 py-2'
						name='designation'
						value={this.state.designation.value}
						onChange={this.handleChange}
					/>
					<button
						type='submit'
						className='btn btn-primary float-right mt-4'
					>
						Save
					</button>
				</form>
			</div>
		);
	}
}

export default ExaminerInput;
