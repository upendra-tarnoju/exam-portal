import React from 'react';
import { Card, Typography } from '@material-ui/core';
import moment from 'moment';

import SubAdminService from '../../../../../services/subAdminApi';
import factories from '../../../../../factories/factories';
import EditSubAdminStudentForm from '../../../../../forms/subadmin-form/editSubAdminStudentForm';
import CustomSnackBar from '../../../../customSnackbar';

class EditSubAdminStudent extends React.Component {
	constructor() {
		super();
		this.state = {
			studentDetails: {
				email: '',
				firstName: '',
				lastName: '',
				mobileNumber: '',
				address: '',
				dob: '',
				gender: '',
				city: '',
				state: '',
				fatherName: '',
				motherName: '',
				studentId: '',
			},
			snackbar: { show: false, msg: '', type: '' },
		};
		this.subAdminService = new SubAdminService();
	}

	updateStudent = (studentDetails) => {
		let studentId = this.props.match.params.studentId;
		studentDetails.dob = moment(studentDetails.dob).valueOf();
		this.subAdminService
			.updateStudent(studentId, studentDetails)
			.then((res) => {
				this.viewParticularStudent();
				this.handleSnackBar(true, res.data.msg, 'success');
			})
			.catch((err) => {
				this.viewParticularStudent();
				this.handleSnackBar(true, err.response.data.msg, 'error');
			});
	};

	viewParticularStudent = () => {
		let studentId = this.props.match.params.studentId;

		this.subAdminService.viewStudent(studentId).then((res) => {
			let studentDetails = res.data.studentDetails;
			this.setState({
				studentDetails: {
					email: studentDetails.email,
					firstName: factories.capitalizeName(studentDetails.firstName),
					lastName: factories.capitalizeName(studentDetails.lastName),
					mobileNumber: studentDetails.mobileNumber,
					address: studentDetails.otherData.address,
					dob: studentDetails.otherData.dob,
					gender: studentDetails.otherData.gender,
					city: studentDetails.otherData.city,
					fatherName: studentDetails.otherData.fatherName,
					motherName: studentDetails.otherData.motherName,
					studentId: studentDetails.otherData.studentId,
					state: studentDetails.otherData.state,
				},
			});
		});
	};

	componentDidMount() {
		this.viewParticularStudent();
	}

	handleSnackBar = (status, msg, type) => {
		this.setState({ snackbar: { show: status, msg: msg, type: type } });
	};

	render() {
		let { studentDetails, snackbar } = this.state;
		return (
			<div className='container py-5'>
				<Card className='p-3 mb-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>
								{studentDetails.firstName} {studentDetails.lastName}
							</Typography>
							<Typography variant='subtitle1'>Edit student</Typography>
						</div>
					</div>
				</Card>
				<Card className='container'>
					<EditSubAdminStudentForm
						studentDetails={studentDetails}
						updateStudent={this.updateStudent}
					/>
				</Card>
				<CustomSnackBar
					show={snackbar.show}
					handleSnackBar={this.handleSnackBar}
					snackBarType={snackbar.type}
					message={snackbar.msg}
				/>
			</div>
		);
	}
}

export default EditSubAdminStudent;
