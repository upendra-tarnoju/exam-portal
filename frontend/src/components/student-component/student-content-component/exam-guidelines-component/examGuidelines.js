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
	CardActions,
	Button,
} from '@material-ui/core';
import React from 'react';

import styles from './guidelines.module.css';

let guidelinesList = [
	'Click start test on the bottom of your screen to begin the test.',
	'Each student just need to click on the Right Choice / Correct option from the multiple choices /options given with each question. For multiple choice questions, each question has four options, andthe candidate has to click the appropriate option.',
	'Candidate can change their response of attempted answer anytime during examination slot time.',
	'All the answered questions will be counted for calculating the final score.',
	'Do not click final SUBMIT unless you have completed the exam.',
	'Candidate will be allowed to shuffle between questions anytime during the examination as per their convience.',
];

const ExamGuidelines = (props) => {
	let examData = props.history.location.state;

	let redirectToQuestion = () => {
		let examId = props.match.params.examId;
		props.history.push(`/exam/${examId}/question`);
	};
	return (
		<div className='container py-5'>
			<Card>
				<CardContent>
					<Typography variant='h5' className='text-center mb-2'>
						Exam information
					</Typography>
					<div class='container px-5'>
						<div class='d-flex justify-content-around mb-3'>
							<Paper
								elevation={4}
								className={`p-2 w-25 d-flex flex-column ${styles.examCard}`}
							>
								<img
									alt='Exam icon'
									src={require('../../../../assets/icons/exam.png')}
									className='align-self-center'
								/>
								<h3 className='align-self-center font-weight-bold text-white mt-2'>
									Exam
								</h3>
								<h5 className='align-self-center'>{examData.subject}</h5>
							</Paper>
							<Paper
								className={`w-25 p-2 d-flex flex-column ${styles.totalTimeCard}`}
								elevation={4}
							>
								<img
									alt='Total time icon'
									src={require('../../../../assets/icons/totalTime.png')}
									className='align-self-center'
								/>
								<h3 className='align-self-center font-weight-bold text-white mt-2'>
									Total time
								</h3>
								<h5 className='align-self-center'>{examData.duration}</h5>
							</Paper>
						</div>
						<div class='d-flex justify-content-around'>
							<Paper
								className={`w-25 p-2 d-flex flex-column ${styles.negativeMarksCard}`}
							>
								<img
									alt='Negative marks icon'
									src={require('../../../../assets/icons/negativeMarks.png')}
									className='align-self-center'
								/>
								<h3 className='align-self-center font-weight-bold text-white mt-2'>
									Negative marks
								</h3>
								<h5 className='align-self-center'>{examData.negativeMarks}</h5>
							</Paper>
							<Paper
								className={`w-25 p-2 d-flex flex-column ${styles.totalMarksCard}`}
							>
								<img
									alt='Total marks icon'
									src={require('../../../../assets/icons/totalMarks.png')}
									className='align-self-center'
								/>
								<h3 className='align-self-center font-weight-bold text-white mt-2'>
									Total marks
								</h3>
								<h5 className='align-self-center'>{examData.totalMarks}</h5>
							</Paper>
						</div>
					</div>

					<Typography variant='h5' className='text-center mt-3'>
						Basic instructions for online examination
					</Typography>

					<Typography variant='h6' component='p' className='text-danger mt-2'>
						Please read the following instructions carefully before starting the
						exam
					</Typography>
					<List dense='true'>
						{guidelinesList.map((guideline, index) => (
							<ListItem>
								<ListItemAvatar className={styles.avatarWidth}>
									<Avatar className={styles.avatar}>{index + 1}</Avatar>
								</ListItemAvatar>
								<ListItemText primary={guideline} />
							</ListItem>
						))}
						<ListItem>
							<ListItemAvatar className={styles.avatarWidth}>
								<Avatar className={styles.avatar}>7</Avatar>
							</ListItemAvatar>
							<ListItemText>
								Below is the color coded table which shows the status of the
								question.
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
					<CardActions className='float-right'>
						<Button
							variant='contained'
							color='primary'
							size='large'
							onClick={redirectToQuestion}
						>
							Start test
						</Button>
					</CardActions>
				</CardContent>
			</Card>
		</div>
	);
};

export default ExamGuidelines;
