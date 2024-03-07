package com.sky.airline.Dto;

import jakarta.persistence.criteria.From;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightTimeDTO {
    private int from;
    private int to;
    private float estimateTime;
    private Long price;
}
