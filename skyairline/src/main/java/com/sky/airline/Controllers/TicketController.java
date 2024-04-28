package com.sky.airline.Controllers;

import com.sky.airline.Services.ITicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/public/ticket")
@RequiredArgsConstructor
public class TicketController {

    private final ITicketService ticketService;

    @GetMapping
    public ResponseEntity<?> getTicketsByUserId(@RequestParam("token") String token) {
        return new ResponseEntity<>(ticketService.getTicketsByUserId(token), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getTickets() {
        return new ResponseEntity<>(ticketService.allTicket(), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<?> ticketCount() {
        return new ResponseEntity<>(ticketService.count(), HttpStatus.OK);
    }
}
