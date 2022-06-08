import { combineReducers, configureStore } from '@reduxjs/toolkit';
import principalReducer from '@/stores/reducers/principal/';

const reducer = combineReducers({
  principalReducer,
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
