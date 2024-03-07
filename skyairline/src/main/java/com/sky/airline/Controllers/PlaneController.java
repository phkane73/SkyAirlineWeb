package com.sky.airline.Controllers;

import com.sky.airline.Dto.PlaneDTO;
import com.sky.airline.Entities.Airport;
import com.sky.airline.Entities.Plane;
import com.sky.airline.Services.IAirportService;
import com.sky.airline.Services.IPlaneService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/public/plane")
@RequiredArgsConstructor
public class PlaneController {

    private final IPlaneService planeService;

    @PostMapping("/add")
    public ResponseEntity<?> addPlane(@RequestBody PlaneDTO plane){
        return new ResponseEntity<>(planeService.addPlane(plane),HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> allPlane(){
        return new ResponseEntity<>(planeService.allPlane(), HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<?>  activeAirport(@RequestParam("id") int id) {
        planeService.activePlane(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/deactive")
    public ResponseEntity<?>  deActiveAirport(@RequestParam("id") int id) {
        planeService.deActivePlane(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
