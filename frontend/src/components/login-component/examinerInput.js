import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ExaminerService from '../../services/examinerApi';
import ExaminerInputForm from '../../forms/examinerInputForm';

class ExaminerInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
		};
		this.examinerService = new ExaminerService();
	}

	handleRedirect = () => {
		this.props.history.push('/examiner');
	};

	render() {
		return (
			<div>
				<h3 className='bg-white text-center'>Enter details</h3>
				<ExaminerInputForm handleRedirect={this.handleRedirect} />
			</div>
		);
	}
}

export default withRouter(ExaminerInput);
