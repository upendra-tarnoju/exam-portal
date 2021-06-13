import React from 'react';

import StudentSidebar from './student-sidebar-component/studentSidebar';
import StudentSidebarContent from './student-content-component/studentSidebarContent';
import Navbar from '../header/navbar';

const Student = (props) => {
	return (
		<div className='bgGrey' style={{ height: 'initial' }}>
			<Navbar />
			<StudentSidebar />
			<StudentSidebarContent />
		</div>
	);
};

export default Student;
