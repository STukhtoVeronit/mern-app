import axios from 'axios';

import {
	ADD_POST,
	POST_LOADING,
	GET_POSTS,
	GET_POST,
	DELETE_POST,
	CLEAR_ERROR, POST_NEW_POST, FETCH_POSTS, FETCH_POST, DELETE_POST_BY_ID, DELETE_COMMENT, ADD_COMMENT, ADD_LIKE
} from './types';

import {receiveErrorAction} from "./errorAction";

export const addPost = post => ({
	type: POST_NEW_POST,
	payload: post
});

export const receiveAddPost = post => ({
	type: ADD_POST,
	payload: post
});

export const getPosts = () => ({
	type: FETCH_POSTS
});

export const receivePosts = posts => ({
	type: GET_POSTS,
	payload: posts
});

export const getPost = id => ({
	type: FETCH_POST,
	payload: id
});

export const receivePost = post => ({
	type: GET_POST,
	payload: post
});

export const deletePost = id => ({
	type: DELETE_POST_BY_ID,
	payload: id
});

export const receiveDeletePost = id => ({
	type: DELETE_POST,
	payload: id
});

export const deleteComment = (postId, commentId) => ({
	type: DELETE_COMMENT,
	payload: {postId,commentId}
});

export const addComment = (postId, commentData) => ({
	type: ADD_COMMENT,
	payload: {postId, commentData}
});


export const addLike = id => ({
	type: ADD_LIKE,
	payload: id
});

export const setPostLoading = () => ({
	type: POST_LOADING
});

export const clearError = () => ({
	type: CLEAR_ERROR
});
