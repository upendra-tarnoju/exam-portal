import React, { Component } from 'react';
import validateInputs from '../../services/validation';
import ExaminerService from '../../services/examinerApi';

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
		this.examinerService = new ExaminerService();
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
		let validationState = validateInputs(this.state, 'login');
		if (!validationState) {
			this.examinerService.saveExaminerDetails(this.state).then((res) => {
				this.props.history.push('/examiner');
			});
		}
	};

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
