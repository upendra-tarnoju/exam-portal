const initialState = {
	panel: '',
	authenticated: false,
};

const adminReducers = (state = initialState, action) => {
	if (action.type === 'set_panel_window') {
		return {
			...state,
			panel: action.panelValue,
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
