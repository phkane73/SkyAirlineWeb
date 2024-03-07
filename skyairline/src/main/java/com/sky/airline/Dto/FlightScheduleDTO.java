package com.sky.airline.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightScheduleDTO {
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private AirportDTO from;
    private AirportDTO to;
    private String planeName;
    private Long price;
}
