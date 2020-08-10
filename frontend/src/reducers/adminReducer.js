const initialState = {
	panel: '',
};

const adminReducers = (state = initialState, action) => {
	if (action.type === 'set_admin_panel') {
		return {
			...state,
			panel: action.panelValue,
		};
	}
	return state;
};

export default adminReducers;
