const initialState = {
	userProfile: {},
	isLoading: true,
	isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SIGN_IN':
			return {
				...state,
				isLoading: false,
				userProfile: action.payload.userProfile,
				isLoggedIn: true,
			};
		case 'SIGN_OUT':
			return {
				...state,
				isLoading: true,
				userProfile: {},
				isLoggedIn: false,
			};
		case 'SET_PROFILE':
			return {
				...state,
				userProfile: action.payload.userProfile,
			};
		case 'SET_POST':
			return {
				...state,
				userProfile: action.payload.userProfile,
			};
		case 'STOP_LOAD':
			return { ...state, loading: false };
		default:
			return state;
	}
};

export default authReducer;
