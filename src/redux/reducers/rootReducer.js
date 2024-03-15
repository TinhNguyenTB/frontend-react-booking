import { combineReducers } from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';
import adminReducer from './adminReducer'

const rootReducer = combineReducers({
    app: appReducer,
    admin: adminReducer,
    user: userReducer
});

export default rootReducer;