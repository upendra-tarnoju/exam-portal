import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
	MenuBook,
} from '@material-ui/icons';

import UserService from '../../../services/userApi';
import * as ActionType from '../../../action';

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

class ExaminerSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: '',
		};
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
							href='/examiner/exam'
							selected={selectedTab === 'exam'}
						>
							<ListItemIcon>
								<MenuBook />
							</ListItemIcon>
							<ListItemText primary='Exam' />
						</ListItem>
						<ListItem
							button
							component='a'
							href='/examiner/course'
							selected={selectedTab === 'course'}
						>
							<ListItemIcon>
								<Dashboard />
							</ListItemIcon>
							<ListItemText primary='Course' />
						</ListItem>

						<ListItem
							button
							component='a'
							href='/examiner/students'
							selected={selectedTab === 'students'}
						>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText primary='Student' />
						</ListItem>

						<ListItem
							button
							component='a'
							href='/examiner/settings'
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

const mapStateToProps = (state) => {
	return {
		toggle: state.adminReducer.sidebarToggle,
		name: state.adminReducer.name,
	};
};

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

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(withStyles(useStyles)(ExaminerSidebar))
);
