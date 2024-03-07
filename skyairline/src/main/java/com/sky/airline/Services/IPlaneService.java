package com.sky.airline.Services;

import com.sky.airline.Dto.PlaneDTO;
import com.sky.airline.Entities.Airport;
import com.sky.airline.Entities.Plane;

import java.util.List;

public interface IPlaneService {
    boolean addPlane(PlaneDTO plane);

    Plane findPlaneById(int id);

    List<Plane> listAllPlaneOnAirport(Airport airport);

    List<Plane> allPlane();

    int currentQuanlityPlaneOnAirport(Airport airport);

    void updatePlaneOnAirport(String planeName, Airport airport);

    void activePlane(int id);

    void deActivePlane(int id);
}
