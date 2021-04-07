import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Courses from './courses-component/courses';
import Exam from './exam-component/exam';
import EditExam from './exam-component/edit-exam-component/editExam';
import Questions from './questions-component/questions';
import ViewQuestions from './questions-component/view-questions-component/viewQuestions';
import Students from './students-component/students';
import ViewStudents from './students-component/view-student-component/viewStudents';
import CreateStudent from './students-component/create-student-component/createStudent';
import Settings from './settings-component/settings';

const SidebarContent = (props) => {
	return (
		<Switch>
			<Route exact path='/examiner/exam' component={Exam}></Route>
			<Route exact path='/examiner/exam/:examId' component={EditExam}></Route>
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
			<Route path='/examiner/exam/:examId/students' component={ViewStudents} />
			<Route path='/examiner/setting' component={Settings} />
			<Route path='/examiner/students' component={Students} />
		</Switch>
	);
};

export default SidebarContent;
