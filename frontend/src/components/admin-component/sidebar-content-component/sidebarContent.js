import React, { Component } from 'react';
import { connect } from 'react-redux';

import ViewExaminers from './view-examiners-component/viewExaminers';
import * as ActionType from '../../../action';

class SidebarContent extends Component {
	constructor(props) {
		super(props);
		this.handleSidebar = this.handleSidebar.bind(this);
	}
	handleSidebar() {
		let toggle = this.props.toggle;
		this.props.setSidebar(!toggle);
	}
	render() {
		return (
			<div id='page-content-wrapper'>
				<nav className='navbar navbar-expand-lg navbar-light bg-dark border-bottom justify-content-start'>
					<button
						type='button'
						className='btn btn-primary'
						onClick={this.handleSidebar}
					>
						<i className='fa fa-bars'></i>
					</button>
					<span className='ml-2 text-white'>
						{this.props.panelHeading}
					</span>
				</nav>
				{this.props.panelWindow === 'examiner' ? <ViewExaminers /> : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		panelWindow: state.adminReducer.panel,
		panelHeading: state.adminReducer.panelHeading,
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
