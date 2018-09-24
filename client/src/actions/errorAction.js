import {GET_ERRORS} from "./types";

export function receiveErrorAction(message) {
	message = message.hasOwnProperty('response') ? message.response.data : message;
	return {
		type: GET_ERRORS,
		payload: message
	}
}