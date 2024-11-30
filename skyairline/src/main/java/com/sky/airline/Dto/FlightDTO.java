package com.sky.airline.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightDTO implements Serializable {
    private static final long serialVersionUIDLONG = 1L;
    private int flightId;
}
