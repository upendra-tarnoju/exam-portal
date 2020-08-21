import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import examinerReducer from './examinerReducer';

export default combineReducers({
	adminReducer,
	examinerReducer,
});
