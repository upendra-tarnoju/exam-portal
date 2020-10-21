import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';

import Courses from './courses-component/courses';
import Exam from './exam-component/exam';
import * as ActionType from '../../../action';
import EditExam from './exam-component/edit-exam-component/editExam';
import Questions from './questions-component/questions';
import ViewQuestions from './questions-component/view-questions-component/viewQuestions';
import Students from './students-component/students';
import ViewStudents from './students-component/view-student-component/viewStudents';
import CreateStudent from './students-component/create-student-component/createStudent';

const SidebarContent = (props) => {
	let handleSidebar = () => {
		let toggle = props.toggle;
		props.setSidebar(!toggle);
	};

	return (
		<div id='page-content-wrapper'>
			<nav className='navbar navbar-expand-lg navbar-light bg-dark border-bottom justify-content-between'>
				<button
					type='button'
					className='btn btn-primary'
					onClick={handleSidebar}
				>
					<i className='fa fa-bars'></i>
				</button>
				<div>
					<img
						src='https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png'
						height='45px'
						alt='pic'
						className='mr-2'
					/>
					<span className='text-white'>Hie, {props.name}</span>
				</div>
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
					path='/examiner/exam/:examId/students/new'
					component={CreateStudent}
				/>
				<Route
					path='/examiner/exam/:examId/students'
					component={ViewStudents}
				/>
				<Route path='/examiner/students' component={Students} />
			</Switch>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		panelHeading: state.examinerReducer.examinerHeading,
		toggle: state.adminReducer.sidebarToggle,
		name: state.adminReducer.name,
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
