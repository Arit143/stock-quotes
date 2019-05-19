import { put, takeLatest, call, select, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { actionTypes } from './../actions/action-types';
import { searchTermSelector } from './../selectors/search.selectors';

import { API_URL } from './../constants/app.constants';

/**
 * 
 * @param {*} searchTerm 
 * API to get the peers for a search term
 */

function searchTermApi(searchTerm) {
    return axios.get(`${API_URL}/${searchTerm}/peers`);
}

/**
 * 
 * @param {*} ticker 
 * Fetch company meta data for a ticker
 */
function fetchMetaDataApi(ticker) {
    return axios.get(`${API_URL}/${ticker}/company`);
}

/**
 * 
 * @param {*} action 
 * Generator yield to put meta data success with payload
 * {payload: {
 *  ticker: peerName
 *  data: metaData
 * }}
 */
function* fetchMetaData(action) {    
    try {
        const searchTermResponse = yield call(fetchMetaDataApi, action.payload);
        yield put({ type: `@search/${actionTypes.search.GET_META_DATA_SUCCESS}`, payload: {
            ticker: action.payload,
            data: searchTermResponse.data 
        }});
    } catch (err) {
        yield put({ type: `@search/${actionTypes.search.GET_META_DATA_FAILURE}`, payload: {
            ticker: action.payload
        } });
    }
}

/**
 * Generator to fetch the peers for a particular search term
 */
function* fetchPeers() {    
    const searchTerm = yield select(searchTermSelector);
    
    try {
        const searchTermResponse = yield call(searchTermApi, searchTerm);
        yield put({ type: `@search/${actionTypes.search.GET_SEARCH_PEERS_SUCCESS}`, payload: searchTermResponse.data });
    } catch (err) {
        yield put({ type: `@search/${actionTypes.search.GET_SEARCH_PEERS_FAILURE}` });
    }
}

/**
 * Watchers on ACTION dispatch
 */

export function* searchPeerWatcher() {
    yield takeLatest(`@search/${actionTypes.search.GET_SEARCH_PEERS}`, fetchPeers)
}

export function* fetchMetaDataWatcher() {
    yield takeEvery(`@search/${actionTypes.search.GET_META_DATA}`, fetchMetaData)
}