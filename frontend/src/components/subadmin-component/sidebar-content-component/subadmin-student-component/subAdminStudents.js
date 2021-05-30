import React from 'react';
import { Button, Card, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import CreateStudentSelectionModal from '../../../../modals/createStudentSelectionModal';
import SubAdminService from '../../../../services/subAdminApi';

class SubAdminStudents extends React.Component {
	constructor() {
		super();
		this.state = {
			selectionModal: false,
		};
		this.subAdminService = new SubAdminService();
	}

	handleSelectionModal = (status) => {
		this.setState({ selectionModal: status });
	};

	downloadSampleStudentFile = () => {
		this.subAdminService.downloadExcelFile().then((res) => {
			let downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
			let link = document.createElement('a');
			link.href = downloadUrl;
			link.setAttribute('download', 'sample.xlsx');
			document.body.appendChild(link);
			link.click();
			link.remove();
		});
	};

	render() {
		let { selectionModal } = this.state;
		return (
			<div className='container py-5'>
				<Card className='p-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Students</Typography>
							<Typography variant='subtitle1'>View your students</Typography>
						</div>
						<div className='align-self-center'>
							<Button
								variant='contained'
								className='bg-dark text-white'
								startIcon={<Add />}
								onClick={() => this.handleSelectionModal(true)}
							>
								Create new
							</Button>
						</div>
					</div>
				</Card>
				<CreateStudentSelectionModal
					show={selectionModal}
					hideModal={this.handleSelectionModal}
					downloadSampleStudentFile={this.downloadSampleStudentFile}
				/>
			</div>
		);
	}
}

export default SubAdminStudents;
