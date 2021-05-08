import React from 'react';

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

export default Admin;
