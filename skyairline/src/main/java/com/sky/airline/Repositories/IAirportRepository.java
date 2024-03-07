package com.sky.airline.Repositories;

import com.sky.airline.Entities.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAirportRepository extends JpaRepository<Airport, Integer> {

    Airport findByAirportName(String AirportName);

    List<Airport> findAllByIsOperationIsTrue();
}
