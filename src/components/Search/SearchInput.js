import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';
import classNames from 'classnames';
import omit from 'lodash/omit';

/**
 * 
 * @param {*} inputProps 
 * Modified common component to make it more generic
 */
const SearchInput = (inputProps) => {
  return (
    <Form inline className="cr-search-form" name="searchBar" onSubmit={(e) => {
        e.preventDefault();
        inputProps.onSearch();
      }}>
      <MdSearch
        size="20"
        data-testid="iconClick"
        className="cr-search-form__icon-search text-secondary"
        onClick={inputProps.onSearch}
      />
      <Input
        type="search"
        data-testid="searchInput"
        className={classNames('cr-search-form__input', inputProps.className)}
        {...omit(inputProps, ['className', 'onSearch'])}
      />
    </Form>
  );
};

SearchInput.defaultProps = {
  placeholder: 'Search ....'
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchInput;
