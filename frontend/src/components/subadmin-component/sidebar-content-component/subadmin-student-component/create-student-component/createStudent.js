import React from 'react';
import { Typography, Card } from '@material-ui/core';
import { connect } from 'react-redux';

import * as ActionTypes from '../../../../../action';
import ExaminerService from '../../../../../services/examinerApi';
import Snackbar from '../../../../../common/customSnackbar';
import NewStudentForm from '../../../../../forms/student-form/newStudentForm';
import StudentService from '../../../../../services/studentApi';
import SubAdminService from '../../../../../services/subAdminApi';

class CreateStudent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			snackBar: { show: false, msg: '', type: '' },
			file: '',
			image: null,
		};
		this.examinerService = new ExaminerService();
		this.subAdminService = new SubAdminService();
		this.studentService = new StudentService();
	}

	componentDidMount() {
		this.props.clearStudentFields();
	}

	handleSnackBar = (show, msg, type) => {
		this.setState({ snackBar: { show, msg, type } });
	};

	handleImageChange = (event) => {
		console.log('changed');
		let file = event.target.files[0];
		let fileType = file.name.split('.')[1];
		if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
			this.setState({
				file,
				image: URL.createObjectURL(event.target.files[0]),
			});
		} else {
			this.setState({
				snackBar: { show: true, msg: 'File type is not supported' },
			});
		}
	};

	createStudent = (studentDetails) => {
		let formData = new FormData();
		for (let data of Object.entries(studentDetails)) {
			formData.append(data[0], data[1]);
		}
		formData.append('image', this.state.file);
		this.subAdminService
			.createNewStudent(formData)
			.then((res) => {
				this.props.history.goBack();
			})
			.catch((err) => {
				this.handleSnackBar(true, err.response.data.msg, 'error');
			});
	};

	render() {
		let { snackBar, image } = this.state;
		return (
			<div className='container h-100 py-4'>
				<Card className='p-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Student</Typography>
							<Typography variant='subtitle1'>Create new student</Typography>
						</div>
					</div>
				</Card>
				<Card className='mt-4 p-4'>
					<NewStudentForm
						image={image}
						handleSubmit={this.createStudent}
						handleImageChange={this.handleImageChange}
					/>
				</Card>
				<Snackbar
					show={snackBar.show}
					message={snackBar.msg}
					snackBarType={snackBar.type}
					handleSnackBar={this.handleSnackBar}
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
