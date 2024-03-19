package com.sky.airline.Services;

import com.sky.airline.Entities.FlightSchedule;

public interface ISeatService {
    void bookingSeat(int idSeat, long idSchedule);

    void cancelSeat(int idSeat, long idSchedule);

    void listenFlightSchedule(FlightSchedule flightSchedule);
}
