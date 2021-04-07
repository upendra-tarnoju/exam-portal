import React from 'react';
import { connect } from 'react-redux';

import AdminSidebar from './admin-sidebar-component/adminSidebar';
import AdminSidebarContent from './sidebar-content-component/adminSidebarContent';
import Navbar from '../header/navbar';

const Admin = (props) => {
	return (
		<div className='h-100'>
			<Navbar {...props} />
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
