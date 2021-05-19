import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
	ChevronLeft,
	Dashboard,
	Person,
	Settings,
	SupervisorAccount,
} from '@material-ui/icons';

import * as ActionType from '../../../action';
import AdminService from '../../../services/adminApi';
import UserService from '../../../services/userApi';

const useStyles = (theme) => ({
	drawer: {
		width: '240px',
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: '240px',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		...theme.mixins.toolbar,
	},
	closeButton: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginTop: '10px',
	},
});

class AdminSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: '',
		};
		this.adminService = new AdminService();
		this.userService = new UserService();
	}

	componentDidMount() {
		let pathName = this.props.location.pathname.split('/')[2];
		this.setState({ selectedTab: pathName });
		this.props.history.listen((location, action) => {
			let pathName = location.pathname.split('/')[2];
			this.setState({ selectedTab: pathName });
		});
	}

	render() {
		let { classes, toggle } = this.props;
		let { selectedTab } = this.state;
		return (
			<Drawer
				variant='persistent'
				anchor='left'
				open={this.props.toggle}
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: toggle,
					[classes.drawerClose]: !toggle,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: toggle,
						[classes.drawerClose]: !toggle,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<div className={classes.closeButton}>
						<IconButton
							onClick={() => {
								this.props.setSidebar(!toggle);
							}}
						>
							<ChevronLeft />
						</IconButton>
					</div>
					<List>
						<ListItem
							button
							component='a'
							href='/admin'
							selected={selectedTab === undefined}
						>
							<ListItemIcon>
								<Dashboard />
							</ListItemIcon>
							<ListItemText primary='Dashboard' />
						</ListItem>

						<ListItem
							button
							component='a'
							href='/admin/examiner'
							selected={selectedTab === 'examiner'}
						>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText primary='Examiners' />
						</ListItem>

						<ListItem
							button
							component='a'
							href='/admin/subadmin/details'
							selected={selectedTab === 'subAdmin'}
						>
							<ListItemIcon>
								<SupervisorAccount />
							</ListItemIcon>
							<ListItemText primary='Sub admin' />
						</ListItem>

						<ListItem
							button
							component='a'
							href='/admin/setting'
							selected={selectedTab === 'settings'}
						>
							<ListItemIcon>
								<Settings />
							</ListItemIcon>
							<ListItemText primary='Settings' />
						</ListItem>
					</List>
				</div>
			</Drawer>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setSidebar: (toggle) => {
			dispatch({
				type: ActionType.COLLAPSE_SIDEBAR,
				toggle: toggle,
			});
		},
	};
};

const mapStateToProps = (state) => {
	return {
		toggle: state.adminReducer.sidebarToggle,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(withStyles(useStyles)(AdminSidebar))
);
