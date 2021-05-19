import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	containerHeight: {
		height: 'calc(100% - 64px)',
	},
}));

const SubAdminSidebarContent = (props) => {
	const classes = useStyles();

	return (
		<div className={`bgGrey ${classes.containerHeight}`}>
			<Switch>
				<Redirect from='/subAdmin/*' to='/subAdmin' />
			</Switch>
		</div>
	);
};

export default SubAdminSidebarContent;
