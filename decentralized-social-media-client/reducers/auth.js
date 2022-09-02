const initialState = {
	userProfile: {},
	loading: true,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_PROFILE":
			return {
				...state,
				loading: false,
				userProfile: action.payload.userProfile,
			};
		case "STOP_LOAD":
			return { ...state, loading: false };
		default:
			return state;
	}
};

export default authReducer;
