package com.sky.airline.Controllers;

import com.sky.airline.Services.IRevenueService;
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

    @GetMapping("/list")
    public ResponseEntity<?> revenues(){
        return new ResponseEntity<>(revenueService.revenues(),HttpStatus.OK);
    }

    @GetMapping("/month")
    public ResponseEntity<?> revenueMonths(){
        return new ResponseEntity<>(revenueService.revenueMonths(),HttpStatus.OK);
    }

    @GetMapping("/year")
    public ResponseEntity<?> revenueYears(){
        return new ResponseEntity<>(revenueService.revenueYears(),HttpStatus.OK);
    }
}
