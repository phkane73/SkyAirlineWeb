package com.sky.airline.Controllers;

import com.google.zxing.WriterException;
import com.sky.airline.Dto.TicketDTO;
import com.sky.airline.Services.IPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/public/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final IPaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody Map<String, String> orderRequest) {
        return new ResponseEntity<>(paymentService.createPayment(orderRequest.get("total")), HttpStatus.OK);
    }

    @PostMapping("/capture")
    public ResponseEntity<?> capturePayment(@RequestBody TicketDTO ticketDTO) throws IOException, WriterException {
        return new ResponseEntity<>(paymentService.capturePayment(ticketDTO.getPaymentId(),
                ticketDTO.getMethod(), ticketDTO.getPrice(),
                ticketDTO.getSeatId(),
                ticketDTO.getFlightId(),
                ticketDTO.getUserId()), HttpStatus.OK);
    }
}
