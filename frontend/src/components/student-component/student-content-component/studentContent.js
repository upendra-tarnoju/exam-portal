import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import * as ActionType from '../../../action';
import ExamList from './exam-list-component/examList';

const StudentContent = (props) => {
	console.log(props);
	let handleSidebar = () => {
		let toggle = props.toggle;
		props.setSidebar(!toggle);
	};

	return (
		<div id='page-content-wrapper'>
			<nav className='navbar navbar-expand-lg navbar-light bg-dark border-bottom justify-content-between align-items-center'>
				<button
					type='button'
					className='btn btn-primary'
					onClick={handleSidebar}
				>
					<i className='fa fa-bars'></i>
				</button>
				<div>
					<img
						src='https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png'
						height='45px'
						alt='pic'
						className='mr-2'
					/>
					<span className='text-white'>Hie, {props.name}</span>
				</div>
			</nav>
			<Switch>
				<Route exact path='/student/exam' component={ExamList} />
			</Switch>
		</div>
	);
};

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

export default connect(mapStateToProps, mapDispatchToProps)(StudentContent);
