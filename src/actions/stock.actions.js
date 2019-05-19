import { actionTypes } from './action-types';
/**
 * 
 * @param {*} period 
 * @param {*} quoteName 
 * On period drop down change dispatch
 */
export const onDropDownValueChange = (period, quoteName) => ({
    type: `@stock/${actionTypes.stock.GET_STOCK_PRICE_DATA}`,
    payload: {
        period,
        quoteName
    }
});