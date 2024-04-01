package com.sky.airline.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketDTO {
    private String paymentId;
    private String method;
    private Float price;
    private Integer seatId;
    private Long flightId;
    private Integer userId;
}
