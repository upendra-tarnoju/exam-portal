import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddQuestion from './add-question-component/addQuestions';
import * as ActionTypes from '../../../../action';
import CustomSnackBar from '../../../../common/customSnackbar';
import ViewQuestionDetails from './viewQuestionDetails';
import ExamService from '../../../../services/examApi';

class Questions extends React.Component {
	constructor() {
		super();
		this.state = {
			snackbar: { show: false, msg: '', type: '' },
		};
		this.examService = new ExamService();
	}

	componentDidMount() {
		let examId = this.props.match.params.examId;
		this.examService.getExamQuestionDetails(examId).then((res) => {
			this.props.setExamDetails(res.data);
		});
	}

	handleSnackBar = (status, msg, type) => {
		this.setState({ snackbar: { show: status, msg, type } });
	};

	render() {
		let { snackbar } = this.state;

		return (
			<div className='container-fluid p-5 '>
				<div className='row'>
					<div className='col-md-7'>
						<AddQuestion
							handleSnackBar={this.handleSnackBar}
							examId={this.props.match.params.examId}
						/>
					</div>
					<div className='col-md-5'>
						<ViewQuestionDetails />
					</div>
				</div>
				<CustomSnackBar
					show={snackbar.show}
					snackBarType={snackbar.type}
					handleSnackBar={this.handleSnackBar}
					message={snackbar.msg}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setExamDetails: (data) => {
			dispatch({
				type: ActionTypes.SET_EXAM_DETAILS,
				data,
			});
		},
	};
};

export default withRouter(connect(null, mapDispatchToProps)(Questions));
