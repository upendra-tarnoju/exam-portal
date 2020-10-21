import React from 'react';
import { connect } from 'react-redux';

import './admin.css';
import AdminSidebar from './admin-sidebar-component/adminSidebar';
import SidebarContent from './sidebar-content-component/sidebarContent';

const Admin = (props) => {
	return (
		<div className={`d-flex ${props.toggle ? 'toggled' : ''}`} id='wrapper'>
			<AdminSidebar />
			<SidebarContent />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		toggle: state.adminReducer.sidebarToggle,
	};
};

export default connect(mapStateToProps)(Admin);
