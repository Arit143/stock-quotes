import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'reactstrap';

import sample from 'lodash/sample';
import isEmpty from 'lodash/isEmpty';

import handleSearch from './../../hocs/handleSearch';
import SearchPeerCardBody from './SearchPeerCardBody';

const gradientList = ['', 'top', 'left', 'right'];

const SearchPeerCards = (props) => {
    const { stockQuote, fetchQuoteMetaData, metaDataState } = props;
    return (
        <Row>
        {stockQuote.map((ticker, index) => {
            const gradient = sample(gradientList);
            return <Col key={index} md={4} sm={6} xs={12} className="mb-3">
                <Card
                    data-testid="cards"
                    inverse
                    className={`border-0 bg-gradient-theme${isEmpty(gradient) ? '' : `-${gradient}`}`}
                    style={{ height: 300 , overflow: 'auto' }}
                >
                    <SearchPeerCardBody 
                        ticker={ticker} 
                        fetchQuoteMetaData={fetchQuoteMetaData} 
                        metaDataState={metaDataState[ticker]}/>
                </Card>
            </Col>
        })}
      </Row>
    );
};

SearchPeerCards.propTypes = {
    stockQuote: PropTypes.array,
    fetchQuoteMetaData: PropTypes.func.isRequired,
    metaDataState: PropTypes.object.isRequired
};

export default handleSearch(memo(SearchPeerCards));