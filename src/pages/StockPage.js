import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Page from './../components/Page';
import Stock from './../components/Stock/Stock';

import { 
    periodValueState,
    stockPriceDataState
} from './../selectors/stock.selectors';

import { PageContext } from './../context/PageContext';

import * as stockActionCreators from './../actions/stock.actions';

/**
 * 
 * @param {*} props 
 * Stock page container
 */
const StockPage = (props) => {
    const {
        match: { params },
        periodValue,
        stockPriceData,
        actions: { onDropDownValueChange } 
    } = props;

    const PageContextValues = {
        quoteName: params.quote
    };

    return (
        <PageContext.Provider value={PageContextValues}>
            <Page title="Stock">
                <Stock 
                    periodValue={periodValue} 
                    stockPriceData={stockPriceData}
                    onDropDownValueChange={onDropDownValueChange}
                />
            </Page>
        </PageContext.Provider>
    );
};

const mapStateToProps = (state) => {
    return {
        periodValue: periodValueState(state),
        stockPriceData: stockPriceDataState(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {...bindActionCreators(stockActionCreators, dispatch)}
    }
}

StockPage.propTypes = {
    match: PropTypes.object,
    periodValue: PropTypes.string,
    stockPriceData: PropTypes.array,
    actions: PropTypes.shape({
        onDropDownValueChange: PropTypes.func
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(StockPage));
