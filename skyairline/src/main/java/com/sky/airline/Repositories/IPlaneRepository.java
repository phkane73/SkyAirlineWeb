package com.sky.airline.Repositories;

import com.sky.airline.Entities.Airport;
import com.sky.airline.Entities.Plane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPlaneRepository extends JpaRepository<Plane, Integer> {

    List<Plane> findAllByOnAirport(Airport onAirport);
    List<Plane> findAllByOnAirportAndIsOperationIsTrue(Airport onAirport);

    int countByOnAirport(Airport airport);

    Plane findByPlaneName(String planeName);
}
