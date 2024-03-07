package com.sky.airline.Services.Impl;

import com.sky.airline.Dto.PlaneDTO;
import com.sky.airline.Entities.Airport;
import com.sky.airline.Entities.Plane;
import com.sky.airline.Repositories.IAirportRepository;
import com.sky.airline.Repositories.IPlaneRepository;
import com.sky.airline.Services.IPlaneService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaneServiceImpl implements IPlaneService {

    private final IPlaneRepository planeRepository;

    private final IAirportRepository airportRepository;

    @Override
    public boolean addPlane(PlaneDTO planeDTO) {
        List<Plane> planeList = planeRepository.findAll();
        for(Plane p : planeList){
            if(planeDTO.getPlaneName().equals(p.getPlaneName())){
                return false;
            }
        }
        Plane plane = new Plane();
        Airport airport = airportRepository.findById(planeDTO.getIdAirport()).get();
        plane.setPlaneName(planeDTO.getPlaneName());
        plane.setOnAirport(airport);
        plane.setOperation(true);
        planeRepository.save(plane);
        return true;
    }

    @Override
    public Plane findPlaneById(int id) {
        return planeRepository.findById(id).get();
    }

    @Override
    public List<Plane> listAllPlaneOnAirport(Airport airport) {
        return planeRepository.findAllByOnAirport(airport);
    }

    @Override
    public List<Plane> allPlane() {
        return planeRepository.findAll();
    }

    @Override
    public int currentQuanlityPlaneOnAirport(Airport airport) {
        return planeRepository.countByOnAirport(airport);
    }

    @Override
    public void updatePlaneOnAirport(String planeName, Airport airport) {
        Plane plane = planeRepository.findByPlaneName(planeName);
        plane.setOnAirport(airport);
        planeRepository.save(plane);
    }

    @Override
    public void activePlane(int id) {
        Plane plane = planeRepository.findById(id).get();
        plane.setOperation(true);
        planeRepository.save(plane);
    }

    @Override
    public void deActivePlane(int id) {
        Plane plane = planeRepository.findById(id).get();
        plane.setOperation(false);
        planeRepository.save(plane);
    }
}
