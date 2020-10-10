import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import examinerReducer from './examinerReducer';
import examReducer from './examReducer';
import studentReducer from './studentReducer';

export default combineReducers({
	adminReducer,
	examinerReducer,
	examReducer,
	studentReducer,
});
