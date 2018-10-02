import {
	FETCH_WIKI_TERM, SET_WIKI_LOADING,
	SET_WIKI_TERM
} from "./types";


// get term definition from WikiApi
export const getWikiTerm = term => ({
	type: FETCH_WIKI_TERM,
	payload: term
});
// get term definition from WikiApi receive
export const receiveWikiTerm = res => ({
	type: SET_WIKI_TERM,
	payload: res
});
export const setWikiLoading = () => ({
	type: SET_WIKI_LOADING,
});
