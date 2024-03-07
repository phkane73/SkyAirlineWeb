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
@Table(name = "airport")
public class Airport implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "airport_id")
    private Integer id;
    private String airportName;
    private boolean isOperation;
    private String location;

    public Airport(String airportName, String location) {
        this.airportName = airportName;
        this.location = location;
    }

}
