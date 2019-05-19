import React from 'react';
import { render, within, getAllByTestId, fireEvent, wait } from 'react-testing-library';

import Stock from './Stock';
import { PageContext } from './../../context/PageContext';

const stockPriceData = [{
    date: '10/09/2011',
    close: '142'
}, {
    date: '10/08/2013',
    close: '102'
}]

describe('Testing Stock period and stock price component', () => {
    it('It should have a stock period dropdown', () => {
        const handler = jest.fn();
        const { container } = render(
        <PageContext.Provider value={{ quoteName: 'aapl' }}>
            <Stock onDropDownValueChange={handler} stockPriceData={stockPriceData}/>
        </PageContext.Provider>);

        const dropDownList = getAllByTestId(container, 'periods');
        
        // On Mount call
        expect(handler).toHaveBeenCalledTimes(1);
        fireEvent.click(dropDownList[0])

        return wait(() => {
            expect(handler).toHaveBeenCalledTimes(2);
        });      
    });

    it('It should have a stock price data', () => {
        const handler = jest.fn();
        const { container } = render(
        <PageContext.Provider value={{ quoteName: 'aapl' }}>
            <Stock onDropDownValueChange={handler} stockPriceData={stockPriceData}/>
        </PageContext.Provider>);

        // Stock price data is a array of two objects {data, close}
        expect(getAllByTestId(container, 'stockPrices').length).toBe(2);

        // Test the stock values
        expect(getAllByTestId(container, 'stockData')[0].textContent).toBe(stockPriceData[0].date);
        expect(getAllByTestId(container, 'stockClose')[0].textContent).toBe(stockPriceData[0].close);

        expect(getAllByTestId(container, 'stockData')[1].textContent).toBe(stockPriceData[1].date)
        expect(getAllByTestId(container, 'stockClose')[1].textContent).toBe(stockPriceData[1].close)
    });
});