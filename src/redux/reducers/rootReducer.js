import { combineReducers } from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';
import adminReducer from './adminReducer';
import accountReducer from './accountReducer';

const rootReducer = combineReducers({
    app: appReducer,
    admin: adminReducer,
    user: userReducer,
    account: accountReducer
});

export default rootReducer;