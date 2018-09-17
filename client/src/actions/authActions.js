import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS, SET_CURRENT_USER} from "./types";

// Register USER
export const registerUser = (userData, history )=> dispatch => {
	axios
			.post('/api/users/register', userData)
			.then(res => history.push('/login'))
			.catch(err =>
					dispatch({
						type: GET_ERRORS,
						payload: err.response.data
					})
			);
};

// Login - get User token
export const loginUser = (userData, history )=> dispatch => {
	axios
			.post('/api/users/login', userData)
			.then(res => {
				const {token} = res.data;
				localStorage.setItem('jwtToken', token);
				setAuthToken(token);
				const decoded = jwt_decode(token);
				dispatch(setCurrentUser(decoded));
			})
			.catch(err =>
					dispatch({
						type: GET_ERRORS,
						payload: err.response.data
					})
			);
};

// Logout User
export const logoutUser = ( history )=> dispatch => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};

//Set current user
export const setCurrentUser = (decoded) =>{
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
};