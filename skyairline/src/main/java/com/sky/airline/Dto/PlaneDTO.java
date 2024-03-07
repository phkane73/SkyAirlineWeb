package com.sky.airline.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaneDTO {
    private String planeName;
    private LocalDateTime readyTime;
    private int idAirport;

    public PlaneDTO(String planeName, int idAirport) {
        this.planeName = planeName;
        this.idAirport = idAirport;
    }
}
