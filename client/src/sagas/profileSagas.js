import {call, put, takeLatest} from "redux-saga/effects";
import {
	ADD_PROFILE_EDUCATION,
	ADD_PROFILE_EXPERIENCE,
	CREATE_PROFILE,
	DELETE_ACCOUNT, DELETE_PROFILE_EDUCATION, DELETE_PROFILE_EXPERIENCE,
	GET_ALL_PROFILES,
	GET_CURRENT_PROFILE,
	GET_PROFILE_BY_USER_ID
} from "../actions/types";
import api from "../api/profileApi";
import history from "../history";
import {receiveErrorAction} from "../actions/errorAction";
import {receiveProfile, receiveProfiles, setProfileLoading, unsetProfileLoading} from "../actions/profileActions";
import {setCurrentUser} from "../actions/authActions";

export function* watchGetProfileByHandle() {
	yield takeLatest(GET_PROFILE_BY_USER_ID, callGetProfileByHandle);
}
function* callGetProfileByHandle(action) {
	try {
		yield put(setProfileLoading());
		const response = yield call(api.profile.getProfileByUserId, action.payload);
		yield put(receiveProfile(response.data));
	} catch (error) {
		if (Math.floor(error.response.status/100) === 5){
			history.push('/not-found');
		}
		yield put(unsetProfileLoading());
		yield put(receiveErrorAction(error));
	}
}

export function* watchGetCurrentProfile() {
	yield takeLatest(GET_CURRENT_PROFILE, callGetCurrentProfile);
}
function* callGetCurrentProfile(action) {
	try {
		yield put(setProfileLoading());
		const response = yield call(api.profile.getCurrentProfile);
		yield put(receiveProfile(response.data));
	} catch (error) {
		if (Math.floor(error.response.status/100) === 5){
			history.push('/not-found');
		}
		yield put(unsetProfileLoading());
		yield put(receiveErrorAction(error));
	}
}


export function* watchGetProfiles() {
	yield takeLatest(GET_ALL_PROFILES, callGetProfiles);
}
function* callGetProfiles(action) {
	try {
		yield put(setProfileLoading());
		const response = yield call(api.profile.getProfiles);
		yield put(receiveProfiles(response.data));
	} catch (error) {
		yield put(receiveErrorAction(error));
	}
}

export function* watchDeleteCurrentUser() {
	yield takeLatest(DELETE_ACCOUNT, callDeleteCurrentUser);
}
function* callDeleteCurrentUser(action) {
	try {
		if (window.confirm('Are you sure about this?')) {
			yield put(setProfileLoading());
			yield call(api.profile.deleteAccount);
			yield put(setCurrentUser({}));
		}
	} catch (error) {
		yield put(receiveErrorAction(error));
	}
}

export function* watchCreateProfile() {
	yield takeLatest(CREATE_PROFILE, callCreateProfile);
}
function* callCreateProfile(action) {
	try {
		yield call(api.profile.createProfile, action.payload);
		history.push('/dashboard');
	} catch (error) {
		yield put(receiveErrorAction(error));
	}
}

export function* watchAddProfileExperience() {
	yield takeLatest(ADD_PROFILE_EXPERIENCE, callAddProfileExperience);
}
function* callAddProfileExperience(action) {
	try {
		yield call(api.profile.postExperience, action.payload);
		history.push('/dashboard');
	} catch (error) {
		yield put(receiveErrorAction(error));
	}
}

export function* watchDeleteProfileExperience() {
	yield takeLatest(DELETE_PROFILE_EXPERIENCE, callDeleteProfileExperience);
}
function* callDeleteProfileExperience(action) {
	try {
		const response = yield call(api.profile.deleteExperience, action.payload);
		yield put(receiveProfile(response.data));
	} catch (error) {
		yield put(receiveErrorAction(error));
	}
}

export function* watchAddProfileEducation() {
	yield takeLatest(ADD_PROFILE_EDUCATION, callAddProfileEducation);
}
function* callAddProfileEducation(action) {
	try {
		yield call(api.profile.postEducation, action.payload);
		history.push('/dashboard');
	} catch (error) {
		yield put(receiveErrorAction(error));
	}
}

export function* watchDeleteProfileEducation() {
	yield takeLatest(DELETE_PROFILE_EDUCATION, callDeleteProfileEducation);
}
function* callDeleteProfileEducation(action) {
	try {
		const response = yield call(api.profile.deleteEducation, action.payload);
		yield put(receiveProfile(response.data));
	} catch (error) {
		yield put(receiveErrorAction(error));
	}
}