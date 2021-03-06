import {call, put, takeLatest} from 'redux-saga/effects';
import api from "../api/wikiApi";
import {receiveWikiTerm, setWikiLoading} from '../actions/wikiActions';
import {FETCH_WIKI_TERM} from "../actions/types";

import {receiveErrorAction} from '../actions/errorAction';

export function* watchFetchWikiTerm() {
	yield takeLatest(FETCH_WIKI_TERM, callFetchWikiTerm);
}

function* callFetchWikiTerm(action) {
	try {
		yield put(setWikiLoading());
		const response = yield call(api.wiki.getWikiTermSnippet, action.payload);
		yield put(receiveWikiTerm(response.data.body.query.search[0]));
	} catch (error) {
		yield put(receiveErrorAction(error));
	}
}
