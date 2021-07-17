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
		this.adminService.sendEmail(values).then((res) => {});
	};

	updateSettings = (values) => {
		this.adminService
			.updateSettings({ smtpCredentials: values })
			.then((res) => {});
	};

	render() {
		const { classes } = this.props;
		const { activeTab, emailAddressList, adminSettings } = this.state;
		return (
			<div className='p-5'>
				<Card className='p-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Settings</Typography>
							<Typography variant='subtitle1'>
								View your panel settings
							</Typography>
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
							</Tabs>
						</div>
					</div>
				</Card>
				<Card className='p-3 mt-4'>
					<TabPanel value={activeTab} index={0}>
						<div className={classes.emailContainer}>
							<EmailForm
								emailAddressList={emailAddressList}
								sendEmail={this.sendEmail}
							/>
						</div>
					</TabPanel>
					<TabPanel value={activeTab} index={1}>
						Item two
					</TabPanel>
					<TabPanel value={activeTab} index={2}>
						<STMPForm
							updateSettings={this.updateSettings}
							adminSettings={adminSettings}
						/>
					</TabPanel>
				</Card>
			</div>
		);
	}
}

export default withStyles(useStyles)(Settings);
