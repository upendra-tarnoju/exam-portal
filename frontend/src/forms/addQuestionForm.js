import React from 'react';
import { Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import styles from '../components/examiner-component/sidebar-content-component/questions-component/question.module.css';

const AddQuestionForm = ({
	submitQuestion,
	state,
	handleChange,
	handleOptionTypeChange,
	handleFileChange,
	handleOptionChange,
	handleSnackBar,
}) => {
	return (
		<form onSubmit={submitQuestion} encType='multipart/form-data'>
			<div className='card-body'>
				<div className='container'>
					<div className='form-group'>
						<label>
							Question{' '}
							{state.question.error ? (
								<span className='text-danger'>
									{state.question.error}
								</span>
							) : null}
						</label>
						<textarea
							className={`form-control ${styles.textArea}`}
							value={state.question.value}
							rows='2'
							name='question'
							onChange={handleChange}
						></textarea>
					</div>
					<div className='form-group'>
						<label>
							Option type{' '}
							{state.optionsType.error ? (
								<span className='text-danger'>
									{state.optionsType.error}
								</span>
							) : null}
						</label>
						<select
							name='optionsType'
							onChange={handleOptionTypeChange}
							value={state.optionsType.value}
							className='form-control'
						>
							<option value='none'>Select option</option>
							<option value='single'>Single</option>
							<option value='multiple'>Multiple</option>
						</select>
					</div>
					<div className='form-group'>
						<label className='w-100'>Image</label>
						<input
							accept='image/*'
							className='d-none'
							onChange={handleFileChange}
							id='questionImage'
							name='questionImage'
							type='file'
						/>
						<label htmlFor='questionImage'>
							<Button
								variant='contained'
								color='primary'
								component='span'
								size='large'
							>
								Upload
							</Button>
						</label>
					</div>
					<div className='form-group'>
						<label>
							Total Options
							{state.optionsType.error ? (
								<span className='text-danger'>
									{state.options.error}
								</span>
							) : null}
						</label>
						<select
							className='form-control'
							name='options'
							value={state.options.value.length}
							onChange={handleOptionChange}
						>
							<option value='0'>Select number</option>
							<option value='1'>1</option>
							<option value='2'>2</option>
							<option value='3'>3</option>
							<option value='4'>4</option>
							<option value='5'>5</option>
							<option value='6'>6</option>
						</select>
					</div>
					{state.options.value.map((option, index) => {
						let key = Object.keys(option)[0];
						return (
							<div className='form-group' key={key}>
								<label>
									Option {index + 1}
									{option[key].error ? (
										<span className='text-danger'>
											{option[key].error}
										</span>
									) : null}
								</label>
								<input
									type='text'
									name={key}
									value={option[key].value}
									onChange={handleChange}
									className='form-control'
								/>
							</div>
						);
					})}
					{state.correctAnswer.show && state.options.value.length !== 0 ? (
						state.optionsType.value === 'single' ? (
							<div className='form-group'>
								<label>
									Correct answer
									{state.correctAnswer.error ? (
										<span className='text-danger'>
											{state.correctAnswer.error}
										</span>
									) : null}
								</label>
								<select
									className='form-control'
									name='single'
									onChange={handleChange}
									value={state.correctAnswer.value[0]}
								>
									<option>Select correct option</option>
									{state.options.value.map((option, index) => {
										let key = Object.keys(option)[0];
										return (
											<option key={key} value={`option${index + 1}`}>
												Option {index + 1}
											</option>
										);
									})}
								</select>
							</div>
						) : (
							<div className='form-group'>
								<label>
									Correct answer
									{state.correctAnswer.error ? (
										<span className='text-danger'>
											{state.correctAnswer.error}
										</span>
									) : null}
								</label>
								<select
									multiple
									size='2'
									className='form-control'
									name='multiple'
									onChange={handleChange}
									value={state.correctAnswer.value}
								>
									{state.options.value.map((option, index) => {
										let key = Object.keys(option)[0];
										return (
											<option key={key} value={key}>
												Option {index + 1}
											</option>
										);
									})}
								</select>
							</div>
						)
					) : null}
				</div>
			</div>
			<div className='card-footer'>
				<div className='float-right'>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						className='mr-2'
					>
						{!state.editExam ? 'Create' : 'Update'}
					</Button>
					<input
						accept='.xlsx, .xls , .csv'
						className='d-none'
						id='uploadExam'
						name='uploadExam'
						type='file'
					/>
					<label htmlFor='uploadExam'>
						<Button
							variant='contained'
							color='primary'
							component='span'
							size='large'
							className='bg-success'
						>
							Upload
						</Button>
					</label>
				</div>
			</div>
			<Snackbar
				open={state.snackbar.show}
				autoHideDuration={6000}
				onClose={() => handleSnackBar(false, '')}
			>
				<MuiAlert
					elevation={6}
					variant='filled'
					onClose={() => handleSnackBar(false, '')}
					severity='success'
				>
					{state.snackbar.msg}
				</MuiAlert>
			</Snackbar>
		</form>
	);
};

export default AddQuestionForm;
