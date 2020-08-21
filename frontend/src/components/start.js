import React, { Component } from 'react';
import start from '../assets/start.png';
import Navbar from './header/navbar';

class Start extends Component {
	render() {
		return (
			<div className='container-fluid p-0'>
				<Navbar />
				<img className='img-cover' src={start} alt='start' />
			</div>
		);
	}
}

export default Start;
