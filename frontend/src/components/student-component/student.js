import React from 'react';
import { connect } from 'react-redux';

import StudentSidebar from './student-sidebar-component/studentSidebar';
import StudentContent from './student-content-component/studentContent';

const Student = (props) => {
	return (
		<div className={`d-flex ${props.toggle ? 'toggled' : ''}`} id='wrapper'>
			<StudentSidebar />
			<StudentContent />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		toggle: state.adminReducer.sidebarToggle,
	};
};

export default connect(mapStateToProps)(Student);
