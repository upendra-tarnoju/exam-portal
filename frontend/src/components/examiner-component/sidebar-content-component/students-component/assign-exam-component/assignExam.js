import React from 'react';
import {
	Avatar,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Paper,
	Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ExamService from '../../../../../services/examApi';
import CustomSnackBar from '../../../../../common/customSnackbar';

const useStyles = (theme) => ({
	avatarSize: {
		width: theme.spacing(8),
		height: theme.spacing(8),
	},
});

class AssignExam extends React.Component {
	constructor() {
		super();
		this.state = {
			examDetails: [],
			studentDetails: { firstName: '', lastName: '' },
			selectedExam: null,
			snackBar: { status: false, msg: '', type: '' },
		};
		this.examService = new ExamService();
	}

	componentDidMount() {
		let studentId = this.props.match.params.studentId;
		this.examService
			.getExamList({ studentId })
			.then((res) => {
				this.setState({
					examDetails: res.data.examDetails,
					studentDetails: res.data.studentDetails,
				});
			})
			.catch((err) => {
				this.props.history.goBack();
			});
	}

	assignStudentToExam = () => {
		// let {} = this.state;
	};

	selectExam = (examId) => {
		this.setState({ selectedExam: examId });
	};

	render() {
		let { classes } = this.props;
		let { studentDetails, examDetails } = this.state;

		let rows = [...Array(Math.ceil(examDetails.length / 3))];

		let examRows = rows.map((row, index) =>
			examDetails.slice(index * 3, index * 3 + 3)
		);

		let examList = examRows.map((row, index) => (
			<div className='row' key={index}>
				{row.map((exam, innerIndex) => (
					<div key={exam._id} className='col-md-4 py-2'>
						<CardActionArea onClick={() => this.selectExam(exam._id)}>
							<Paper className='p-3 rounded'>
								<div className='d-flex justify-content-center'>
									<Avatar className={`bg-dark ${classes.avatarSize}`}>
										{exam.subject[0]}
									</Avatar>
								</div>
								<div className='row'>
									<div className='col-md-6'>
										<Typography variant='subtitle2'>Subject</Typography>
									</div>
									<div className='col-md-6 d-flex justify-content-end'>
										<Typography variant='subtitle1'>{exam.subject}</Typography>
									</div>
								</div>
								<div className='row'>
									<div className='col-md-6'>
										<Typography variant='subtitle2'>Exam Code</Typography>
									</div>
									<div className='col-md-6 d-flex justify-content-end'>
										<Typography variant='subtitle1'>{exam.examCode}</Typography>
									</div>
								</div>
							</Paper>
						</CardActionArea>
					</div>
				))}
			</div>
		));

		return (
			<div className='container py-4'>
				<Card>
					<CardHeader
						title={`${studentDetails.firstName} ${studentDetails.lastName}`}
						subheader='Assign exam to student'
					/>
				</Card>
				<Card className='mt-3'>
					<CardHeader title='Exams' />
					<div className='d-flex px-3 justify-content-end'>
						<Button
							variant='outlined'
							size='large'
							className='bg-dark text-white'
						>
							Assign selected exam
						</Button>
					</div>

					<CardContent>{examList}</CardContent>
					<CustomSnackBar
						handleSnackBar={this.handleSnackBar}
						show={this.state.snackBar.status}
						message={this.state.snackBar.msg}
						snackBarType={this.state.snackBar.type}
					/>
				</Card>
			</div>
		);
	}
}

export default withStyles(useStyles)(AssignExam);
