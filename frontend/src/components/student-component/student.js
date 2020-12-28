import React from 'react';
import { connect } from 'react-redux';

const Student = () => {
	return <p>Student</p>;
};

const mapStateToProps = (state) => {
	return {
		toggle: state.adminReducer.sidebarToggle,
	};
};

export default connect(mapStateToProps)(Student);
