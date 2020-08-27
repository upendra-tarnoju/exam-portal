import React, { Component } from 'react';
import ExaminerService from '../../../../services/examinerApi';
import ExamDetails from './examDetails';
import ExamPeriod from './examPeriod';

class Exam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createExam: true,
			nextInputs: true,
		};
		this.examinerService = new ExaminerService();
		this.handleInputs = this.handleInputs.bind(this);
	}

	setInputScreen(status) {
		this.setState({
			createExam: status,
		});
	}

	handleInputs(status) {
		this.setState({
			nextInputs: status,
		});
	}

	render() {
		return (
			<div className='container pt-4'>
				<div className='d-flex justify-content-end'>
					<button
						type='submit'
						className='btn btn-primary mr-2'
						onClick={() => this.setInputScreen(true)}
					>
						Create
					</button>
					{this.state.createExam ? (
						<button
							type='button'
							className='btn btn-danger'
							onClick={() => this.setInputScreen(false)}
						>
							Cancel
						</button>
					) : null}
				</div>
				{this.state.createExam ? (
					<div className='card mt-4 w-50 mx-auto'>
						<div className='card-header bg-white text-center'>
							<h3 className='font-weight-normal'>Create new Exam</h3>
						</div>
						{!this.state.nextInputs ? (
							<ExamDetails handleInputs={this.handleInputs} />
						) : (
							<ExamPeriod handleInputs={this.handleInputs} />
						)}
					</div>
				) : null}
			</div>
		);
	}
}

export default Exam;
