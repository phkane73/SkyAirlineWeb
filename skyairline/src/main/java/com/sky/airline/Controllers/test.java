package com.sky.airline.Controllers;

import com.sky.airline.Services.Impl.testService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class test {

    private final testService testService;

    @GetMapping("/test")
    public ResponseEntity<?> addTicket(){
        testService.addSeat();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
