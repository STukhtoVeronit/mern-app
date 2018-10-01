import {
	SET_WIKI_TERM
} from '../actions/types';

const initialState = {
	wiki: {}
};

export default function (state = initialState, action) {

	switch (action.type) {

		case SET_WIKI_TERM:
			return {
				...state,
				wiki: action.payload
			};

		default:
			return state;

	}
}