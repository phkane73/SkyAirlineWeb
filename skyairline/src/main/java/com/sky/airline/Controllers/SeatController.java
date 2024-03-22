package com.sky.airline.Controllers;

import com.sky.airline.Services.ISeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
                Long.parseLong(request.get("idSchedule").toString()),request.get("token").toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/cancel")
    public ResponseEntity<?> cancelSeat(@RequestBody Map<String, Object> request){
        seatService.cancelSeat(Integer.parseInt(request.get("idSeat").toString()),
                Long.parseLong(request.get("idSchedule").toString()), request.get("token").toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
