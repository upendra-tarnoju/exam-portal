import React from 'react';
import {
	Button,
	MenuItem,
	TextField,
	Typography,
	Select,
	Table,
	TableHead,
	TableRow,
	TableCell,
	withStyles,
	TableBody,
	TableContainer,
	Tooltip,
	IconButton,
	makeStyles,
	FormControlLabel,
	Radio,
	Checkbox,
	FormControl,
	FormHelperText,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';

import styles from '../../components/examiner-component/sidebar-content-component/questions-component/question.module.css';
import schema from '../../schema/questionSchema';
import NewQuestionOptionModal from '../../modals/newQuestionOptionModal';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const BootstrapTooltip = (props) => {
	const classes = useStylesBootstrap();
	return <Tooltip arrow classes={classes} {...props} />;
};

const useStylesBootstrap = makeStyles((theme) => ({
	arrow: {
		color: theme.palette.common.black,
	},
	tooltip: {
		backgroundColor: theme.palette.common.black,
	},
}));

class AddQuestionForm extends React.Component {
	constructor() {
		super();
		this.state = {
			optionsList: [],
			description: '',
			optionModal: { show: false },
		};
	}

	handleOptionModal = (show, optionType, formikProps) => {
		if (show) {
			if (optionType !== '') this.setState({ optionModal: { show } });
			else
				this.props.handleSnackBar(true, 'Option type is not selected', 'error');
		} else {
			formikProps.setFieldValue('option', '');
			this.setState({ optionModal: { show } });
		}
	};

	addNewQption = (formikProps) => {
		let option = formikProps.values.option;
		let { optionsList } = this.state;
		let index = optionsList.length + 1;
		optionsList.push({ key: `option${index}`, value: option, answer: false });
		this.setState({ optionsList: optionsList, optionModal: { show: false } });
		formikProps.setFieldValue('option', '');
	};

	removeOption = (index) => {
		let { optionsList } = this.state;
		optionsList = optionsList.filter((option, optIndex) => optIndex !== index);
		this.setState({ optionsList });
	};

	handleCorrectAnswerChange = (index, optionType) => {
		let { optionsList } = this.state;
		if (optionType === 'single') {
			optionsList.forEach((option, optIndex) => {
				if (optIndex === index) option.answer = true;
				else option.answer = false;
			});
		} else {
			optionsList.forEach((option, optIndex) => {
				if (optIndex === index)
					if (option.answer) option.answer = false;
					else option.answer = true;
			});
		}
		this.setState({ optionsList });
	};

	render() {
		let { optionModal, optionsList } = this.state;
		return (
			<Formik
				validationSchema={schema}
				onSubmit={(values, formikProps) =>
					this.props
						.handleSubmit(values, optionsList)
						.then((response) => {
							this.props.handleSnackBar(true, response.data.msg, 'success');
							formikProps.resetForm();
							this.setState({ optionsList: [] });
						})
						.catch((err) => {
							this.props.handleSnackBar(true, err.response.data.msg, 'error');
						})
				}
				initialValues={{
					question: '',
					description: '',
					questionMark: '',
					optionType: '',
					option: '',
				}}
			>
				{(formikProps) => (
					<Form
						onSubmit={formikProps.handleSubmit}
						encType='multipart/form-data'
					>
						<Typography>Question</Typography>
						<TextField
							variant='outlined'
							className='w-100 mt-1'
							name='question'
							multiline
							rows={3}
							value={formikProps.values.question}
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							error={
								formikProps.touched.question && !!formikProps.errors.question
							}
							helperText={
								formikProps.touched.question && formikProps.errors.question
							}
						/>

						<div className='mt-3'>
							<Typography className='mb-1'>Description</Typography>
							<Editor
								value={formikProps.values.description}
								apiKey='tyd8ijnwqgb5p418emk3m1c82tzuxf0c6o55jy9w4dtj6erh'
								init={{
									height: 400,
									menubar: true,
									plugins: [
										'advlist autolink lists link image',
										'charmap print preview anchor help',
										'searchreplace visualblocks code',
										'insertdatetime media table paste wordcount',
									],
									toolbar:
										'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help',
								}}
								onEditorChange={(content) => {
									formikProps.setFieldValue('description', content);
								}}
							/>
						</div>
						<div className='row mt-3'>
							<div className='col-md-6'>
								<Typography>Question marks</Typography>
								<TextField
									name='questionMark'
									className='w-100 mt-1'
									variant='outlined'
									value={formikProps.values.questionMark || ''}
									onChange={(event) => {
										let regex = /^[0-9\b]+$/;
										if (
											regex.test(event.target.value) ||
											event.target.value === ''
										) {
											formikProps.setFieldValue(
												'questionMark',
												event.target.value
											);
										}
									}}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.questionMark &&
										!!formikProps.errors.questionMark
									}
									helperText={
										formikProps.touched.questionMark &&
										formikProps.errors.questionMark
									}
								/>
							</div>
							<div className='col-md-6'>
								<Typography>Option type</Typography>
								<FormControl className='w-100'>
									<Select
										variant='outlined'
										className='w-100 mt-1'
										name='optionType'
										value={formikProps.values.optionType}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.optionType &&
											!!formikProps.errors.optionType
										}
										label='optionType'
										inputProps={{
											name: 'optionType',
											id: 'outlined-age-native-simple',
										}}
									>
										<MenuItem value='single'>Single</MenuItem>
										<MenuItem value='multiple'>Multiple</MenuItem>
									</Select>
									<FormHelperText error>
										{formikProps.touched.optionType &&
											formikProps.errors.optionType}
									</FormHelperText>
								</FormControl>
							</div>
						</div>
						<div className='d-flex justify-content-between mt-3'>
							<div>
								<input
									accept='image/*'
									className='d-none align-self-center'
									onChange={this.props.handleFileChange}
									id='questionImage'
									name='questionImage'
									type='file'
								/>
								<label htmlFor='questionImage'>
									<Button
										className={
											this.props.image !== null ? styles.btnSuccess : null
										}
										variant='contained'
										color='primary'
										component='span'
									>
										Upload
									</Button>
								</label>
								{this.props.image !== null ? (
									<i
										className={`fa fa-trash ${styles.removeButton}`}
										onClick={this.props.removeQuestionImage}
									></i>
								) : null}
							</div>
							<div className='align-self-center'>
								<Button
									variant='outlined'
									className='bg-dark text-white'
									onClick={() =>
										this.handleOptionModal(true, formikProps.values.optionType)
									}
								>
									Add Option
								</Button>
							</div>
						</div>
						<TableContainer>
							<Table className='mt-3'>
								<colgroup>
									<col style={{ width: '10%' }} />
									<col style={{ width: '50%' }} />
									<col style={{ width: '20%' }} />
									<col style={{ width: '20%' }} />
								</colgroup>
								<TableHead>
									<TableRow>
										<StyledTableCell>S.no</StyledTableCell>
										<StyledTableCell>Option</StyledTableCell>
										<StyledTableCell>Correct answer</StyledTableCell>
										<StyledTableCell>Action</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{optionsList.map((option, index) => (
										<StyledTableRow key={index}>
											<StyledTableCell>{index + 1}</StyledTableCell>
											<StyledTableCell>{option.value}</StyledTableCell>
											<StyledTableCell>
												{formikProps.values.optionType === 'single' ? (
													<Radio
														checked={option.answer}
														onChange={() =>
															this.handleCorrectAnswerChange(
																index,
																formikProps.values.optionType
															)
														}
													/>
												) : (
													<FormControlLabel
														control={
															<Checkbox
																onChange={() =>
																	this.handleCorrectAnswerChange(
																		index,
																		formikProps.values.optionType
																	)
																}
																checked={option.answer}
															/>
														}
													/>
												)}
											</StyledTableCell>
											<StyledTableCell>
												<BootstrapTooltip title='Edit option'>
													<IconButton
														size='small'
														onClick={() => this.removeOption(index)}
													>
														<Delete size='small' />
													</IconButton>
												</BootstrapTooltip>
												<BootstrapTooltip title='Delete option'>
													<IconButton size='small'>
														<Edit size='small' />
													</IconButton>
												</BootstrapTooltip>
											</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<div className='d-flex justify-content-end'>
							<Button
								variant='outlined'
								className='bg-dark text-white mt-3'
								type='submit'
								size='large'
							>
								Create
							</Button>
						</div>
						<NewQuestionOptionModal
							show={optionModal.show}
							hideModal={this.handleOptionModal}
							addNewQption={this.addNewQption}
							formikProps={formikProps}
						/>
					</Form>
				)}
			</Formik>
		);
	}
}

export default AddQuestionForm;
