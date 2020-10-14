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

class ViewStudents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studentData: [],
		};
		this.examinerService = new ExaminerService();
	}
	componentDidMount() {
		let examId = this.props.match.params.examId;
		this.examinerService
			.getParticularExamStudents(examId)
			.then((response) => {
				this.setState({ studentData: response.data });
			});
	}

	render() {
		let studentsData = this.state.studentData.map((value) => {
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
						<Typography className='text-white'>{`${value.userData.firstName} ${value.userData.lastName}`}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div className='container'>
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
												secondary={value.fatherName}
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
												secondary={value.motherName}
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
												secondary={value.gender}
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
						<Button size='small' variant='contained' color='primary'>
							Edit
						</Button>
						<Button size='small' variant='contained' color='secondary'>
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
			</div>
		);
	}
}

export default ViewStudents;
