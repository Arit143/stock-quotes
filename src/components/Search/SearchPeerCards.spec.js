import React from 'react';
import noop from 'lodash/noop';
import compact from 'lodash/compact';
import { render, within } from 'react-testing-library';

import SearchPeerCards from './SearchPeerCards';

const randomColorGradients = ['bg-gradient-theme-left', 'bg-gradient-theme-right', 'bg-gradient-theme-top', 'bg-gradient-theme'];

describe('Testing Search Peer Card Component', () => {
    const metaData = {
        'aapl' : {
            data : {
                description: 'This is a ticker description aapl'
            }
        },
        'ibm' : {
            data : {
                description: 'This is a ticker description ibm'
            }
        }, 
        'googl': {
            data: {
                description: 'This is a ticker description googl'
            }
        }
    }
    it('It should show how many cards are rendered with various color gradients', () => {
        const { container } = render(<SearchPeerCards
            fetchQuoteMetaData={() => noop}
            stockQuote={['aapl', 'ibm', 'googl']} 
            metaDataState={metaData}
        />);

        const numberOfCards = within(container).getAllByTestId('cards');
        expect(numberOfCards.length).toBe(3);
        
        const cardsWithGradients = compact(numberOfCards.map(node => randomColorGradients.includes(node.classList[1])));
        expect(cardsWithGradients.length).toBe(3);
    });
});