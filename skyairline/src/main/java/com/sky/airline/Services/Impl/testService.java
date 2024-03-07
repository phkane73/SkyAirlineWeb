package com.sky.airline.Services.Impl;

import com.sky.airline.Entities.Seat;
import com.sky.airline.Entities.TicketClass;
import com.sky.airline.Repositories.ISeatRepository;
import com.sky.airline.Repositories.ITicketClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class testService {

    private final ITicketClassRepository ticketClassRepository;

    private final ISeatRepository seatRepository;

    public void addTicket(){
        TicketClass ticketClass = new TicketClass();
        ticketClass.setClassName("CLASSIC");
        ticketClass.setSeatQuantity(12);
        ticketClass.setTicketClassPrice(200000L);
        ticketClassRepository.save(ticketClass);
    }

    public void addSeat(){
        TicketClass ticketClass = ticketClassRepository.findById(3).get();
        for(int i=1; i<=ticketClass.getSeatQuantity(); i++){
            Seat seat = new Seat();
            seat.setSeatCode("C-"+i);
            seat.setTicketClass(ticketClass);
            seatRepository.save(seat);
        }
    }
}
