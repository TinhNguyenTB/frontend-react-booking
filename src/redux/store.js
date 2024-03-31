import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['app', 'account']
};

// create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create store Redux
const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

// create persistor from store
const persistor = persistStore(store);

export { store, persistor };
