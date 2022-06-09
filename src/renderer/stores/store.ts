import { combineReducers, configureStore } from '@reduxjs/toolkit';
import principalReducer from '@/stores/reducers/principal/';
import masterReducer from '@/stores/reducers/master/';

const reducer = combineReducers({
  principalReducer,
  masterReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
