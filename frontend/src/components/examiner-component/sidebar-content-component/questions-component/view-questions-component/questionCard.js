import {
	ButtonGroup,
	Card,
	CardContent,
	CardMedia,
	Paper,
	Typography,
	Button,
	CardActions,
	IconButton,
} from '@material-ui/core';
import React from 'react';
import { Edit, DeleteForever } from '@material-ui/icons';

const QuestionCard = (props) => {
	let { questionDetails, index } = props;

	let rows = [...Array(Math.ceil(questionDetails.options.length / 2))];

	let optionRows = rows.map((row, index) =>
		questionDetails.options.slice(index * 2, index * 2 + 2)
	);

	let optionContent = optionRows.map((row, index) => (
		<div className='row' key={index}>
			{row.map((option, innerIndex) => (
				<div key={option._id} className='col-md-6 py-2'>
					<Paper className='border border-dark p-3 rounded'>
						<Typography>
							{index * 2 + innerIndex + 1}) {option.value}
						</Typography>
					</Paper>
				</div>
			))}
		</div>
	));

	return (
		<Card key={questionDetails._id} className='my-5'>
			<CardMedia
				component='img'
				height='140'
				image={
					questionDetails.image === null
						? 'https://directory.bodc.in/images/parish/parish_details/No_Image_Available.jpg'
						: 'bye'
				}
			/>
			<CardContent>
				<Typography variant='h5' component='h2'>
					Question {index + 1}
				</Typography>
				<Typography variant='body1' component='p' className='mt-1'>
					{questionDetails.question}
				</Typography>
				{optionContent}
				<Typography variant='h6' component='h2' className='mb-1'>
					Correct answer
				</Typography>
				<ButtonGroup>
					{questionDetails.options.map((option, index) => (
						<Button
							key={index}
							size='large'
							disabled={!questionDetails.correctAnswer.includes(option.key)}
						>
							Option {index + 1}
						</Button>
					))}
				</ButtonGroup>
			</CardContent>
			<CardActions className='d-flex justify-content-end' disableSpacing>
				<IconButton>
					<Edit />
				</IconButton>
				<IconButton
					onClick={() => props.handleDeleteDialog(true, questionDetails._id)}
				>
					<DeleteForever />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default QuestionCard;
