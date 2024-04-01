package com.sky.airline.Controllers;

import com.sky.airline.Entities.Airport;
import com.sky.airline.Entities.FlightTime;
import com.sky.airline.Entities.Plane;
import com.sky.airline.Repositories.IPlaneRepository;
import com.sky.airline.Services.IAirportService;
import com.sky.airline.Services.IFlightTimeService;
import com.sky.airline.Services.IPlaneService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/public/airport")
@RequiredArgsConstructor
public class AirportController {

    private final IAirportService airportService;

    private final IFlightTimeService flightTimeService;

    private final IPlaneRepository planeService;

    @PostMapping("/add")
    public ResponseEntity<?> addAirport(@RequestBody Airport airport) {
        boolean result = airportService.addAirport(airport);
        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }

    @GetMapping("/allairport")
    public ResponseEntity<?> allAirports() {
        return new ResponseEntity<>(airportService.allAirport(), HttpStatus.OK);
    }

    @GetMapping("/airportsoperation")
    public ResponseEntity<?>  getAllAirportOperation() {
        return new ResponseEntity<>(airportService.listAirportIsOperation(),HttpStatus.OK);
    }

    @GetMapping("/airportflighttime")
    public ResponseEntity<?>  getAllAirportFlightTimeById(@RequestParam("id") int id) {
        return new ResponseEntity<>(airportService.listAirportFlightTime(id),HttpStatus.OK);
    }

    @GetMapping("/getinfoairport")
    public ResponseEntity<?> getInfoAirports(@RequestParam("id") int id) {
        Airport airport = airportService.findAirportById(id);
        List<FlightTime> flightTimeList = flightTimeService.getFlightTimeByAirport(airport, airport);
        if (flightTimeList==null) {
            return new ResponseEntity<>("Sân bay chưa có tuyến", HttpStatus.OK);
        }
        return new ResponseEntity<>(flightTimeList, HttpStatus.OK);
    }

    @GetMapping("/getallplane")
    public ResponseEntity<?> getAllPlanes(@RequestParam("id") int id) {
        Airport airport = airportService.findAirportById(id);
        List<Plane> planeList = planeService.findAllByOnAirportAndIsOperationIsTrue(airport);
        if (planeList.isEmpty()) {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
        return new ResponseEntity<>(planeList, HttpStatus.OK);
    }

    @GetMapping("/listairportnoflighttime")
    public ResponseEntity<?>  getListAirportNoFlightTime(@RequestParam("id") int id) {
        List<Airport> flightTimeList = airportService.listAirportNoFlightTime(id);
        return new ResponseEntity<>(flightTimeList, HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<?>  activeAirport(@RequestParam("id") int id) {
        boolean result = airportService.activeAirport(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/deactive")
    public ResponseEntity<?>  deActiveAirport(@RequestParam("id") int id) {
        airportService.deActiveAirport(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/updateprice")
    public ResponseEntity<?>  updatePrice(@RequestBody Map<String, Object> requset) {
        return new ResponseEntity<>(flightTimeService.updatePrice(Integer.parseInt(requset.get("id").toString()),
                Long.parseLong(requset.get("price").toString())),HttpStatus.OK);
    }

    @DeleteMapping("/deleteflighttime")
    public ResponseEntity<?>  deleteFlightTime(@RequestParam("id") int id) {
        return new ResponseEntity<>(flightTimeService.deleteFlightTime(id),HttpStatus.OK);
    }
}
