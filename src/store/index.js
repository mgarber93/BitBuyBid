import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './modules';
import thunk from 'redux-thunk';


export default (initialState, context = {}) => {
  const enhancers = [];
  const middleware = [thunk];

  const devToolsExtension = context.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );
  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
  );

  if (module.hot) {
    module.hot.accept('./modules/index', () => {
      /*eslint-disable*/
      store.replaceReducer(require('./modules/index').default);
      /*eslint-enable*/
    });
  }

  return store;
};
