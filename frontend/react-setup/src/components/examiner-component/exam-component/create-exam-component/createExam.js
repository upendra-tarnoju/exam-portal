import React from 'react';
import { Card, Divider, Typography } from '@material-ui/core';

import NewExamForm from '../../../../forms/exam-form/newExamForm';
import CourseService from '../../../../services/courseApi';
import ExamService from '../../../../services/examApi';

class CreateExam extends React.Component {
	constructor() {
		super();
		this.state = {
			coursesList: [],
			snackBar: { show: false, msg: '', type: '' },
		};
		this.courseService = new CourseService();
		this.examService = new ExamService();
	}

	componentDidMount() {
		let query = { pageIndex: 0, pageSize: 100 };
		this.courseService.viewCourses(query).then((res) => {
			this.setState({ coursesList: res.data.courseDetails });
		});
	}

	handleSubmit = (examData) => {
		this.examService.saveExamDetails(examData).then((res) => {
			this.props.history.replace('/examiner/exam');
		});
	};

	render() {
		let { coursesList } = this.state;
		return (
			<div className='container py-5'>
				<Card className='p-3'>
					<Typography variant='h5' component='h2' className='mb-3'>
						Create new exam
					</Typography>

					<div className='container'>
						<Divider />
						<NewExamForm
							coursesList={coursesList}
							handleSubmit={this.handleSubmit}
						/>
					</div>
				</Card>
			</div>
		);
	}
}

export default CreateExam;
