package com.sky.airline.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "seat")
public class Seat implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_id")
    private int id;
    private String seatCode;

    @ManyToOne
    @JoinColumn(name = "ticket_class_id")
    private TicketClass ticketClass;

    @OneToMany(mappedBy = "id.seat_id")
    @JsonIgnore
    private Set<SeatDetail> seatDetails;


}
