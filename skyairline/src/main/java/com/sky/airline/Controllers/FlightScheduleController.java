package com.sky.airline.Controllers;

import com.sky.airline.Dto.CreateScheduleRQ;
import com.sky.airline.Entities.FlightSchedule;
import com.sky.airline.Entities.FlightTime;
import com.sky.airline.Repositories.IFlightScheduleRepository;
import com.sky.airline.Services.IFlightScheduleService;
import com.sky.airline.Services.IFlightTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/public/flightschedule")
@RequiredArgsConstructor
public class FlightScheduleController {

    private final IFlightScheduleService flightScheduleService;

    private final IFlightTimeService flightTimeService;


    @PostMapping("/create")
    public ResponseEntity<?> createFlightSchedule(@RequestBody CreateScheduleRQ createScheduleRQ) {
        List<FlightTime> flightTimeList = flightTimeService.allFlightTimeList();
        List<FlightSchedule> flightScheduleList = flightScheduleService.handleFlightSchedule(flightTimeList, createScheduleRQ.getStartDate(),
                createScheduleRQ.getEndDate(), createScheduleRQ.getAction());
        return new ResponseEntity<>(flightScheduleList, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getAllSchedule() {
        return new ResponseEntity<>(flightScheduleService.listSchedule(), HttpStatus.OK);
    }

    @GetMapping("/findflight")
    public ResponseEntity<?> findAllFlight(@RequestParam("departure") int departureId,
                                           @RequestParam("arrival") int arrivalId,
                                           @RequestParam("date") String date) {
        return new ResponseEntity<>(flightScheduleService.findFlightSchedule(departureId, arrivalId, date), HttpStatus.OK);
    }

    @GetMapping("/flight")
    public ResponseEntity<?> findAllFlight(@RequestParam("id") long id) {
        return new ResponseEntity<>(flightScheduleService.getFlightById(id), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<?> countFlight() {
        return new ResponseEntity<>(flightScheduleService.countFlightSchedule(), HttpStatus.OK);
    }
}
