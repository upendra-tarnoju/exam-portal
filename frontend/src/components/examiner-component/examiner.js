import React from 'react';

import ExaminerSidebar from './examiner-sidebar-component/examinerSidebar';
import SidebarContent from './sidebar-content-component/examinerSidebarContent';
import Navbar from '../header/navbar';

const Examiner = (props) => {
	return (
		<div className='bgGrey' style={{ height: 'initial' }}>
			<Navbar />
			<ExaminerSidebar />
			<SidebarContent />
		</div>
	);
};

export default Examiner;
