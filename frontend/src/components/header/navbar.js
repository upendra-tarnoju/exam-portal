import React from 'react';
import { useLocation } from 'react-router';

import styles from '../home.module.css';

const Navbar = () => {
	const location = useLocation();
	const [active, setActive] = React.useState('');

	React.useEffect(() => {
		setActive(location.pathname.split('/')[1]);
	}, [location]);

	return (
		<nav className='navbar navbar-expand-lg bg-white'>
			<a className={`navbar-brand ${styles.navbarHeading}`}>
				<img
					src={require('../../assets/logo.png')}
					width='40'
					height='40'
					className='align-top mr-2'
				/>
				Examin
			</a>
			<div className='collapse navbar-collapse'>
				<ul className='navbar-nav ml-auto'>
					<li
						className={`mx-2 ${styles.navbarItem} cursor-pointer ${
							active === 'login' ? styles.activeTab : 'mt-1'
						}`}
					>
						<a
							href='/login'
							className={`${active === 'login' ? 'text-white' : 'text-dark'} `}
						>
							Login
						</a>
					</li>
					<li
						className={`mx-2 ${styles.navbarItem} cursor-pointer ${
							active === 'signup' ? styles.activeTab : 'mt-1'
						}`}
					>
						<a
							href='/signup'
							className={`${active === 'signup' ? 'text-white' : 'text-dark'} `}
						>
							Signup
						</a>
					</li>
					<li
						className={`mx-2 ${styles.navbarItem} cursor-pointer ${
							active === 'pricing' ? styles.activeTab : 'mt-1'
						}`}
					>
						<a
							href='/pricing'
							className={`${
								active === 'pricing' ? 'text-white' : 'text-dark'
							} `}
						>
							Pricing
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
