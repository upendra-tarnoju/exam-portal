import React, { Component } from 'react';
import start from '../assets/start.png';

class Start extends Component {
	render() {
		return (
			<div className='container-fluid p-0'>
				<img className='img-cover' src={start} alt='start' />
			</div>
		);
	}
}

export default Start;
