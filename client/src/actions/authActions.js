import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {SET_CURRENT_USER, REGISTER_USER, SET_USER_EMAIL} from "./types";
import {receiveErrorAction} from "./errorAction";

// Register USER
export const registerUser = userData => ({
		type: REGISTER_USER,
		payload: userData
});

export const reciveRegisterUser = userData => ({
		type: SET_USER_EMAIL,
		payload: userData
	});

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
export const logoutUser = () => dispatch => {
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