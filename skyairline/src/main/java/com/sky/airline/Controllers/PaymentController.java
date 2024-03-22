package com.sky.airline.Controllers;

import com.sky.airline.Services.IPaymentService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/public/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final IPaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody Map<String, String> orderRequest) {
        return new ResponseEntity<>(paymentService.createPayment(orderRequest.get("total")),HttpStatus.OK);
    }

    @PostMapping("/capture")
    public ResponseEntity<?> capturePayment(@RequestBody Map<String, String> paymentRequest) {
        return new ResponseEntity<>(paymentService.capturePayment(paymentRequest.get("paymentId")), HttpStatus.OK);
    }

}
