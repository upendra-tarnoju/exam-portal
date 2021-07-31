import React from 'react';
import {
	Card,
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
	Button,
	FormGroup,
	Checkbox,
	Typography,
	IconButton,
} from '@material-ui/core';
import CountDown, { zeroPad } from 'react-countdown';
import screenfull from 'screenfull';
import { v4 as uuidv4 } from 'uuid';
import {
	ChevronLeft,
	ChevronRight,
	Bookmark,
	Save,
	Clear,
} from '@material-ui/icons';
import moment from 'moment';

import StudentService from '../../../services/studentApi';
import styles from './examQuestion.module.css';
import SubmitExamModal from '../../../modals/submitExamModal';
import CustomSnackBar from '../../../common/customSnackbar';
import FullScreenModal from '../../../modals/fullScreenModal';
import BootstrapTooltip from '../../../common/customTooltip';
import FullScreenErrorModal from '../../../modals/fullScreenErrorModal';

class ExamQuestion extends React.Component {
	constructor() {
		super();
		this.state = {
			pageIndex: 0,
			question: '',
			options: [],
			optionType: '',
			totalQuestions: 0,
			questionMarkings: [],
			singleOptValue: '',
			multiOptValue: {},
			questionId: '',
			fullScreenModal: true,
			fullScreenError: false,
			submitModal: false,
			snackbar: { show: false, msg: '', type: '' },
			description: '',
			image: '',
			subject: '',
			duration: 0,
		};
		this.studentService = new StudentService();
	}

	componentDidMount() {
		let { pageIndex } = this.state;
		this.nextQuestion(pageIndex);
	}

	nextQuestion(pageIndex, questionId) {
		let examId = this.props.match.params.examId;

		this.studentService.getQuestionForExam(examId, pageIndex).then((res) => {
			let singleOptValue = '';
			let questionData = res.data.questionDetails;
			let existingAnswer = res.data.existingAnswer;

			if (pageIndex === res.data.allQuestionsMarkings.length) {
				this.setState({
					questionMarkings: res.data.allQuestionsMarkings,
				});
			} else {
				if (existingAnswer) {
					if (questionData.optionType === 'single') {
						singleOptValue = existingAnswer.answer;
					}
				}
				let multiOptValue = {};
				questionData.options.forEach(
					(option) => (multiOptValue[option.key] = false)
				);
				this.setState({
					question: questionData.question,
					options: questionData.options,
					optionType: questionData.optionType,
					description: questionData.description,
					image: questionData.image,
					questionMarkings: res.data.allQuestionsMarkings,
					singleOptValue,
					pageIndex,
					multiOptValue,
					questionId: questionData._id,
					subject: res.data.examDetails.subject,
					duration: parseInt(res.data.examDetails.endTime),
				});
			}
		});
	}

	saveAnswer = () => {
		let examId = this.props.match.params.examId;
		let { questionId, singleOptValue, multiOptValue, optionType, pageIndex } =
			this.state;

		let joinedMultiValue = '';

		Object.keys(multiOptValue).forEach((key) => {
			if (multiOptValue[key]) {
				joinedMultiValue = joinedMultiValue + key + ',';
			}
		});

		if (!Object.values(multiOptValue).includes(true) && singleOptValue === '') {
			let msg = 'Attempt question before saving the answer';
			this.handleSnackBar(true, msg, 'error');
		} else {
			this.studentService
				.saveExamAnswer({
					questionId,
					examId,
					answer:
						optionType === 'single'
							? singleOptValue
							: joinedMultiValue.slice(0, -1),
					status: 'ATTEMPTED',
				})
				.then((res) => {
					this.nextQuestion(pageIndex + 1);
				});
		}
	};

	handleOptionChange = (event) => {
		let { optionType, multiOptValue } = this.state;
		if (optionType === 'single') {
			this.setState({ singleOptValue: event.target.value });
		} else {
			this.setState({
				multiOptValue: {
					...multiOptValue,
					[event.target.name]: event.target.checked,
				},
			});
		}
	};

	openFullScreen = () => {
		if (screenfull.isEnabled) {
			screenfull.request();

			screenfull.on('change', () => {
				if (!screenfull.isFullscreen) {
					this.setState({ fullScreenError: true });
				} else this.setState({ fullScreenError: false });
			});

			this.setState({ fullScreenModal: false });
		}
	};

	handleSubmitExamModal = (status) => {
		this.setState({ submitModal: status });
	};

	submitExam = () => {
		let examId = this.props.match.params.examId;
		this.studentService.submitExam(examId).then((res) => {
			this.handleSubmitExamModal(false);
			this.props.history.replace('/student/exam');
		});
	};

	clearAnswer = () => {
		let examId = this.props.match.params.examId;
		let { questionId, pageIndex } = this.state;

		this.studentService
			.saveExamAnswer({
				questionId,
				examId,
				answer: '',
				status: 'CLEARED',
			})
			.then((res) => {
				this.nextQuestion(pageIndex + 1);
			});
	};

	reviewAnswer = () => {
		let examId = this.props.match.params.examId;
		let answer;
		let { questionId, singleOptValue, multiOptValue, optionType, pageIndex } =
			this.state;

		let joinedMultiValue = '';

		Object.keys(multiOptValue).forEach((key) => {
			if (multiOptValue[key]) {
				joinedMultiValue = joinedMultiValue + key + ',';
			}
		});

		if (!Object.values(multiOptValue).includes(true) && singleOptValue === '') {
			answer = '';
		} else {
			answer =
				optionType === 'single'
					? singleOptValue
					: joinedMultiValue.slice(0, -1);
		}
		this.studentService
			.saveExamAnswer({
				questionId,
				examId,
				answer,
				status: 'REVIEW',
			})
			.then((res) => {
				this.nextQuestion(pageIndex + 1);
			});
	};

	handleSnackBar = (status, msg, type) => {
		let { snackbar } = this.state;

		if (type === undefined) type = snackbar.type;
		this.setState({ snackbar: { show: status, msg: msg, type: type } });
	};

	changeQuestion = (questionData, index) => {
		let questionId = questionData.questionId;
		this.nextQuestion(index, questionId);
	};

	render() {
		let {
			question,
			questionMarkings,
			pageIndex,
			singleOptValue,
			snackbar,
			image,
			description,
			submitModal,
			fullScreenModal,
			fullScreenError,
			duration,
			subject,
		} = this.state;
		const renderCountTime = ({ hours, minutes, seconds }) => {
			console.log(hours, minutes, seconds);
			return (
				<div className='d-flex'>
					<div className={styles.countDownTimer}>{zeroPad(hours)}</div>
					<Typography
						variant='caption'
						className='mb-0 mt-1 mr-1 align-self-center text-white'
					>
						Hour
					</Typography>
					<div className={styles.countDownTimer}>{zeroPad(minutes)}</div>
					<Typography
						variant='caption'
						className='mb-0 mt-1 mr-1 align-self-center text-white'
					>
						Min
					</Typography>
					<div className={styles.countDownTimer}>{zeroPad(seconds)}</div>
					<Typography
						variant='caption'
						className='mb-0 mt-1 align-self-center text-white'
					>
						Sec
					</Typography>
				</div>
			);
		};

		const SingleOption = () =>
			this.state.options.map((option, index) => {
				return (
					<div key={index} className='d-flex flex-row align-items-center'>
						<p className='mr-2 mt-1 align-self-center'>{index + 1})</p>
						<FormControlLabel
							value={option.key}
							label={option.value}
							control={<Radio />}
						/>
					</div>
				);
			});

		const MultipleOption = () =>
			this.state.options.map((option, index) => {
				return (
					<div key={index} className='d-flex flex-row align-items-center'>
						<p className='mr-2 mt-1 align-self-center'>{index + 1})</p>
						<FormControlLabel
							control={
								<Checkbox
									checked={this.state.multiOptValue[option.key]}
									name={option.key}
									onChange={this.handleOptionChange}
								/>
							}
							label={option.value}
							onChange={this.handleOptionChange}
						/>
					</div>
				);
			});

		const RenderQuestionPallete = () => {
			let { questionMarkings } = this.state;
			let palletes = questionMarkings;

			let palletesContent = [];
			const contents = palletes.reduce((accumulator, currentValue, index) => {
				palletesContent.push(
					<div key={index} className='col col-md-2 mb-2'>
						<div
							className={`mb-0 text-center cursor-pointer ${
								currentValue.status === 'NOT_VISITED'
									? styles.notVisitedPalletes
									: currentValue.status === 'NOT_ATTEMPTED'
									? styles.notAttemptedPalletes
									: currentValue.status === 'ATTEMPTED'
									? styles.attemptedPalletes
									: currentValue.status === 'ATTEMPTED_AND_MARKED_FOR_REVIEW'
									? styles.attemptedReviewPalletes
									: currentValue.status ===
									  'NOT_ATTEMPTED_AND_MARKED_FOR_REVIEW'
									? styles.notAttemptedReviewPalletes
									: null
							}`}
							onClick={() => this.changeQuestion(currentValue, index)}
						>
							<Typography className='mt-2'>{index + 1}</Typography>
						</div>
					</div>
				);
				if (index % 2 === 3) {
					accumulator.push(
						<div key={uuidv4()} className='row m-2'>
							{palletesContent}
						</div>
					);
					palletesContent = [];
				}
				return accumulator;
			}, []);
			contents.push(
				<div key={uuidv4()} className='row m-2'>
					{palletesContent}
				</div>
			);
			return <div className={styles.palletesContents}>{contents}</div>;
		};

		console.log('>>>>>>>duration', duration);

		return (
			<React.Fragment>
				<div className='bg-primary w-100 py-1 px-4 d-flex justify-content-between'>
					<CountDown date={duration} renderer={renderCountTime} />
					<Typography className='align-self-center'>{subject}</Typography>
				</div>
				<div className={styles.outerContainer}>
					<div className={styles.questionContainer}>
						<Card className='mb-2'>
							<Typography
								variant='h5'
								className='text-center py-2 font-weight-bold'
							>
								Question {pageIndex + 1}
							</Typography>
						</Card>
						<Card className='p-2'>
							<Typography className='mt-2'>{question}</Typography>
							{description ? (
								<div
									dangerouslySetInnerHTML={{ __html: description }}
									className={styles.description}
								/>
							) : null}
							{image ? (
								<div className='text-center d-block'>
									<img
										src={image}
										alt='question'
										className={styles.questionImage}
									/>
								</div>
							) : null}
						</Card>
					</div>
					<div className={styles.optionsContainer}>
						<Card className='mb-2'>
							<Typography
								variant='h5'
								className='text-center py-2 font-weight-bold'
							>
								Options
							</Typography>
						</Card>
						<Card className='p-2'>
							<FormControl component='fieldset'>
								{this.state.optionType === 'single' ? (
									<RadioGroup
										name='gender1'
										value={singleOptValue}
										onChange={this.handleOptionChange}
									>
										<SingleOption />
									</RadioGroup>
								) : (
									<FormGroup>
										<MultipleOption />
									</FormGroup>
								)}
							</FormControl>
						</Card>
					</div>
					<div className={styles.palleteContainer}>
						<Card className='mb-2'>
							<Typography
								variant='h5'
								className='text-center py-2 font-weight-bold'
							>
								Question Pallete
							</Typography>
						</Card>
						<Card>
							<RenderQuestionPallete />
						</Card>
					</div>
				</div>
				<div className={styles.footer}>
					<div>
						<IconButton
							disabled={pageIndex === 0}
							onClick={() => this.nextQuestion(pageIndex - 1)}
						>
							<BootstrapTooltip title='Previous'>
								<ChevronLeft className='text-white' />
							</BootstrapTooltip>
						</IconButton>

						<IconButton onClick={this.clearAnswer}>
							<BootstrapTooltip title='Clear'>
								<Clear className='text-white' />
							</BootstrapTooltip>
						</IconButton>

						<IconButton onClick={this.reviewAnswer}>
							<BootstrapTooltip title='Review'>
								<Bookmark className='text-white' />
							</BootstrapTooltip>
						</IconButton>

						<IconButton onClick={this.saveAnswer}>
							<BootstrapTooltip title='Save'>
								<Save className='text-white' />
							</BootstrapTooltip>
						</IconButton>

						<IconButton
							disabled={pageIndex + 1 === questionMarkings.length}
							onClick={() => this.nextQuestion(pageIndex + 1)}
						>
							<BootstrapTooltip title='Next'>
								<ChevronRight className='text-white' />
							</BootstrapTooltip>
						</IconButton>
					</div>
					<Button
						variant='contained'
						className='bg-dark text-white align-self-center'
						onClick={() => this.handleSubmitExamModal(true)}
					>
						Submit
					</Button>
				</div>
				<FullScreenModal
					show={fullScreenModal}
					openFullScreen={this.openFullScreen}
				/>
				<FullScreenErrorModal
					show={fullScreenError}
					openFullScreen={this.openFullScreen}
				/>
				<SubmitExamModal
					show={submitModal}
					submitExam={this.submitExam}
					handleModal={this.handleSubmitExamModal}
				/>
				<CustomSnackBar
					show={snackbar.show}
					snackBarType={snackbar.type}
					handleSnackBar={this.handleSnackBar}
					message={snackbar.msg}
				/>
			</React.Fragment>
		);
	}
}

export default ExamQuestion;
