import React from 'react';
import {
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from '@material-ui/core';
import GaugeChart from 'react-gauge-chart';
import { connect } from 'react-redux';

const ViewQuestionDetails = (props) => {
	let { examDetails, questionImage } = props;
	let percent = examDetails.examMarks / examDetails.totalMarks;
	return (
		<Card>
			<CardActionArea className='bg-dark text-white py-3 px-4'>
				<Typography variant='h5'>Exam details</Typography>
			</CardActionArea>
			<CardContent>
				<div className='container'>
					<div className='d-flex justify-content-between px-5 mb-2'>
						<Typography className='font-weight-bold'>Exam code</Typography>
						<Typography>{examDetails.examCode}</Typography>
					</div>
					<div className='d-flex justify-content-between px-5 mb-2'>
						<Typography className='font-weight-bold'>Subject</Typography>
						<Typography>{examDetails.subject}</Typography>
					</div>
					<div className='d-flex justify-content-between px-5 mb-2'>
						<Typography className='font-weight-bold'>Total marks</Typography>
						<Typography>{examDetails.totalMarks}</Typography>
					</div>
					<div className='row'>
						<div className='col-md-12 text-center'>
							<Typography className='font-weight-bold'>
								Exam marks Gauge
							</Typography>
						</div>
						<div className='col-md-12 justify-content-center d-flex'>
							<GaugeChart
								id='gauge-chart2'
								style={{ width: 400 }}
								nrOfLevels={3}
								arcPadding={0.05}
								textColor='#00FF00'
								colors={['#5BE12C', '#F5CD19', '#EA4228']}
								percent={percent || 0}
							/>
						</div>
						{questionImage !== '' ? (
							<div className='col-md-12'>
								<Typography className='text-center font-weight-bold'>
									Question Image
								</Typography>
								<img
									src={questionImage}
									className='w-100'
									alt='question_image'
								/>
							</div>
						) : null}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const mapStateToProps = (state) => {
	return {
		examDetails: state.examReducer.examDetails,
		questionImage: state.examinerReducer.questionImage,
	};
};

export default connect(mapStateToProps)(ViewQuestionDetails);
