package com.sky.airline.Controllers;

import com.sky.airline.Services.KafkaService.IRevenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/public/revenue")
@RequiredArgsConstructor
public class RevenueController {

    private final IRevenueService revenueService;

    @GetMapping
    public ResponseEntity<?> countRevenue(){
        revenueService.countRevenue();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
