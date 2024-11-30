package com.sky.airline.Services;

import com.sky.airline.Entities.FlightSchedule;
import com.sky.airline.Entities.Seat;
import com.sky.airline.Entities.SeatDetail;

import java.util.List;

public interface ISeatService {
    void bookingSeat(int idSeat, long idSchedule, String token);

    void cancelSeat(int idSeat, long idSchedule, String token);

    Seat getSeatBySeatCode(String seatCode);

//    SeatDetail getSeatDetailById(FlightSeatKey flightSeatKey);

    void saveSeatDetail(SeatDetail seatDetail);

    Seat getSeatById(Integer seatId);

    void listenFlightSchedule(List<SeatDetail> seatDetails);

    List<SeatDetail> getSeatDetailByFlightIds(List<Long> flightIds);

    List<SeatDetail> getSeatDetailById(Long flightId);

    SeatDetail getSeatDetailBySeatIdAndFlightId(Integer seatId, Long flightId);
}
