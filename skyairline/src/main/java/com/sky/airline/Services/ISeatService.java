package com.sky.airline.Services;

import com.sky.airline.Entities.FlightSchedule;

public interface ISeatService {
    void bookingSeat(int idSeat, long idSchedule, String token);

    void cancelSeat(int idSeat, long idSchedule, String token);

    void listenFlightSchedule(FlightSchedule flightSchedule);
}
