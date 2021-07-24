import React from 'react';
import { Typography, Card, Tabs, Tab } from '@material-ui/core';
import { TabPanel, TabProps } from '../../../common/customTabs';

import CustomSnackBar from '../../../common/customSnackbar';
import ResetPasswordForm from '../../../forms/settings-form/resetPasswordForm';
import ExaminerService from '../../../services/examinerApi';

class Settings extends React.Component {
	constructor() {
		super();
		this.state = {
			activeTab: 0,
			snackbar: { show: false, msg: '', type: '' },
		};
		this.examinerService = new ExaminerService();
	}

	handleTabChange = (index) => {
		this.setState({ activeTab: index });
	};

	handleSnackBar = (status, msg, type) => {
		let { snackbar } = this.state;
		if (type === undefined) type = snackbar.type;
		this.setState({ snackbar: { show: status, msg, type } });
	};

	resetPassword = (values) => {
		this.examinerService
			.resetPassword({ newPassword: values.newPassword })
			.then((res) => {
				let msg = res.data.msg;
				this.handleSnackBar(true, msg, 'success');
			});
	};

	render() {
		let { activeTab, snackbar } = this.state;
		return (
			<div className='p-5'>
				<Card className='p-3'>
					<Typography variant='h4'>Settings</Typography>
					<Typography variant='subtitle1'>View your panel settings</Typography>
					<hr />
					<Tabs
						value={activeTab}
						onChange={(event, newValue) => this.handleTabChange(newValue)}
						indicatorColor='primary'
						textColor='primary'
					>
						<Tab label='Reset Password' {...TabProps(0)} />
					</Tabs>
				</Card>
				<Card className='p-3 mt-4'>
					<TabPanel value={activeTab} index={0}>
						<ResetPasswordForm resetPassword={this.resetPassword} />
					</TabPanel>
				</Card>
				<CustomSnackBar
					show={snackbar.show}
					handleSnackBar={this.handleSnackBar}
					snackBarType={snackbar.type}
					message={snackbar.msg}
				/>
			</div>
		);
	}
}

export default Settings;
