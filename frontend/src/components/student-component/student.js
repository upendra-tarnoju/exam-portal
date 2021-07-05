import React from 'react';

// import StudentSidebar from './student-sidebar-component/studentSidebar';
import StudentSidebarContent from './student-content-component/studentSidebarContent';
import Navbar from '../header/navbar';

const Student = () => {
	return (
		<div className='bgGrey' style={{ height: 'inherit' }}>
			<Navbar />
			{/* <StudentSidebar /> */}
			<StudentSidebarContent />
		</div>
	);
};

export default Student;
