import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from '@material-ui/core';
import { Typeahead } from 'react-bootstrap-typeahead';

import styles from '../../exam.module.css';
import CourseService from '../../../../../../services/courseApi';

class ExamDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			courseList: [],
			selectedCourse: 0,
		};
		this.courseService = new CourseService();
	}

	componentDidMount() {
		this.courseService.viewCourses().then((response) => {
			this.setState({
				courseList: response.data.map((data) => {
					data.id = data._id;
					delete data['_id'];
					return data;
				}),
			});
		});
	}

	filterByCallback = (option, data) => {
		let text = data.text;
		return (
			option.description.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
			option.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
		);
	};

	render() {
		let { fields } = this.props;
		return (
			<Accordion defaultActiveKey='0'>
				<Card className='mb-2'>
					<Accordion.Toggle
						className={`bg-dark text-white ${styles.accordionHeading}`}
						as={Card.Header}
						variant='link'
						eventKey='0'
					>
						Exam details
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='0'>
						<Card.Body>
							<div className='container'>
								<div className='d-flex justify-content-between flex-row'>
									<div className='flex-column'>
										<label
											className={`mb-0 ${styles.editExamHeading}`}
										>
											Course
										</label>
										<p className={styles.editExamContent}>
											{fields.courses.prev.name}
										</p>
									</div>
									{fields.editExam ? (
										<p
											className='cursor-pointer edit-text align-self-center'
											onClick={() =>
												this.props.handleCollapseChange('courses')
											}
										>
											Edit
										</p>
									) : null}
								</div>
								<Collapse in={fields.courses.collapse}>
									<div className='row'>
										<div className='col-md-10'>
											<Typeahead
												id='typeahead'
												filterBy={this.filterByCallback}
												defaultSelected={[fields.courses.prev]}
												selected={[fields.courses.prev]}
												onChange={(selected) => {
													if (selected.length !== 0) {
														console.log(selected);
														setFieldValue(
															'course',
															selected[0].id
														);
													}
												}}
												onBlur={(event) =>
													setFieldTouched('course', true)
												}
												isInvalid={
													touched.course && !!errors.course
												}
												options={this.state.courseList}
												labelKey='name'
												placeholder='Course name'
												renderMenuItemChildren={(option) => (
													<div>
														<div id={option.id}>
															{option.name} ({' '}
															{option.description} )
														</div>
													</div>
												)}
											/>
											{fields.courses.msg ? (
												<span className='d-block invalid-feedback'>
													{fields.courses.msg}
												</span>
											) : null}
										</div>
										<div className='col-md-2 d-flex'>
											<Button
												type='button'
												size='small'
												variant='contained'
												color='primary'
												className='align-self-center'
												onClick={
													fields.subject.new != null
														? () =>
																this.props.updateExamDetails({
																	subject: fields.subject.new,
																})
														: null
												}
											>
												Update
											</Button>
										</div>
									</div>
								</Collapse>
								<div className='d-flex justify-content-between flex-row'>
									<div className='flex-column'>
										<label
											className={`mb-0 ${styles.editExamHeading}`}
										>
											Subject
										</label>
										<p className={styles.editExamContent}>
											{fields.subject.prev}
										</p>
									</div>
									{fields.editExam ? (
										<p
											className='cursor-pointer edit-text align-self-center'
											onClick={() =>
												this.props.handleCollapseChange('subject')
											}
										>
											Edit
										</p>
									) : null}
								</div>
								<Collapse in={fields.subject.collapse}>
									<div className='row'>
										<div className='col-md-10'>
											<input
												type='text'
												name='subject'
												className='w-100 form-control mr-2'
												defaultValue={fields.subject.prev}
												onChange={this.props.handleExamChange}
											/>
											{fields.subject.msg ? (
												<span className='d-block invalid-feedback'>
													{fields.subject.msg}
												</span>
											) : null}
										</div>
										<div className='col-md-2 d-flex'>
											<Button
												type='button'
												size='small'
												variant='contained'
												color='primary'
												className='align-self-center'
												onClick={
													fields.subject.new != null
														? () =>
																this.props.updateExamDetails({
																	subject: fields.subject.new,
																})
														: null
												}
											>
												Update
											</Button>
										</div>
									</div>
								</Collapse>
								<div className='d-flex justify-content-between flex-row mt-2'>
									<div className='flex-column'>
										<label
											className={`mb-0 ${styles.editExamHeading}`}
										>
											Exam code
										</label>
										<p className={styles.editExamContent}>
											{fields.examCode.prev}
										</p>
									</div>
									{fields.editExam ? (
										<p
											className='cursor-pointer edit-text align-self-center'
											onClick={() =>
												this.props.handleCollapseChange('examCode')
											}
										>
											Edit
										</p>
									) : null}
								</div>
								<Collapse in={fields.examCode.collapse}>
									<div className='row'>
										<div className='col-md-10'>
											<input
												type='text'
												name='examCode'
												className='w-100 form-control mr-2'
												defaultValue={fields.examCode.prev}
												onChange={this.props.handleExamChange}
											/>
											{fields.examCode.msg ? (
												<span className='d-block invalid-feedback'>
													{fields.examCode.msg}
												</span>
											) : null}
										</div>
										<div className='col-md-2 d-flex'>
											<Button
												type='button'
												size='small'
												variant='contained'
												color='primary'
												className='align-self-center'
												onClick={
													fields.examCode.new != null
														? () =>
																this.props.updateExamDetails({
																	examCode:
																		fields.examCode.new,
																})
														: null
												}
											>
												Update
											</Button>
										</div>
									</div>
								</Collapse>
							</div>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		);
	}
}

export default ExamDetails;
