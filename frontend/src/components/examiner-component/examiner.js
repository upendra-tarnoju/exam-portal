import React, { Component } from 'react';
import Sidebar from '../sidebar-component/sidebar';
import ExaminerSidebar from './examiner-sidebar-component/examinerSidebar';
import SidebarContent from './sidebar-content-component/sidebarContent';

class Examiner extends Component {
	render() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-3 col-lg-2 bg-dark sidenav p-0'>
						<Sidebar content={<ExaminerSidebar props={this.props} />} />
					</div>
					<main className='col-md-9 ml-sm-auto col-lg-10 p-0'>
						<SidebarContent />
					</main>
				</div>
			</div>
		);
	}
}
export default Examiner;
