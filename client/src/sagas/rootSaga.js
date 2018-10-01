import {all, call} from "redux-saga/effects";
import {
	watchCheckJwtToken,
	watchPushRegisterUser,
	watchUserLogin,
	watchUserLogout,
} from "./authSagas";

import {
	watchAddProfileEducation,
	watchAddProfileExperience,
	watchCreateProfile,
	watchDeleteCurrentUser,
	watchDeleteProfileEducation,
	watchDeleteProfileExperience,
	watchGetCurrentProfile,
	watchGetProfileByHandle,
	watchGetProfiles
} from "./profileSagas";

import {
	watchAddComment, watchAddLike,
	watchDeleteComment,
	watchDeletePostByID,
	watchFetchPost,
	watchFetchPosts,
	watchPostNewPost
} from "./postSagas";
import {watchFetchWikiTerm} from "./wikiSagas";

export default function* rootSaga() {
	yield all([
		call(watchPushRegisterUser),
		call(watchUserLogin),
		call(watchUserLogout),
		call(watchGetCurrentProfile),
		call(watchDeleteCurrentUser),
		call(watchCreateProfile),
		call(watchGetProfileByHandle),
		call(watchGetProfiles),
		call(watchAddProfileExperience),
		call(watchDeleteProfileExperience),
		call(watchAddProfileEducation),
		call(watchDeleteProfileEducation),
		call(watchPostNewPost),
		call(watchFetchPosts),
		call(watchDeletePostByID),
		call(watchFetchPost),
		call(watchDeleteComment),
		call(watchAddComment),
		call(watchAddLike),
		call(watchCheckJwtToken),
		call(watchFetchWikiTerm),
	]);
}