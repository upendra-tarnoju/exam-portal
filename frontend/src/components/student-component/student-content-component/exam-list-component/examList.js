import React from 'react';
import { Avatar, Card } from '@material-ui/core';

import StudentService from '../../../../services/studentApi';
import styles from '../../student.module.css';
import factories from '../../../../factories/factories';

class ExamList extends React.Component {
	constructor() {
		super();
		this.state = {
			examList: [],
		};
		this.studentService = new StudentService();
	}
	componentDidMount() {
		this.studentService.getParticularStudentExamDetails().then((res) => {
			let examData = res.data;
			let examList = [];
			while (examData.length > 0) {
				examList.push(examData.splice(0, 3));
			}
			this.setState({ examList });
		});
	}

	render() {
		return (
			<div className='container mt-5'>
				{this.state.examList.map((data, index) => (
					<div className='row mb-5'>
						{data.map((exam) => (
							<div className='col-md-4'>
								<Card
									className={`p-3`}
									style={{
										background: factories.generateRandomGradient(),
									}}
								>
									<Avatar className={`${styles.avatar} mx-auto`}>
										{exam.subject[0]}
									</Avatar>
								</Card>
							</div>
						))}
					</div>
				))}
			</div>
		);
	}
}

export default ExamList;
