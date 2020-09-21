import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import ExamDetailForm from '../../../../../forms/examDetailsForm';
import * as ActionTypes from '../../../../../action';
import CourseService from '../../../../../services/courseApi';

class ExamDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courseName: '',
			selected: [],
		};
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
			this.setState({ selected: [res.data[0]] });
		});
	}

	handleTypeAHeadChange = (selected) => {
		this.setState({ selected });
		this.props.setFieldsValues('course', selected[0].id);
	};

	render() {
		return (
			<div className='card-body'>
				<ExamDetailForm
					filterByCallback={this.filterByCallback}
					selected={this.state.selected}
					handleTypeAHeadChange={this.handleTypeAHeadChange}
				/>
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
