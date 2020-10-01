import React from 'react';
import { connect } from 'react-redux';

import ExaminerSidebar from './examiner-sidebar-component/examinerSidebar';
import SidebarContent from './sidebar-content-component/sidebarContent';

const Examiner = (props) => {
	return (
		<div className={`d-flex ${props.toggle ? 'toggled' : ''}`} id='wrapper'>
			<ExaminerSidebar />
			<SidebarContent />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		toggle: state.adminReducer.sidebarToggle,
	};
};

export default connect(mapStateToProps, null)(Examiner);
