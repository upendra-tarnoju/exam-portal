import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import { Button } from '@material-ui/core';

import AddStudentForm from '../../../../../forms/addStudentForm';
import ExaminerService from '../../../../../services/examApi';
import styles from '../students.module.css';

class CreateStudent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			examCode: [],
			snackBar: { show: false, msg: '' },
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
					<div className='pt-3 pb-2'>
						<div className='px-5'>
							<AddStudentForm
								resetViewStudents={this.props.resetViewStudents}
								examCode={this.state.examCode}
								handleErrorSnackBar={this.handleSnackBar}
								handleSuccessSnackBar={this.props.handleSuccessSnackBar}
							/>
						</div>
					</div>
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
