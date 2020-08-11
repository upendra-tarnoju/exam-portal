import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
	SignOutNavItems() {
		return (
			<ul className='navbar-nav ml-auto'>
				<li className='nav-item active'>
					<a className='text-light text-decoration-none' href='# '>
						Home
					</a>
				</li>
				<li className='nav-item'>
					<a className='text-light text-decoration-none' href='/login'>
						Login
					</a>
				</li>
				<li className='nav-item'>
					<a className='text-light text-decoration-none' href='/signup'>
						Sign Up
					</a>
				</li>
			</ul>
		);
	}

	AuthenticatedNavItems() {
		return (
			<ul className='navbar-nav ml-auto'>
				<li className='nav-item active'>
					<a className='text-light text-decoration-none' href='# '>
						Sign Out
					</a>
				</li>
			</ul>
		);
	}

	render() {
		return (
			<nav className='navbar navbar-expand-lg navbar-dark bg-primary px-5'>
				<a className='navbar-brand' href='/'>
					Examin
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarNavDropdown'
					aria-controls='navbarNavDropdown'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNavDropdown'>
					{this.props.authenticated ? (
						<this.AuthenticatedNavItems />
					) : (
						<this.SignOutNavItems />
					)}
				</div>
			</nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authenticated: state.adminReducer.authenticated,
	};
};

export default connect(mapStateToProps, null)(Navbar);
