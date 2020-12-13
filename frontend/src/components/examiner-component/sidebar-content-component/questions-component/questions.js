import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

import QuestionService from '../../../../services/questionApi';
import AddQuestions from './addQuestions';
import styles from './question.module.css';
import * as ActionTypes from '../../../../action';
import DeleteModal from '../../../../modals/deleteModal';

class Questions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showDialog: false,
			deleteIndex: '',
			pageIndex: 0,
			pageSize: 5,
			questionCount: 0,
		};
		this.questionService = new QuestionService();
	}

	viewQuestions = (query) => {
		let examId = this.props.match.params.examId;
		this.questionService.getAll(examId, query).then((response) => {
			let data = response.data;
			let usedMarks = data.questionData.reduce((sum, current) => {
				return sum + current.questionMarks;
			}, 0);
			this.setState({
				questionCount: Math.ceil(data.totalQuestions / this.state.pageSize),
				pageIndex: query.pageIndex,
			});
			this.props.setQuestions(
				data.questionData,
				data.examCode,
				data.totalMarks,
				usedMarks
			);
		});
	};

	componentDidMount() {
		let query = {};
		query['queryType'] = 'selective';
		query['pageIndex'] = this.state.pageIndex;
		query['pageSize'] = this.state.pageSize;
		this.viewQuestions(query);
	}

	handleQuestionChange = (event, value) => {
		let query = {};
		query['queryType'] = 'selective';
		query['pageIndex'] = value - 1;
		query['pageSize'] = this.state.pageSize;
		this.viewQuestions(query);
	};

	editQuestion(questionId) {
		let examId = this.props.match.params.examId;
		this.props.history.push({
			pathname: `/examiner/exam/${examId}/question/${questionId}`,
		});
	}

	handleDeleteDialog = (status, id) => {
		this.setState({ showDialog: status, deleteIndex: id });
	};

	deleteQuestion = () => {
		let marks = this.props.marks;
		let questionId = this.state.deleteIndex;
		this.questionService.delete(questionId).then((response) => {
			let questions = this.props.questions.filter(
				(item) => item._id !== response.data._id
			);
			let usedMarks = marks.used - response.data.questionMarks;
			this.props.setQuestions(
				questions,
				this.props.examCode,
				marks.total,
				usedMarks
			);
			this.handleDeleteDialog(false, '');
		});
	};

	render() {
		let { pageIndex, pageSize } = this.state;
		let questionList = this.props.questions.map((data, index) => {
			return (
				<div key={data._id} className='d-flex justify-content-between'>
					<div
						className='my-2 cursor-pointer text-truncate'
						onClick={() => this.editQuestion(data._id)}
					>
						{pageIndex * pageSize + index + 1}) {data.question}
					</div>
					<div
						className='align-self-center cursor-pointer'
						onClick={() => this.handleDeleteDialog(true, data._id)}
					>
						<i className='fa fa-trash'></i>
					</div>
				</div>
			);
		});
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-7'>
						<AddQuestions {...this.props} />
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
									<p className='font-weight-bold'>Exam code</p>
									<p>{this.props.examCode}</p>
								</div>
								<div className='d-flex justify-content-between'>
									<p className='font-weight-bold'>Total Questions</p>
									<p>{this.props.questions.length}</p>
								</div>
								<div className='d-flex justify-content-between'>
									<p className='font-weight-bold'>Total marks</p>
									<p>{this.props.marks.total}</p>
								</div>
								<div className='d-flex justify-content-between'>
									<p className='font-weight-bold'>Used marks</p>
									<p>{this.props.marks.used}</p>
								</div>
								<div className='d-flex justify-content-between'>
									<p className='font-weight-bold'>Left marks</p>
									<p>{this.props.marks.left}</p>
								</div>
								<p className='mb-1 font-weight-bold'>Questions</p>

								{this.props.questions.length !== 0 ? (
									questionList
								) : (
									<div className='text-center'> No questions</div>
								)}

								<div className='d-flex justify-content-center mt-2'>
									<Pagination
										count={this.state.questionCount}
										variant='outlined'
										color='primary'
										onChange={this.handleQuestionChange}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<DeleteModal
					show={this.state.showDialog}
					heading='question'
					deleteContent={this.deleteQuestion}
					hideModal={this.handleDeleteDialog}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		examCode: state.examinerReducer.examCode,
		questions: state.examinerReducer.questions,
		marks: state.examinerReducer.marks,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setQuestions: (questions, examCode, totalMarks, usedMarks) => {
			dispatch({
				type: ActionTypes.SET_QUESTIONS,
				questions,
				examCode,
				totalMarks,
				usedMarks,
			});
		},
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Questions)
);
