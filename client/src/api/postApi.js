import axios from "axios";

function postNewPost(data) {
	return new Promise((resolve, reject) => {
		axios
				.post('/api/posts', data)
				.then(res => resolve(res))
				.catch(err => reject(err))
	});
}

function getPosts(perPage, page) {
	return new Promise((resolve, reject) => {
		axios
				.get(`/api/posts/${perPage}/${page}`)
				.then(res => resolve(res))
				.catch(err => reject(err))
	});
}

function getPostByID(id) {
	return new Promise((resolve, reject) => {
		axios
				.get(`/api/posts/${id}`)
				.then(res => resolve(res))
				.catch(err => reject(err))
	});
}

function deletePosts(id) {
	return new Promise((resolve, reject) => {
		axios
				.delete(`/api/posts/${id}`)
				.then(res => resolve(res))
				.catch(err => reject(err))
	});
}

function deleteComment(postId, commentId) {
	return new Promise((resolve, reject) => {
		axios
				.delete(`/api/posts/comment/${postId}/${commentId}`)
				.then(res => resolve(res))
				.catch(err => reject(err))
	});
}

function postComment(postId, commentData) {
	return new Promise((resolve, reject) => {
		axios
				.post(`/api/posts/comment/${postId}`, commentData)
				.then(res => resolve(res))
				.catch(err => reject(err))
	});
}

function postPostLike(id) {
	return new Promise((resolve, reject) => {
		axios
				.post(`/api/posts/like/${id}`)
				.then(res => resolve(res))
				.catch(err => reject(err))
	});
}

export default {
	post: {
		postNewPost,
		getPosts,
		deletePosts,
		getPostByID,
		deleteComment,
		postComment,
		postPostLike
	}
}