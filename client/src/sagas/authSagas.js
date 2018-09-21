import {call, put, takeLatest} from 'redux-saga/effects';
import {postUserRegister} from '../api/authApi';
import {reciveRegisterUser} from '../actions/authActions';
import {REGISTER_USER} from "../actions/types";

import {receiveErrorAction} from '../actions/errorAction';

export function* watchPushRegisterUser() {
	yield takeLatest(REGISTER_USER, callPushRegisterUser);
}

function* callPushRegisterUser(action) {
	try {
		const {userData} = action.payload;
		const response = yield call(postUserRegister, userData);
		console.log(response);
		yield put(reciveRegisterUser(response.data, action.payload.history));
	} catch (error) {
		yield put(receiveErrorAction(error));
	}
}