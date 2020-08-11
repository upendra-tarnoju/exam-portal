import React, { Component } from 'react';
import { connect } from 'react-redux';

class PanelContent extends Component {
	render() {
		return <p>Panel Window</p>;
	}
}

const mapStateToProps = (state) => {
	return {
		authenticated: state.adminReducer.authenticated,
	};
};

export default connect(mapStateToProps, null)(PanelContent);
