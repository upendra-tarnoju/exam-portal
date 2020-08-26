import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import examinerReducer from './examinerReducer';
import examReducer from './examReducer';

export default combineReducers({
	adminReducer,
	examinerReducer,
	examReducer,
});
