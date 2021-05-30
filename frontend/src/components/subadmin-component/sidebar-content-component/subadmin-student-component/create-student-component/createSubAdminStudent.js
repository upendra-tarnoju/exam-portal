import React from 'react';
import { Card, Typography } from '@material-ui/core';

const CreateSubAdminStudent = (props) => {
	return (
		<div className='container py-5'>
			<Card className='p-3'>
				<div className='d-xs-block d-md-flex justify-content-between'>
					<div>
						<Typography variant='h4'>Student</Typography>
						<Typography variant='subtitle1'>Create new student</Typography>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default CreateSubAdminStudent;
