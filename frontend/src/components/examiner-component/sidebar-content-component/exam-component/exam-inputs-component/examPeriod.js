import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExamService from '../../../../../services/examApi';
import ExamPeriodForm from '../../../../../forms/examPeriodForm';
import * as ActionTypes from '../../../../../action';

class ExamPeriod extends Component {
	constructor(props) {
		super(props);
		this.examService = new ExamService();
	}

	handleSubmit = (values) => {
		this.examService
			.saveExamDetails(this.props.fieldDetails, values)
			.then((response) => {
				let msg = 'Exam added successfully';
				this.props.clearExamInputs();
				this.props.handleSnackBar(true, msg);
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
		clearExamInputs: () => {
			dispatch({
				type: ActionTypes.CLEAR_EXAM_DETAILS_FIELDS,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamPeriod);
