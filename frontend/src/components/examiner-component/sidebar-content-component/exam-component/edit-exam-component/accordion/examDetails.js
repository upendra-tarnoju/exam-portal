import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { TextField } from '@material-ui/core';
import { Edit, Close, Update } from '@material-ui/icons';

import styles from '../../exam.module.css';
import CourseService from '../../../../../../services/courseApi';
import { Autocomplete } from '@material-ui/lab';

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

	getSelectedItem = () => {
		let selectedCourse = this.props.fields.courses.new;
		let item;
		item = this.state.courseList.find((opt) => {
			if (opt.id === selectedCourse.id) {
				return opt;
			}
		});
		return item || { name: '' };
	};

	handleSubmit = (field) => {
		this.props.updateExamDetails({ [field]: this.props.fields[field].new });
	};

	getIcons = (key) => {
		let fields = this.props.fields;
		if (fields.editExam) {
			if (fields[key].collapse) {
				return (
					<div className='align-self-center'>
						<Update
							className='cursor-pointer edit-text align-self-center'
							onClick={
								fields[key].new !== null
									? () =>
											this.props.updateExamDetails({
												[key]: fields[key].new,
											})
									: null
							}
						/>
						<Close
							fontSize='small'
							className='cursor-pointer edit-text align-self-center'
							onClick={() => this.props.handleCollapseChange(key)}
						/>
					</div>
				);
			} else
				return (
					<Edit
						fontSize='small'
						className='cursor-pointer edit-text align-self-center'
						onClick={() => this.props.handleCollapseChange(key)}
					/>
				);
		} else return null;
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
									{this.getIcons('courses')}
								</div>
								<Collapse in={fields.courses.collapse}>
									<div>
										{this.state.courseList.length !== 0 ? (
											<Autocomplete
												id='course-combo-box'
												options={this.state.courseList}
												getOptionLabel={(option) => option.name}
												value={this.getSelectedItem()}
												size='small'
												fullWidth
												className='mb-2'
												renderInput={(params) => (
													<TextField
														{...params}
														label='Course'
														variant='outlined'
													/>
												)}
												onChange={(event, newCourse) =>
													this.props.handleCourseChange(newCourse)
												}
											/>
										) : null}

										{fields.courses.msg ? (
											<span className='d-block invalid-feedback'>
												{fields.courses.msg}
											</span>
										) : null}
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
									{this.getIcons('subject')}
								</div>
								<Collapse in={fields.subject.collapse}>
									<TextField
										name='subject'
										label='Subject'
										className='w-100'
										variant='outlined'
										size='small'
										defaultValue={fields.subject.prev}
										onChange={this.props.handleExamChange}
										error={fields.subject.msg !== ''}
										helperText={fields.subject.msg}
										onKeyDown={(event) => {
											if (
												event.keyCode === 13 &&
												fields.subject.new != null
											)
												this.handleSubmit('subject');
										}}
									/>
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
									{this.getIcons('examCode')}
								</div>
								<Collapse in={fields.examCode.collapse}>
									<TextField
										name='examCode'
										label='Exam code'
										className='w-100'
										variant='outlined'
										size='small'
										defaultValue={fields.examCode.prev}
										onChange={this.props.handleExamChange}
										error={fields.examCode.msg !== ''}
										helperText={fields.examCode.msg}
										onKeyDown={(event) => {
											if (
												event.keyCode === 13 &&
												fields.examCode.new != null
											)
												this.handleSubmit('examCode');
										}}
									/>
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
