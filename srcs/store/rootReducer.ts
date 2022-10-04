import {combineReducers} from 'redux';
import * as A from './alarm';

export const rootReducer = combineReducers({
  alarm: A.reducer,
});
