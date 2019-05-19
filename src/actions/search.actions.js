import { actionTypes } from './action-types';

/**
 * 
 * @param {*} value 
 * Search term value
 */
export const onSearchTermChange = (value) => ({
    type: `@search/${actionTypes.search.SEARCH_TERM_CHANGE}`,
    payload: value
});

/**
 * Dispatch action to find peers
 */
export const onSearch = () => ({
    type: `@search/${actionTypes.search.GET_SEARCH_PEERS}`
});

/**
 * 
 * @param {*} ticker 
 * Get meta data for a particular ticker
 */
export const fetchQuoteMetaData = (ticker) => ({
    type: `@search/${actionTypes.search.GET_META_DATA}`,
    payload: ticker
});