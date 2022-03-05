const initialState = {
	authenticated: false,
	role: '',
	name: '',
	examinerCount: {
		approved: 0,
		declined: 0,
		pending: 0,
	},
	sidebarToggle: false,
};

const capitalizeName = (name) => {
	return name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
};

const adminReducers = (state = initialState, action) => {
	if (action.type === 'set_authenticated_user') {
		let name = '';
		if (action.firstName !== undefined) {
			name = `${capitalizeName(action.firstName)} ${capitalizeName(
				action.lastName
			)}`;
		}
		return {
			...state,
			authenticated: action.authenticated,
			name: name,
			role: action.role,
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
