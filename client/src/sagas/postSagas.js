import {call, put, /*fork,*/ takeLatest} from "redux-saga/effects";
import {
	ADD_COMMENT, ADD_LIKE,
	DELETE_COMMENT,
	DELETE_POST_BY_ID, FETCH_POST,
	FETCH_POSTS,
	POST_NEW_POST
} from "../actions/types";
import api from "../api/postApi";
import {receiveErrorAction} from "../actions/errorAction";
import {
	clearError, deletePostLoading, getPosts, /*receiveDeletePost,*/ receivePost, receivePosts, setPostLoading
} from "../actions/postActions";

export function* watchPostNewPost() {
	yield takeLatest(POST_NEW_POST, callPostNewPost);
}

function* callPostNewPost(action) {
	try {
		yield put(clearError());
		yield put(setPostLoading());
		yield call(api.post.postNewPost, action.payload.post);
		yield put(getPosts(action.payload.perPage, action.payload.page));
	} catch (error) {
		yield put(deletePostLoading());
		yield put(receiveErrorAction(error));
	}
}

export function* watchFetchPosts() {
	yield takeLatest(FETCH_POSTS, callFetchPosts);
}

function* callFetchPosts(action) {
	try {
		yield put(clearError());
		yield put(setPostLoading());
		const response = yield call(api.post.getPosts, action.payload.perPage, action.payload.page);
		yield put(receivePosts(response.data));
	} catch (error) {
		yield put(deletePostLoading());
		yield put(receiveErrorAction(error));
	}
}

export function* watchFetchPost() {
	yield takeLatest(FETCH_POST, callFetchPost);
}

function* callFetchPost(action) {
	try {
		yield put(clearError());
		yield put(setPostLoading());
		const response = yield call(api.post.getPostByID, action.payload);
		yield put(receivePost(response.data));
	} catch (error) {
		yield put(deletePostLoading());
		yield put(receiveErrorAction(error));
	}
}

export function* watchDeletePostByID() {
	yield takeLatest(DELETE_POST_BY_ID, callDeletePostByID);
}

function* callDeletePostByID(action) {
	try {
		yield put(clearError());
		yield call(api.post.deletePosts, action.payload.id);
		yield put(getPosts(action.payload.perPage, action.payload.page));
		// yield put(receiveDeletePost(action.payload));
	} catch (error) {
		yield put(deletePostLoading());
		yield put(receiveErrorAction(error));
	}
}

export function* watchDeleteComment() {
	yield takeLatest(DELETE_COMMENT, callDeleteComment);
}

function* callDeleteComment(action) {
	try {
		yield put(clearError());
		const response = yield call(api.post.deleteComment, action.payload.postId, action.payload.commentId);
		yield put(receivePost(response.data));
	} catch (error) {
		yield put(deletePostLoading());
		yield put(receiveErrorAction(error));
	}
}

export function* watchAddComment() {
	yield takeLatest(ADD_COMMENT, callAddComment);
}

function* callAddComment(action) {
	try {
		yield put(clearError());
		const response = yield call(api.post.postComment, action.payload.postId, action.payload.commentData);
		yield put(receivePost(response.data));
	} catch (error) {
		yield put(deletePostLoading());
		yield put(receiveErrorAction(error));
	}
}

export function* watchAddLike() {
	yield takeLatest(ADD_LIKE, callAddLike);
}
//TODO: Ask how use fork
function* callAddLike(action) {
	try {
		yield put(clearError());
		yield call(api.post.postPostLike, action.payload.id);
		// yield fork(callFetchPosts);
		yield put(getPosts(action.payload.perPage, action.payload.page));
	} catch (error) {
		yield put(deletePostLoading());
		yield put(receiveErrorAction(error));
	}
}
