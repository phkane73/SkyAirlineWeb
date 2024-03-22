import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  flight: {},
  ticketClass: {},
  totalPrice: 0,
  seatCode: "",
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
    setSeatCode: (state, action) => {
      state.seatCode = action.payload;
    },
    removeSeatCode: (state) => {
      state.seatCode = "";
    },
    removeSession: (state) => {
      state.flights = [];
      state.flight = {};
      state.ticketClass = {};
      state.totalPrice = 0;
      state.seatCode = "";
    },
  },
});

export const {
  setFlights,
  setTicketClass,
  setTotalPrice,
  setFlight,
  setSeatCode,
  removeSeatCode,
  removeSession,
} = flights.actions;

export default flights.reducer;
