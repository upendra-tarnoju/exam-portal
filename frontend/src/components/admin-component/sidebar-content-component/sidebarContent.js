import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import ViewExaminers from './view-examiners-component/viewExaminers';
import * as ActionType from '../../../action';

const SidebarContent = (props) => {
	let handleSidebar = () => {
		let toggle = props.toggle;
		props.setSidebar(!toggle);
	};
	return (
		<div id='page-content-wrapper'>
			<nav className='navbar navbar-expand-lg navbar-light bg-dark border-bottom justify-content-start'>
				<button
					type='button'
					className='btn btn-primary'
					onClick={handleSidebar}
				>
					<i className='fa fa-bars'></i>
				</button>
			</nav>
			<Switch>
				<Route
					exact
					path='/admin/examiner'
					component={ViewExaminers}
				></Route>
			</Switch>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		toggle: state.adminReducer.sidebarToggle,
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent);
