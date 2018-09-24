import axios from 'axios';

export function postUserRegister(uuid) {
	return new Promise((resolve, reject) => {
		axios
				.post('/api/users/register', uuid)
				.then(res => resolve(res))
				.catch(err => reject(err))
	});
}

export function postUserLogin(uuid) {
	return new Promise((resolve, reject) => {
		axios
				.post('/api/users/login', uuid)
				.then(res => resolve(res))
				.catch(err => reject(err));
	});
}

