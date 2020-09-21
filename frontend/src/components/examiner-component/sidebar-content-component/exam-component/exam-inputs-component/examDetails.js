import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import ExamDetailForm from '../../../../../forms/examDetailsForm';
import * as ActionTypes from '../../../../../action';
import CourseService from '../../../../../services/courseApi';

class ExamDetails extends Component {
	constructor(props) {
		super(props);
		this.courseService = new CourseService();
	}

	componentDidMount() {
		let state = {};
		this.courseService.viewCourses(state).then((res) => {
			res.data = res.data.map((data) => {
				return {
					name: data.name,
					description: data.description,
					id: data._id,
				};
			});
			this.props.setCourses(res.data);
		});
	}

	render() {
		return (
			<div className='card-body'>
				<ExamDetailForm handleInputs={this.props.handleInputs} />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setFieldsValues: (key, value) => {
			dispatch({
				type: ActionTypes.SET_EXAM_DETAILS,
				key: key,
				value: value,
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

export default connect(null, mapDispatchToProps)(ExamDetails);
