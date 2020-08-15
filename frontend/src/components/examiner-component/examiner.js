import React, { Component } from 'react';
import Sidebar from '../sidebar-component/sidebar';

class Examiner extends Component {
	render() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-3 col-lg-2 bg-dark sidenav p-0'>
						<Sidebar />
					</div>
					<main className='col-md-9 ml-sm-auto col-lg-10 p-0'></main>
				</div>
			</div>
		);
	}
}
export default Examiner;
