import React from 'react';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

import ExamGuidelines from '../student-component/student-content-component/exam-guidelines-component/examGuidelines';

const Header = () => {
	return (
		<AppBar position='static'>
			<Toolbar>
				<Avatar alt='Examin logo' src={require('../../assets/logo.png')} />
				<Typography variant='h6' className='pl-2 flex-grow-1'>
					Examin
				</Typography>
				<Button color='inherit'>Signout</Button>
			</Toolbar>
		</AppBar>
	);
};

const OnlineExam = (props) => {
	return (
		<div>
			<Header />
			<Switch>
				<Route path='/exam/:examId/guidelines' component={ExamGuidelines} />
			</Switch>
		</div>
	);
};

export default OnlineExam;
