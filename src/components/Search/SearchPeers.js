import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import SearchInput from './SearchInput';

const SearchPeers = (props) => {
    const { onSearchTermChange, searchTerm, onSearch } = props;
    return (
        <Row>
            <Col xl={12} lg={12} md={12}>
                <SearchInput 
                    bsSize={'md'} 
                    placeholder={'Search for peers of input stock quote'} 
                    className="__search-peers"
                    value={searchTerm}
                    onChange={(e) => onSearchTermChange(e.target.value)}
                    onSearch={() => onSearch()}/>
            </Col>
        </Row>
    );
};

SearchPeers.propTypes = {
    onSearchTermChange: PropTypes.func,
    searchTerm: PropTypes.string,
    onSearch: PropTypes.func
};

export default SearchPeers;

