import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewExaminers from './view-examiners-component/viewExaminers';
import styles from './sidebarContent.module.css';

class SidebarContent extends Component {
	render() {
		return (
			<div className='container-fluid p-0'>
				<div
					className={`${styles.heading} bg-dark text-white p-3 sticky-top`}
				>
					{this.props.panelHeading}
				</div>
				{this.props.panelWindow === 'examiner' ? <ViewExaminers /> : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		panelWindow: state.adminReducer.panel,
		panelHeading: state.adminReducer.panelHeading,
	};
};

export default connect(mapStateToProps, null)(SidebarContent);
