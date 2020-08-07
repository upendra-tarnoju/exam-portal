import React from 'react';
import styles from './signup.module.css';

const ShowModal = ({ handleClose, show, message }) => {
	const showHideClassName = show ? 'modal d-block' : 'd-none';

	return (
		<div className={showHideClassName}>
			<div className={`${styles.customModalContainer}`}>
				<div className={`${styles.customModalContent}`}>
					<div className={`${styles.customModalHeader}`}>
						<h5>Message</h5>
						<button
							type='button'
							className={`${styles.customModalButton}`}
							onClick={handleClose}
						>
							<span>x</span>
						</button>
					</div>
					<div className={`${styles.customModalData} px-3 py-2`}>
						{message}
					</div>

					<div className='px-3 py-2 d-flex flex-row-reverse'>
						<button
							type='button'
							className='btn btn-md btn-success'
							onClick={handleClose}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShowModal;
