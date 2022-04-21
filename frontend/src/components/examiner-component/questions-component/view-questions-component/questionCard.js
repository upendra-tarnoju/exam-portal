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
	Grid,
	Switch,
	withStyles,
} from '@material-ui/core';
import React from 'react';
import { Edit, DeleteForever } from '@material-ui/icons';

const AntSwitch = withStyles((theme) => ({
	root: {
		width: 28,
		height: 16,
		padding: 0,
		display: 'flex',
	},
	switchBase: {
		padding: 2,
		color: theme.palette.grey[500],
		'&$checked': {
			transform: 'translateX(12px)',
			color: theme.palette.common.white,
			'& + $track': {
				opacity: 1,
				backgroundColor: theme.palette.primary.main,
				borderColor: theme.palette.primary.main,
			},
		},
	},
	thumb: {
		width: 12,
		height: 12,
		boxShadow: 'none',
	},
	track: {
		border: `1px solid ${theme.palette.grey[500]}`,
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: theme.palette.common.white,
	},
	checked: {},
}))(Switch);

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
				height='240'
				image={
					questionDetails.image === null
						? 'https://directory.bodc.in/images/parish/parish_details/No_Image_Available.jpg'
						: questionDetails.image
				}
			/>
			<CardContent>
				<div className='d-flex justify-content-between'>
					<div>
						<Typography variant='h5' component='h2'>
							Question {index + 1}
						</Typography>
						<Typography variant='body1' component='p' className='mt-1'>
							{questionDetails.question}
						</Typography>
					</div>
					<div className='align-self-center'>
						<Typography component='div'>
							<Grid component='label' container alignItems='center' spacing={1}>
								<Grid item>Inactive</Grid>
								<Grid item>
									<AntSwitch
										disabled={!props.status}
										checked={questionDetails.status === 'ACTIVE'}
										name='checkedC'
										onChange={(event) =>
											props.handleQuestionStatus(event, questionDetails._id)
										}
									/>
								</Grid>
								<Grid item>Active</Grid>
							</Grid>
						</Typography>
					</div>
				</div>
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
				<IconButton onClick={() => props.editQuestion(questionDetails._id)}>
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
