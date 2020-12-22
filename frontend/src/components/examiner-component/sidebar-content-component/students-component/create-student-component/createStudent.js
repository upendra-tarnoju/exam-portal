import React from 'react';
import {
	Button,
	Stepper,
	Step,
	StepLabel,
	Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { CloudUpload } from '@material-ui/icons';

import PersonalDetailsForm from '../../../../../forms/student-form/personalDetailForm';
import StudentExamDetailForm from '../../../../../forms/student-form/studentExamDetailForm';
import styles from '../students.module.css';
import * as ActionTypes from '../../../../../action';
import FileModal from '../../../../../modals/fileModal';
import ExaminerService from '../../../../../services/examinerApi';
import Snackbar from '../../../../customSnackbar';
import factories from '../../../../../factories/factories';

class CreateStudent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			examCode: [],
			snackBar: { show: false, msg: '', type: '' },
			activeStep: 0,
			file: '',
			fileModal: { show: false },
		};
		this.examinerService = new ExaminerService();
	}

	componentDidMount() {
		this.props.clearStudentFields();
	}

	handleSnackBar = (show, msg, type) => {
		this.setState({ snackBar: { show, msg, type } });
	};

	handleFile = (e) => {
		let content = e.target.result;
		let validationMessage = factories.validateCSVFile(content);
		if (validationMessage) {
			this.setState({
				file: '',
				snackBar: { show: true, msg: validationMessage, type: 'error' },
			});
		} else {
			this.handleFileModal(true);
		}
	};

	handleFileChange = (event) => {
		let file = event.target.files[0];
		let fileType = file.name.split('.')[1];
		if (fileType === 'xlsx' || fileType === 'xls' || fileType === 'csv') {
			this.setState({ file });
			let fileReader = new FileReader();
			fileReader.onloadend = this.handleFile;
			fileReader.readAsText(file);
		} else {
			this.setState({
				snackBar: { show: true, msg: 'File type is not supported' },
			});
		}
	};

	handleFileModal = (show) => {
		this.setState({ fileModal: { show } });
	};

	uploadStudentFile = () => {
		let formData = new FormData();
		formData.append('file', this.state.file);
		formData.append('examCode', this.props.match.params.examId);
		this.examinerService
			.saveNewStudent(formData)
			.then((response) => {})
			.catch((err) => {
				let msg = err.response.data.msg;
				this.setState({ snackBar: { show: true, msg: msg } });
			});
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
			<div className='container mt-3'>
				<div className='card w-50 mx-auto'>
					<div
						className={`card-header text-white bg-dark d-flex justify-content-between ${styles.studentCardHeader}`}
					>
						Add Student
						<input
							accept='.xlsx, .xls, .csv'
							className='d-none'
							id='upload-students'
							onChange={this.handleFileChange}
							type='file'
							onClick={(event) => (event.target.value = null)}
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
					show={snackBar.show}
					message={snackBar.msg}
					snackBarType={snackBar.type}
					handleSnackBar={this.handleSnackBar}
				/>
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
