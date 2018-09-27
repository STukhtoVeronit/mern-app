import {call, put, takeLatest} from 'redux-saga/effects';
import {postUserLogin, postUserRegister} from '../api/authApi';
import {logoutUser, receiveRegisterUser, setCurrentUser} from '../actions/authActions';
import {CHECK_JWT_TOKEN, REGISTER_USER, USER_LOGIN, USER_LOGOUT} from "../actions/types";
import history from '../history';

import {receiveErrorAction} from '../actions/errorAction';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import store from "../store";
import {clearCurrentProfile} from "../actions/profileActions";

export function* watchCheckJwtToken() {
	yield takeLatest(CHECK_JWT_TOKEN, callCheckJwtToken);
}

function* callCheckJwtToken(action) {
	try {
		//
		if (localStorage.jwtToken) {
			setAuthToken(localStorage.jwtToken);
			// const decoded = jwt_decode(localStorage.jwtToken);
			// store.dispatch(setCurrentUser(decoded));
			// const currentTime = Date.now() / 1000;
			//
			// if (decoded.exp < currentTime) {
			// 	store.dispatch(logoutUser());
			// 	store.dispatch(clearCurrentProfile());
			// 	window.location.href = '/login';
			// }
		}
		//
		// const response = yield call(postUserRegister, userData);
		// yield put(receiveRegisterUser({email: response.data.email}));
		// history.push('/login');
	} catch (error) {
		// yield put(receiveErrorAction(error));
	}
}

export function* watchPushRegisterUser() {
	yield takeLatest(REGISTER_USER, callPushRegisterUser);
}

function* callPushRegisterUser(action) {
	try {
		const userData = action.payload;
		const response = yield call(postUserRegister, userData);
		yield put(receiveRegisterUser({email: response.data.email}));
		history.push('/login');
	} catch (error) {
		yield put(receiveErrorAction(error));
	}
}

export function* watchUserLogin() {
	yield takeLatest(USER_LOGIN, callPushUserLogin);
}

function* callPushUserLogin(action) {
	try {
		const userData = action.payload;
		const response = yield call(postUserLogin, userData);
		const {token} = response.data;
		localStorage.setItem('jwtToken', token);
		setAuthToken(token);
		const decoded = jwt_decode(token);
		yield put(setCurrentUser(decoded));
	} catch (error) {
		yield put(receiveErrorAction(error));
	}
}

export function* watchUserLogout() {
	yield takeLatest(USER_LOGOUT, callPushUserLogout);
}

function* callPushUserLogout() {
	try {
		localStorage.removeItem('jwtToken');
		setAuthToken(false);
		yield put(setCurrentUser({}));
	} catch (error) {
		yield put(receiveErrorAction(error));
	}
}