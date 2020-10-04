import React from 'react';

import CreateStudent from './create-student-component/createStudent';

class Students extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			createStudent: true,
		};
	}
	render() {
		return <div>{this.state.createStudent ? <CreateStudent /> : null}</div>;
	}
}

export default Students;
