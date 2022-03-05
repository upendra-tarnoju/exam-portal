import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../header/navbar';
import ExamList from './exam-list-component/examList';
import ExamGuidelines from './exam-guidelines-component/examGuidelines';
import ExamQuestion from './exam-question-component/examQuestion';

const Student = () => {
	return (
		<div className='bgGrey' style={{ height: 'inherit' }}>
			<Navbar />
			<Switch>
				<Route exact path='/student/exam' component={ExamList} />
				<Route
					path='/student/exam/:examId/guidelines'
					component={ExamGuidelines}
				/>
				<Route path='/student/exam/:examId/question' component={ExamQuestion} />
			</Switch>
		</div>
	);
};

export default Student;
