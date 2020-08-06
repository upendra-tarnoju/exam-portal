import React from 'react';
import './signupStyles.css';

const ShowModal = ({ handleClose, show, message }) => {
	const showHideClassName = show ? 'modal d-block' : 'd-none';

	return (
		<div className={showHideClassName}>
			<div className='custom-modal-container'>
				<div className='custom-modal-content'>
					<div className='custom-modal-header'>
						<h5>Message</h5>
						<button
							type='button'
							className='custom-modal-button'
							onClick={handleClose}
						>
							<span>x</span>
						</button>
					</div>
					<div className='custom-modal-data px-3 py-2'>{message}</div>

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
