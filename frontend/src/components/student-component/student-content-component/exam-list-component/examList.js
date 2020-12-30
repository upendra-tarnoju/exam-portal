import React from 'react';

import ExamCard from './examCard';
import StudentService from '../../../../services/studentApi';

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
								<ExamCard exam={exam} />
							</div>
						))}
					</div>
				))}
			</div>
		);
	}
}

export default ExamList;
