import axios from "axios";

function getCurrentProfile() {
	return new Promise((resolve, reject) => {
		axios
				.get('/api/profile')
				.then(res => resolve(res))
				.catch(err => reject(err))
	});
}

function getProfiles() {
	return new Promise((resolve, reject) => {
		axios
				.get('/api/profile/all')
				.then(res => resolve(res))
				.catch(err => reject(err))
	});
}
//TODO: decide existence of this method
function getProfileByHandle(handle) {
	return new Promise((resolve, reject) => {
		axios
				.get(`/api/profile/handle/${handle}`)
				.then(res => resolve(res))
				.catch(err => reject(err))
	});
}

function getProfileByUserId(id) {
	return new Promise((resolve, reject) => {
		axios
				.get(`/api/profile/user/${id}`)
				.then(res => resolve(res))
				.catch(err => reject(err))
	});
}

function deleteAccount() {
	return new Promise((resolve, reject) => {
		axios
				.delete('/api/profile')
				.then(res => resolve(res))
				.catch(err => reject(err));
	});
}

function postProfile(uuid) {
	return new Promise((resolve, reject) => {
		axios
				.post('/api/profile', uuid)
				.then(res => resolve(res))
				.catch(err => reject(err));
	});
}

function postExperience(uuid) {
	return new Promise((resolve, reject) => {
		axios
				.post('/api/profile/experience', uuid)
				.then(res => resolve(res))
				.catch(err => reject(err));
	});
}

function deleteExperience(id) {
	return new Promise((resolve, reject) => {
		axios
				.delete(`/api/profile/experience/${id}`)
				.then(res => resolve(res))
				.catch(err => reject(err));
	});
}

function postEducation(uuid) {
	return new Promise((resolve, reject) => {
		axios
				.post('/api/profile/education', uuid)
				.then(res => resolve(res))
				.catch(err => reject(err));
	});
}

function deleteEducation(id) {
	return new Promise((resolve, reject) => {
		axios
				.delete(`/api/profile/education/${id}`)
				.then(res => resolve(res))
				.catch(err => reject(err));
	});
}

export default {
	profile: {
		getCurrentProfile,
		deleteAccount,
		createProfile: postProfile,
		getProfileByHandle,
		getProfiles,
		postExperience,
		deleteExperience,
		postEducation,
		deleteEducation,
		getProfileByUserId
	}
}