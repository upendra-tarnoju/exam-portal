import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import ViewSubAdminExaminers from './subadmin-examiner-component/viewSubAdminExaminers';
import SubAdminStudents from './subadmin-student-component/subAdminStudents';
import CreateSubAdminStudent from './subadmin-student-component/create-student-component/createSubAdminStudent';

const useStyles = makeStyles((theme) => ({
	containerHeight: {
		height: 'calc(100% - 64px)',
	},
}));

const SubAdminSidebarContent = (props) => {
	const classes = useStyles();

	return (
		<div className={`bgGrey ${classes.containerHeight}`}>
			<Switch>
				<Route path='/subAdmin/examiners' component={ViewSubAdminExaminers} />
				<Route path='/subAdmin/students' component={SubAdminStudents} />
				<Route path='/subAdmin/student/new' component={CreateSubAdminStudent} />
				<Redirect from='/subAdmin/*' to='/subAdmin' />
			</Switch>
		</div>
	);
};

export default SubAdminSidebarContent;
