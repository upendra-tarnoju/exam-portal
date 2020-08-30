import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExaminerSidebar from './examiner-sidebar-component/examinerSidebar';
import SidebarContent from './sidebar-content-component/sidebarContent';

class Examiner extends Component {
	render() {
		return (
			<div
				className={`d-flex ${this.props.toggle ? 'toggled' : ''}`}
				id='wrapper'
			>
				<ExaminerSidebar />
				<SidebarContent />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		toggle: state.adminReducer.sidebarToggle,
	};
};

export default connect(mapStateToProps, null)(Examiner);
