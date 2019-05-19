import { all } from 'redux-saga/effects';

import { searchPeerWatcher, fetchMetaDataWatcher } from './../sagas/search-peer.saga';
import { stockPriceWatcher } from './../sagas/stock.saga';

export default function* rootSaga() {
    yield all([
        searchPeerWatcher(),
        fetchMetaDataWatcher(),
        stockPriceWatcher()
    ]);
 }