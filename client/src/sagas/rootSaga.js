import {all, call} from "redux-saga/effects";
import { watchPushRegisterUser} from "./authSagas";

export default function* rootSaga() {
	yield all([
		call(watchPushRegisterUser)
	]);
}