import { configureStore } from '@reduxjs/toolkit';
import reservationsReducer from './reservationSlice/reservationsSlice';

export const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
