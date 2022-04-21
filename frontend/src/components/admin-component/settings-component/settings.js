import React from 'react';
import {
	Card,
	Tabs,
	Typography,
	Tab,
	makeStyles,
	withStyles,
} from '@material-ui/core';

import EmailForm from '../../../forms/settings-form/emailForm';
import AdminService from '../../../services/adminApi';
import STMPForm from '../../../forms/settings-form/smtpForm';
import CustomSnackBar from '../../../common/customSnackbar';
import ResetPasswordForm from '../../../forms/settings-form/resetPasswordForm';
import ImageStorageForm from '../../../forms/settings-form/imageStorageForm';

const tabProps = (index) => {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
};

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	emailContainer: {
		border: 'solid 1px #E6E2E3',
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 14,
		paddingRight: 8,
	},
	containerHeading: {
		fontSize: 20,
	},
}));

class Settings extends React.Component {
	constructor() {
		super();
		this.state = {
			activeTab: 0,
			emailAddressList: [],
			adminSettings: {},
			snackbar: { show: false, msg: '', type: '' },
		};
		this.adminService = new AdminService();
	}

	componentDidMount() {
		this.adminService.getAdminSettings().then((res) => {
			this.setState({
				emailAddressList: res.data.emailAddressDetails,
				adminSettings: res.data.settings,
			});
		});
	}

	handleTabChange = (index) => {
		this.setState({ activeTab: index });
	};

	sendEmail = (values) => {
		this.adminService.sendEmail(values).then((res) => {
			let msg = res.data.msg;
			this.handleSnackBar(true, msg, 'success');
		});
	};

	updateSettings = (values) => {
		this.adminService.updateSettings(values).then((res) => {
			let msg = res.data.msg;
			this.handleSnackBar(true, msg, 'success');
		});
	};

	handleSnackBar = (status, msg, type) => {
		let { snackbar } = this.state;
		if (type === undefined) type = snackbar.type;
		this.setState({ snackbar: { show: status, msg, type } });
	};

	resetPassword = (values) => {
		this.adminService
			.resetPassword({ newPassword: values.newPassword })
			.then((res) => {
				let msg = res.data.msg;
				this.handleSnackBar(true, msg, 'success');
			});
	};

	render() {
		const { classes } = this.props;
		const { activeTab, emailAddressList, adminSettings, snackbar } = this.state;
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
						<Tab label='Email' {...tabProps(0)} />
						<Tab label='Reset Password' {...tabProps(1)} />
						<Tab label='SMTP' {...tabProps(2)} />
						<Tab label='Image storage' {...tabProps(3)} />
					</Tabs>
				</Card>
				<Card className='p-3 mt-4'>
					<TabPanel value={activeTab} index={0}>
						<div className={classes.emailContainer}>
							<EmailForm
								emailAddressList={emailAddressList}
								sendEmail={this.sendEmail}
								handleSnackBar={this.handleSnackBar}
							/>
						</div>
					</TabPanel>
					<TabPanel value={activeTab} index={1}>
						<ResetPasswordForm resetPassword={this.resetPassword} />
					</TabPanel>
					<TabPanel value={activeTab} index={2}>
						<STMPForm
							updateSettings={this.updateSettings}
							adminSettings={adminSettings}
						/>
					</TabPanel>
					<TabPanel value={activeTab} index={3}>
						<ImageStorageForm
							updateSettings={this.updateSettings}
							adminSettings={adminSettings}
						/>
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

export default withStyles(useStyles)(Settings);
