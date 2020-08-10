import React, { Component } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';
import styles from './admin.module.css';
import AdminPanel from './admin-panel-component/adminPanel';

class Admin extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		let cookieData = cookie.getJSON();
		axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin`, {
			headers: {
				cookieData,
			},
		});
	}

	render() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<nav
						className={`col-md-3 d-md-block p-0 col-lg-2 bg-light ${styles.sidebar} collapse`}
					>
						<AdminPanel />
					</nav>
				</div>
			</div>
		);
	}
}

export default Admin;
