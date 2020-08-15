import React from 'react';

const ExaminerSidebar = () => {
	return (
		<ul className='nav flex-column'>
			<li className={`nav-item py-2 px-4 text-white-50 iconHover`}>
				<i
					className='fa fa-sign-out fa-lg text-white-50 pr-3'
					aria-hidden='true'
				></i>{' '}
				Create exam
			</li>
			<li className={`nav-item py-2 px-4 text-white-50 iconHover`}>
				<i
					className='fa fa-sign-out fa-lg text-white-50 pr-3'
					aria-hidden='true'
				></i>{' '}
				Log out
			</li>
		</ul>
	);
};

export default ExaminerSidebar;
