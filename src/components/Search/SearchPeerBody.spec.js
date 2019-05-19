import React from 'react';
import noop from 'lodash/noop';
import { render, getByText, getByRole, fireEvent } from 'react-testing-library';
import { createHashHistory } from 'history';

import { PageContext } from './../../context/PageContext';
import SearchPeerCardBody from './SearchPeerCardBody';

const history = createHashHistory();

describe('Testing Search Peer Body Component', () => {
    it('It should have a card title', () => {
        const { container } = render(<SearchPeerCardBody ticker={'aapl'} fetchQuoteMetaData={() => noop}/>);
        const cardTitle = getByText(container, 'aapl');
        
        expect(cardTitle.textContent).toBe('aapl');
    });

    it('Show loader when meta data loads', () => {
        const { container } = render(<SearchPeerCardBody fetchQuoteMetaData={() => noop} metaDataState={{ loading: true }}/>);
        const loading = getByRole(container, 'status');

        expect(loading.textContent).toBe('Loading...');
    });

    it('Show description when metadata loads and navigate to stock page for a specific ticker', () => {
        const { container } = render(
        <PageContext.Provider value={{ redirect: (...args) => history.push(...args) }}>
            <SearchPeerCardBody
                ticker={'aapl'} 
                fetchQuoteMetaData={() => noop} 
                metaDataState={{ data: {
                    description: 'This is a ticker description'
                }}}/>
        </PageContext.Provider>
        );
        const cardDescription = getByText(container, 'This is a ticker description');

        expect(cardDescription.textContent).toBe('This is a ticker description');

        fireEvent.click(getByText(container, 'Click'));
        expect(history.location.pathname).toBe('/stock/aapl');
    });
});