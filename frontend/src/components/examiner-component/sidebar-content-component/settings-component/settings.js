import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';

class Settings extends React.Component {
	render() {
		return (
			<div className='card mx-auto w-50 my-4'>
				<div className='card-header text-center'>Setting</div>
				<div className='card-body px-5'>
					<Formik initialValues={{ firstName: '', lastName: '' }}>
						{(formikProps) => (
							<Form>
								<Form.Group>
									<Form.Label>First name</Form.Label>
									<Form.Control />
								</Form.Group>
								<Form.Group>
									<Form.Label>Last name</Form.Label>
									<Form.Control />
								</Form.Group>
								<Form.Group>
									<Form.Label>Email Address</Form.Label>
									<Form.Control />
								</Form.Group>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		);
	}
}
export default Settings;
