package com.sky.airline.Services.Impl;

import com.sky.airline.Entities.Airport;
import com.sky.airline.Entities.FlightTime;
import com.sky.airline.Entities.Plane;
import com.sky.airline.Repositories.IAirportRepository;
import com.sky.airline.Repositories.IFlightTimeRepository;
import com.sky.airline.Repositories.IPlaneRepository;
import com.sky.airline.Services.IAirportService;
import com.sky.airline.Services.IPlaneService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AirportServiceImpl implements IAirportService {

    private final IAirportRepository airportRepository;

    private final IPlaneRepository planeService;

    private final IFlightTimeRepository flightTimeService;

    @Override
    public List<Airport> listAirportIsOperation() {
        return airportRepository.findAllByIsOperationIsTrue();
    }

    @Override
    public boolean addAirport(Airport airport) {
        List<Airport> airportList = airportRepository.findAll();
        for (Airport a : airportList) {
            if (airport.getAirportName().equals(a.getAirportName())) {
                return false;
            }
        }
        airport.setOperation(false);
        airportRepository.save(airport);
        return true;
    }

    @Override
    public Airport findAirportById(int id) {
        return airportRepository.findById(id).get();
    }

    @Override
    public List<Plane> listPlaneOnAirport(Airport airport) {
        return planeService.findAllByOnAirport(airport);
    }

    @Override
    public List<Airport> allAirport() {
        return airportRepository.findAll();
    }

    @Override
    public Airport findAirportByAirportName(String airportName) {
        return airportRepository.findByAirportName(airportName);
    }

    @Override
    public List<Airport> listAirportFlightTime(int id) {
        Airport currentAirport = airportRepository.findById(id).get();
        List<Airport> allAirport = airportRepository.findAllByIsOperationIsTrue();
        List<Airport> results = new ArrayList<>();
        List<FlightTime> flightTimeList = flightTimeService.findAll();
        for (Airport airport1 : allAirport) {
            List<FlightTime> ls = flightTimeList.stream().filter(i -> i.getFrom().equals(currentAirport) &&
                            i.getTo().equals(airport1) || i.getFrom().equals(airport1) && i.getTo().equals(currentAirport))
                    .toList();
            if(!ls.isEmpty()){
                results.add(airport1);
            }
        }
        return results;
    }

    @Override
    public List<Airport> listAirportNoFlightTime(int id) {
        Airport currentAirport = airportRepository.findById(id).get();
        List<Airport> allAirport = airportRepository.findAll();
        List<Airport> listAirportNoCurrentAirport = new ArrayList<>();
        for(Airport airport: allAirport){
            if(!currentAirport.equals(airport)){
                listAirportNoCurrentAirport.add(airport);
            }
        }
        List<Airport> results = new ArrayList<>();
        List<FlightTime> flightTimeList = flightTimeService.findAll();
        for (Airport airport1 : listAirportNoCurrentAirport) {
            List<FlightTime> ls = flightTimeList.stream().filter(i -> i.getFrom().equals(currentAirport) &&
                    i.getTo().equals(airport1) || i.getFrom().equals(airport1) && i.getTo().equals(currentAirport))
                    .toList();
            if(ls.isEmpty()){
                results.add(airport1);
            }
        }
        if(results.isEmpty()){
            return listAirportNoCurrentAirport;
        }
        return results;
    }

    @Override
    public void deActiveAirport(int id) {
        Airport airport = airportRepository.findById(id).get();
        List<FlightTime> flightTimes = flightTimeService.findAll();
        for(FlightTime flightTime: flightTimes){
            if(flightTime.getFrom().equals(airport)||flightTime.getTo().equals(airport)){
                flightTimeService.delete(flightTime);
            }
        }
        airport.setOperation(false);
        airportRepository.save(airport);
    }

    @Override
    public boolean activeAirport(int id) {
        Airport airport = airportRepository.findById(id).get();
        List<FlightTime> flightTimes = flightTimeService.findAll();
        for(FlightTime flightTime: flightTimes){
            if(flightTime.getFrom().equals(airport)||flightTime.getTo().equals(airport)){
                airport.setOperation(true);
                airportRepository.save(airport);
                return true;
            }
        }
        return false;
    }
}
