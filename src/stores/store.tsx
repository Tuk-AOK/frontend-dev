import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage';
import userReducer from '../hooks/userSlice';
import projectReducer from '../hooks/projectSlice';
import branchReducer from '../hooks/branchSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'project', 'branch']
};

const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
  branch: branchReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;