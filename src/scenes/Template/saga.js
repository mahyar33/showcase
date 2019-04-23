/**
 * Gets the repositories of the user from Github
 */

import {call, put, select, takeLatest} from 'redux-saga/effects';
import {makeTemp} from '../../redux/selectors/selectors';
import HttpRequest from "../../network/HttpRequest";
import {tempAction} from "../../redux/actions/actions";
import {temp} from "../../redux/constant/constants";

/**
 * Github repos request/response handler
 */
export function* getTemp() {
    // Select username from store
    console.log('saga');
    const username = yield select(makeTemp());
    const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

    try {
        // Call our request helper (see 'utils/request')
        const repos = yield call(HttpRequest.post, requestURL);
        yield put(tempAction(repos, username));
    } catch (err) {

    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* tempSaga() {
    // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount

    yield takeLatest(temp, getTemp);
}
