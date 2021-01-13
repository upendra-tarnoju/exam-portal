import React from 'react';
import { Avatar, Button, Card, makeStyles, Paper } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import CountDown from 'react-countdown';

import styles from '../../student.module.css';
import factories from '../../../../factories/factories';

const ExamTimer = (props) => {
	return (
		<div className='d-flex justify-content-around  pb-2 text-center'>
			<Paper className='bg-dark px-3 py-2'>
				<div className={styles.timerContent}>{props.days}</div>
				<div
					className={`${styles.timerHeading} font-weight-bold text-white`}
				>
					Days
				</div>
			</Paper>
			<Paper className='bg-dark px-3 py-2'>
				<div className={styles.timerContent}>{props.hours}</div>

				<div
					className={`${styles.timerHeading} font-weight-bold text-white`}
				>
					Hours
				</div>
			</Paper>
			<Paper className='bg-dark px-3 py-2'>
				<div className={styles.timerContent}>{props.minutes}</div>

				<div
					className={`${styles.timerHeading} font-weight-bold text-white`}
				>
					Minutes
				</div>
			</Paper>
			<Paper className='bg-dark px-3 py-2'>
				<div className={styles.timerContent}>{props.seconds}</div>
				<div
					className={`${styles.timerHeading} font-weight-bold text-white`}
				>
					Seconds
				</div>
			</Paper>
		</div>
	);
};

const ExamCard = (props) => {
	let materialUIStyles = makeStyles((theme) => ({
		avatar: {
			backgroundColor: grey[50],
			color: grey[900],
			width: theme.spacing(12),
			height: theme.spacing(12),
			fontFamily: 'Raleway',
			fontSize: 40,
		},
	}));
	let classes = materialUIStyles();

	return (
		<Card className='shadow-lg'>
			<div
				style={{
					background: factories.generateRandomGradient(),
				}}
				className='p-3'
			>
				<Avatar
					className={`${styles.avatar} mx-auto shadow ${classes.avatar}`}
				>
					{props.exam.subject[0]}
				</Avatar>
			</div>
			<div className='p-3'>
				<p
					className={`mb-0 text-center font-weight-bold ${styles.subject}`}
				>
					{props.exam.subject}
				</p>
				<p className={`mb-0 text-center ${styles.course}`}>
					{props.exam.course}
				</p>
				<div className='row mt-2'>
					<div className='col-md-6'>
						<Paper className='text-center py-2 bg-primary' elevation={5}>
							<div
								className={`font-weight-bold text-white ${styles.paperHeading}`}
							>
								Total marks
							</div>
							<div className={`text-white ${styles.paperContent}`}>
								{props.exam.totalMarks}
							</div>
						</Paper>
					</div>
					<div className='col-md-6'>
						<Paper className='text-center py-2 bg-success' elevation={5}>
							<div
								className={`font-weight-bold text-white ${styles.paperHeading}`}
							>
								Negative marks
							</div>
							<div className={`text-white ${styles.paperContent}`}>
								{props.exam.negativeMarks
									? props.exam.negativeMarks
									: 0}
							</div>
						</Paper>
					</div>
				</div>
			</div>
			<CountDown
				renderer={({ days, hours, minutes, seconds, completed }) => {
					if (completed) {
						if (props.type === 'conducted') {
							return (
								<div className='px-5 pb-3'>
									<Button
										variant='contained'
										className='w-100'
										color='primary'
									>
										View Score
									</Button>
								</div>
							);
						}
						return (
							<div className='px-5 pb-3'>
								<Button
									variant='contained'
									className='w-100'
									color='primary'
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
				date={props.exam.startTime}
			/>
		</Card>
	);
};

export default ExamCard;
