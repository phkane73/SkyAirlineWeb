package com.sky.airline.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sky.airline.Enums.SeatStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "seat_detail")
public class SeatDetail {
    @EmbeddedId
    private FlightSeatKey id;
    private SeatStatus status;

    @ManyToOne
    @MapsId("seat_id")
    @JoinColumn(name = "seat_id")
    private Seat seat;
    private int userBookingSeat;
}
