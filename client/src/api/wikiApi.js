import axios from "axios";

function getWikiTermSnippet(term) {
	return new Promise((resolve, reject) => {
		axios
				.get(`/api/profile/wiki/${term}`)
				.then(res => resolve(res))
				.catch(err => reject(err))
	});
}

export default {
	wiki: {
		getWikiTermSnippet
	}
}