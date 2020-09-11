import React from 'react';

import styles from './question.module.css';

class Questions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			question: '',
			optionsType: '',
			totalOptions: [],
		};
		this.handleChange = this.handleChange.bind(this);
		this.showOptionInputs = this.showOptionInputs.bind(this);
	}

	handleChange(event) {
		let key = event.target.name;
		let value = event.target.value;
		let regex = /\d/g;
		if (regex.test(key)) {
			let optionNo = parseInt(key[key.length - 1], 10);
			let totalOptions = this.state.totalOptions;
			totalOptions[optionNo - 1][key].value = value;
			key = 'totalOptions';
			value = totalOptions;
		} else if (key === 'totalOptions') {
			let arr = [];
			let size = parseInt(value, 10);
			for (let i = 0; i < size; i++) {
				let innerKey = `option${i + 1}`;
				arr[i] = { [innerKey]: { value: '', error: '' } };
			}
			value = arr;
		}
		this.setState({ [key]: value });
	}

	showOptionInputs() {
		return this.state.totalOptions.map((option, index) => {
			return (
				<div className='form-group'>
					<label>Option {index + 1}</label>
					<input
						type='text'
						className='form-control'
						name={`option ${index + 1}`}
					/>
				</div>
			);
		});
	}

	render() {
		return (
			<div className='container'>
				<div
					className={`card ${styles.w60} mx-auto ${styles.questionCard}`}
				>
					<div
						className={`card-header text-center ${styles.questionHeader}`}
					>
						Add questions
					</div>
					<div className='card-body'>
						<div className='container'>
							<div className='form-group'>
								<label>Question</label>
								<textarea
									className={`form-control ${styles.textArea}`}
									value={this.state.question}
									rows='2'
									name='question'
									onChange={this.handleChange}
								></textarea>
							</div>
							<div className='form-group'>
								<label>Option type</label>
								<select
									name='optionsType'
									onChange={this.handleChange}
									value={this.state.optionsType}
									className='form-control'
								>
									<option value='none'>Select option</option>
									<option value='radio'>Single</option>
									<option value='checkbox'>Multiple</option>
								</select>
							</div>
							<div className='form-group'>
								<label>Total Options</label>
								<select
									className='form-control'
									name='totalOptions'
									value={this.state.totalOptions.length}
									onChange={this.handleChange}
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
							{this.state.totalOptions.map((option, index) => {
								let key = Object.keys(option)[0];
								return (
									<div className='form-group' key={key}>
										<label>Option {index + 1}</label>
										<input
											type='text'
											name={key}
											value={option.value}
											onChange={this.handleChange}
											className='form-control'
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Questions;
