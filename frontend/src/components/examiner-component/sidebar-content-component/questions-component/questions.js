import React from 'react';
import QuestionService from '../../../../services/questionApi';

import AddQuestions from './addQuestions';
import styles from './question.module.css';

class Questions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			examCode: '',
			questions: [],
		};
		this.questionService = new QuestionService();
	}
	componentDidMount() {
		let examId = this.props.match.params.examId;
		this.questionService.getAllQuestions(examId).then((response) => {
			let data = response.data;
			this.setState({
				examCode: data.examData.examCode,
				questions: data.questionData,
			});
		});
	}
	render() {
		let questionList = this.state.questions.map((data, index) => {
			return (
				<div key={data._id} className='my-2 cursor-pointer'>
					{index + 1}) {data.question}
				</div>
			);
		});
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-7'>
						<AddQuestions />;
					</div>
					<div className='col-md-5'>
						<div className={`card ${styles.examDetailsCard}`}>
							<div
								className={`card-header ${styles.examDetailHeader} text-center`}
							>
								Exam details
							</div>
							<div className='card-body'>
								<div className='d-flex justify-content-between'>
									<p>Exam code</p>
									<p>{this.state.examCode}</p>
								</div>
								<div className='d-flex justify-content-between'>
									<p>Total Questions</p>
									<p>{this.state.questions.length}</p>
								</div>
								<p className='mb-1'>Questions</p>
								<div className=''>{questionList}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Questions;
