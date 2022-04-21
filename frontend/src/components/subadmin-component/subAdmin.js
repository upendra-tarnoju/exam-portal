import React from 'react';

import Navbar from '../header/navbar';
import SubAdminSidebar from './subadmin-sidebar-component/subAdminSidebar';
import SubAdminSidebarContent from './sidebar-content-component/subAdminSidebarContent';

const SubAdmin = (props) => {
	return (
		<div className='h-100'>
			<Navbar {...props} />
			<SubAdminSidebar />
			<SubAdminSidebarContent />
		</div>
	);
};

export default SubAdmin;
