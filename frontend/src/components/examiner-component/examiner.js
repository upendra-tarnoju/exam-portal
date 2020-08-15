import React, { Component } from 'react';
import Sidebar from '../sidebar-component/sidebar';
import ExaminerSidebar from './examiner-sidebar-component/examinerSidebar';

class Examiner extends Component {
	render() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-3 col-lg-2 bg-dark sidenav p-0'>
						<Sidebar content={<ExaminerSidebar />} />
					</div>
					<main className='col-md-9 ml-sm-auto col-lg-10 p-0'></main>
				</div>
			</div>
		);
	}
}
export default Examiner;
