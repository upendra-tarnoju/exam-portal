import React, { Component } from 'react';
import ExaminerService from '../../../../services/examinerApi';

class Exam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createExam: true,
			nextInputs: false,
			subject: { value: '', error: '' },
			course: { value: '', error: '' },
			examCode: { value: '', error: '' },
			password: { value: '', error: '' },
			totalMarks: { value: '', error: '' },
			passingMarks: { value: '', error: '' },
			duration: { value: '', error: '' },
			examDate: { value: '', error: '' },
			startTime: { value: '', error: '' },
			endTime: { value: '', error: '' },
			courseList: [],
		};
		this.examinerService = new ExaminerService();
	}

	setInputScreen(status) {
		this.setState({
			createExam: status,
		});
	}

	handleInputs(event) {
		// this.setState({
		// 	nextInputs: status,
		// });
	}

	handleChange = (event) => {
		let key = event.target.name;
		let value = event.target.value;
		if (
			key === 'totalMarks' ||
			key === 'passingMarks' ||
			key === 'duration'
		) {
			let letters = /^[0-9\b]+$/;
			if (letters.test(value)) {
				this.setState({ [key]: { ...this.state[key], value: value } });
			}
		} else {
			this.setState({ [key]: { ...this.state[key], value: value } });
		}
	};

	componentDidMount() {
		let state = {};
		this.examinerService.viewCourses(state).then((res) => {
			this.setState({
				courseList: res.data,
			});
		});
	}

	FirstExamInputs = () => {
		let options = this.state.courseList.map((course) => (
			<option key={course._id}>
				{course.name} ( {course.description} )
			</option>
		));
		return (
			<div className='card-body'>
				<label className='w-100'>Subject</label>
				<input
					name='subject'
					type='text'
					className='w-100 px-3 py-2 mb-2'
					onChange={this.handleChange}
					value={this.state.subject.value}
				></input>

				<label className='w-100'>Course</label>
				<select
					className='w-100 px-3 py-2 mb-2'
					name='course'
					onChange={this.handleChange}
				>
					<option>Select course</option>
					{options}
				</select>

				<label className='w-100'>Exam code</label>
				<input
					type='text'
					className='w-100 px-3 py-2 mb-2'
					name='examCode'
					onChange={this.handleChange}
					value={this.state.examCode.value}
				></input>

				<label className='w-100'>Exam password</label>
				<input type='password' className='w-100 px-3 py-2 mb-2'></input>
			</div>
		);
	};

	SecondExamInputs = () => {
		return (
			<div className='card-body'>
				<label className='w-100'>Total marks</label>
				<input
					name='totalMarks'
					onChange={this.handleChange}
					value={this.state.totalMarks.value}
					type='text'
					className='w-100 px-3 py-2 mb-2'
				></input>

				<label className='w-100'>Passing marks</label>
				<input
					name='passingMarks'
					onChange={this.handleChange}
					value={this.state.passingMarks.value}
					type='text'
					className='w-100 px-3 py-2 mb-2'
				></input>

				<div className='d-flex justify-content-between'>
					<div className='flex-column mr-2'>
						<label>Exam date</label>
						<input
							name='examDate'
							type='date'
							className='w-100 px-3 py-2 mb-2'
							onChange={this.handleChange}
						></input>
					</div>
					<div className='flex-column mr-2'>
						<label>Start time</label>
						<input
							name='startTime'
							type='time'
							className='w-100 px-3 py-2 mb-2'
							onChange={this.handleChange}
						></input>
					</div>
					<div className='flex-column'>
						<label>End time</label>
						<input
							name='endTime'
							type='time'
							className='w-100 px-3 py-2 mb-2'
							onChange={this.handleChange}
						></input>
					</div>
				</div>

				<label className='w-100'>Exam duration</label>
				<input
					name='duration'
					onChange={this.handleChange}
					value={this.state.duration.value}
					type='text'
					className='w-100 px-3 py-2 mb-2'
				></input>
			</div>
		);
	};
	render() {
		return (
			<div className='container pt-4'>
				<div className='d-flex justify-content-end'>
					<button
						type='button'
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
							<this.FirstExamInputs />
						) : (
							<this.SecondExamInputs />
						)}

						<div className='card-footer bg-white d-flex justify-content-end'>
							{!this.state.nextInputs ? (
								<button
									type='button'
									className='btn btn-primary'
									onClick={this.handleInputs}
								>
									Next
								</button>
							) : (
								<div>
									<button
										type='button'
										className='btn btn-primary mr-2'
										onClick={() => this.handleInputs(false)}
									>
										Back
									</button>
									<button type='button' className='btn btn-success'>
										Create
									</button>
								</div>
							)}
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default Exam;
