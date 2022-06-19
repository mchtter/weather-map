import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState : {
    city: 'Antalya',
    weather: '',
    temp: '',
    country: '',
    name: ''
  },  

  reducers: {
    setCity: (state, action) => {
        state.city = action.payload
    },

    setWeather: (state, action) => {
        state.weather = action.payload
    },

    setTemp : (state, action) => {
        state.temp = action.payload
    },

    setCountry : (state, action) => {
        state.country = action.payload
    },

    setName : (state, action) => {
        state.name = action.payload
    },
  }
});

export const { setCity, setWeather, setTemp, setCountry, setName } = weatherSlice.actions;

export default weatherSlice.reducer;
