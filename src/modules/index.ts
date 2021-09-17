import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import user from './user';
import posts from './posts';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ user, posts });

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
