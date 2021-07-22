import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../header/navbar';
import ExamList from './exam-list-component/examList';

const Student = () => {
	return (
		<div className='bgGrey' style={{ height: 'inherit' }}>
			<Navbar />
			<Switch>
				<Route exact path='/student/exam' component={ExamList} />
			</Switch>
		</div>
	);
};

export default Student;
