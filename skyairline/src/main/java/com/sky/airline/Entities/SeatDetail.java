package com.sky.airline.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sky.airline.Enums.SeatStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "seat_detail")
public class SeatDetail implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_detail_id")
    private Integer id;

    private long flightId;


    private SeatStatus status;

    @ManyToOne
    @JoinColumn(name = "seat_id", referencedColumnName = "seat_id")
    private Seat seat;

    private int userBookingSeat;
}
