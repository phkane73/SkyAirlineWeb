package com.sky.airline.Services.Impl;

import com.sky.airline.Entities.TicketClass;
import com.sky.airline.Repositories.ITicketClassRepository;
import com.sky.airline.Services.ITicketClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ITicketClassServiceImpl implements ITicketClassService {

    private final ITicketClassRepository ticketClassRepository;
    @Override
    public TicketClass getTicketClassById(int id) {
        return ticketClassRepository.findById(id).get();
    }
}
