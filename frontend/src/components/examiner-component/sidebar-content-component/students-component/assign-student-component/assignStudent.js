import React from 'react';
import {
	Card,
	Avatar,
	Typography,
	CardActionArea,
	Button,
	withStyles,
} from '@material-ui/core';
import Moment from 'react-moment';

import ExaminerService from '../../../../../services/examinerApi';
import { Cake, Cancel, PermIdentity } from '@material-ui/icons';

const styles = (theme) => ({
	avatar: {
		width: theme.spacing(7),
		height: theme.spacing(7),
		backgroundColor: 'green',
	},
	removeSelected: {
		position: 'absolute',
		right: 8,
		top: 5,
	},
});

class AssignStudent extends React.Component {
	constructor() {
		super();
		this.state = {
			studentsList: [],
			examDetails: {},
			selectedStudents: [],
		};
		this.examinerService = new ExaminerService();
	}

	viewStudents = () => {
		let examId = this.props.match.params.examId;

		this.examinerService.getStudentsList(examId).then((res) => {
			let response = res.data;
			let studentsList = response.studentsList.map((student) => {
				return { ...student, selected: false };
			});

			this.setState({
				studentsList,
				examDetails: response.examDetails,
			});
		});
	};

	componentDidMount() {
		this.viewStudents();
	}

	selectStudent = (studentId) => {
		let { studentsList, selectedStudents } = this.state;
		let index = studentsList.findIndex((student) => student._id === studentId);
		studentsList[index].selected = !studentsList[index].selected;

		let selectedStudentIndex = selectedStudents.findIndex(
			(selectedStudentId) => selectedStudentId === studentId
		);
		if (selectedStudentIndex === -1) selectedStudents.push(studentId);
		else selectedStudents.splice(selectedStudentIndex, 1);
		this.setState({ studentsList });
	};

	render() {
		let { examDetails, studentsList } = this.state;
		let { classes } = this.props;

		let rows = [...Array(Math.ceil(studentsList.length / 2))];

		let studentRows = rows.map((row, index) =>
			studentsList.slice(index * 3, index * 3 + 3)
		);

		let students = studentRows.map((row, index) => (
			<div className='row' key={index}>
				{row.map((student, innerIndex) => (
					<div key={innerIndex} className='col-md-4 py-2'>
						<Card className='rounded'>
							<CardActionArea
								className='p-3'
								onClick={() => this.selectStudent(student._id)}
							>
								{student.selected ? (
									<Cancel className={classes.removeSelected}></Cancel>
								) : null}
								<div className='d-flex justify-content-start'>
									{student.image ? (
										<Avatar className={classes.avatar}>
											<Typography variant='h5'>
												{student.firstName[0].toUpperCase()}
											</Typography>
										</Avatar>
									) : (
										<Avatar className={classes.avatar}>
											<Typography variant='h5'>
												{student.firstName[0].toUpperCase()}
											</Typography>
										</Avatar>
									)}
									<Typography
										variant='subtitle1'
										className='align-self-center ml-2'
									>
										{student.firstName.toUpperCase()}{' '}
										{student.lastName.toUpperCase()}
									</Typography>
								</div>
								<div className='d-flex justify-content-start mt-2'>
									<PermIdentity className='align-self-center' />
									<Typography variant='body2' className='mt-1 ml-2'>
										{student.studentData.studentId}
									</Typography>
								</div>
								<div className='d-flex justify-content-start'>
									<Cake className='align-self-center' />
									<Typography variant='body2' className='mt-1 ml-2'>
										<Moment format='MMMM Do YYYY'>
											{student.studentData.dob}
										</Moment>
									</Typography>
								</div>
							</CardActionArea>
						</Card>
					</div>
				))}
			</div>
		));

		return (
			<div className='container p-4'>
				<Card className='p-3 mb-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Exams List</Typography>
							<Typography variant='subtitle1'>
								Add students in your exams
							</Typography>
						</div>
						<div className='d-flex flex-column'>
							<Typography variant='h4' className='align-self-end'>
								{examDetails.examCode}
							</Typography>
							<Typography variant='subtitle1' className='align-self-end'>
								{examDetails.subject}
							</Typography>
						</div>
					</div>
				</Card>
				<div className='d-flex justify-content-end'>
					<Button variant='contained' className='text-white bg-dark mb-2'>
						Add selected students
					</Button>
				</div>
				{students}
			</div>
		);
	}
}

export default withStyles(styles)(AssignStudent);
