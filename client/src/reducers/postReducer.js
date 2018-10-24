import { DELETE_POST, GET_POSTS, POST_LOADING, GET_POST, POST_LOADING_OFF} from "../actions/types";

const initialState = {
	posts: [],
	post: {},
	loading: true,
	page:1,
	pages:1,
};

export default function (state = initialState, action) {
	switch (action.type) {
		// case ADD_POST:
		// 	return {
		// 		...state,
		// 		posts: [action.payload, ...state.posts],
		// 		loading: false
		// 	};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload)
			};
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false
			};
		case POST_LOADING:
			return {
				...state,
				loading: true
			};
		case POST_LOADING_OFF:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}