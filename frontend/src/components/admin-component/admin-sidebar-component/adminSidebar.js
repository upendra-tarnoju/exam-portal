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
import { ChevronLeft, Dashboard, Person, Settings } from '@material-ui/icons';

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
								this.props.setSidebar(!this.props.toggle);
							}}
						>
							<ChevronLeft />
						</IconButton>
					</div>
					<List>
						<ListItem button>
							<ListItemIcon>
								<Dashboard />
							</ListItemIcon>
							<ListItemText primary='Dashboard' />
						</ListItem>

						<ListItem button>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText primary='Examiners' />
						</ListItem>

						<ListItem button>
							<ListItemIcon>
								<Settings />
							</ListItemIcon>
							<ListItemText primary='Settings' />
						</ListItem>
					</List>
				</div>
			</Drawer>
			// <div className='bg-dark' id='sidebar-wrapper'>
			// 	<div className='text-center pt-4'>
			// 		<img
			// 			alt='logo'
			// 			src={require('../../../assets/logo.png')}
			// 			className='logo'
			// 		/>
			// 		<h4 className='text-center text-light font-weight-normal'>Examin</h4>
			// 	</div>
			// 	<div className='list-group list-group-flush'>
			// 		<Link
			// 			to='/admin'
			// 			className={`list-group-item list-group-item-action bg-dark adminIcon ${
			// 				this.state.selectedTab === undefined
			// 					? 'text-white'
			// 					: 'text-white-50'
			// 			}`}
			// 		>
			// 			<i className='fa fa-desktop'></i> Dashboard
			// 		</Link>
			// 		<Link
			// 			to='/admin/examiner'
			// 			className={`list-group-item list-group-item-action bg-dark ${
			// 				this.state.selectedTab === 'examiner'
			// 					? 'text-white'
			// 					: 'text-white-50'
			// 			}`}
			// 		>
			// 			<i className='fa fa-user-circle'></i> Examiners
			// 		</Link>
			// 		<Link
			// 			to='/admin/exam'
			// 			className={`list-group-item list-group-item-action bg-dark ${
			// 				this.state.selectedTab === 'exam' ? 'text-white' : 'text-white-50'
			// 			}`}
			// 		>
			// 			<i className='fa fa-book'></i> Exam
			// 		</Link>
			// 		<Link
			// 			to='/admin/setting'
			// 			className={`list-group-item list-group-item-action bg-dark ${
			// 				this.state.selectedTab === 'settings'
			// 					? 'text-white'
			// 					: 'text-white-50'
			// 			}`}
			// 		>
			// 			<i className='fa fa-cog'></i> Settings
			// 		</Link>
			// 		<a
			// 			href='/login'

			// 			className='list-group-item cursor-pointer list-group-item-action bg-dark text-white-50'
			// 		>
			// 			<i className='fa fa-sign-out'></i> Log out
			// 		</a>
			// 	</div>
			// </div>
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
		name: state.adminReducer.name,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(withStyles(useStyles)(AdminSidebar))
);
