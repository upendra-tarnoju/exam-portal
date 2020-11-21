import React from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	AccordionActions,
	Typography,
	List,
	ListItem,
	ListItemText,
	Avatar,
	ListItemAvatar,
	Divider,
	Button,
	Switch,
} from '@material-ui/core';
import {
	ExpandMore,
	Person,
	Email,
	Call,
	Wc,
	House,
	Cake,
} from '@material-ui/icons';
import moment from 'moment';

import styles from '../students.module.css';
import ExaminerService from '../../../../../services/examinerApi';
import DeleteModal from '../../../../../modals/deleteModal';
import EditStudentModal from '../edit-student-component/editStudent';
import EditPasswordModal from '../edit-student-component/editPassword';
import Snackbar from '../../../../customSnackbar';

class ViewStudents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studentData: [],
			deleteModal: { show: false, id: '' },
			snackBar: { show: false, msg: '', type: '' },
			editModal: { show: false, data: {} },
			passwordModal: { show: false, studentId: '' },
		};
		this.examinerService = new ExaminerService();
	}

	viewStudents = () => {
		let examId = this.props.match.params.examId;
		this.examinerService
			.getParticularExamStudents(examId)
			.then((response) => {
				this.setState({ studentData: response.data });
			});
	};

	componentDidMount() {
		this.viewStudents();
	}

	capitalizeName(name) {
		return name
			.split(' ')
			.map(
				(value) =>
					value.slice(0, 1).toUpperCase() + value.slice(1, value.length)
			)
			.join(' ');
	}

	handleSwitchChange = (event, studentId) => {
		let checked = event.target.checked;
		let examId = this.props.match.params.examId;

		this.examinerService.updateStudent(studentId, {
			accountStatus: checked === true ? 'enabled' : 'disabled',
			examId: examId,
		});
	};

	handleSnackBar = (show, msg, type) => {
		this.setState({
			snackBar: { show: show, msg: msg, type },
		});
	};

	hideDeleteModal = (show, id) => {
		this.setState({ deleteModal: { show: show, id: id } });
	};

	handleEditModal = (show, data) => {
		this.setState({ editModal: { show: show, data: data } });
	};

	handlePasswordModal = (show, studentId) => {
		this.setState({ passwordModal: { show: show, studentId: studentId } });
	};

	deleteExam = () => {
		let studentId = this.state.deleteModal.id;
		this.examinerService.deleteStudent(studentId).then((response) => {
			this.viewStudents();
			this.handleSnackBar(true, response.data.msg);
			this.hideDeleteModal(false, '');
		});
	};

	updateStudent = (personalData, otherData) => {
		let studentData = this.state.studentData.map((student) => {
			var tempStudent = Object.assign({}, student);
			if (student._id === otherData._id) {
				tempStudent.address = otherData.address;
				tempStudent.dob = otherData.dob;
				tempStudent.fatherName = otherData.fatherName;
				tempStudent.motherName = otherData.motherName;
				tempStudent.gender = otherData.gender;
				tempStudent.studentId = otherData.studentId;
				tempStudent.userData.mobileNumber = personalData.mobileNumber;
				tempStudent.userData.email = personalData.email;
				tempStudent.userData.firstName = personalData.firstName;
				tempStudent.userData.lastName = personalData.lastName;
				return tempStudent;
			} else return student;
		});
		this.setState({
			studentData: studentData,
			editModal: { show: false, data: '' },
		});
	};

	render() {
		let { snackBar } = this.state;
		let studentsData = this.state.studentData.map((value) => {
			let examId = this.props.match.params.examId;
			let checkedValue = value.exam.filter((data) => data.examId === examId);
			return (
				<Accordion key={value._id}>
					<AccordionSummary
						expandIcon={<ExpandMore className='text-white' />}
						id={`header-${value._id}`}
						aria-controls={`content-${value._id}`}
						className='bg-dark'
					>
						<Typography
							className={`${styles.accordionView} text-white`}
						>{`${value.studentId}`}</Typography>
						<Typography className='text-white'>
							{this.capitalizeName(
								`${value.userData.firstName} ${value.userData.lastName}`
							)}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div className='container'>
							<div className='d-flex justify-content-end align-items-center'>
								<span>Disabled</span>
								<Switch
									checked={
										checkedValue[0].accountStatus === 'enabled'
											? true
											: false
									}
									name='accountStatus'
									color='primary'
									onChange={(event) =>
										this.handleSwitchChange(event, value._id)
									}
								/>
								<span>Enabled</span>
							</div>
							<div className='row'>
								<div className='col-md-6'>
									<List>
										<ListItem>
											<ListItemAvatar>
												<Avatar className='bg-dark'>
													<Person />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary='Father name'
												secondary={this.capitalizeName(
													value.fatherName
												)}
											/>
										</ListItem>
										<Divider variant='inset' component='li' />
										<ListItem>
											<ListItemAvatar>
												<Avatar className='bg-dark'>
													<Person />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary='Mother name'
												secondary={this.capitalizeName(
													value.motherName
												)}
											/>
										</ListItem>
										<Divider variant='inset' component='li' />
										<ListItem>
											<ListItemAvatar>
												<Avatar className='bg-dark'>
													<Email />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary='Email'
												secondary={value.userData.email}
											/>
										</ListItem>
										<Divider variant='inset' component='li' />
										<ListItem>
											<ListItemAvatar>
												<Avatar className='bg-dark'>
													<Cake />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary='Date of birth'
												secondary={moment(
													value.dob,
													'YYYY-MM-DD'
												).format('MMM Do, YYYY')}
											/>
										</ListItem>
									</List>
								</div>
								<div className='col-md-6'>
									<List>
										<ListItem>
											<ListItemAvatar>
												<Avatar className='bg-dark'>
													<Call />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary='Mobile number'
												secondary={value.userData.mobileNumber}
											/>
										</ListItem>
										<Divider variant='inset' component='li' />
										<ListItem>
											<ListItemAvatar>
												<Avatar className='bg-dark'>
													<Wc />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary='Gender'
												secondary={this.capitalizeName(
													value.gender
												)}
											/>
										</ListItem>
										<Divider variant='inset' component='li' />
										<ListItem>
											<ListItemAvatar>
												<Avatar className='bg-dark'>
													<House />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary='Home address'
												secondary={value.address}
											/>
										</ListItem>
										<Divider variant='inset' component='li' />
									</List>
								</div>
							</div>
						</div>
					</AccordionDetails>
					<Divider />
					<AccordionActions className='bg-dark'>
						<Button
							size='small'
							variant='contained'
							color='primary'
							onClick={() => this.handleEditModal(true, value)}
						>
							Edit Details
						</Button>
						<Button
							size='small'
							variant='contained'
							className='bg-success text-white'
							onClick={() => this.handlePasswordModal(true, value._id)}
						>
							Change password
						</Button>
						<Button
							size='small'
							variant='contained'
							color='secondary'
							onClick={() => this.hideDeleteModal(true, value.studentId)}
						>
							Delete
						</Button>
					</AccordionActions>
					<Divider />
				</Accordion>
			);
		});
		return (
			<div className='container w-75 mx-auto mt-4'>
				<p className={`mb-0 text-center ${styles.heading}`}>Students</p>
				{studentsData}
				<DeleteModal
					show={this.state.deleteModal.show}
					heading='student'
					hideModal={this.hideDeleteModal}
					deleteContent={this.deleteExam}
				/>
				<Snackbar
					show={snackBar.show}
					message={snackBar.msg}
					snackBarType={snackBar.type}
					handleSnackBar={this.handleSnackBar}
				/>
				{this.state.editModal.data !== '' ? (
					<EditStudentModal
						show={this.state.editModal.show}
						hideModal={this.handleEditModal}
						student={this.state.editModal.data}
						updateStudent={this.updateStudent}
					/>
				) : null}
				<EditPasswordModal
					show={this.state.passwordModal.show}
					hideModal={this.handlePasswordModal}
					studentId={this.state.passwordModal.studentId}
				/>
			</div>
		);
	}
}

export default ViewStudents;
