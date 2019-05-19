import { createSelector } from 'reselect';

/**
 * 
 * Memoized selectors to get a chunk of a store state
 */

export const searchTermSelector = state => state.searchReducer.searchTerm;
export const searchTermState = createSelector(searchTermSelector, (searchTerm) => searchTerm);

const stockQuoteErrorSelector = state => state.searchReducer.stockQuoteError;
export const stockQuoteErrorState = createSelector(stockQuoteErrorSelector, (stockQuoteError) => stockQuoteError);

const stockLoadingSelector = state => state.searchReducer.stockLoading;
export const stockLoadingState = createSelector(stockLoadingSelector, (stockLoading) => stockLoading);

const stockQuoteSelector = state => state.searchReducer.stockQuote;
export const stockQuoteState = createSelector(stockQuoteSelector, (stockQuote) => stockQuote);

const fetchPeersSelector = state => state.searchReducer.fetchPeers;
export const fetchPeersState = createSelector(fetchPeersSelector, (fetchPeers) => fetchPeers);

const fetchMetaDataSelector = state => state.searchReducer.stockQuoteMetaData;
export const metaDataState = createSelector(fetchMetaDataSelector, (stockQuoteMetaData) => stockQuoteMetaData);