import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExamService from '../../../../../services/examApi';
import * as ActionTypes from '../../../../../action';
import ExamPeriodForm from '../../../../../forms/examPeriodForm';

class ExamPeriod extends Component {
	constructor(props) {
		super(props);
		this.examService = new ExamService();
	}

	handleSubmit = (values) => {
		this.examService
			.saveExamDetails(this.props.fieldDetails, values)
			.then((response) => {
				let exams = this.props.examsList;
				exams.push(response.data);
				this.props.setExamList(exams);
				this.props.handleInputs('nextInputs', false);
				this.props.handleInputs('createExam', false);
				this.props.handleSnackBar(true);
			});
	};

	render() {
		return (
			<div className='card-body'>
				<ExamPeriodForm handleSubmit={this.handleSubmit} />
			</div>
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
