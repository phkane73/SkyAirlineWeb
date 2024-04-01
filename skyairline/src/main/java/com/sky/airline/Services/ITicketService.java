package com.sky.airline.Services;

import com.google.zxing.WriterException;
import com.sky.airline.Entities.FlightSchedule;
import com.sky.airline.Entities.Ticket;
import com.sky.airline.Entities.User;
import jakarta.mail.MessagingException;

import java.io.IOException;
import java.util.List;

public interface ITicketService {

    void createTicket(String paymentMethod, Float ticketPrice,
                      Integer seat, Long flightSchedule, Integer user, String paymentId) throws IOException, WriterException;

    List<Ticket> allTicket();

    void sendTicket(Ticket ticket) throws MessagingException;

    List<Ticket> getTicketsByUserId(String token);
}
