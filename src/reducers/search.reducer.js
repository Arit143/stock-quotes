import { actionTypes } from './../actions/action-types';

const INITIAL_STATE = {
    searchTerm: '',
    stockQuote: [],
    stockQuoteMetaData: {},
    fetchPeers: false,
    stockQuoteError: false,
    stockLoading: false
};

const searchReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        /**
         * State on search term change
         */
        case `@search/${actionTypes.search.SEARCH_TERM_CHANGE}`: 
            return {
                ...state,
                stockQuoteError: false,
                fetchPeers: false,
                searchTerm: action.payload
            }
        /**
         * State when search term entered or submitted to get peers
         */
        case `@search/${actionTypes.search.GET_SEARCH_PEERS}`: 
            return {
                ...state,
                fetchPeers: true,
                stockQuote: [],
                stockQuoteMetaData: {},
                stockLoading: true
            }
        /**
         * State returned when peers are successfully loaded
         */
        case `@search/${actionTypes.search.GET_SEARCH_PEERS_SUCCESS}`: 
            return {
                ...state,
                stockQuote: action.payload,
                stockLoading: false
            }
        /**
         * State to handle peer loading failure
         */
        case `@search/${actionTypes.search.GET_SEARCH_PEERS_FAILURE}`: 
            return {
                ...state,
                stockQuoteError: true,
                stockLoading: false
            }
        /**
         * Get each peers meta data state
         */
        case `@search/${actionTypes.search.GET_META_DATA}`: 
            return {
                ...state,
                stockQuoteMetaData: {
                    ...state.stockQuoteMetaData, 
                    [action.payload]: {
                        loading: true
                    }
                }
            }
        /**
         * State to get the meta data of a ticker success
         */
        case `@search/${actionTypes.search.GET_META_DATA_SUCCESS}`: 
            return {
                ...state,
                stockQuoteMetaData: {
                    ...state.stockQuoteMetaData, 
                    [action.payload.ticker]: {
                        loading: false,
                        data: action.payload.data
                    }
                }
            }
        /**
         * State to get the meta data of a ticker failure
         */
        case `@search/${actionTypes.search.GET_META_DATA_FAILURE}`: 
            return {
                ...state,
                stockQuoteMetaData: {
                    ...state.stockQuoteMetaData, 
                    [action.payload.ticker]: {
                        loading: false,
                        data: undefined
                    }
                }
            }
        /**
         * Returns default state
         */
        default:
            return {
                ...state
            };
    }
}

export default searchReducer;