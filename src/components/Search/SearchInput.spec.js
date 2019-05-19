import React from 'react';
import { render, fireEvent, getByTestId } from 'react-testing-library';

import SearchInput from './SearchInput';

describe('Testing Search Input Component', () => {
    it('It must search on enter key press', () => {
        const handler = jest.fn();
        const { container } = render(<SearchInput onSearch={handler}/>);
        const form = container.querySelector('form[name="searchBar"]');

        fireEvent.submit(form);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('It must search on icon click', () => {
        const handler = jest.fn();
        const { container } = render(<SearchInput onSearch={handler}/>);
        const searchIcon = getByTestId(container, 'iconClick');

        fireEvent.click(searchIcon);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('Must check whether input value changes on search term change', () => {
        const handler = jest.fn();
        const { container } = render(<SearchInput onSearch={handler}/>);
        const searchInput = getByTestId(container, 'searchInput');
        searchInput.value = 'aapl';

        fireEvent.change(searchInput);
        expect(searchInput.value).toEqual('aapl');
    });
});