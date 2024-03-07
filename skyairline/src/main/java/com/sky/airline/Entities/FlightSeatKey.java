package com.sky.airline.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlightSeatKey implements Serializable {
    private int seat_id;
    private Long flight_schedule_id;
}
