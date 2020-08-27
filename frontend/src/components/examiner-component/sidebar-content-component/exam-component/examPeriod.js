import React, { Component } from 'react';
import { connect } from 'react-redux';
import validate from '../../../../services/validation';
import ExaminerService from '../../../../services/examinerApi';

class ExamPeriod extends Component {
	constructor(props) {
		super(props);
		this.state = {
			totalMarks: '',
			passingMarks: '',
			examDate: '',
			startTime: '',
			endTime: '',
			duration: '',
			errors: {
				totalMarks: '',
				passingMarks: '',
				examDate: '',
				startTime: '',
				endTime: '',
				duration: '',
			},
			hideDuration: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCheckBox = this.handleCheckBox.bind(this);
		this.examinerService = new ExaminerService();
	}

	handleSubmit(event) {
		event.preventDefault();
		let validation = validate.examDurationFields(this.state);
		if (!validation.error) {
			this.examinerService
				.saveExamDetails(this.props.fieldDetails, this.state)
				.then((response) => {
					this.props.handleInputs(false);
				});
		}

		this.setState(validation.tempState);
	}

	componentDidMount() {
		let curr = new Date();
		this.setState({
			examDate: `${curr.getFullYear()}-${('0' + (curr.getMonth() + 1)).slice(
				-2
			)}-${curr.getDate()}`,
			startTime: `${('0' + curr.getHours()).slice(-2)}:${(
				'0' + curr.getMinutes()
			).slice(-2)}`,
			endTime: `${('0' + (curr.getHours() + 3)).slice(-2)}:${(
				'0' + curr.getMinutes()
			).slice(-2)}`,
		});
	}

	handleChange(event) {
		let key = event.target.name;
		let value = event.target.value;
		if (
			key === 'totalMarks' ||
			key === 'passingMarks' ||
			key === 'duration'
		) {
			let letters = /^[0-9\b]+$/;
			if (letters.test(value) || value === '') {
				this.setState({ [key]: value });
			}
		}
		this.setState({ [key]: value });
	}

	handleCheckBox(event) {
		let value = event.target.checked;
		this.setState({
			hideDuration: value,
		});
	}

	render() {
		let errors = this.state.errors;
		return (
			<div>
				<div className='card-body'>
					<label className='w-100'>
						Total marks{' '}
						{errors.totalMarks ? (
							<span className='text-danger'>{errors.totalMarks}</span>
						) : null}
					</label>
					<input
						name='totalMarks'
						onChange={this.handleChange}
						value={this.state.totalMarks}
						maxLength={4}
						type='text'
						className='w-100 px-3 py-2 mb-2'
					></input>

					<label className='w-100'>
						Passing marks{' '}
						{errors.passingMarks ? (
							<span className='text-danger'>{errors.passingMarks}</span>
						) : null}
					</label>
					<input
						name='passingMarks'
						onChange={this.handleChange}
						value={this.state.passingMarks}
						type='text'
						maxLength={4}
						className='w-100 px-3 py-2 mb-2'
					></input>

					<div className='d-flex justify-content-between'>
						<div className='flex-column mr-2'>
							<label>Exam date</label>
							<input
								name='examDate'
								type='date'
								className='w-100 px-3 py-2 mb-2'
								onChange={this.handleChange}
								value={this.state.examDate}
							></input>
						</div>
						<div className='flex-column mr-2'>
							<label>Start time</label>
							<input
								name='startTime'
								type='time'
								className='w-100 px-3 py-2 mb-2'
								onChange={this.handleChange}
								value={this.state.startTime}
							></input>
						</div>
						<div className='flex-column'>
							<label>End time</label>
							<input
								name='endTime'
								type='time'
								className='w-100 px-3 py-2 mb-2'
								onChange={this.handleChange}
								value={this.state.endTime}
							></input>
						</div>
					</div>
					{errors.examDate ? (
						<label className='w-100'>
							<span className='text-danger'>{errors.examDate}</span>
						</label>
					) : null}
					{errors.startTime ? (
						<label className='w-100'>
							<span className='text-danger'>{errors.startTime}</span>
						</label>
					) : null}
					{errors.endTime ? (
						<label className='w-100'>
							<span className='text-danger'>{errors.endTime}</span>
						</label>
					) : null}
					<div className='d-flex'>
						<input
							type='checkbox'
							name='checkbox'
							className='align-self-center mr-2'
							onChange={this.handleCheckBox}
						/>
						<span className='font-weight-bold'>
							Do you want to have exam duration to be same as difference
							between start time and end time ?
						</span>
					</div>
					{!this.state.hideDuration ? (
						<div>
							{' '}
							<label className='w-100'>
								Exam duration{' '}
								{errors.duration ? (
									<span className='text-danger'>
										{errors.duration}
									</span>
								) : null}
							</label>
							<input
								name='duration'
								onChange={this.handleChange}
								value={this.state.duration}
								type='text'
								maxLength={4}
								className='w-100 px-3 py-2 mb-2'
							></input>
						</div>
					) : null}
				</div>
				<div className='card-footer bg-white d-flex justify-content-end'>
					<button
						type='button'
						className='btn btn-primary mr-2'
						onClick={() => this.props.handleInputs(false)}
					>
						Back
					</button>
					<button
						type='button'
						className='btn btn-success'
						onClick={this.handleSubmit}
					>
						Create
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		fieldDetails: state.examReducer.examDetails,
		courses: state.examinerReducer.courses,
	};
};

export default connect(mapStateToProps)(ExamPeriod);
