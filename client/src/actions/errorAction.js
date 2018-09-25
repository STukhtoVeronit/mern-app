import {GET_ERRORS} from "./types";

export function receiveErrorAction(message) {
	return {
		type: GET_ERRORS,
		payload: message.hasOwnProperty('response') ? message.response.data : message
	}
}