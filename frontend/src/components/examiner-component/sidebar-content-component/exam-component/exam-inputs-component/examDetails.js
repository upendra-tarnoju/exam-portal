import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';

import * as ActionTypes from '../../../../../action';
import validate from '../../../../../services/validation';
import ExaminerService from '../../../../../services/examinerApi';

class ExamDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courseName: '',
			selected: [],
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.examinerService = new ExaminerService();
	}
	handleChange = (event) => {
		let key = event.target.name;
		let value = event.target.value;
		let index = event.target.selectedIndex;
		if (key === 'course') {
			this.props.setFieldsValues(key, this.props.courses[index - 1]._id);
			this.setState({
				courseName: value,
			});
		} else {
			this.props.setFieldsValues(key, value);
		}
	};

	handleSubmit(event) {
		event.preventDefault();
		let validation = validate.examDetailFields(this.props.fieldDetails);
		if (!validation.error) {
			this.props.handleInputs('nextInputs', true);
		}
		this.props.setFieldsErrors(validation.tempState.errors);
	}

	componentDidMount() {
		let state = {};
		this.examinerService.viewCourses(state).then((res) => {
			res.data = res.data.map((data) => {
				return {
					name: data.name,
					description: data.description,
					id: data._id,
				};
			});
			this.props.setCourses(res.data);
			this.setState({ selected: [res.data[0]] });
		});
	}

	filterByCallback = (option, data) => {
		let text = data.text;
		return (
			option.description.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
			option.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
		);
	};

	handleTypeAHeadChange = (selected) => {
		this.setState({ selected });
		this.props.setFieldsValues('course', selected.id);
	};

	render() {
		let errors = this.props.fieldDetails.errors;

		return (
			<form onSubmit={this.handleSubmit}>
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
						className='form-control'
						onChange={this.handleChange}
						value={this.props.fieldDetails.subject}
					></input>
					<label className='w-100'>
						Course{' '}
						{errors.course ? (
							<span className='text-danger'>{errors.course}</span>
						) : null}
					</label>
					<Typeahead
						id='typeahead'
						filterBy={this.filterByCallback}
						defaultSelected={this.state.selected}
						onChange={(selected) => this.handleTypeAHeadChange(selected)}
						options={this.props.courses}
						highlightOnlyResult={true}
						labelKey='name'
						renderMenuItemChildren={(option) => (
							<div>
								<div id={option.id}>
									{option.name} ( {option.description} )
								</div>
							</div>
						)}
					/>
					<label className='w-100'>
						Exam code{' '}
						{errors.examCode ? (
							<span className='text-danger'>{errors.examCode}</span>
						) : null}
					</label>
					<input
						type='text'
						className='form-control'
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
						className='form-control'
					></input>
				</div>
				<div className='card-footer bg-white d-flex justify-content-end'>
					<button type='submit' className='btn btn-primary'>
						Next
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
		setCourses: (courses) => {
			dispatch({
				type: ActionTypes.SET_COURSES,
				courses: courses,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamDetails);
