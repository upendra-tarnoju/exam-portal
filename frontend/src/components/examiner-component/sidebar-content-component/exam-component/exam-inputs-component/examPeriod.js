import React, { Component } from 'react';
import { connect } from 'react-redux';

import validate from '../../../../../services/validation';
import ExamService from '../../../../../services/examApi';
import * as ActionTypes from '../../../../../action';

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
		this.examService = new ExamService();
	}

	handleSubmit(event) {
		event.preventDefault();
		let validation = validate.examDurationFields(this.state);
		if (!validation.error) {
			this.examService
				.saveExamDetails(this.props.fieldDetails, this.state)
				.then((response) => {
					let exams = this.props.examsList;
					exams.push(response.data);
					this.props.setExamList(exams);
					this.props.handleInputs('nextInputs', false);
					this.props.handleInputs('createExam', false);
				});
		}

		this.setState(validation.tempState);
	}

	componentDidMount() {
		let curr = new Date();
		this.setState({
			examDate: `${curr.getFullYear()}-${('0' + (curr.getMonth() + 1)).slice(
				-2
			)}-${('0' + curr.getDate()).slice(-2)}`,
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
			<form onSubmit={this.handleSubmit}>
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
						className='form-control'
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
						className='form-control'
					></input>
					<div className='row'>
						<div className='col-md-4'>
							<label>Exam date</label>
							<input
								name='examDate'
								type='date'
								className='form-control'
								onChange={this.handleChange}
								value={this.state.examDate}
							></input>
						</div>
						<div className='col-md-4'>
							<label>Start time</label>
							<input
								name='startTime'
								type='time'
								className='form-control'
								onChange={this.handleChange}
								value={this.state.startTime}
							></input>
						</div>
						<div className='col-md-4'>
							<label>End time</label>
							<input
								name='endTime'
								type='time'
								className='form-control'
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
								className='form-control'
							></input>
						</div>
					) : null}
				</div>
				<div className='card-footer bg-white d-flex justify-content-end'>
					<button
						type='button'
						className='btn btn-primary mr-2'
						onClick={() => this.props.handleInputs('nextInputs', false)}
					>
						Back
					</button>
					<button type='submit' className='btn btn-success'>
						Create
					</button>
				</div>
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		fieldDetails: state.examReducer.examDetails,
		courses: state.examinerReducer.courses,
		examsList: state.examReducer.examsList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setExamList: (examList) => {
			dispatch({
				type: ActionTypes.SET_EXAM_LIST,
				examList: examList,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamPeriod);
