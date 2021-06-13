import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ExamList from './exam-list-component/examList';

const StudentSidebarContent = () => {
	return (
		<Switch>
			<Route exact path='/student/exam' component={ExamList} />
		</Switch>
	);
};

export default StudentSidebarContent;
