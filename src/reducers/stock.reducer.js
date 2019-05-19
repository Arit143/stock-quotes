import { actionTypes } from './../actions/action-types';

const INITIAL_STATE = {
    periodValue: '1m',
    quoteName: '',
    stockPriceData: []
};

const stockReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        /**
         * State to get stock price data
         */
        case `@stock/${actionTypes.stock.GET_STOCK_PRICE_DATA}`:
            return {
                ...state,
                periodValue: action.payload.period,
                quoteName: action.payload.quoteName
            }
        /**
         * State to get stock price data success
         */
        case `@stock/${actionTypes.stock.GET_STOCK_PRICE_DATA_SUCCESS}`:
            return {
                ...state,
                stockPriceData: action.payload
            }
        /**
         * State when the stock price data has failed
         */
        case `@stock/${actionTypes.stock.GET_STOCK_PRICE_DATA_FAILURE}`:
            return {
                ...state,
                stockPriceData: []
            }
        /**
         * Return default state
         */
        default:
            return INITIAL_STATE;
    }
}

export default stockReducer;