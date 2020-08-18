import React, { Component } from 'react';
import { connect } from 'react-redux';
import Courses from './courses-component/courses';
// import CreateExam from './create-exam-component/createExam';

class SidebarContent extends Component {
	render() {
		return (
			<div className='container-fluid p-0'>
				<div className='panelHeading bg-dark text-white p-3 sticky-top'>
					{this.props.panelHeading}
				</div>
				{this.props.panelWindow === 'manageCourse' ? <Courses /> : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		panelWindow: state.examinerReducer.examinerTab,
		panelHeading: state.examinerReducer.examinerHeading,
	};
};

export default connect(mapStateToProps, null)(SidebarContent);
