import axios from 'axios';

export function postUserRegister(uuid) {
	console.log(uuid);
	return new Promise((resolve, reject) => {
		axios
				.post('/api/users/register', uuid)
				.then(response => resolve(response))
				.catch(error => reject(error))
	});
}