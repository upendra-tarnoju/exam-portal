import React from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';

const SortExamMenu = (props) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (options) => {
		props.sortExams(options);
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				aria-controls='sort-menu'
				aria-haspopup='true'
				onClick={handleClick}
				variant='contained'
				color='primary'
				className='ml-2'
			>
				Sort Exam
			</Button>
			<Menu
				id='sort-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={() => handleClose('subject')}>Subject</MenuItem>
				<MenuItem onClick={() => handleClose('examCode')}>
					Exam code
				</MenuItem>
				<MenuItem onClick={() => handleClose('examDate')}>
					Exam date
				</MenuItem>
				<MenuItem onClick={() => handleClose('startTime')}>
					Start time
				</MenuItem>
				<MenuItem onClick={() => handleClose('endTime')}>End time</MenuItem>
				<MenuItem onClick={() => handleClose('createdAt')}>
					Created date
				</MenuItem>
			</Menu>
		</div>
	);
};

export default SortExamMenu;
