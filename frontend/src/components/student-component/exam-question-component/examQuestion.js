import {
	Card,
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
	Button,
	FormGroup,
	Checkbox,
} from '@material-ui/core';
import React from 'react';
// import CountDown, { zeroPad } from 'react-countdown';
import FullScreenModal from '../../../modals/fullScreenModal';
import screenfull from 'screenfull';
import { Modal } from 'react-bootstrap';
import htmlParser from 'html-react-parser';

import StudentService from '../../../services/studentApi';
import styles from './examQuestion.module.css';
import SubmitExamModal from '../../../modals/submitExamModal';
import CustomSnackBar from '../../../common/customSnackbar';

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
			fullScreenModal: false,
			fullScreenError: false,
			submitModal: false,
			snackbar: { show: false, msg: '', type: '' },
			description: '',
			image: '',
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
			description,
			image,
		} = this.state;
		// const renderCountTime = ({ hours, minutes, seconds }) => {
		// 	return (
		// 		<span>
		// 			{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
		// 		</span>
		// 	);
		// };

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

		const FullScreenErrorModal = () => {
			return (
				<Modal show={this.state.fullScreenError}>
					<Modal.Header className='bg-dark text-white'>Warning</Modal.Header>
					<Modal.Body>You cannot exit full screen mode during exam</Modal.Body>
					<Modal.Footer>
						<Button
							variant='outlined'
							color='primary'
							onClick={this.openFullScreen}
						>
							Full Screen
						</Button>
					</Modal.Footer>
				</Modal>
			);
		};

		const RenderQuestionPallete = () => {
			let { questionMarkings } = this.state;
			let palletes = questionMarkings;

			let palletesContent = [];
			const contents = palletes.reduce((accumulator, currentValue, index) => {
				palletesContent.push(
					<div key={index} className='col col-md-3'>
						<div
							onClick={() => this.changeQuestion(currentValue, index)}
							className={`mb-0 text-center bg-secondary text-white cursor-pointer ${
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
						>
							{index + 1}
						</div>
					</div>
				);
				if (index % 4 === 3) {
					accumulator.push(<div className='row m-2'>{palletesContent}</div>);
					palletesContent = [];
				}
				return accumulator;
			}, []);
			contents.push(<div className='row m-2'>{palletesContent}</div>);
			return <div className={styles.palletesContents}>{contents}</div>;
		};

		return (
			<Card className={`mx-5 mt-4 bg-white ${styles.questionCard}`}>
				<div className='d-flex flex-column justify-content-center bg-primary flex-fill px-4 py-2'>
					<h4 className='mb-0 align-items-center text-white'>
						Question {pageIndex + 1}
					</h4>
					<p className={`${styles.question} mb-0 mt-2 align-items-center`}>
						{question}
					</p>
				</div>
				{/* <div className='d-flex flex-row'>
					<div className='p-2'>
						<CountDown date={Date.now() + 100000} renderer={renderCountTime} />
					</div>
				</div> */}

				<div className='row h-100'>
					<div className={`${styles.optionBackground} col-md-9`}>
						<pre>{description ? htmlParser(description) : ''}</pre>
						<div className={`pt-3 px-4 ${styles.options}`}>
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
						</div>
						<div className='d-flex justify-content-center'>
							<Button
								variant='contained'
								color='primary'
								className='mr-2'
								size='medium'
								onClick={() => this.nextQuestion(pageIndex - 1)}
								disabled={pageIndex === 0}
							>
								Previous
							</Button>
							<Button
								variant='contained'
								className='bg-danger text-white mr-2'
								size='medium'
								onClick={this.clearAnswer}
							>
								Clear
							</Button>
							<Button
								variant='contained'
								className='bg-info text-white mr-2'
								size='medium'
								onClick={this.saveAnswer}
							>
								Save
							</Button>
							<Button
								variant='contained'
								className='bg-info text-white mr-2'
								size='medium'
								onClick={this.reviewAnswer}
							>
								Review
							</Button>
							<Button
								variant='contained'
								color='primary'
								className='mr-2'
								size='medium'
								disabled={pageIndex + 1 === questionMarkings.length}
								onClick={() => this.nextQuestion(pageIndex + 1)}
							>
								Next
							</Button>
							<Button
								variant='contained'
								color='secondary'
								onClick={() => this.handleSubmitExamModal(true)}
							>
								Submit
							</Button>
						</div>
					</div>
					<div className='col-md-3 pl-0'>
						<div
							className={`bg-dark text-white px-3 py-3 ${styles.palleteHeading}`}
						>
							Question Pallete
						</div>
						<RenderQuestionPallete />
						<FullScreenModal
							show={this.state.fullScreenModal}
							openFullScreen={this.openFullScreen}
						/>
						<FullScreenErrorModal />
						<SubmitExamModal
							show={this.state.submitModal}
							submitExam={this.submitExam}
							handleModal={this.handleSubmitExamModal}
						/>
						<CustomSnackBar
							show={snackbar.show}
							snackBarType={snackbar.type}
							handleSnackBar={this.handleSnackBar}
							message={snackbar.msg}
						/>
					</div>
				</div>
			</Card>
		);
	}
}

export default ExamQuestion;
