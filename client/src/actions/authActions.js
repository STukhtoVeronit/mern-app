import {
	SET_CURRENT_USER,
	REGISTER_USER,
	SET_USER_EMAIL,
	USER_LOGIN,
	USER_LOGOUT
} from "./types";

// Register USER
export const registerUser = userData => ({
	type: REGISTER_USER,
	payload: userData
});

export const receiveRegisterUser = userData => ({
	type: SET_USER_EMAIL,
	payload: userData
});

// Login - get User token
export const loginUser = (userData) => ({
	type: USER_LOGIN,
	payload: userData
});

// Logout User
export const logoutUser = () => ({
	type: USER_LOGOUT
});

//Set current user
export const setCurrentUser = (decoded) => ({
		type: SET_CURRENT_USER,
		payload: decoded
});