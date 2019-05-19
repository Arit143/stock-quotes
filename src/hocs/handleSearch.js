import React from 'react';
import { 
    Alert,
    Col,
    Row
} from 'reactstrap';
import isEmpty from 'lodash/isEmpty';

/**
 * 
 * @param {*} WrappedComponent 
 * HOC takes care of app loading and other generic error handling
 * This is component agnostic
 */

const handleSearch = (WrappedComponent) => {
    return class EnhancedComponent extends React.Component {        
        render() {
            const { fetchPeers, stockQuoteError, stockLoading, stockQuote } = this.props;
            return (
                <>
                {stockLoading ?
                    <div className="d-flex justify-content-center">
                        <div className="search-spinner spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div> :
                    <Row>
                        <Col>
                            {stockQuoteError && <Alert color="danger">
                                No results found for peers of input stock quote. Please try other search inputs...
                            </Alert>}
                            {!stockQuoteError && fetchPeers && isEmpty(stockQuote) && <Alert color="warning">
                                No results found
                            </Alert>}
                            {!isEmpty(stockQuote) && <WrappedComponent {...this.props} />}
                        </Col>
                    </Row>
                }
                </>
            );
        }
    }
}

export default handleSearch;