import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import serverApi from '../middleware/serverApi';
import login from '../middleware/login';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const logger = createLogger({
    duration: true,
    diff: false
  });

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, login, serverApi, logger)
  );

  return store;
}