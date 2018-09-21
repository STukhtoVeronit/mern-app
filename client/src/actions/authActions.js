import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS, SET_CURRENT_USER, REGISTER_USER} from "./types";
import {receiveErrorAction} from "./errorAction";

//TODO: Ask how to dispatch history to saga
// Register USER
export const registerUser = (userData, history) => {
	return {
		type: REGISTER_USER,
		payload: {userData, history}
	}
	// axios
	// 		.post('/api/users/register', userData)
	// 		.then(res => history.push('/login'))
	// 		.catch(err => dispatch(receiveErrorAction(err)));
};

export const reciveRegisterUser = (userData, history) => {
	history.push('/login');
};

// Login - get User token
export const loginUser = (userData) => dispatch => {
	axios
			.post('/api/users/login', userData)
			.then(res => {
				const {token} = res.data;
				localStorage.setItem('jwtToken', token);
				setAuthToken(token);
				const decoded = jwt_decode(token);
				dispatch(setCurrentUser(decoded));
			})
			.catch(err => dispatch(receiveErrorAction(err)));
};

// Logout User
export const logoutUser = (history) => dispatch => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};

//Set current user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
};