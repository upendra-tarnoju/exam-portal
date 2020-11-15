import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import {
	Button,
	Stepper,
	Step,
	StepLabel,
	Typography,
	Snackbar,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { CloudUpload } from '@material-ui/icons';

import PersonalDetailsForm from '../../../../../forms/student-form/personalDetailForm';
import StudentExamDetailForm from '../../../../../forms/student-form/studentExamDetailForm';
import styles from '../students.module.css';
import * as ActionTypes from '../../../../../action';
import FileModal from '../../../../../modals/fileModal';
import ExaminerService from '../../../../../services/examinerApi';

class CreateStudent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			examCode: [],
			snackBar: { show: false, msg: '' },
			activeStep: 0,
			file: '',
			fileModal: { show: false },
		};
		this.examinerService = new ExaminerService();
	}

	componentDidMount() {
		this.props.clearStudentFields();
	}

	handleSnackBar = (show, msg) => {
		this.setState({ snackBar: { show, msg } });
	};

	handleFileChange = (event) => {
		let file = event.target.files[0];
		let fileType = file.name.split('.')[1];
		if (fileType === 'xlsx' || fileType === 'xls' || fileType === 'csv') {
			this.setState({ file }, () => this.handleFileModal(true));
		}
	};

	handleFileModal = (show) => {
		this.setState({ fileModal: { show } });
	};

	uploadStudentFile = () => {
		let formData = new FormData();
		formData.append('file', this.state.file);
		this.examinerService.saveNewStudent(formData).then((response) => {});
		this.handleFileModal(false);
	};

	getStepperContent = (stepIndex) => {
		switch (stepIndex) {
			case 0:
				return (
					<PersonalDetailsForm
						history={this.props.history}
						activeStep={this.state.activeStep}
						scrollStepper={this.scrollStepper}
					/>
				);
			case 1:
				return (
					<StudentExamDetailForm
						examCode={this.props.match.params.examId}
						activeStep={this.state.activeStep}
						scrollStepper={this.scrollStepper}
						handleErrorSnackBar={this.handleSnackBar}
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
						<input
							accept='.xlsx, .xls, .csv'
							className='d-none'
							id='upload-students'
							multiple
							onChange={this.handleFileChange}
							type='file'
						/>
						<label htmlFor='upload-students'>
							<Button
								variant='contained'
								color='primary'
								startIcon={<CloudUpload />}
								component='span'
							>
								Upload
							</Button>
						</label>
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
				<FileModal
					show={this.state.fileModal.show}
					hideModal={this.handleFileModal}
					uploadFile={this.uploadStudentFile}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		clearStudentFields: () => {
			dispatch({ type: ActionTypes.CLEAR_STUDENT_FIELDS });
		},
	};
};

export default connect(null, mapDispatchToProps)(CreateStudent);
