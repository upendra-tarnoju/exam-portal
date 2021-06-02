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
import CreateExam from './exam-component/create-exam-component/createExam';
import EditQuestion from './questions-component/edit-question-component/editQuestion';
import AssignExam from './students-component/assign-exam-component/assignExam';

const SidebarContent = (props) => {
	return (
		<Switch>
			<Route exact path='/examiner/exam' component={Exam}></Route>
			<Route path='/examiner/exam/new' component={CreateExam}></Route>
			<Route exact path='/examiner/exam/:examId' component={EditExam}></Route>
			<Route path='/examiner/course' component={Courses}></Route>
			<Route
				exact
				path='/examiner/exam/:examId/question/new'
				component={Questions}
			></Route>
			<Route
				path='/examiner/exam/:examId/question/:questionId'
				component={EditQuestion}
			></Route>

			<Route
				path='/examiner/exam/:examId/questions'
				component={ViewQuestions}
			></Route>
			<Route path='/examiner/setting' component={Settings} />
			<Route path='/examiner/students' component={Students} />
			<Route path='/examiner/student/new' component={CreateStudent} />
			<Route
				path='/examiner/exam-setup/student/:studentId'
				component={AssignExam}
			/>
			<Route path='/examiner/exam/:examId/students' component={ViewStudents} />
		</Switch>
	);
};

export default SidebarContent;