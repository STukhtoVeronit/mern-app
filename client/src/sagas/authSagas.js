import {call, put, takeLatest} from 'redux-saga/effects';
import {postUserRegister} from '../api/authApi';
import {reciveRegisterUser} from '../actions/authActions';
import {REGISTER_USER} from "../actions/types";
import history from '../history';

import {receiveErrorAction} from '../actions/errorAction';

export function* watchPushRegisterUser() {
	yield takeLatest(REGISTER_USER, callPushRegisterUser);
}

function* callPushRegisterUser(action) {
	try {
		const userData = action.payload;
		console.log(action.payload);
		const response = yield call(postUserRegister, userData);
		yield put(reciveRegisterUser({email: response.data.email}));
		history.push('/login');
	} catch (error) {
		yield put(receiveErrorAction(error));
	}
}