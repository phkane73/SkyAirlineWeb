package com.sky.airline.Controllers;

import com.sky.airline.Entities.SeatDetail;
import com.sky.airline.Services.ISeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/public/seat")
@RequiredArgsConstructor
public class SeatController {

    private final ISeatService seatService;

    @PutMapping("/booking")
    public ResponseEntity<?> bookingSeat(@RequestBody Map<String, Object> request){
        seatService.bookingSeat(Integer.parseInt(request.get("idSeat").toString()),
                Long.parseLong(request.get("idFlight").toString()),request.get("token").toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/cancel")
    public ResponseEntity<?> cancelSeat(@RequestBody Map<String, Object> request){
        seatService.cancelSeat(Integer.parseInt(request.get("idSeat").toString()),
                Long.parseLong(request.get("idFlight").toString()), request.get("token").toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<?> getSeatDetailByFlightIds(@RequestParam("ids") List<Long> ids){
        List<SeatDetail> seatDetails = seatService.getSeatDetailByFlightIds(ids);
        return new ResponseEntity<>(seatDetails,HttpStatus.OK);
    }

    @GetMapping("/get-one")
    public ResponseEntity<?> getSeatDetailByFlightId(@RequestParam("id") Long id){
        List<SeatDetail> seatDetails = seatService.getSeatDetailById(id);
        return new ResponseEntity<>(seatDetails,HttpStatus.OK);
    }
}
