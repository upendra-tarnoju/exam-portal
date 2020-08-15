import React from 'react';
import styles from './sidebar.module.css';

const Sidebar = ({ content }) => {
	return (
		<div className='pt-3'>
			<div className='text-center'>
				<img
					alt='logo'
					src={require('../../assets/logo.png')}
					className={`${styles.logo}`}
				/>
				<h4 className='text-center text-light font-weight-normal'>
					Examin
				</h4>
			</div>
			{content}
		</div>
	);
};

export default Sidebar;
