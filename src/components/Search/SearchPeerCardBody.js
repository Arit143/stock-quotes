import React, { useEffect, memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, CardBody, CardText, CardTitle } from 'reactstrap';
import has from 'lodash/has';

import { PageContext } from './../../context/PageContext';

/**
 * 
 * @param {*} props 
 * This component shows a ticker title
 * After ticker title is show, it loads the ticker metadata
 * After meta data is loaded, it shows the description of a ticker
 * It has a click button to navigate to the details of the stock page
 */
const SearchPeerCardBody = (props) => {
    const { ticker, fetchQuoteMetaData, metaDataState } = props;
    const { redirect } = useContext(PageContext);

    useEffect(() => {
        fetchQuoteMetaData(ticker);
    }, [fetchQuoteMetaData, ticker])

    return (
        <>
            <CardBody className="d-flex flex-column justify-content-start align-items-start">
                <CardTitle>{ticker}</CardTitle>
            </CardBody>

            <CardBody className="d-flex justify-content-between align-items-center">
                {metaDataState && metaDataState.loading ? 
                    <div className="search-spinner spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> : 
                    has(metaDataState, 'data.description') && <>
                        <CardText style={{ marginRight: '30px' }}>{metaDataState.data.description}</CardText>
                        <Button outline color="light" onClick={() => redirect(`/stock/${ticker}`)}>
                            Click
                        </Button> 
                    </>
                }
            </CardBody>
        </>
    );
}

SearchPeerCardBody.propTypes = {
    ticker: PropTypes.string,
    fetchQuoteMetaData: PropTypes.func.isRequired,
    metaDataState: PropTypes.object
};

export default memo(SearchPeerCardBody);