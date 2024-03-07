package com.sky.airline.Repositories;

import com.sky.airline.Entities.Airport;
import com.sky.airline.Entities.FlightSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface IFlightScheduleRepository extends JpaRepository<FlightSchedule, Long> {

    List<FlightSchedule> findAllByDepartureAirportAndArrivalAirportAndDepartureTimeBetween(Airport departure, Airport arrival, LocalDateTime start, LocalDateTime end);
}
