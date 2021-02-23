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
import CountDown, { zeroPad } from 'react-countdown';
import FullScreenModal from '../../../../modals/fullScreenModal';
import screenfull from 'screenfull';
import { Modal } from 'react-bootstrap';

import StudentService from '../../../../services/studentApi';
import styles from './examQuestion.module.css';

class ExamQuestion extends React.Component {
	constructor() {
		super();
		this.state = {
			pageIndex: 0,
			question: '',
			options: [],
			optionType: '',
			totalQuestions: 0,
			singleOptValue: '',
			multiOptValue: {},
			questionId: '',
			fullScreenModal: true,
			fullScreenError: false,
		};
		this.studentService = new StudentService();
	}

	componentDidMount() {
		let { pageIndex } = this.state;
		this.nextQuestion(pageIndex);
	}

	nextQuestion(pageIndex) {
		let examId = this.props.match.params.examId;
		this.studentService.getQuestionForExam(examId, pageIndex).then((res) => {
			let questionData = res.data.questionDetails[0];
			let totalQuestions = res.data.totalQuestions;
			let multiOptValue = {};
			questionData.options.forEach(
				(option) => (multiOptValue[option.name] = false)
			);
			this.setState({
				question: questionData.question,
				options: questionData.options,
				optionType: questionData.optionType,
				totalQuestions,
				pageIndex,
				multiOptValue,
				questionId: questionData._id,
			});
		});
	}

	saveQuestion = () => {
		let examId = this.props.match.params.examId;
		let { questionId, singleOptValue, multiOptValue } = this.state;
		let multiOptAnswer = Object.values(multiOptValue).every((item) => item);

		if (!multiOptAnswer && singleOptValue !== '') {
			this.studentService
				.saveExamQuestion({
					questionId,
					examId,
					answer: singleOptValue === '' ? multiOptValue : singleOptValue,
				})
				.then((res) => {});
		}
	};

	handleOptionChange = (event) => {
		if (this.state.optionType === 'single') {
			this.setState({ singleOptValue: event.target.value });
		} else {
			this.setState({
				multiOptValue: {
					...this.state.multiOptValue,
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

	render() {
		let { question, totalQuestions, pageIndex, singleOption } = this.state;
		const renderCountTime = ({ hours, minutes, seconds }) => {
			return (
				<span>
					{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
				</span>
			);
		};

		const SingleOption = () =>
			this.state.options.map((option, index) => {
				return (
					<div key={index} className='d-flex flex-row align-items-center'>
						<p className='mr-2 mt-1 align-self-center'>{index + 1})</p>
						<FormControlLabel
							value={option.name}
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
									checked={this.state.multiOptValue[option.name]}
									name={option.name}
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
					<Modal.Body>You cannot exit full screen modal</Modal.Body>
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
			let { totalQuestions } = this.state;
			let palletes = new Array(totalQuestions).fill('');

			let palletesContent = [];
			const contents = palletes.reduce((accumulator, currentValue, index) => {
				palletesContent.push(
					<div key={index} className='col col-md-3'>
						<div
							className={`mb-0 text-center bg-secondary text-white cursor-pointer ${styles.pallete}`}
							onClick={() => this.nextQuestion(index)}
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
						<div className={`pt-3 px-4 ${styles.options}`}>
							<FormControl component='fieldset'>
								{this.state.optionType === 'single' ? (
									<RadioGroup
										name='gender1'
										value={singleOption}
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
							>
								Clear
							</Button>
							<Button
								variant='contained'
								className='bg-info text-white mr-2'
								size='medium'
								onClick={this.saveQuestion}
							>
								Save
							</Button>
							<Button
								variant='contained'
								className='bg-info text-white mr-2'
								size='medium'
							>
								Review
							</Button>
							<Button
								variant='contained'
								color='primary'
								className='mr-2'
								size='medium'
								disabled={pageIndex + 1 === totalQuestions}
								onClick={() => this.nextQuestion(pageIndex + 1)}
							>
								Next
							</Button>
							<Button variant='contained' color='secondary'>
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
					</div>
				</div>
			</Card>
		);
	}
}

export default ExamQuestion;
