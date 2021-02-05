import {
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	Typography,
	ListItemAvatar,
	Avatar,
	TableContainer,
	Table,
	Paper,
	TableHead,
	TableRow,
	TableCell,
	Icon,
} from '@material-ui/core';
import React from 'react';

let guidelinesList = [
	'Click start test on the bottom of your screen to begin the test.',
	'Each student just need to click on the Right Choice / Correct option from the multiple choices /options given with each question.For multiple choice questions, each question has four options, andthe candidate has to click the appropriate option.',
	'Candidate can change their response of attempted answer anytime during examination slot time.',
	'All the answered questions will be counted for calculating the final score.',
	'Do not click final SUBMIT unless you have completed the exam.',
	'Candidate will be allowed to shuffle between questions anytime during the examination as per their convience.',
];

const ExamGuidelines = () => {
	return (
		<div className='container mt-5'>
			<Card>
				<CardContent>
					<Typography variant='h5' className='text-center'>
						Exam information
					</Typography>
					<div class='container px-5'>
						<div class='d-flex justify-content-around mb-3'>
							<Paper className='p-2 w-25 d-flex flex-row'>
								<Avatar
									src={require('../../../../assets/icons/exam.png')}
									variant='square'
									className='align-self-center'
								/>
								<div>
									<p className='mb-0'>Exam</p>
									<p className='mb-0'>Python</p>
								</div>
							</Paper>
							<Paper className='w-25'>Total time - 60 mins</Paper>
						</div>
						<div class='d-flex justify-content-around'>
							<Paper className='w-25'>Negative marks - 0</Paper>
							<Paper className='w-25'>Total marks - 100</Paper>
						</div>
					</div>

					<Typography variant='h5' className='text-center'>
						Basic instructions for online examination
					</Typography>

					<Typography variant='h6' component='p' className='text-danger mt-2'>
						Please read the following instructions carefully before starting the
						exam
					</Typography>
					<List dense='true'>
						{guidelinesList.map((guideline, index) => (
							<ListItem>
								<ListItemAvatar style={{ minWidth: '30px' }}>
									<Avatar
										style={{ fontSize: '12px', width: '22px', height: '22px' }}
									>
										{index + 1}
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={guideline} />
							</ListItem>
						))}
						<ListItem>
							<ListItemAvatar style={{ minWidth: '30px' }}>
								<Avatar
									style={{ fontSize: '12px', width: '22px', height: '22px' }}
								>
									7
								</Avatar>
							</ListItemAvatar>
							<ListItemText>
								Below is the color coded table which shows the status of the
								question
							</ListItemText>
						</ListItem>
						<TableContainer className='w-50 mx-auto mt-2' component={Paper}>
							<Table>
								<TableHead>
									<TableRow className='bg-dark'>
										<TableCell className='text-white'>Color</TableCell>
										<TableCell className='text-white'>Status</TableCell>
									</TableRow>
									<TableRow>
										<TableCell component='th' scope='row'>
											<Avatar className='bg-danger'>Q</Avatar>
										</TableCell>
										<TableCell component='th' scope='row'>
											Not answered /Not attempted Question
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell component='th' scope='row'>
											<Avatar className='bg-success'>Q</Avatar>
										</TableCell>
										<TableCell component='th' scope='row'>
											Answered /Attempted Question
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell component='th' scope='row'>
											<Avatar className='bg-warning'>Q</Avatar>
										</TableCell>
										<TableCell component='th' scope='row'>
											Not answered & marked for review
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell component='th' scope='row'>
											<Avatar className='bg-info'>Q</Avatar>
										</TableCell>
										<TableCell component='th' scope='row'>
											Answered & and marked for review
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell component='th' scope='row'>
											<Avatar className='bg-secondary'>Q</Avatar>
										</TableCell>
										<TableCell component='th' scope='row'>
											Not visited
										</TableCell>
									</TableRow>
								</TableHead>
							</Table>
						</TableContainer>
					</List>
				</CardContent>
			</Card>
		</div>
	);
};

export default ExamGuidelines;
