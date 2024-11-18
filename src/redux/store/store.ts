import { configureStore } from '@reduxjs/toolkit';
import apiReducer from "./../features/api/apiSlice";

const store = configureStore({
  reducer: {
    api: apiReducer,  // Adding the api slice to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;