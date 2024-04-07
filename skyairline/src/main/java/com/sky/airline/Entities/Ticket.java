package com.sky.airline.Entities;

import com.sky.airline.Enums.SeatStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ticket")
public class Ticket implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private Long id;
    private String paymentId;
    private String payMethod;
    private LocalDateTime payDate;
    private Float ticketPrice;
    private String qRCode;
    private Boolean checkRevenue;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private FlightSchedule flightSchedule;

    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;
}
