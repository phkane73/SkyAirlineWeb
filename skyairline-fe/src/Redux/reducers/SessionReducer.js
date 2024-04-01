import { createSlice } from "@reduxjs/toolkit";
import { cancelSeat } from "../../Services/SeatServices";

const initialState = {
  flights: [],
  flight: {},
  ticketClass: {},
  totalPrice: 0,
  seat: {},
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
    setSeat: (state, action) => {
      state.seat = action.payload;
    },
    removeSeat: (state, action) => {
      if (state.seat.seatId && state.flight.id) {
        cancelSeat(state.seat.seatId, state.flight.id, action.payload);
      }
      state.seat = {};
    },
    removeSession: (state, action) => {
      if (state.seat.seatId && state.flight.id) {
        cancelSeat(state.seat.seatId, state.flight.id, action.payload);
      }
      state.flights = [];
      state.flight = {};
      state.ticketClass = {};
      state.totalPrice = 0;
      state.seat = {};
    },
  },
});

export const {
  setFlights,
  setTicketClass,
  setTotalPrice,
  setFlight,
  setSeat,
  removeSeat,
  removeSession,
} = flights.actions;

export default flights.reducer;
