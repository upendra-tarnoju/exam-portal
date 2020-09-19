const initialState = {
	authenticated: false,
	examinerCount: {
		approved: 0,
		declined: 0,
		pending: 0,
	},
	sidebarToggle: false,
};

const adminReducers = (state = initialState, action) => {
	if (action.type === 'set_authenticated_user') {
		return {
			...state,
			authenticated: action.authenticated,
		};
	} else if (action.type === 'collapse_sidebar') {
		return {
			...state,
			sidebarToggle: action.toggle,
		};
	}
	return state;
};

export default adminReducers;
