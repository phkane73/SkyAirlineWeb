import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  flight: {},
  ticketClass: {},
  totalPrice: 0,
};

const flights = createSlice({
  name: "session",
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    setFlight: (state, action) => {
      state.flight = action.payload;
    },
    setTicketClass: (state, action) => {
      state.ticketClass = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    removeSession: (state) => {
      state.flights = [];
      state.flight = {};
      state.ticketClass = {};
      state.totalPrice = 0;
    },
  },
});

export const {
  setFlights,
  setTicketClass,
  setTotalPrice,
  setFlight,
  removeSession,
} = flights.actions;

export default flights.reducer;
