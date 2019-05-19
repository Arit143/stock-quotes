import React from 'react';
import componentQueries from 'react-component-queries';
import { Redirect, Switch, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './utils/store';

import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute } from 'components/Layout';

import SearchPage from './pages/SearchPage';
import StockPage from './pages/StockPage';


import './styles/reduction.scss';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <HashRouter basename={getBasename()}>
        <GAListener>
          <Switch>
          <Redirect exact from= "/" to="/search" />
          <LayoutRoute
              exact
              path="/search"
              layout={EmptyLayout}
              component={SearchPage}
            />
            <LayoutRoute
              exact
              path="/stock/:quote"
              layout={EmptyLayout}
              component={StockPage}
            />
          </Switch>
        </GAListener>
      </HashRouter>
      </Provider>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
