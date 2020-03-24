import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import deepForceUpdate from 'react-deep-force-update';
import { getClientStore } from '../redux/store';
import Router from '../router';
import '../style/common.less';

loadableReady(() => {
  const store = getClientStore();
  const root = document.getElementById('main');
  const appInstance = ReactDom.hydrate(
    <Provider store={store}>
      <Router />
    </Provider>,
    root,
  );
  if (module.hot) {
    module.hot.accept('../router/index.jsx', () => {
      if (appInstance && appInstance.updater.isMounted(appInstance)) {
        // Force-update the whole tree, including components that refuse to update
        deepForceUpdate(appInstance);
      }
    });
  }
});
