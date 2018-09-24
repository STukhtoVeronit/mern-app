import {call, put, takeLatest} from 'redux-saga/effects';
import {postUserLogin, postUserRegister} from '../api/authApi';
import {reciveRegisterUser, setCurrentUser} from '../actions/authActions';
import {REGISTER_USER, USER_LOGIN, USER_LOGOUT} from "../actions/types";
import history from '../history';

import {receiveErrorAction} from '../actions/errorAction';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export function* watchPushRegisterUser() {
	yield takeLatest(REGISTER_USER, callPushRegisterUser);
}

function* callPushRegisterUser(action) {
	try {
		const userData = action.payload;
		const response = yield call(postUserRegister, userData);
		yield put(reciveRegisterUser({email: response.data.email}));
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