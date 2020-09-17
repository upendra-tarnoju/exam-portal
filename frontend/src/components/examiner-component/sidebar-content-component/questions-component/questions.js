import React from 'react';
import { connect } from 'react-redux';

import QuestionService from '../../../../services/questionApi';
import AddQuestions from './addQuestions';
import styles from './question.module.css';
import * as ActionTypes from '../../../../action';
import { withRouter } from 'react-router-dom';

class Questions extends React.Component {
	constructor(props) {
		super(props);
		this.questionService = new QuestionService();
	}

	componentDidMount() {
		let examId = this.props.match.params.examId;

		this.questionService.getAll(examId).then((response) => {
			let data = response.data;
			this.props.setQuestions(data.questionData, data.examData.examCode);
		});
	}

	editQuestion(questionId) {
		let examId = this.props.match.params.examId;
		this.props.history.push({
			pathname: `/examiner/exam/${examId}/question/${questionId}`,
		});
	}

	render() {
		let questionList = this.props.questions.map((data, index) => {
			return (
				<div
					key={data._id}
					className='my-2 cursor-pointer'
					onClick={() => this.editQuestion(data._id)}
				>
					{index + 1}) {data.question}
				</div>
			);
		});
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-7'>
						<AddQuestions {...this.props} />;
					</div>
					<div className='col-md-5'>
						<div className={`card ${styles.examDetailsCard}`}>
							<div
								className={`card-header ${styles.examDetailHeader} text-center bg-dark text-white`}
							>
								Exam details
							</div>
							<div className='card-body'>
								<div className='d-flex justify-content-between'>
									<p>Exam code</p>
									<p>{this.props.examCode}</p>
								</div>
								<div className='d-flex justify-content-between'>
									<p>Total Questions</p>
									<p>{this.props.questions.length}</p>
								</div>
								<p className='mb-1'>Questions</p>
								<div className=''>
									{this.props.questions.length !== 0 ? (
										questionList
									) : (
										<div className='text-center'> No questions</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		examCode: state.examinerReducer.examCode,
		questions: state.examinerReducer.questions,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setQuestions: (questions, examCode) => {
			dispatch({
				type: ActionTypes.SET_QUESTIONS,
				questions: questions,
				examCode: examCode,
			});
		},
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Questions)
);
