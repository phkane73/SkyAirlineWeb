package com.sky.airline.Services;

import com.sky.airline.Entities.FlightSchedule;
import com.sky.airline.Entities.FlightSeatKey;
import com.sky.airline.Entities.Seat;
import com.sky.airline.Entities.SeatDetail;

public interface ISeatService {
    void bookingSeat(int idSeat, long idSchedule, String token);

    void cancelSeat(int idSeat, long idSchedule, String token);

    Seat getSeatBySeatCode(String seatCode);

    SeatDetail getSeatDetailById(FlightSeatKey flightSeatKey);

    void saveSeatDetail(SeatDetail seatDetail);

    Seat getSeatById(Integer seatId);

    void listenFlightSchedule(FlightSchedule flightSchedule);
}
