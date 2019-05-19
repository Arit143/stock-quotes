import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Page from './../components/Page';
import SearchPeers from './../components/Search/SearchPeers';
import SearchPeerCards from './../components/Search/SearchPeerCards';

import { PageContext } from './../context/PageContext';

import { 
    searchTermState, 
    stockQuoteErrorState, 
    stockLoadingState, 
    stockQuoteState,
    fetchPeersState,
    metaDataState 
} from './../selectors/search.selectors';

import * as searchActionCreators from './../actions/search.actions';

/**
 * 
 * @param {*} props 
 * Search Page container
 */

const SearchPage = (props) => {
    const {
        searchTerm,
        stockQuoteError,
        stockLoading,
        stockQuote,
        fetchPeers,
        metaDataState,
        history,
        actions: { onSearchTermChange, onSearch, fetchQuoteMetaData }
    } = props;

    const PageContextValue = {
        redirect: (...args) => history.push(...args)
    } ;

    return (
        <PageContext.Provider value={PageContextValue}>
            <Page title="Search">
                <SearchPeers 
                    onSearchTermChange={onSearchTermChange}
                    onSearch={onSearch}
                    searchTerm={searchTerm} 
                />
                <SearchPeerCards
                    stockQuote={stockQuote}
                    metaDataState={metaDataState}
                    fetchPeers={fetchPeers}
                    stockQuoteError={stockQuoteError}
                    stockLoading={stockLoading}
                    fetchQuoteMetaData={fetchQuoteMetaData}
                />
            </Page>
        </PageContext.Provider>
    );
};

const mapStateToProps = (state) => {
    return {
        searchTerm: searchTermState(state),
        stockQuoteError: stockQuoteErrorState(state),
        stockLoading: stockLoadingState(state),
        stockQuote: stockQuoteState(state),
        fetchPeers: fetchPeersState(state),
        metaDataState: metaDataState(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {...bindActionCreators(searchActionCreators, dispatch)}
    }
}

SearchPage.propTypes = {
    searchTerm: PropTypes.string,
    stockQuoteError: PropTypes.bool,
    stockLoading: PropTypes.bool,
    stockQuote: PropTypes.array,
    fetchPeers: PropTypes.bool,
    metaDataState: PropTypes.object,
    history: PropTypes.object,
    actions: PropTypes.shape({
        onSearchTermChange: PropTypes.func,
        onSearch: PropTypes.func,
        fetchQuoteMetaData: PropTypes.func
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(SearchPage));
