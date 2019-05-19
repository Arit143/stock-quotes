import { createSelector } from 'reselect';

/**
 * 
 * Memoized selectors to get a chunk of a store state
 */
export const periodValueSelector = state => state.stockReducer.periodValue;
export const quoteNameSelector = state => state.stockReducer.quoteName;

const stockPriceDataSelector = state => state.stockReducer.stockPriceData;

export const periodValueState = createSelector(periodValueSelector, (periodValue) => periodValue);
export const stockPriceDataState = createSelector(stockPriceDataSelector, (stockPriceData) => stockPriceData);