package com.sky.airline.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "flight_time")
public class FlightTime implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flight_time_id")
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "formAirport", referencedColumnName = "airport_id")
    private Airport from;
    @ManyToOne
    @JoinColumn(name = "toAirport", referencedColumnName = "airport_id")
    private Airport to;
    private Long price;
    private float estimateTime;

    public FlightTime(Airport from, Airport to, Long price, float estimateTime) {
        this.from = from;
        this.to = to;
        this.price = price;
        this.estimateTime = estimateTime;
    }

    public FlightTime(Airport from, Airport to, float estimateTime) {
        this.from = from;
        this.to = to;
        this.estimateTime = estimateTime;
    }
}
