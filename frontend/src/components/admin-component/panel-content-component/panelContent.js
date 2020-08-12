import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExaminerPanel from './examiner-panel-component/examinerPanel';
import styles from './panelContent.module.css';

class PanelContent extends Component {
	render() {
		return (
			<div className='container-fluid p-0'>
				<div className={`${styles.heading} bg-dark text-white p-3`}>
					{this.props.panelHeading}
				</div>
				{this.props.panelWindow === 'examiner' ? <ExaminerPanel /> : null}
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

export default connect(mapStateToProps, null)(PanelContent);
