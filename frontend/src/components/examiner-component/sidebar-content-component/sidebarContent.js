import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';

import Courses from './courses-component/courses';
import Exam from './exam-component/exam';
import * as ActionType from '../../../action';
import EditExam from './exam-component/edit-exam-component/editExam';
import Questions from './questions-component/questions';
import ViewQuestions from './questions-component/view-questions-component/viewQuestions';
import Students from './students-component/students';
import ViewStudent from './students-component/view-student-component/viewStudent';

class SidebarContent extends Component {
	constructor(props) {
		super(props);
		this.handleSidebar = this.handleSidebar.bind(this);
	}

	handleSidebar() {
		let toggle = this.props.toggle;
		this.props.setSidebar(!toggle);
	}

	render() {
		return (
			<div id='page-content-wrapper'>
				<nav className='navbar navbar-expand-lg navbar-light bg-dark border-bottom justify-content-start'>
					<button
						type='button'
						className='btn btn-primary'
						onClick={this.handleSidebar}
					>
						<i className='fa fa-bars'></i>
					</button>
					<span className='ml-2 text-white'>
						{this.props.panelHeading}
					</span>
				</nav>
				<Switch>
					<Route exact path='/examiner/exam' component={Exam}></Route>
					<Route
						exact
						path='/examiner/exam/:examId'
						component={EditExam}
					></Route>
					<Route path='/examiner/course' component={Courses}></Route>
					<Route
						path='/examiner/exam/:examId/question/:questionId'
						component={Questions}
					></Route>
					<Route
						path='/examiner/exam/:examId/question/new'
						component={Questions}
					></Route>
					<Route
						path='/examiner/exam/:examId/questions'
						component={ViewQuestions}
					></Route>
					<Route
						path='/examiner/students/:studentId'
						component={ViewStudent}
					/>
					<Route path='/examiner/students' component={Students}></Route>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		panelHeading: state.examinerReducer.examinerHeading,
		toggle: state.adminReducer.sidebarToggle,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSidebar: (toggle) => {
			dispatch({
				type: ActionType.COLLAPSE_SIDEBAR,
				toggle: toggle,
			});
		},
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SidebarContent)
);
