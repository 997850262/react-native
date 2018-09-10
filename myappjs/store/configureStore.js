import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import serverApi from '../middleware/serverApi';
// import login from '../middleware/login';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const logger = createLogger({
    duration: true,
    diff: false
  });

  // const store = createStore(
  //   rootReducer,
  //   initialState,
  //   applyMiddleware(thunk, login, serverApi, logger)
  // );

  if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
    const store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunk,  serverApi, logger))
    );
    return store;
  } else {
    const store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(thunk,  serverApi, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    );
    return store;
  }
}