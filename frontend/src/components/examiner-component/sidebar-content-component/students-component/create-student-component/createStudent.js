import React from 'react';

import AddStudentForm from '../../../../../forms/addStudentForm';
import ExaminerService from '../../../../../services/examApi';

class CreateStudent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			examCode: [],
		};
		this.examinerService = new ExaminerService();
	}

	componentDidMount() {
		let params = { type: 'examCode' };
		this.examinerService.getAllExams(params).then((response) => {
			this.setState({
				examCode: response.data,
			});
		});
	}

	render() {
		return (
			<div className='container py-5'>
				<div className='card w-50 mx-auto'>
					<div className='pt-3 pb-2'>
						<p className='text-center'>Add student</p>
						<div className='px-5'>
							<AddStudentForm examCode={this.state.examCode} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateStudent;
