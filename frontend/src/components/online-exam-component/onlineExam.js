import React from 'react';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

import ExamGuidelines from '../student-component/exam-guidelines-component/examGuidelines';
import ExamQuestion from '../student-component/exam-question-component/examQuestion';

const Header = () => {
	return (
		<AppBar position='static' className='bg-white'>
			<Toolbar>
				<Avatar alt='Examin logo' src={require('../../assets/logo.png')} />
				<Typography variant='h6' className='pl-2 flex-grow-1 text-dark'>
					Examin
				</Typography>
				<Button color='inherit' className='text-dark'>
					Signout
				</Button>
			</Toolbar>
		</AppBar>
	);
};

const OnlineExam = (props) => {
	return (
		<div className='h-100 bgGrey'>
			<Header />
			<Switch>
				<Route path='/exam/:examId/guidelines' component={ExamGuidelines} />
				<Route path='/exam/:examId/question' component={ExamQuestion} />
			</Switch>
		</div>
	);
};

export default OnlineExam;
