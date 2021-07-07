import React from 'react';
import {
	Avatar,
	Button,
	Card,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import CountDown from 'react-countdown';

import styles from '../../student.module.css';
import Moment from 'react-moment';

const ExamTimer = (props) => {
	return (
		<div className='d-flex justify-content-around pb-2 text-center'>
			<Paper className='bg-dark px-3 py-2'>
				<div className={styles.timerContent}>{props.days}</div>
				<div className={`${styles.timerHeading} font-weight-bold text-white`}>
					Days
				</div>
			</Paper>
			<Paper className='bg-dark px-3 py-2'>
				<div className={styles.timerContent}>{props.hours}</div>

				<div className={`${styles.timerHeading} font-weight-bold text-white`}>
					Hours
				</div>
			</Paper>
			<Paper className='bg-dark px-3 py-2'>
				<div className={styles.timerContent}>{props.minutes}</div>

				<div className={`${styles.timerHeading} font-weight-bold text-white`}>
					Minutes
				</div>
			</Paper>
			<Paper className='bg-dark px-3 py-2'>
				<div className={styles.timerContent}>{props.seconds}</div>
				<div className={`${styles.timerHeading} font-weight-bold text-white`}>
					Seconds
				</div>
			</Paper>
		</div>
	);
};

const ExamCard = (props) => {
	let materialUIStyles = makeStyles((theme) => ({
		avatar: {
			backgroundColor: '#EDF3F6',
			color: grey[900],
			width: theme.spacing(6),
			height: theme.spacing(6),
			fontFamily: 'Raleway',
		},
		examCodeHeading: {
			marginRight: 4,
			fontSize: 15,
			textAlign: 'left',
			fontWeight: 'bold',
		},
		examCode: {
			color: 'blue',
			fontSize: 14,
			marginLeft: 7,
		},
		subjectHeading: {
			fontSize: 15,
			textAlign: 'right',
			fontWeight: 'bold',
		},
		subject: {
			fontSize: 14,
			marginLeft: 7,
			marginBottom: 1,
		},
		examDateIcon: {
			width: 55,
			height: 55,
		},
		heading: {
			fontSize: 15,
			fontWeight: 'bold',
		},
		details: {
			fontSize: 13,
		},
	}));
	let classes = materialUIStyles();

	return (
		<Card className='shadow-lg p-3'>
			<div className='row'>
				<div className='col-md-6'>
					<Typography component='p' className={classes.examCodeHeading}>
						EXAM CODE -
						<Typography component='span' className={classes.examCode}>
							{props.exam.examDetails.examCode}
						</Typography>
					</Typography>
				</div>
				<div className='col-md-6'>
					<Typography component='p' className={classes.subjectHeading}>
						SUBJECT -
						<Typography component='span' className={classes.subject}>
							{props.exam.examDetails.subject}
						</Typography>
					</Typography>
				</div>
			</div>
			<div className='d-flex mt-2'>
				<Avatar className={classes.avatar}>
					{props.exam.examDetails.course.courseId.name[0]}
				</Avatar>
				<Typography className='align-self-center ml-2'>
					{props.exam.examDetails.course.courseId.name.toUpperCase()}
				</Typography>
			</div>
			<hr />
			<div className='d-flex mt-2'>
				<Typography className={`${classes.heading} mr-2`}>
					Exam Date -
				</Typography>
				<Moment
					format='MMM Do, YYYY'
					className={`align-self-center ${classes.details}`}
				>
					{props.exam.examDetails.examDate}
				</Moment>
			</div>
			<div className='d-flex mt-2'>
				<Typography className={`${classes.heading} mr-2`}>
					Total marks -
				</Typography>
				<Typography className={`align-self-center ${classes.details}`}>
					{props.exam.examDetails.totalMarks}
				</Typography>
			</div>
			<div className='d-flex mt-2'>
				<Typography className={`${classes.heading} mr-2`}>
					Negative marks -
				</Typography>
				<Typography className={`align-self-center ${classes.details}`}>
					{props.exam.examDetails.negativeMarks}
				</Typography>
			</div>
			{props.type === 'upcoming' ? (
				<Typography className='text-center mb-2' variant='h6'>
					Exam starts in
				</Typography>
			) : null}
			<CountDown
				renderer={({ days, hours, minutes, seconds, completed }) => {
					if (completed) {
						if (props.type === 'conducted') {
							return (
								<div className='d-flex justify-content-end py-2'>
									<Button variant='contained' className='bg-dark text-white'>
										View Score
									</Button>
								</div>
							);
						}
						return (
							<div className='d-flex justify-content-end'>
								<Button
									variant='contained'
									className='bg-dark text-white'
									onClick={() => props.handleModal(true, props.exam._id)}
								>
									Take Exam
								</Button>
							</div>
						);
					} else
						return (
							<ExamTimer
								days={days}
								hours={hours}
								minutes={minutes}
								seconds={seconds}
							/>
						);
				}}
				date={props.exam.examDetails.startTime}
			/>
		</Card>
	);
};

export default ExamCard;
