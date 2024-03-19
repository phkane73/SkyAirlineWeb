package com.sky.airline.Controllers;

import com.sky.airline.Services.ITicketClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/public/class")
@RequiredArgsConstructor
public class TicketClassController {

    private final ITicketClassService ticketClassService;

    @GetMapping("/getclass")
    public ResponseEntity<?> getClass(@RequestParam("id") int id){
        return new ResponseEntity<>(ticketClassService.getTicketClassById(id),HttpStatus.OK);
    }
}
