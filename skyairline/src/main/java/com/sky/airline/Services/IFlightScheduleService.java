package com.sky.airline.Services;

import com.sky.airline.Dto.AirportDTO;
import com.sky.airline.Dto.PlaneDTO;
import com.sky.airline.Entities.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface IFlightScheduleService {

    List<FlightSchedule> listSchedule();
    LocalDateTime converToLocalDataTime(String date);

    boolean overLimitTime(LocalDateTime timeArrival, LocalDateTime endTimeSchedule);

    LocalDateTime calculateDate(LocalDateTime currentDate, float EstimateTime);

    boolean compareTwoDates(LocalDateTime date1, LocalDateTime date2);

    FlightTime getEstimateTime(List<FlightTime> flightTime, AirportDTO departureAirport, AirportDTO arrivalAirport);

    List<AirportDTO> listAirportTrim(List<AirportDTO> airportList, AirportDTO currentAirport);

    List<FlightSchedule> handleFlightSchedule(List<FlightTime> flightTimeDTOList, String start, String end, int action);

    List<PlaneDTO> converToPlaneDTO(List<Plane> planeList, LocalDateTime startDate);

    List<AirportDTO> converToAirportDTO(List<Airport> airportList, LocalDateTime startDateTime);

    boolean checkFlightTime(List<FlightTime> flightTime, AirportDTO departureAirport, AirportDTO arrivalAirport);

    List<FlightSchedule> findFlightSchedule(int departure, int arrival, String date);

    void createSeatWithFlightSchedule(long idSchedule);

    FlightSchedule getFlightById(long id);

    boolean isDateOfFlightSchedule( LocalDateTime start);

}
