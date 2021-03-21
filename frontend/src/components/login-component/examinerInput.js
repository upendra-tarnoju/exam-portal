import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ExaminerService from '../../services/examinerApi';
import ExaminerInputForm from '../../forms/examinerInputForm';
import styles from './login.module.css';

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
			<div className='d-flex justify-content-center flex-column py-4'>
				<h3 className={`bg-white text-center ${styles.examinerInputHeading}`}>
					Examiner details
				</h3>
				<ExaminerInputForm handleRedirect={this.handleRedirect} />
			</div>
		);
	}
}

export default withRouter(ExaminerInput);
