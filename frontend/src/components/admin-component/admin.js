import React from 'react';
import { connect } from 'react-redux';

import AdminSidebar from './admin-sidebar-component/adminSidebar';
import AdminSidebarContent from './sidebar-content-component/adminSidebarContent';

const Admin = (props) => {
	return (
		<div className={`d-flex ${props.toggle ? 'toggled' : ''}`} id='wrapper'>
			<AdminSidebar />
			<AdminSidebarContent />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		toggle: state.adminReducer.sidebarToggle,
	};
};

export default connect(mapStateToProps)(Admin);
