import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../component/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
