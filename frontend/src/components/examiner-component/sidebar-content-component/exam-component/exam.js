import React, { Component, useContext } from 'react';
import ExaminerService from '../../../../services/examinerApi';
import ExamDetails from './examDetails';
import ExamPeriod from './examPeriod';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import style from './exam.module.css';
import { useAccordionToggle, AccordionContext } from 'react-bootstrap';

class Exam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createExam: false,
			nextInputs: false,
			courses: [],
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

	componentDidMount() {
		this.examinerService
			.getAllExams()
			.then((res) => this.setState({ courses: res.data }));
	}

	CollapseAccordionButton({ eventKey, callback }) {
		let currentEventKey = useContext(AccordionContext);
		let changeOnClick = useAccordionToggle(
			eventKey,
			() => callback && callback(eventKey)
		);
		const isCurrentEventKey = currentEventKey === eventKey;
		return (
			<i
				className={`
						${
							isCurrentEventKey ? 'fa fa-angle-up' : 'fa fa-angle-down'
						} align-self-center ${style.iconSize}
					`}
				onClick={changeOnClick}
			></i>
		);
	}

	render() {
		const allExams = this.state.courses.map((course, index) => {
			return (
				<Card key={course._id}>
					<Card.Header>
						<div className='d-flex justify-content-between'>
							<span className={style.examHeading}>
								{course.subject} ({course.examCode})
							</span>
							<this.CollapseAccordionButton
								eventKey={`'${index}'`}
							></this.CollapseAccordionButton>
						</div>
					</Card.Header>
					<Accordion.Collapse eventKey={`'${index}'`}>
						<Card.Body>Hello! I'm the body</Card.Body>
					</Accordion.Collapse>
				</Card>
			);
		});
		return (
			<div className='container pt-4'>
				<div className='d-flex justify-content-end'>
					{this.state.createExam ? (
						<button
							type='button'
							className='btn btn-danger'
							onClick={() => this.setInputScreen(false)}
						>
							Cancel
						</button>
					) : (
						<button
							type='submit'
							className='btn btn-primary'
							onClick={() => this.setInputScreen(true)}
						>
							Create
						</button>
					)}
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
				) : (
					<div className='mt-2'>
						<p className={`${style.heading} text-center`}>
							List of all created Exams
						</p>
						<Accordion>{allExams}</Accordion>
					</div>
				)}
			</div>
		);
	}
}

export default Exam;
