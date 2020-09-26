import React from 'react';

import Card from '@material-ui/core/Card';
import QuestionService from '../../../../../services/questionApi';
import { CardContent, CardHeader, Typography } from '@material-ui/core';

class ViewQuestions extends React.Component {
	constructor(props) {
		super(props);
		this.questionService = new QuestionService();
		this.state = {
			questionList: [],
		};
	}

	componentDidMount() {
		let examId = this.props.match.params.examId;
		let queryType = 'all';
		this.questionService.getAll(examId, queryType).then((response) => {
			console.log(response.data[4]);
			this.setState({
				questionList: response.data,
			});
		});
	}
	render() {
		let questions = this.state.questionList.map((data, index) => {
			let subheader = <pre>{data.question}</pre>;
			return (
				<Card key={data._id} className='mb-2 w-75 mx-auto'>
					<CardHeader
						title={`Question ${index + 1}`}
						subheader={subheader}
					></CardHeader>
					<CardContent>
						<Typography color='primary' component='p'></Typography>
					</CardContent>
				</Card>
			);
		});
		return <div className='container pt-5'>{questions}</div>;
	}
}

export default ViewQuestions;
