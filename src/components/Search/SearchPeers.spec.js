import React from 'react';
import { render, within } from 'react-testing-library';

import SearchPeers from './SearchPeers';

describe('Testing Search Peers Component', () => {
    it('It should mount search input component', () => {
        const { container } = render(<SearchPeers />);

        const searchInput = within(container).getAllByPlaceholderText('Search for peers of input stock quote');

        expect(searchInput[0].getAttribute('placeholder')).toBe('Search for peers of input stock quote');
    });
});