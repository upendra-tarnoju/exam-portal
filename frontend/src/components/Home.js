import React from 'react';

import styles from './home.module.css';

const Home = () => {
	return (
		<div>
			<nav className='navbar navbar-expand-lg bg-white'>
				<a className={`navbar-brand ${styles.navbarHeading}`}>
					<img
						src={require('../assets/logo.png')}
						width='40'
						height='40'
						className='align-top mr-2'
					/>
					Examin
				</a>
				<div className='collapse navbar-collapse'>
					<ul className='navbar-nav ml-auto'>
						<li className={`mx-2 ${styles.navbarItem} cursor-pointer`}>
							<a href='/login' className='text-dark'>
								Login
							</a>
						</li>
						<li className={`mx-2 ${styles.navbarItem} cursor-pointer`}>
							<a href='/signup' className='text-dark'>
								Signup
							</a>
						</li>
						<li className={`mx-2 ${styles.navbarItem} cursor-pointer`}>
							<a href='/pricing' className='text-dark'>
								Pricing
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Home;
