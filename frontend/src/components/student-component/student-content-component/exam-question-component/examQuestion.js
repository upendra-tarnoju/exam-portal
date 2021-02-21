import {
	Card,
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
	Paper,
	Button,
} from '@material-ui/core';
import React from 'react';
import CountDown, { zeroPad } from 'react-countdown';

import StudentService from '../../../../services/studentApi';
import styles from './examQuestion.module.css';

class ExamQuestion extends React.Component {
	constructor() {
		super();
		this.studentService = new StudentService();
		this.state = {
			pageIndex: 0,
			question: '',
			options: [],
			optionType: '',
			totalQuestions: 0,
			questionNo: 1,
		};
	}

	componentDidMount() {
		let examId = this.props.match.params.examId;
		let { pageIndex } = this.state;
		this.studentService.getQuestionForExam(examId, pageIndex).then((res) => {
			let questionData = res.data.questionDetails[0];
			let totalQuestions = res.data.totalQuestions;
			this.setState({
				question: questionData.question,
				options: questionData.options,
				optionType: questionData.optionType,
				totalQuestions: totalQuestions,
			});
		});
	}

	nextQuestion() {}

	render() {
		let { question } = this.state;
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

		const RenderQuestionPallete = () => {
			let { totalQuestions } = this.state;
			let palletes = new Array(totalQuestions).fill('');

			let palletesContent = [];
			const contents = palletes.reduce((accumulator, currentValue, index) => {
				palletesContent.push(
					<div key={index} className='col col-md-3'>
						<div
							className={`mb-0 text-center bg-secondary text-white cursor-pointer ${styles.pallete}`}
							onClick={this.nextQuestion}
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
						Question {this.state.questionNo}
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
								<RadioGroup name='gender1'>
									{this.state.optionType === 'single' ? (
										<SingleOption />
									) : (
										<p>Multiple</p>
									)}
								</RadioGroup>
							</FormControl>
						</div>
						<div className='d-flex justify-content-center'>
							<Button
								variant='contained'
								color='primary'
								className='mr-2'
								size='medium'
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
							>
								Review
							</Button>
							<Button
								variant='contained'
								color='primary'
								className='mr-2'
								size='medium'
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
					</div>
				</div>
			</Card>
		);
	}
}

export default ExamQuestion;
