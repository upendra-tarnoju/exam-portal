import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import {
	Button,
	Stepper,
	Step,
	StepLabel,
	Typography,
} from '@material-ui/core';

import PersonalDetailsForm from '../../../../../forms/student-form/personalDetailForm';
import StudentExamDetailForm from '../../../../../forms/student-form/studentExamDetailForm';
import ExaminerService from '../../../../../services/examApi';
import styles from '../students.module.css';

class CreateStudent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			examCode: [],
			snackBar: { show: false, msg: '' },
			activeStep: 0,
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

	handleSnackBar = (show, msg) => {
		this.setState({ snackBar: { show, msg } });
	};

	getStepperContent = (stepIndex) => {
		switch (stepIndex) {
			case 0:
				return (
					<PersonalDetailsForm
						activeStep={this.state.activeStep}
						scrollStepper={this.scrollStepper}
					/>
				);
			case 1:
				return (
					<StudentExamDetailForm
						activeStep={this.state.activeStep}
						scrollStepper={this.scrollStepper}
						examCode={this.state.examCode}
						resetViewStudents={this.resetViewStudents}
					/>
				);
			default:
				return (
					<PersonalDetailsForm
						activeStep={this.state.activeStep}
						scrollStepper={this.scrollStepper}
					/>
				);
		}
	};

	scrollStepper = (step) => {
		this.setState({ activeStep: step });
	};

	render() {
		let { snackBar } = this.state;
		return (
			<div className='container'>
				<div className='card w-50 mx-auto'>
					<div
						className={`card-header text-white bg-dark d-flex justify-content-between ${styles.studentCardHeader}`}
					>
						Add Student
						{this.props.createStudent ? (
							<Button
								variant='contained'
								color='secondary'
								onClick={() => this.props.handleStudent(false)}
							>
								Cancel
							</Button>
						) : null}
					</div>
					<Stepper activeStep={this.state.activeStep} alternativeLabel>
						<Step key='personalDetails'>
							<StepLabel>Personal details</StepLabel>
						</Step>
						<Step key='examDetails'>
							<StepLabel>Exam details</StepLabel>
						</Step>
					</Stepper>
					<Typography component={'span'} variant={'body2'}>
						<div className='container p-0'>
							{this.getStepperContent(this.state.activeStep)}
						</div>
					</Typography>
				</div>
				<Snackbar
					open={snackBar.show}
					autoHideDuration={6000}
					onClose={() => this.handleSnackBar(false)}
				>
					<MuiAlert
						elevation={6}
						variant='filled'
						severity='error'
						onClose={() => this.handleSnackBar(false)}
					>
						{snackBar.msg}
					</MuiAlert>
				</Snackbar>
			</div>
		);
	}
}

export default CreateStudent;
