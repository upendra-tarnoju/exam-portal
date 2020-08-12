const initialState = {
	panel: 'examiner',
	authenticated: false,
	panelHeading: 'Manage Examiner',
};

const adminReducers = (state = initialState, action) => {
	if (action.type === 'set_panel_window') {
		return {
			...state,
			panel: action.panelValue,
			panelHeading: action.panelHeading,
		};
	} else if (action.type === 'set_authenticated_user') {
		return {
			...state,
			authenticated: action.authenticated,
		};
	}
	return state;
};

export default adminReducers;
