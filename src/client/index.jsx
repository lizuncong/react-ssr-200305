import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import { getClientStore } from '../redux/store';
import Router from '../router';
import '../style/common.less';

loadableReady(() => {
  const store = getClientStore();
  const root = document.getElementById('main');
  ReactDom.hydrate(
    <Provider store={store}>
      <Router />
    </Provider>,
    root,
  );
});
