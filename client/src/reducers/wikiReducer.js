import {
	SET_WIKI_LOADING,
	SET_WIKI_TERM
} from '../actions/types';

const initialState = {
	wiki: {},
	loading: false
};

export default function (state = initialState, action) {

	switch (action.type) {

		case SET_WIKI_TERM:
			return {
				...state,
				wiki: action.payload,
				loading: false
			};
		case SET_WIKI_LOADING:
			return {
				...state,
				loading: true
			};

		default:
			return state;

	}
}