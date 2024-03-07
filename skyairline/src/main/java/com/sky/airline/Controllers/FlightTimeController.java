package com.sky.airline.Controllers;


import com.sky.airline.Dto.FlightTimeDTO;
import com.sky.airline.Services.IFlightTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/public/flighttime")
@RequiredArgsConstructor
public class FlightTimeController {

    private final IFlightTimeService flightTimeService;

    @PostMapping("/add")
    public ResponseEntity<?> addFlightTime(@RequestBody FlightTimeDTO flightTimeDTO){
        flightTimeService.addFlightTime(flightTimeDTO);
        return new ResponseEntity<>("Add flight time success", HttpStatus.OK);
    }
}
