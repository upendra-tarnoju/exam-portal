import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionTypes from '../../../../action';
import validate from '../../../../services/validation';

class ExamDetails extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange = (event) => {
		let key = event.target.name;
		let value = event.target.value;
		this.props.setFieldsValues(key, value);
	};

	handleSubmit(event) {
		event.preventDefault();
		let validation = validate.examDetailFields(this.props.fieldDetails);
		if (validation.error) {
			this.props.handleInputs(true);
		}
		this.props.setFieldsErrors(validation.tempState.errors);
	}

	render() {
		let errors = this.props.fieldDetails.errors;
		let options = this.props.courseList.map((course) => (
			<option key={course._id}>
				{course.name} ( {course.description} )
			</option>
		));
		return (
			<div>
				<div className='card-body'>
					<label className='w-100'>
						Subject{' '}
						{errors.subject ? (
							<span className='text-danger'>{errors.subject}</span>
						) : null}
					</label>
					<input
						name='subject'
						type='text'
						className='w-100 px-3 py-2 mb-2'
						onChange={this.handleChange}
						value={this.props.fieldDetails.subject}
					></input>

					<label className='w-100'>
						Course{' '}
						{errors.course ? (
							<span className='text-danger'>{errors.course}</span>
						) : null}
					</label>
					<select
						className='w-100 px-3 py-2 mb-2'
						name='course'
						value={this.props.fieldDetails.course}
						onChange={this.handleChange}
					>
						<option>Select course</option>
						{options}
					</select>

					<label className='w-100'>
						Exam code{' '}
						{errors.examCode ? (
							<span className='text-danger'>{errors.examCode}</span>
						) : null}
					</label>
					<input
						type='text'
						className='w-100 px-3 py-2 mb-2'
						name='examCode'
						onChange={this.handleChange}
						value={this.props.fieldDetails.examCode}
					></input>

					<label className='w-100'>
						Exam password{' '}
						{errors.password ? (
							<span className='text-danger'>{errors.password}</span>
						) : null}
					</label>
					<input
						name='password'
						onChange={this.handleChange}
						value={this.props.fieldDetails.password}
						type='password'
						className='w-100 px-3 py-2 mb-2'
					></input>
				</div>
				<div className='card-footer bg-white d-flex justify-content-end'>
					<button
						type='submit'
						className='btn btn-primary'
						onClick={this.handleSubmit}
					>
						Next
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		fieldDetails: state.examReducer.examDetails,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setFieldsValues: (key, value) => {
			dispatch({
				type: ActionTypes.SET_EXAM_DETAILS,
				key: key,
				value: value,
			});
		},
		setFieldsErrors: (errors) => {
			dispatch({
				type: ActionTypes.SET_EXAM_DETAILS_ERRORS,
				errors: errors,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamDetails);
