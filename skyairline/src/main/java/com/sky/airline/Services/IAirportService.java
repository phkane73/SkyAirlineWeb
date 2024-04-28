package com.sky.airline.Services;

import com.sky.airline.Entities.Airport;
import com.sky.airline.Entities.Plane;

import java.util.List;

public interface IAirportService {

    List<Airport> listAirportIsOperation();
    boolean addAirport(Airport airport);

    Airport findAirportById(int id);

    List<Plane> listPlaneOnAirport(Airport airport);

    void save(Airport airport);

    List<Airport> allAirport();

    Airport findAirportByAirportName(String airportName);

    List<Airport> listAirportFlightTime(int id);

    List<Airport> listAirportNoFlightTime(int id);

    void deActiveAirport(int id);

    boolean activeAirport(int id);

    long countAirport();
}
