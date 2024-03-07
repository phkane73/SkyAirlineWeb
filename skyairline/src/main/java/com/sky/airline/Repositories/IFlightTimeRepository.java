package com.sky.airline.Repositories;

import com.sky.airline.Entities.Airport;
import com.sky.airline.Entities.FlightTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFlightTimeRepository extends JpaRepository<FlightTime, Integer> {

    List<FlightTime> getFlightTimeByFromOrTo(Airport airport1,Airport airport2);
}
