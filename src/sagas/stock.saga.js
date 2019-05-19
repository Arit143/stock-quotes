import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { actionTypes } from './../actions/action-types';
import { periodValueSelector, quoteNameSelector } from './../selectors/stock.selectors';

import { API_URL } from './../constants/app.constants';

/**
 * 
 * @param {*} { quote: peerName, period: any of [1m, 3m, 6m]}
 * Fetch the stock price data with respect to peername and periods
 */
function stockPriceApi({ quote, period }) {
    return axios.get(`${API_URL}/${quote}/chart/${period}`);
}

/**
 * Fetch the stock price and put the payload in the reducer
 */
function* fetchStockPrice() {    
    const quote = yield select(quoteNameSelector);
    const period = yield select(periodValueSelector)

    try {
        const stockPriceResponse = yield call(stockPriceApi, { quote, period });
        yield put({ type: `@stock/${actionTypes.stock.GET_STOCK_PRICE_DATA_SUCCESS}`, payload: stockPriceResponse.data });
    } catch (err) {
        yield put({ type: `@stock/${actionTypes.stock.GET_STOCK_PRICE_DATA_FAILURE}` });
    }
}

/**
 * Watcher to when stock price action is dispatched
 */
export function* stockPriceWatcher() {
    yield takeLatest(`@stock/${actionTypes.stock.GET_STOCK_PRICE_DATA}`, fetchStockPrice)
}