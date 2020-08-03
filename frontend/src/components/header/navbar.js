import React, { Component } from 'react';

class Navbar extends Component {
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
					<ul className='navbar-nav ml-auto'>
						<li className='nav-item active'>
							<a className='text-light text-decoration-none' href='# '>
								Home
							</a>
						</li>
						<li className='nav-item'>
							<a className='text-light text-decoration-none' href='# '>
								Login
							</a>
						</li>
						<li className='nav-item'>
							<a
								className='text-light text-decoration-none'
								href='/signup'
							>
								Sign Up
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;
