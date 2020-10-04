import React from 'react';

import AddStudentForm from '../../../../../forms/addStudentForm';

class CreateStudent extends React.Component {
	render() {
		return (
			<div className='container py-5'>
				<div className='card w-50 mx-auto'>
					<div className='pt-3 pb-2'>
						<p className='text-center'>Add student</p>
						<div className='px-5'>
							<AddStudentForm />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateStudent;
