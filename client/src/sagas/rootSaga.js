import {all, call} from "redux-saga/effects";
import {
	watchPushRegisterUser,
	watchUserLogin,
	watchUserLogout
} from "./authSagas";

export default function* rootSaga() {
	yield all([
		call(watchPushRegisterUser),
		call(watchUserLogin),
		call(watchUserLogout)
	]);
}