import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class StudentSidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: '',
		};
	}

	componentDidMount() {
		let pathName = this.props.location.pathname.split('/')[2];
		this.setState({ selectedTab: pathName });
		this.props.history.listen((location, action) => {
			let pathName = location.pathname.split('/')[2];
			this.setState({ selectedTab: pathName });
		});
	}

	render() {
		return (
			<div className='bg-dark' id='sidebar-wrapper'>
				<div className='text-center pt-4'>
					<img
						alt='logo'
						src={require('../../../assets/logo.png')}
						className='logo'
					/>
					<h4 className='text-center text-light font-weight-normal'>
						Examin
					</h4>
				</div>
				<div className='list-group list-group-flush'>
					<Link
						to='/student/exam'
						className={`list-group-item list-group-item-action bg-dark adminIcon ${
							this.state.selectedTab === 'exam'
								? 'text-white'
								: 'text-white-50'
						}`}
					>
						<i className='fa fa-book'></i> Exam
					</Link>
					<a
						href='/login'
						onClick={() => {
							this.userService.removeCookie();
							this.props.setAuthenticatedUser(false);
							this.props.history.push('/login');
						}}
						className='list-group-item cursor-pointer list-group-item-action bg-dark text-white-50'
					>
						<i className='fa fa-sign-out'></i> Sign Out
					</a>
				</div>
			</div>
		);
	}
}

export default withRouter(StudentSidebar);
