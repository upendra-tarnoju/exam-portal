import React, { Component } from 'react';
import { connect } from 'react-redux';

import Courses from './courses-component/courses';
import Exam from './exam-component/exam';
import * as ActionType from '../../../action';
import { Route, withRouter, Switch } from 'react-router-dom';

import EditExam from './exam-component/edit-exam-component/editExam';

class SidebarContent extends Component {
	constructor(props) {
		super(props);
		this.handleSidebar = this.handleSidebar.bind(this);
	}

	handleSidebar() {
		let toggle = this.props.toggle;
		this.props.setSidebar(!toggle);
	}

	render() {
		return (
			<div id='page-content-wrapper'>
				<nav className='navbar navbar-expand-lg navbar-light bg-dark border-bottom justify-content-start'>
					<button
						type='button'
						className='btn btn-primary'
						onClick={this.handleSidebar}
					>
						<i className='fa fa-bars'></i>
					</button>
					<span className='ml-2 text-white'>
						{this.props.panelHeading}
					</span>
				</nav>
				<Switch>
					<Route exact path='/examiner/exam' component={Exam}></Route>
					<Route
						path='/examiner/exam/:examId'
						component={EditExam}
					></Route>

					<Route path='/examiner/course' component={Courses}></Route>
				</Switch>
				{/* {this.props.panelWindow === 'manageCourse' ? (
					<Courses />
				) : this.props.panelWindow === 'manageExam' ? (
					<Exam />
				) : null} */}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		panelWindow: state.examinerReducer.examinerTab,
		panelHeading: state.examinerReducer.examinerHeading,
		toggle: state.adminReducer.sidebarToggle,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSidebar: (toggle) => {
			dispatch({
				type: ActionType.COLLAPSE_SIDEBAR,
				toggle: toggle,
			});
		},
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SidebarContent)
);
