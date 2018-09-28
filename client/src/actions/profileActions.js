import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_PROFILES,
	GET_CURRENT_PROFILE,
	DELETE_ACCOUNT,
	CREATE_PROFILE,
	GET_PROFILE_BY_USER_ID,
	GET_ALL_PROFILES,
	ADD_PROFILE_EXPERIENCE,
	DELETE_PROFILE_EXPERIENCE,
	ADD_PROFILE_EDUCATION,
	DELETE_PROFILE_EDUCATION,
	PROFILE_LOADING_OFF
} from "./types";


export const setProfileLoading = () => ({
	type: PROFILE_LOADING
});

export const unsetProfileLoading = () => ({
	type: PROFILE_LOADING_OFF
});

export const getCurrentProfile = () => ({
	type: GET_CURRENT_PROFILE
});

export const receiveProfile = currentProfile => ({
	type: GET_PROFILE,
	payload: currentProfile
});

export const deleteAccount = () => ({
	type: DELETE_ACCOUNT
});

export const createProfile = (profileData) => ({
	type: CREATE_PROFILE,
	payload: profileData
});

export const getProfileByUserId = id => ({
	type: GET_PROFILE_BY_USER_ID,
	payload: id
});

export const getProfiles = () => ({
	type: GET_ALL_PROFILES
});

export const receiveProfiles = (profiles) => ({
	type: GET_PROFILES,
	payload: profiles
});

export const addExperience = (expData) => ({
	type: ADD_PROFILE_EXPERIENCE,
	payload: expData
});

export const deleteExperience = (id) => ({
	type: DELETE_PROFILE_EXPERIENCE,
	payload: id
});

export const addEducation = (eduData) => ({
	type: ADD_PROFILE_EDUCATION,
	payload: eduData
});

export const deleteEducation = (id) => ({
	type: DELETE_PROFILE_EDUCATION,
	payload: id
});

export const clearCurrentProfile = () => ({
		type: CLEAR_CURRENT_PROFILE
});